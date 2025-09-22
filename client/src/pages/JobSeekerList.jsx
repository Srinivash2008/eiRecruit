import { useState } from "react";
import { Container, Table, Pagination, Modal, Button } from "react-bootstrap";
import { css as emotionClass } from "@emotion/css";
import { motion } from "framer-motion";
import { FaFileAlt, FaCommentDots } from "react-icons/fa";

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
const truncateFilename = (filename, maxLength = 18) => {
    if (!filename) return "";
    if (filename.length <= maxLength) return filename;
    return filename.slice(0, maxLength - 3) + "..." + filename.slice(filename.lastIndexOf("."));
};

const formatDate = (isoString) => new Date(isoString).toLocaleDateString("en-GB");

export default function JobSeekerList() {
    // Dummy data
    const [data] = useState([
        {
            id: 1,
            name: "Alice Johnson",
            email: "alice.johnson@example.com",
            phone: "+1234567890",
            resume: "https://example.com/resume/alice.pdf",
            message: "Looking forward to joining your team!",
            submittedDate: "2025-09-21T10:30:00Z"
        },
        {
            id: 2,
            name: "Bob Smith",
            email: "bob.smith@example.com",
            phone: "+0987654321",
            resume: null,
            message: "",
            submittedDate: "2025-09-20T14:15:00Z"
        },
        {
            id: 3,
            name: "Charlie Brown",
            email: "charlie.brown@example.com",
            phone: "+1122334455",
            resume: "https://example.com/resume/charlie.pdf",
            message: "Experienced in React and Node.js.",
            submittedDate: "2025-09-19T09:00:00Z"
        }
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

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

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentItems = data.slice(indexOfFirst, indexOfLast);

    const forceDownload = (url, filename) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    return (
        <motion.div className={dashboardContainer} initial="hidden" animate="visible">
            <Container>
                <div className={tableSection}>
                    <h1 className={sectionTitle}>Job Seekers List</h1>

                    <Table striped bordered hover responsive className={customTable}>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Email ID</th>
                                <th>Contact Number</th>
                                <th>Resume Upload</th>
                                <th>Message</th>
                                <th>Submitted Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length > 0 ? (
                                currentItems.map((row, idx) => (
                                    <tr key={row.id}>
                                        <td>{indexOfFirst + idx + 1}</td>
                                        <td>{row.name}</td>
                                        <td>{row.email}</td>
                                        <td>{row.phone}</td>
                                        <td>
                                            {row.resume ? (
                                                <span
                                                    className={attachmentChip}
                                                    onClick={() => forceDownload(row.resume, row.resume.split("/").pop())}
                                                    title={row.resume.split("/").pop()}
                                                >
                                                    <FaFileAlt /> {truncateFilename(row.resume)}
                                                </span>
                                            ) : (
                                                <span className="text-muted">No Resume</span>
                                            )}
                                        </td>
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
                                                    <FaCommentDots
                                                        style={{ cursor: "pointer", color: "#0076FF", fontSize: '1.2rem' }}
                                                        onClick={() => handleShowMessage(row.message)}
                                                        title="View Message"
                                                    />
                                                ) : (
                                                    <span className="text-muted">No Message</span>
                                                )}
                                            </div>
                                        </td>
                                        <td>{formatDate(row.submittedDate)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center text-muted">
                                        No job seekers found.
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
