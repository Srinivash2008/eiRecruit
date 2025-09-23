import { useState, useEffect } from "react";
import { Container, Table, Pagination, Spinner, Modal, Button } from "react-bootstrap";
import { css as emotionClass } from "@emotion/css";
import { motion } from "framer-motion";
import { FaFileAlt, FaCommentDots } from "react-icons/fa";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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

// Force download function
const forceDownload = async (url, filename) => {
    try {
        const res = await fetch(url, {
            method: "GET",
        });
        const blob = await res.blob();
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
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

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState("");

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
                const res = await axios.get("http://localhost:5000/api/v1/submit-queries/fetch");
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

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentItems = data.slice(indexOfFirst, indexOfLast);

    const exportToExcel = () => {
    if (!data || data.length === 0) return;

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
                                    {currentItems.length > 0 ? (
                                        currentItems.map((row, idx) => (
                                            <tr key={row.id}>
                                                <td>{indexOfFirst + idx + 1}</td>
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
                                                                    row.attachment_url.split("/").pop()
                                                                )
                                                            }
                                                            title={row.attachment_url.split("/").pop()}
                                                        >
                                                            <FaFileAlt /> {truncateFilename(row.attachment_url, 18)}
                                                        </span>
                                                    ) : (
                                                        <span className="text-muted">No File</span>
                                                    )}
                                                </td>
                                                <td>{formatDate(row.submission_date)}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center text-muted">
                                                No queries submitted yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <Pagination className="justify-content-center mt-3">
                                    {[...Array(totalPages)].map((_, idx) => (
                                        <Pagination.Item
                                            key={idx + 1}
                                            active={currentPage === idx + 1}
                                            onClick={() => setCurrentPage(idx + 1)}
                                        >
                                            {idx + 1}
                                        </Pagination.Item>
                                    ))}
                                </Pagination>
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
