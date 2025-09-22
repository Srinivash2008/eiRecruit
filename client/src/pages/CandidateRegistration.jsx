import { useState, useEffect } from "react";
import { Container, Table, Pagination, Spinner } from "react-bootstrap";
import { css as emotionClass } from "@emotion/css";
import { motion } from "framer-motion";
import axios from "axios";

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

// Helpers
const formatDate = (isoString) => new Date(isoString).toLocaleDateString("en-GB");

export default function CandidateRegistration() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/v1/job-applications/fetch");
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

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = data.slice(indexOfFirst, indexOfLast);

  return (
    <motion.div className={dashboardContainer} initial="hidden" animate="visible">
      <Container>
        <div className={tableSection}>
          <h1 className={sectionTitle}>Candidate Registration</h1>

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
                  {currentItems.length > 0 ? (
                    currentItems.map((row, idx) => (
                      <tr key={row.id}>
                        <td>{indexOfFirst + idx + 1}</td>
                        <td>{row.name}</td>
                        <td>{row.position}</td>
                        <td>{row.current_place_of_stay}</td>
                        <td>{row.preferred_country_to_apply}</td>
                        <td>{formatDate(row.submission_date)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center text-muted">
                        No candidates registered yet.
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
    </motion.div>
  );
}
