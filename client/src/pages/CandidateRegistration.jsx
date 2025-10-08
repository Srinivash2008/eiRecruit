import { useState, useEffect } from "react";
import { Container, Table, Spinner, Form, Button, InputGroup } from "react-bootstrap";
import { css as emotionClass } from "@emotion/css";
import { motion } from "framer-motion";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";

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

const searchWrapper = emotionClass`
  max-width: 200px;
  display: flex;
  border: 2px solid #0076ff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: transform 0.2s ease, box-shadow 0.3s ease, border 0.3s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.15);
    border-color: #1ca638;
  }

  .input-group-text {
    background: linear-gradient(135deg, #0076ff, #1ca638);
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: linear-gradient(135deg, #0056cc, #13912c);
    }
  }

  .form-control {
    border: none;
    border-radius: 0;
    padding: 0.5rem 1rem;
    font-size: 0.95rem;
    background-color: #fff;
    transition: box-shadow 0.3s ease;

    &:focus {
      outline: none;
      box-shadow: 0 0 12px rgba(0, 118, 255, 0.3);
    }

    &::placeholder {
      color: #888;
      opacity: 1;
    }
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
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const pageSizeOptions = [
        { value: 10, label: '10' },
        { value: 25, label: '25' },
        { value: 50, label: '50' },
        { value: 100, label: '100' },
        { value: -1, label: 'All' }
    ];

  const getFilteredData = () => {
    if (!searchQuery) return data;
    const query = searchQuery.toLowerCase();
    return data.filter(
      (row) =>
        row.name.toLowerCase().includes(query) ||
        row.position.toLowerCase().includes(query) ||
        row.current_place_of_stay.toLowerCase().includes(query) ||
        row.preferred_country_to_apply.toLowerCase().includes(query)
    );
  };

  const getPaginatedData = () => {
    const filteredData = getFilteredData();
    const startIndex = (currentPage - 1) * (pageSize === -1 ? filteredData.length : pageSize);
    const endIndex = pageSize === -1 ? filteredData.length : startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    if (pageSize === -1) return 1;
    return Math.ceil(getFilteredData().length / pageSize);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Fetch data
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
    const filteredData = getFilteredData();
    if (!filteredData.length) {
      toast.warning("No data available to export!");
      return;
    }

    const excelData = filteredData.map((row, idx) => ({
      "S.No": idx + 1,
      Name: row.name,
      Position: row.position,
      "Current Place of Stay": row.current_place_of_stay,
      "Preferred Country to Apply": row.preferred_country_to_apply,
      "Submission Date": formatDate(row.submission_date)
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "Candidate_Registration.xlsx");
  };

  const filteredData = getFilteredData(); // computed once

  return (
    <motion.div className={dashboardContainer} initial="hidden" animate="visible">
      <Container>
        <div className={tableSection}>
          <h1 className={sectionTitle}>Future Job Postings</h1>

          <div className="mb-3 d-flex justify-content-end align-items-center flex-wrap gap-2">
            <InputGroup className={searchWrapper}>
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search here"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </InputGroup>

            <button
              className="btn btn-primary"
              style={{ padding: "0.45rem 0.5rem" }}
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
                  {filteredData.length > 0 ? (
                    getPaginatedData().map((row, index) => {
                      const actualIndex = (currentPage - 1) * (pageSize === -1 ? filteredData.length : pageSize) + index + 1;
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
                        No candidates found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>

              {filteredData.length > 0 && (
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={getTotalPages()}
                  onPageChange={handlePageChange}
                  pageSize={pageSize}
                  onPageSizeChange={handlePageSizeChange}
                  totalItems={filteredData.length}
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
