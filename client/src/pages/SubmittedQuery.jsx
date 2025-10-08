import { useState, useEffect } from "react";
import { Container, Table, Pagination, Spinner, Modal, Button, Form } from "react-bootstrap";
import { css as emotionClass } from "@emotion/css";
import { motion } from "framer-motion";
import { FaFileAlt, FaCommentDots } from "react-icons/fa";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";

// Styles
const dashboardContainer = emotionClass`
  padding: 3rem 1rem;
  background-color: #f8faff;
  min-height: calc(100vh - 70px);
`;

const sectionTitle = emotionClass`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 3rem;
  text-align: center;
  background: linear-gradient(135deg, #0076FF 0%, #1CA638 50%, #FFC72C 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 2px 8px rgba(0, 118, 255, 0.15));
`;

const tableSection = emotionClass`
  padding: 2.5rem;
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 118, 255, 0.08);
  border: 1px solid rgba(0, 118, 255, 0.1);
`;

const attachmentChip = emotionClass`
  display: inline-flex;
  align-items: center;
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0.5rem 1.25rem;
  background: linear-gradient(135deg, #0076FF 0%, #1CA638 100%);
  color: #fff;
  font-weight: 600;
  font-size: 0.95rem;
  border-radius: 1rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    color: #fff;
  }

  svg {
    margin-right: 0.5rem;
    flex-shrink: 0;
  }
`;

const customTable = emotionClass`
  th, td {
    padding: 1rem 1.25rem !important;
    font-size: 1rem !important;
    font-weight: 500 !important;
    vertical-align: middle;
  }
`;

