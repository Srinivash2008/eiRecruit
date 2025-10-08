import { useState, useEffect } from "react";
import { Container, Table, Pagination, Spinner, Form, Button } from "react-bootstrap";
import { css as emotionClass } from "@emotion/css";
import { motion } from "framer-motion";
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
const formatDate = (isoString) => new Date(isoString).toLocaleDateString("en-GB");

export default function CandidateRegistration() {
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

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/job-applications/fetch`);
        if (res.data && res.data.result) {
          setData(res.data.result);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
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

    // Map data for Excel
    const excelData = data.map((row, idx) => ({
      "S.No": idx + 1,
      Name: row.name,
      Position: row.position,
      "Current Place of Stay": row.current_place_of_stay,
      "Preferred Country to Apply": row.preferred_country_to_apply,
      "Submission Date": formatDate(row.submission_date)
    }));

    // Create worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates");

    // Convert workbook to binary and save as file
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "Candidate_Registration.xlsx");
  };

  return (
    <motion.div className={dashboardContainer} initial="hidden" animate="visible">
      <Container>
        <div className={tableSection}>
          <h1 className={sectionTitle}>Future Job Postings</h1>
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
                    <th>Position</th>
                    <th>Current Place of Stay</th>
                    <th>Preferred Country to Apply</th>
                    <th>Submission Date</th>
                  </tr>
                </thead>
                <tbody>
                  {getPaginatedData().length > 0 ? (
                    getPaginatedData().map((row, index) => {
                      const actualIndex = (currentPage - 1) * (pageSize === -1 ? data.length : pageSize) + index + 1;
                      return (
                        <tr key={row.id}>
                          <td>{actualIndex}</td>
                          <td>{row.name}</td>
                          <td>{row.position}</td>
                          <td>{row.current_place_of_stay}</td>
                          <td>{row.preferred_country_to_apply}</td>
                          <td>{formatDate(row.submission_date)}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center text-muted">
                        No candidates registered yet.
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
    </motion.div>
  );
}