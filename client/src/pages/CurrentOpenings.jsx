import { useEffect, useState } from 'react';
import { Container, Modal, Button, Form, Table } from 'react-bootstrap';
import { css as emotionClass } from '@emotion/css';
import { FaPlus, FaEye, FaCheck, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import axios from 'axios';
import { toast } from "react-toastify";

// Styles inspired by other pages in the project
const dashboardContainer = emotionClass`
  padding: 3rem 1rem;
  background-color: #f8faff;
  min-height: calc(100vh - 70px); // Adjust for header height
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

// Animation variants
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0.2, 0.2, 1] } }
};

const stagger = {
    visible: { transition: { staggerChildren: 0.15 } }
};

// New styles for the table section
const tableSection = emotionClass`
  padding: 2.5rem;
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 118, 255, 0.08);
  border: 1px solid rgba(0, 118, 255, 0.1);
`;

const tableTitle = emotionClass`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const addButton = emotionClass`
  background: linear-gradient(135deg, #0076FF 0%, #1CA638 100%);
  border: none;
  border-radius: 0.75rem;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(28, 166, 56, 0.2);
  }
`;

// Scrollable ReactQuill editor with limited toolbar
const quillModules = {
    toolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ],
};

const quillEditorStyle = emotionClass`
  .ql-toolbar {
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
    border-color: #dee2e6;
  }
  .ql-container {
    border-bottom-left-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
    border-color: #dee2e6;
  }
  .ql-editor {
    max-height: 200px;
    overflow-y: auto;
    font-size: 1rem;
  }
`;

// Custom modal body for scrollable content with reduced height
const customModalBody = emotionClass`
  max-height: 60vh;  // limits modal height
  overflow-y: auto;  // scrollable if content exceeds
  padding-right: 1rem; // Prevent scrollbar overlapping
`;

const lightModal = emotionClass`
  .modal-content {
    border-radius: 1rem;
    box-shadow: 0 4px 16px rgba(0,0,0,0.1); /* lighter shadow */
    border: 1px solid #e9ecef;
  }
  .modal-header, .modal-footer {
    border: none;
    padding: 0.75rem 1rem; /* reduce padding */
  }
  .modal-body {
    padding: 1rem;
    font-size: 0.95rem; /* slightly smaller text */
  }
`;

