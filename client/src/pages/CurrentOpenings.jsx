import { use, useEffect, useState } from 'react';
import { Container, Row, Col, Modal, Button, Form, Table } from 'react-bootstrap';
import { css as emotionClass } from '@emotion/css';
import { FaPlus } from 'react-icons/fa';
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
  margin-top: 4rem;
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
        const fetchOpenings = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/currentJobOpening/fetch");
                if (response.data.success) {
                    setOpenings(response.data.result);
                }
            } catch (error) {
                console.error("Error fetching openings:", error);
            }
        };
        fetchOpenings();
    }, []);


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
                                <th>Opening Name</th>
                                <th>Job Description</th>
                                <th>Status</th>
                                <th>Location</th>
                                <th>Logo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {openings.length > 0 ? (
                                openings.map((opening, index) => (
                                    <tr key={opening.id}>
                                        <td>{index + 1}</td>
                                        <td>{opening.name}</td>
                                        <td dangerouslySetInnerHTML={{ __html: opening.description }}></td>
                                        <td>{opening.status}</td>
                                        <td>{opening.location}</td>
                                        <td>
                                            <img
                                                src={opening.logo}
                                                alt="logo"
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    borderRadius: "50%",
                                                    objectFit: "cover"
                                                }} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center text-muted">No openings added yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </motion.div>
            </Container>

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
