import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Pagination, Modal, Button, Form, Row, Col } from "react-bootstrap";
import { css as emotionClass } from "@emotion/css";
import { motion } from "framer-motion";
import { FaFileAlt, FaCommentDots } from "react-icons/fa";
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

// Helpers
const truncateFilename = (filename, maxLength = 18) => {
    if (!filename) return "";
    if (filename.length <= maxLength) return filename;
    return filename.slice(0, maxLength - 3) + "..." + filename.slice(filename.lastIndexOf("."));
};

const formatDate = (isoString) => new Date(isoString).toLocaleDateString("en-GB");

export default function JobSeekerList() {
    const [jobs, setJobs] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [showMessageModal, setShowMessageModal] = useState(false);
    const [showApplicationModal, setShowApplicationModal] = useState(false);

    const [selectedMessage, setSelectedMessage] = useState("");

    const handleShowMessage = (message) => {
        setSelectedMessage(message);
        setShowMessageModal(true);
    };
    const handleCloseMessageModal = () => {
        setSelectedMessage("");
        setShowMessageModal(false);
    };

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentItems = data.slice(indexOfFirst, indexOfLast);

    const jobOptions = jobs;

    const [selectedJob, setSelectedJob] = useState(null);
    const [applying, setApplying] = useState(false);
    const [applicationData, setApplicationData] = useState({
        name: '',
        email: '',
        contact_number: '',
        message: '',
        resume: null,
    });

    // For application modal
    const handleShowApplicationModal = (job) => {
        setSelectedJob(job);
        setShowApplicationModal(true);
    };
    const handleCloseApplicationModal = () => {
        setSelectedJob(null);
        setApplicationData({ name: '', email: '', contact_number: '', message: '', resume: null });
        setShowApplicationModal(false);
    };

    const handleApplicationChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'resume') {
            setApplicationData((prev) => ({ ...prev, resume: files[0] }));
        } else if (name === "name") {

            const regex = /^[a-zA-Z\s.]*$/;
            if (regex.test(value)) {
                setApplicationData((prev) => ({ ...prev, name: value }));
            }
        }
        else if (name === "email") {

            setApplicationData((prev) => ({ ...prev, email: value }));
        }
        else if (name === "contact_number") {

            const regex = /^\+?\d*$/;
            if (regex.test(value)) {
                setApplicationData((prev) => ({ ...prev, contact_number: value }));
            }
        }
        else {
            setApplicationData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleApplicationSubmit = async (e) => {
        e.preventDefault();
        // Name check
        if (!/^[a-zA-Z\s.]*$/.test(applicationData.name)) {
            toast.warning("Name should contain alphabets only");
            return;
        }

        // Email check
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(applicationData.email)) {
            toast.warning("Enter a valid email address");
            return;
        }

        // Contact number check
        if (!/^\+?\d*$/.test(applicationData.contact_number)) {
            toast.warning("Contact number must be exactly 10 digits");
            return;
        }

        if (!applicationData.resume) {
            toast.warning("Please upload your resume");
            return;
        }
        if (!applicationData.resume) {
            toast.warning('Please upload your resume.');
            return;
        }
        setApplying(true);

        const formData = new FormData();
        formData.append('jobId', selectedJob.id);
        formData.append('jobName', selectedJob.name);
        formData.append('name', applicationData.name);
        formData.append('email', applicationData.email);
        formData.append('contact_number', applicationData.contact_number);
        formData.append('message', applicationData.message);
        formData.append('resume', applicationData.resume);

        console.log(formData, "formData")

        try {
            const response = await axios.post('http://localhost:5000/api/v1/job-seeker/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                console.log(response, "response")
                const newApplication = {
                    // id: response.data.result.job_id, // DB-generated ID
                    name: response.data.result.affectedData.name,
                    email: response.data.result.affectedData.email,
                    contact_number: response.data.result.affectedData.contact_number,
                    opening_name: selectedJob.name, // from your form
                    message: response.data.result.affectedData.message,
                    resume: response.data.result.affectedData.resume,
                    submitted_date: new Date().toISOString() // or formatDate if backend doesn’t send
                };
                setData(prevData => [newApplication, ...prevData]); // add at top

                console.log(newApplication, "newApplication")
                toast.success('Application submitted successfully!');
                handleCloseApplicationModal();
            } else {
                toast.error(response.data.message || 'Failed to submit application.');
            }
        } catch (error) {
            console.error('Application submission error:', error);
            toast.error('An error occurred while submitting your application.');
        } finally {
            setApplying(false);
        }
    };

    // console.log(currentItems, "currentItems")

    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/v1/job-seeker/fetch");
                if (res.data && res.data.result) {
                    setData(res.data.result);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    useEffect(() => {
        const fetchOpenings = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/currentJobOpening/fetch");
                if (response.data.success) {
                    setJobs(response.data.result);
                }
            } catch (error) {
                console.error("Error fetching openings:", error);
            }
        };
        fetchOpenings();
    }, []);

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

    const exportToExcel = () => {
        if (!data || data.length === 0) return;

        // Map data for Excel, skipping the Resume Upload column
        const excelData = data.map((row, idx) => ({
            "S.No": idx + 1,
            Name: row.name,
            "Email ID": row.email,
            "Contact Number": row.contact_number,
            "Applied Position": row.opening_name,
            Message: row.message ? (row.message.length > 20 ? row.message.slice(0, 20) + "..." : row.message) : "No Message",
            "Submitted Date": formatDate(row.submitted_date)
        }));

        // Create worksheet and workbook
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Job Seekers");

        // Convert workbook to binary and save as file
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, "Job_Seekers.xlsx");
    };


    return (
        <motion.div className={dashboardContainer} initial="hidden" animate="visible">
            <Container>
                <div className={tableSection}>
                    <h1 className={sectionTitle}>Job Seekers List</h1>
                    <div className="d-flex justify-content-end mb-3">
                          <button
                            className="btn btn-success"
                             onClick={() => handleShowApplicationModal(null)} 
                        >
                             Apply
                        </button>

                        <button
                            className="btn btn-primary ms-2"
                            onClick={exportToExcel}
                        >
                            Export to Excel
                        </button>
                    </div>

                    <Table striped bordered hover responsive className={customTable}>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Email ID</th>
                                <th>Contact Number</th>
                                <th>Applied Position</th>
                                <th>Message</th>
                                <th>Resume Upload</th>
                                <th>Submitted Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length > 0 ? (
                                currentItems.map((row, idx) => (
                                     <tr key={indexOfFirst + idx}> 
                                        <td>{indexOfFirst + idx + 1}</td>
                                        <td>{row.name}</td>
                                        <td>{row.email}</td>
                                        <td>{row.contact_number}</td>
                                        <td>{row.opening_name}</td>
                                        <td>
                                            {row.message ? (
                                                row.message.length > 20 ? (
                                                    <span
                                                        style={{ cursor: "pointer" }}
                                                      onClick={() => handleShowMessage(row.message)}
                                                    >
                                                        {row.message.slice(0, 20)}
                                                        <span style={{ color: "#FF5722", marginLeft: '2px' }}>... Read more</span>
                                                    </span>
                                                ) : (
                                                    <span>{row.message}</span> // plain text, not clickable
                                                )
                                            ) : (
                                                <span className="text-muted">No Message</span>
                                            )}
                                        </td>
                                        <td>
                                            {row.resume ? (
                                                <span
                                                    className={attachmentChip}
                                                    onClick={() => forceDownload(row.resume, row.resume.split("/").pop())} // download full file
                                                    title={row.resume.split("/").pop()} // show only file name on hover
                                                >
                                                    <FaFileAlt /> {truncateFilename(row.resume.split("/").pop(), 18)} {/* display only filename */}
                                                </span>
                                            ) : (
                                                <span className="text-muted">No Resume</span>
                                            )}
                                        </td>
                                        <td>{formatDate(row.submitted_date)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center text-muted">
                                        {loading ? "Loading..." : "No job seekers found."}
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
            <Modal scrollable show={showMessageModal} onHide={handleCloseMessageModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Message</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '300px', overflowY: 'auto', whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {selectedMessage}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseMessageModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Application Modal */}
            <Modal show={showApplicationModal} onHide={handleCloseApplicationModal} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Apply for Job</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleApplicationSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Job Title</Form.Label>
                                    <Form.Select
                                        name="jobTitle"
                                        value={selectedJob?.id || ""} // store selected job id
                                        onChange={(e) => {
                                            const jobId = parseInt(e.target.value);
                                            const job = jobOptions.find((j) => j.id === jobId);
                                            setSelectedJob(job || null); // set selectedJob object
                                        }}
                                        required
                                    >
                                        <option value="">Select a job</option>
                                        {jobOptions.map((job) => (
                                            <option key={job.id} value={job.id}>
                                                {job.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>


                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={applicationData.name}
                                        onChange={handleApplicationChange}
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={applicationData.email}
                                        onChange={handleApplicationChange}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Contact Number</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        name="contact_number"
                                        value={applicationData.contact_number}
                                        onChange={handleApplicationChange}
                                        placeholder="Enter your contact number"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Message (Optional)</Form.Label>
                            <Form.Control as="textarea" rows={3} name="message" value={applicationData.message} onChange={handleApplicationChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Upload Resume</Form.Label>
                            <Form.Control type="file" name="resume" onChange={handleApplicationChange} accept=".pdf,.doc,.docx" required />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={applying} className="w-100">{applying ? 'Submitting...' : 'Submit Application'}</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </motion.div>
    );
}
