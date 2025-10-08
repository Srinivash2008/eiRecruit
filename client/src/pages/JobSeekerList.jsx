import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Pagination, Modal, Button, Form, Row, Col } from "react-bootstrap";
import { css as emotionClass } from "@emotion/css";
import { motion } from "framer-motion";
import { FaFileAlt, FaCommentDots, FaEdit, FaFilePdf, FaFileWord } from "react-icons/fa";
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

// Edit button style
const editButton = emotionClass`
  background: #007bff;
  border: none;
  border-radius: 0.5rem;
  padding: 0.4rem 0.8rem;
  color: white;
  transition: all 0.3s ease;
  
  &:hover {
    background: #0056b3;
    transform: translateY(-1px);
  }
`;

const editModalStyle = emotionClass`
  .modal-content {
    border-radius: 1rem;
    box-shadow: 0 8px 32px rgba(0, 118, 255, 0.15);
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
const truncateFilename = (filename, maxLength = 18) => {
    if (!filename) return "";
    if (filename.length <= maxLength) return filename;
    return filename.slice(0, maxLength - 3) + "..." + filename.slice(filename.lastIndexOf("."));
};

const formatDate = (isoString) => new Date(isoString).toLocaleDateString("en-GB");

// Helper to get clean file name
const getCleanFileName = (filePath) => {
    if (!filePath) return "";
    const fileName = filePath.split("/").pop();
    return fileName.includes('-') ? fileName.split('-').slice(1).join('-') : fileName;
};

export default function JobSeekerList() {
    const [jobs, setJobs] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(1);
    const pageSizeOptions = [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: -1, label: 'All' }
    ];

    const [showMessageModal, setShowMessageModal] = useState(false);
    const [showApplicationModal, setShowApplicationModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [selectedMessage, setSelectedMessage] = useState("");
    const [editingApplication, setEditingApplication] = useState(null);

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
        setShowMessageModal(true);
    };

    const handleCloseMessageModal = () => {
        setSelectedMessage("");
        setShowMessageModal(false);
    };

    // Edit modal handlers
    const handleShowEditModal = (application) => {
        const normalizedApplication = {
            ...application,
            jobId: application.jobId || application.job_id || getCurrentJobId(application)
        };
        setEditingApplication(normalizedApplication);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setEditingApplication(null);
        setShowEditModal(false);
    };

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
        } else if (name === "email") {
            setApplicationData((prev) => ({ ...prev, email: value }));
        } else if (name === "contact_number") {
            const regex = /^\+?\d*$/;
            if (regex.test(value)) {
                setApplicationData((prev) => ({ ...prev, contact_number: value }));
            }
        } else {
            setApplicationData((prev) => ({ ...prev, [name]: value }));
        }
    };

    // Edit application handlers - UPDATED to preserve jobId
    const handleEditChange = (e) => {
        const { name, value, files } = e.target;

        setEditingApplication((prev) => {
            const updated = { ...prev };

            if (name === 'resume') {
                updated.resume = files[0];
            }
            else if (name === "name") {
                const regex = /^[a-zA-Z\s.]*$/;
                if (regex.test(value)) {
                    updated[name] = value;
                } else {
                    return prev;
                }
            } else if (name === "contact_number") {
                const regex = /^\+?\d*$/;
                if (regex.test(value)) {
                    updated[name] = value;
                } else {
                    return prev;
                }
            } else {
                updated[name] = value;
            }

            // Always preserve the jobId
            updated.jobId = prev.jobId;

            return updated;
        });
    };

    // Find current job ID for the application - UPDATED to be more robust
    const getCurrentJobId = (application) => {
        if (application.jobId) return application.jobId;
        if (application.job_id) return application.job_id;

        // Find by job name if ID is not available
        const job = jobOptions.find(j => j.name === application.opening_name);
        return job ? job.id : "";
    };

    const handleEditJobChange = (e) => {
        const jobId = parseInt(e.target.value);
        const job = jobOptions.find((j) => j.id === jobId);
        if (job) {
            setEditingApplication((prev) => ({
                ...prev,
                opening_name: job.name,
                jobId: job.id,
                job_id: job.id
            }));
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/job-seeker/fetch`);
            if (res.data?.result) {
                setData(res.data.result);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
        if (!/^\+?\d{10,}$/.test(applicationData.contact_number)) {
            toast.warning("Contact number must be exactly 10 digits");
            return;
        }

        if (!applicationData.resume) {
            toast.warning("Please upload your resume");
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

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/job-seeker/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                const newApplication = {
                    name: response.data.result.affectedData.name,
                    email: response.data.result.affectedData.email,
                    contact_number: response.data.result.affectedData.contact_number,
                    opening_name: selectedJob.name,
                    message: response.data.result.affectedData.message,
                    resume: response.data.result.affectedData.resume,
                    submitted_date: new Date().toISOString()
                };
                setData(prevData => [newApplication, ...prevData]);
                toast.success('Application submitted successfully!');
                handleCloseApplicationModal();
                await fetchData()
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



    // Edit application submit - UPDATED to handle jobId properly
    const handleEditSubmit = async (e) => {
        e.preventDefault();

        if (!editingApplication?.resume) {
            toast.warning("Please upload a resume file");
            return;
        }


        // Validation
        if (!/^[a-zA-Z\s.]*$/.test(editingApplication.name)) {
            toast.warning("Name should contain alphabets only");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editingApplication.email)) {
            toast.warning("Enter a valid email address");
            return;
        }

        if (!/^\+?\d{10,}$/.test(editingApplication.contact_number)) {
            toast.warning("Contact number must be exactly 10 digits");
            return;
        }

        setApplying(true);

        const formData = new FormData();
        formData.append('id', editingApplication.id);
        formData.append('name', editingApplication.name);
        formData.append('email', editingApplication.email);
        formData.append('contact_number', editingApplication.contact_number);
        formData.append('message', editingApplication.message);

        // Use jobId if available, otherwise fall back to job_id
        const finalJobId = editingApplication.jobId || editingApplication.job_id;

        console.log(finalJobId, "finalJobIdfinalJobId")
        if (!finalJobId) {
            toast.error("Job ID is required");
            setApplying(false);
            return;
        }

        formData.append('jobId', finalJobId);
        formData.append('jobName', editingApplication.opening_name);

        // Only append resume if a new file was selected
        if (editingApplication.resume) {
            formData.append('resume', editingApplication.resume);
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/job-seeker/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                // Update the application in state
                setData(prevData =>
                    prevData.map(app =>
                        app.id === editingApplication.id ? response.data.result : app
                    )
                );
                toast.success('Application updated successfully!');
                handleCloseEditModal();
                await fetchData();
            } else {
                toast.error(response.data.message || 'Failed to update application.');
            }
        } catch (error) {
            console.error('Application update error:', error);
            toast.error('An error occurred while updating your application.');
        } finally {
            setApplying(false);
        }
    };

    useEffect(() => {
        const fetchOpenings = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/currentJobOpening/fetch`);
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
            const cleanedFilename = filename.includes('-') ? filename.split('-').slice(1).join('-') : filename;

            const res = await fetch(url, {
                method: "GET",
            });
            const blob = await res.blob();
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = cleanedFilename;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(link.href);
        } catch (err) {
            console.error("Download failed", err);
        }
    };

    const exportToExcel = () => {
        if (!data || data.length === 0) {
            toast.warning("No data available to export!");
            return;
        }

        const excelData = data.map((row, idx) => ({
            "S.No": idx + 1,
            Name: row.name,
            "Email ID": row.email,
            "Contact Number": row.contact_number,
            "Applied Position": row.opening_name,
            Message: row.message ? (row.message.length > 20 ? row.message.slice(0, 20) + "..." : row.message) : "No Message",
            "Submitted Date": formatDate(row.submitted_date)
        }));

        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Job Seekers");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, "Job_Seekers.xlsx");
    };

    let fileName = "";

    // Check if resume exists
    if (editingApplication?.resume) {
        // If it's a File object, get the name
        if (editingApplication.resume instanceof File) {
            fileName = editingApplication.resume.name.replace(/^\d+-/, '');
        }

        // If it's a string URL, extract the filename from URL
        else if (typeof editingApplication.resume === "string") {
            const urlPart = editingApplication.resume.split('/').pop(); // get last part
            fileName = urlPart?.replace(/^\d+-/, '') || "";
        }
    }

    return (
        <motion.div className={dashboardContainer} initial="hidden" animate="visible">
            <Container>
                <div className={tableSection}>
                    <h1 className={sectionTitle}>Job Seekers List</h1>
                    <div className="d-flex justify-content-end mb-3">
                        {jobOptions?.length > 0 && (
                            <button
                                className="btn btn-success"
                                onClick={() => handleShowApplicationModal(null)}
                            >
                                Apply
                            </button>
                        )}

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
                                <th>Actions</th>
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
                                                        <span>{row.message}</span>
                                                    )
                                                ) : (
                                                    <span className="text-muted">No Message</span>
                                                )}
                                            </td>
                                            <td>
                                                {row.resume ? (
                                                    <span
                                                        className={attachmentChip}
                                                        onClick={() => forceDownload(row.resume, row.resume.split("/").pop())}
                                                        title={getCleanFileName(row.resume)}
                                                    >
                                                        <FaFileAlt />{' '}
                                                        {truncateFilename(getCleanFileName(row.resume), 18)}
                                                    </span>
                                                ) : (
                                                    <span className="text-muted">No Resume</span>
                                                )}
                                            </td>
                                            <td>{formatDate(row.submitted_date)}</td>
                                            <td>
                                                <Button
                                                    className={editButton}
                                                    onClick={() => handleShowEditModal(row)}
                                                    title="Edit Application"
                                                >
                                                    <FaEdit />
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center text-muted">
                                        {loading ? "Loading..." : "No job seekers found."}
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

            {/* Application Modal (Add New) */}
            <Modal show={showApplicationModal} onHide={handleCloseApplicationModal} centered size="lg" className={editModalStyle}>
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
                                        value={selectedJob?.id || ""}
                                        onChange={(e) => {
                                            const jobId = parseInt(e.target.value);
                                            const job = jobOptions.find((j) => j.id === jobId);
                                            setSelectedJob(job || null);
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
                        <Button variant="primary" type="submit" disabled={applying} className="w-100">
                            {applying ? 'Submitting...' : 'Submit Application'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Edit Application Modal - Corrected */}
            <Modal show={showEditModal} onHide={handleCloseEditModal} centered size="lg" className={editModalStyle}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Application</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editingApplication && (
                        <Form onSubmit={handleEditSubmit}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Job Title</Form.Label>
                                        <Form.Select
                                            name="jobTitle"
                                            value={getCurrentJobId(editingApplication) || ""}
                                            onChange={handleEditJobChange}
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
                                            value={editingApplication.name}
                                            onChange={handleEditChange}
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
                                            value={editingApplication.email}
                                            onChange={handleEditChange}
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
                                            value={editingApplication.contact_number}
                                            onChange={handleEditChange}
                                            placeholder="Enter your contact number"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Message (Optional)</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="message"
                                    value={editingApplication.message || ''}
                                    onChange={handleEditChange}
                                    placeholder="Enter your message"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">

                                <Form.Label>
                                    Resume:{" "}
                                    {editingApplication?.resume ? (
                                        <>
                                            {/* Determine file name */}
                                            {(() => {
                                                let name = "";
                                                const resume = editingApplication.resume;

                                                if (resume instanceof File) {
                                                    name = resume.name.replace(/^\d+-/, "");
                                                } else if (typeof resume === "string") {
                                                    const urlPart = resume.split("/").pop();
                                                    name = urlPart?.replace(/^\d+-/, "") || "";
                                                }

                                                return (
                                                    <>
                                                        {/* Show icon based on extension */}
                                                        {name.endsWith(".pdf") && <FaFilePdf style={{ color: "red" }} />}
                                                        {name.endsWith(".doc") || name.endsWith(".docx") ? (
                                                            <FaFileWord style={{ color: "blue" }} />
                                                        ) : null}
                                                        {" "}{name}
                                                    </>
                                                );
                                            })()}
                                        </>
                                    ) : (
                                        "No resume uploaded"
                                    )}
                                </Form.Label>
                                <Form.Control
                                    type="file"
                                    name="resume"
                                    onChange={handleEditChange}
                                    accept=".pdf,.doc,.docx"
                                />
                                <Form.Text className="text-muted">
                                    {editingApplication.resume ?
                                        "Select a new file to update the resume (optional)" :
                                        "Upload your resume"
                                    }
                                </Form.Text>
                            </Form.Group>
                            <Button variant="primary" type="submit" disabled={applying} className="w-100">
                                {applying ? 'Updating...' : 'Update Application'}
                            </Button>
                        </Form>
                    )}
                </Modal.Body>
            </Modal>
        </motion.div>
    );
}