export default function CurrentOpenings() {
    const [showModal, setShowModal] = useState(false);
    const [openings, setOpenings] = useState([]);
    const [newOpening, setNewOpening] = useState({
        id: '',
        name: '',
        description: '',
        status: '',
        location: '',
        logo: null,
    });
    // State for inline status editing
    const [editingOpeningId, setEditingOpeningId] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');

    // 👇 JD Preview Modal State
    const [previewJD, setPreviewJD] = useState(null);
    const [showPreviewModal, setShowPreviewModal] = useState(false);

    const handleClose = () => {
        setShowModal(false);
        setNewOpening({ name: '', description: '', location: '', logo: null });
    };
    const handleShow = () => setShowModal(true);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'logo') {
            setNewOpening((prev) => ({ ...prev, logo: files[0] }));
        } else {
            setNewOpening((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleDescriptionChange = (value) => {
        setNewOpening((prev) => ({ ...prev, description: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isDescriptionEmpty = !newOpening.description || newOpening.description.replace(/<[^>]*>/g, '').trim().length === 0;

        if (!newOpening.name || isDescriptionEmpty || !newOpening.location) {
            toast.warning("Please fill in all required fields.");
            return;
        }
        if (!newOpening.logo) {
            toast.warning('Please upload a logo.');
            return;
        }

        const formData = new FormData();
        formData.append('name', newOpening.name);
        formData.append('description', newOpening.description);
        formData.append('location', newOpening.location);
        formData.append('logo', newOpening.logo);

        try {
            const response = await axios.post(
                "http://localhost:5000/api/v1/newJobOpening/create",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            if (response?.data.success) {
                toast.success(response?.data?.message);
                setOpenings((prev) => [response.data.result, ...prev]);
                handleClose();

            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("An error occurred. Please try again.")
        }
    };

    useEffect(() => {
        const fetchOpeningsWithStatus = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/currentJobOpening/fetchWithStatus");
                if (response.data.success) {
                    setOpenings(response.data.result);
                }
            } catch (error) {
                console.error("Error fetching openings with status:", error);
            }
        };
        fetchOpeningsWithStatus();
    }, []);

    // 👇 Preview handlers
    const handlePreview = (jd) => {
        setPreviewJD(jd);
        setShowPreviewModal(true);
    };

    const handleClosePreview = () => {
        setShowPreviewModal(false);
        setPreviewJD(null);
    };

    const handleStatusClick = (opening) => {
        setEditingOpeningId(opening.id);
        setSelectedStatus(opening.status);
    };

    const handleCancelEdit = () => {
        setEditingOpeningId(null);
        setSelectedStatus('');
    };

    const handleUpdateStatus = async (openingId) => {
        try {
            // Assuming a PUT endpoint to update status
            const response = await axios.post(
                `http://localhost:5000/api/v1/currentJobOpening/status/update`,
                { status: selectedStatus, id: openingId },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.data.success) {
                toast.success("Status updated successfully!");
                setOpenings(openings.map(op =>
                    op.id === openingId ? { ...op, status: selectedStatus } : op
                ));
                handleCancelEdit(); // Exit editing mode
            } else {
                toast.error(response.data.message || "Failed to update status.");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("An error occurred while updating the status.");
        }
    };

    return (
        <motion.div className={dashboardContainer} initial="hidden" animate="visible" variants={stagger}>
            <Container>
                {/* Openings Table Section */}
                <motion.div className={tableSection} variants={fadeUp}>
                    <motion.h1 className={sectionTitle} variants={fadeUp}>
                        Manage Current Openings
                    </motion.h1>
                    <div className={tableTitle}>
                        <span>Current Openings</span>
                        <Button className={addButton} onClick={handleShow}>
                            <FaPlus className="me-2" /> Add Opening
                        </Button>
                    </div>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                {/* <th>Logo</th> */}
                                <th>Opening Name</th>
                                <th>Job Description</th>
                                <th>Location</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {openings.length > 0 ? (
                                openings.map((opening, index) => (
                                    <tr key={opening.id}>
                                        <td>{index + 1}</td>
                                        {/* <td>
                                            <img
                                                src={opening.logo}
                                                alt="logo"
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    borderRadius: "50%",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </td> */}
                                        <td>{opening.name}</td>
                                        <td style={{ minHeight: "60px", padding: "12px", verticalAlign: "middle" }}>
                                            {opening.description ? (
                                                <span
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handlePreview(opening.description)}
                                                >
                                                    {opening.description.replace(/<[^>]+>/g, "").length > 20 ? (
                                                        <>
                                                            {opening.description.replace(/<[^>]+>/g, "").slice(0, 20)}
                                                            <span style={{ color: "#FF5722", marginLeft: "2px" }}>
                                                                ... Read more
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span
                                                            dangerouslySetInnerHTML={{
                                                                __html: opening.description,
                                                            }}
                                                        />
                                                    )}
                                                </span>
                                            ) : (
                                                <span className="text-muted">No Message</span>
                                            )}
                                        </td>
                                        <td>{opening.location}</td>
                                        <td>
                                            {editingOpeningId === opening.id ? (

                                                <div className="d-flex align-items-center">
                                                    <Form.Select
                                                        size="sm"
                                                        value={selectedStatus}
                                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                                        style={{ maxWidth: '150px' }}
                                                    >
                                                        <option value="Publish">Publish</option>
                                                        <option value="UnPublish">UnPublish</option>
                                                    </Form.Select>
                                                    <Button variant="link" onClick={() => handleUpdateStatus(opening.id)} className="ms-2 p-0" title="Update Status"><FaCheck color="green" /></Button>
                                                    <Button variant="link" onClick={handleCancelEdit} className="ms-2 p-0" title="Cancel"><FaTimes color="red" /></Button>
                                                </div>
                                            ) : (
                                                <span onClick={() => handleStatusClick(opening)} style={{ cursor: 'pointer' }} title="Click to edit">
                                                    {opening.status}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center text-muted">
                                        No openings added yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </motion.div>
            </Container>

            {/* 👇 JD Preview Modal */}
            <Modal
                show={showPreviewModal}
                onHide={handleClosePreview}
                centered
                size="md"   // smaller modal
                scrollable
                className={lightModal}  // apply lightweight styles
            >
                <Modal.Header closeButton>
                    <Modal.Title>Job Description</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {previewJD ? (
                        <div dangerouslySetInnerHTML={{ __html: previewJD }} />
                    ) : (
                        <p>No description available.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosePreview}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Add Opening Modal */}
            <Modal
                show={showModal}
                onHide={handleClose}
                centered
                size="lg"
                scrollable
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Opening</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body className={customModalBody}>
                        <Form.Group className="mb-3" controlId="openingName">
                            <Form.Label>Opening Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="e.g., Senior React Developer"
                                value={newOpening.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="jobDescription">
                            <Form.Label>Job Description</Form.Label>
                            <div className={quillEditorStyle}>
                                <ReactQuill
                                    theme="snow"
                                    value={newOpening.description}
                                    onChange={handleDescriptionChange}
                                    placeholder="Describe the job role and requirements..."
                                    modules={quillModules}
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="location">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                name="location"
                                placeholder="e.g., Dublin, Ireland"
                                value={newOpening.location}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="logo" className="mb-3">
                            <Form.Label>Logo</Form.Label>
                            <Form.Control
                                type="file"
                                name="logo"
                                onChange={handleChange}
                                accept="image/*"
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" className={addButton}>
                            Add Opening
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </motion.div>
    );
}