// Pagination Controls Component
const PaginationControls = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  pageSize, 
  onPageSizeChange, 
  totalItems,
  pageSizeOptions 
}) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * (pageSize === -1 ? totalItems : pageSize) + 1;
  const endItem = Math.min(
    currentPage * (pageSize === -1 ? totalItems : pageSize),
    totalItems
  );

  return (
    <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-3">
      {/* Page size selector */}
      <div className="d-flex align-items-center">
        <span className="me-2" style={{ fontSize: '0.9rem', whiteSpace: 'nowrap' }}>Rows per page:</span>
        <Form.Select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          style={{ width: 'auto', fontSize: '0.9rem' }}
          size="sm"
        >
          {pageSizeOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
      </div>

      {/* Page info */}
      <div style={{ fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
        Showing {startItem} to {endItem} of {totalItems} entries
      </div>

      {/* Page navigation */}
      <div className="d-flex align-items-center gap-2">
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        
        <span style={{ fontSize: '0.9rem', minWidth: '80px', textAlign: 'center' }}>
          Page {currentPage} of {totalPages}
        </span>
        
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

// Helpers
const truncateFilename = (url, maxLength = 18) => {
    if (!url) return "";
    const parts = url.split("/");
    const filename = parts[parts.length - 1];
    const dotIndex = filename.lastIndexOf(".");
    if (dotIndex === -1 || filename.length <= maxLength) return filename;
    const name = filename.slice(0, dotIndex);
    const ext = filename.slice(dotIndex);
    const truncated = name.length > maxLength ? name.slice(0, maxLength - 3) + "..." + ext : name + ext;
    return truncated;
};

const formatDate = (isoString) => new Date(isoString).toLocaleDateString("en-GB");

// Removes timestamp (everything before first dash) from filename
const getCleanFilename = (url) => {
    const filename = url.split("/").pop(); // get actual file name
    return filename.includes('-') ? filename.split('-').slice(1).join('-') : filename;
};

// Force download function
const forceDownload = async (url, filename) => {
    try {
        const res = await fetch(url, { method: "GET" });
        const blob = await res.blob();
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = filename; // already cleaned
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(link.href);
    } catch (err) {
        console.error("Download failed", err);
    }
};

export default function SubmittedQuery() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(1);
    const pageSizeOptions = [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: -1, label: 'All' }
    ];

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState("");

    // Calculate paginated data
    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * (pageSize === -1 ? data.length : pageSize);
        const endIndex = pageSize === -1 ? data.length : startIndex + pageSize;
        
        return data.slice(startIndex, endIndex);
    };

    // Calculate total pages
    const getTotalPages = () => {
        if (pageSize === -1) return 1;
        return Math.ceil(data.length / pageSize);
    };

    // Handle page size change
    const handlePageSizeChange = (newSize) => {
        setPageSize(newSize);
        setCurrentPage(1); // Reset to first page when changing page size
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleShowMessage = (message) => {
        setSelectedMessage(message);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedMessage("");
        setShowModal(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/submit-queries/fetch`);
                if (res.data && res.data.result) {
                    setData(res.data.result);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const exportToExcel = () => {
        if (!data || data.length === 0) {
            toast.warning("No data available to export!");
            return;
        }

        // Map data for Excel, skipping the Attachment column
        const excelData = data.map((row, idx) => ({
            "S.No": idx + 1,
            Name: row.full_name,
            "Phone Number": row.phone_number,
            Message: row.message ? row.message : "No Message",
            "Submitted Date": formatDate(row.submission_date)
        }));

        // Create worksheet and workbook
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Queries");

        // Convert workbook to binary and save as file
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, "Submitted_Queries.xlsx");
    };

    return (
        <motion.div className={dashboardContainer} initial="hidden" animate="visible">
            <Container>
                <div className={tableSection}>
                    <h1 className={sectionTitle}>Submitted Queries</h1>
                    <div className="d-flex justify-content-end mb-3">
                        <button
                            className="btn btn-primary"
                            onClick={exportToExcel}
                        >
                            Export to Excel
                        </button>
                    </div>
                    {loading ? (
                        <div className="text-center py-5">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    ) : (
                        <>
                            <Table striped bordered hover responsive className={customTable}>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Name</th>
                                        <th>Phone Number</th>
                                        <th>Message</th>
                                        <th>Attachment</th>
                                        <th>Submitted Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getPaginatedData().length > 0 ? (
                                        getPaginatedData().map((row, index) => {
                                            const actualIndex = (currentPage - 1) * (pageSize === -1 ? data.length : pageSize) + index + 1;
                                            return (
                                                <tr key={row.id}>
                                                    <td>{actualIndex}</td>
                                                    <td>{row.full_name}</td>
                                                    <td>{row.phone_number}</td>
                                                    <td>
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                height: '100%',
                                                                width: '100%',
                                                            }}
                                                        >
                                                            {row.message ? (
                                                                row.message.length > 20 ? (
                                                                    <span
                                                                        style={{ cursor: "pointer", textAlign: 'center' }}
                                                                        onClick={() => handleShowMessage(row.message)}
                                                                    >
                                                                        {row.message.slice(0, 20)}
                                                                        <span style={{ color: "#FF5722", marginLeft: '2px' }}>... Read more</span>
                                                                    </span>
                                                                ) : (
                                                                    <span style={{ textAlign: 'center' }}>{row.message}</span>
                                                                )
                                                            ) : (
                                                                <span className="text-muted">No Message</span>
                                                            )}
                                                        </div>
                                                    </td>

                                                    <td>
                                                        {row.attachment_url ? (
                                                            <span
                                                                className={attachmentChip}
                                                                onClick={() =>
                                                                    forceDownload(
                                                                        row.attachment_url,
                                                                        getCleanFilename(row.attachment_url) // use cleaned filename for download
                                                                    )
                                                                }
                                                                title={getCleanFilename(row.attachment_url)} // show cleaned filename on hover
                                                            >
                                                                <FaFileAlt /> {truncateFilename(getCleanFilename(row.attachment_url), 18)}
                                                            </span>
                                                        ) : (
                                                            <span className="text-muted">No File</span>
                                                        )}
                                                    </td>

                                                    <td>{formatDate(row.submission_date)}</td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center text-muted">
                                                No queries submitted yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>

                            {/* Pagination Controls */}
                            {data.length > 0 && (
                                <PaginationControls
                                    currentPage={currentPage}
                                    totalPages={getTotalPages()}
                                    onPageChange={handlePageChange}
                                    pageSize={pageSize}
                                    onPageSizeChange={handlePageSizeChange}
                                    totalItems={data.length}
                                    pageSizeOptions={pageSizeOptions}
                                />
                            )}
                        </>
                    )}
                </div>
            </Container>

            {/* Message Modal */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Message</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '300px', overflowY: 'auto', whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {selectedMessage}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </motion.div>
    );
}