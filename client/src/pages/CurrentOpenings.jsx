import { useEffect, useState } from 'react';
import { Container, Modal, Button, Form, Table } from 'react-bootstrap';
import { css as emotionClass } from '@emotion/css';
import { FaPlus, FaEye, FaCheck, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { FaPen, FaRegTrashAlt } from "react-icons/fa";
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

const compactVertical = emotionClass`
  th, td {
    padding: 0.4rem 0.75rem !important; /* 0.4rem top/bottom, 0.75rem left/right */
    vertical-align: middle;
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

export default function CurrentOpenings() {
    const [showModal, setShowModal] = useState(false);
    const [openings, setOpenings] = useState([]);
    const [newOpening, setNewOpening] = useState({
        id: '',
        name: '',
        description: '',
        co_years_of_experience: '',
        status: '',
        location: '',
        logo: null,
    });
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingOpening, setEditingOpening] = useState({
        id: '',
        name: '',
        description: '',
        co_years_of_experience: '',
        status: '',
        location: '',
        logo: null,
    });

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

    // console.log(openings, "openings")
    // State for inline status editing
    const [editingOpeningId, setEditingOpeningId] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');

    // 👇 JD Preview Modal State
    const [previewJD, setPreviewJD] = useState(null);
    const [showPreviewModal, setShowPreviewModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedOpening, setSelectedOpening] = useState(null);

    const [selectedLocation, setSelectedLocation] = useState("All");
    const [selectedFilterStatus, setSelectedFilterStatus] = useState("All");
    const [selectedOpeningName, setSelectedOpeningName] = useState("All");

    // Calculate paginated data
    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * (pageSize === -1 ? filteredOpenings.length : pageSize);
        const endIndex = pageSize === -1 ? filteredOpenings.length : startIndex + pageSize;

        return filteredOpenings.slice(startIndex, endIndex);
    };

    // Calculate total pages
    const getTotalPages = () => {
        if (pageSize === -1) return 1;
        return Math.ceil(filteredOpenings.length / pageSize);
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

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedLocation, selectedFilterStatus, selectedOpeningName]);

    const handleDeleteClick = (opening) => {
        setSelectedOpening(opening);
        setShowDeleteModal(true);
    };

    const fetchOpeningsWithStatus = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/currentJobOpening/fetchWithStatus`);
            if (response.data.success) {
                setOpenings(response.data.result);
            }
        } catch (error) {
            console.error("Error fetching openings with status:", error);
        }
    };

    useEffect(() => {
        fetchOpeningsWithStatus();
    }, []);

    const confirmDelete = async () => {
        if (!selectedOpening) return;

        console.log(selectedOpening?.id, "selectedOpening")
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/currentJobOpening/delete`,
                { id: selectedOpening.id },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            if (response?.data.success) {
                toast.success(response?.data?.message);
                setOpenings((prev) => prev.filter(op => op.id !== selectedOpening.id));
                setShowDeleteModal(false);
                setSelectedOpening(null);
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            console.error("Error deleting opening:", error);
            toast.error("An error occurred. Please try again.");
        }
    };



    const handleClose = () => {
        setShowModal(false);
        setNewOpening({ name: '', description: '', co_years_of_experience: '', location: '', logo: null });
    };
    const handleShow = () => setShowModal(true);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'logo') {
            setNewOpening((prev) => ({ ...prev, logo: files[0] }));
        } else if (name === "co_years_of_experience") {
            const regex = /^\d*$/;
            if (regex.test(value)) {
                setNewOpening((prev) => ({ ...prev, co_years_of_experience: value }));
            }
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
        const nameRegex = /^[A-Za-z ]+$/;

        if (!newOpening.name || isDescriptionEmpty || !newOpening.location) {
            toast.warning("Please fill in all required fields.");
            return;
        }

         // Years of experience check
        if (!/^\d+$/.test(newOpening.co_years_of_experience)) {
            toast.warning("Years of experience should be a valid number");
            return;
        }

        // if (!nameRegex.test(newOpening.name)) {
        //     toast.warning("Name can only contain letters.");
        //     return;
        // }

        // if (!newOpening.logo) {
        //     toast.warning('Please upload a logo.');
        //     return;
        // }

        const formData = new FormData();
        formData.append('name', newOpening.name);
        formData.append('description', newOpening.description);
        formData.append('co_years_of_experience', newOpening.co_years_of_experience);
        formData.append('location', newOpening.location);
        formData.append('logo', newOpening.logo);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/newJobOpening/create`,
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
                await fetchOpeningsWithStatus();

            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("An error occurred. Please try again.")
        }
    };

    // edit opening handlers
    const handleEditShow = (opening) => {
        setEditingOpening(opening);
        setShowEditModal(true);
    };
    const handleEditClose = () => {
        setShowEditModal(false);
        setEditingOpening({
            id: '',
            name: '',
            description: '',
            co_years_of_experience: '',
            status: '',
            location: '',
            logo: null,
        });
    };

    const handleEditChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'logo') {
            setEditingOpening((prev) => ({ ...prev, logo: files[0] }));
        } else if (name === "co_years_of_experience") {
            const regex = /^\d*$/;
            if (regex.test(value)) {
                setEditingOpening((prev) => ({ ...prev, co_years_of_experience: value }));
            }
        } else {
            setEditingOpening((prev) => ({ ...prev, [name]: value }));
        }
    };
    const handleEditDescriptionChange = (value) => {
        setEditingOpening((prev) => ({ ...prev, description: value }));
    };
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const isDescriptionEmpty = !editingOpening.description || editingOpening.description.replace(/<[^>]*>/g, '').trim().length === 0;

        if (!editingOpening.name || isDescriptionEmpty || !editingOpening.location) {
            toast.warning("Please fill in all required fields.");
            return;
        }
         // Years of experience check
        if (!/^\d+$/.test(editingOpening.co_years_of_experience)) {
            toast.warning("Years of experience should be a valid number");
            return;
        }
        console.log(editingOpening, "editingOpening");

        const formData = new FormData();
        formData.append('id', editingOpening.id);
        formData.append('name', editingOpening.name);
        formData.append('description', editingOpening.description);
        formData.append('co_years_of_experience', editingOpening.co_years_of_experience);
        formData.append('location', editingOpening.location);
        formData.append('status', editingOpening.status);
        if (editingOpening.logo) {
            formData.append('logo', editingOpening.logo);
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/currentJobOpening/update`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            if (response?.data.success) {
                toast.success(response?.data?.message);
                setOpenings((prev) => prev.map(op => op.id === editingOpening.id ? response.data.result : op));
                handleEditClose();
                await fetchOpeningsWithStatus();
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("An error occurred. Please try again.")
        }
    };


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
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/currentJobOpening/status/update`,
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

    const filteredOpenings = openings.filter(op => {
        const matchLocation = selectedLocation === "All" || op.location === selectedLocation;
        const matchStatus = selectedFilterStatus === "All" || op.status === selectedFilterStatus;
        const matchOpeningName = selectedOpeningName === "All" || op.name === selectedOpeningName;
        return matchLocation && matchStatus && matchOpeningName;
    });


    return (
        <motion.div className={dashboardContainer} initial="hidden" animate="visible" variants={stagger}>
            <Container>
                {/* Openings Table Section */}
                <motion.div className={tableSection} variants={fadeUp}>
                    <motion.h1 className={sectionTitle} variants={fadeUp}>
                        Manage Current Openings
                    </motion.h1>
                    <div className={tableTitle}>
                        <div className="d-flex flex-wrap flex-md-nowrap justify-content-between align-items-center w-100 gap-3">
                            {/* Filters on the left */}
                            <div className="d-flex align-items-center gap-2 flex-wrap flex-md-nowrap w-100 w-md-auto">
                                {/* Opening Name Filter */}
                                <Form.Select
                                    className="flex-grow-1"
                                    value={selectedOpeningName}
                                    onChange={(e) => setSelectedOpeningName(e.target.value)}
                                    style={{
                                        border: "1px solid #363a3eff",
                                        minWidth: "180px",
                                        maxWidth: "200px",
                                        height: "40px",
                                        fontSize: "16px",
                                    }}
                                >
                                    <option value="All">All Opening Names</option>
                                    {[...new Set(openings.map((op) => op.name))].map((name, i) => (
                                        <option key={i} value={name}>
                                            {name}
                                        </option>
                                    ))}
                                </Form.Select>

                                {/* Location Filter */}
                                <Form.Select
                                    className="flex-grow-1"
                                    value={selectedLocation}
                                    onChange={(e) => setSelectedLocation(e.target.value)}
                                    style={{
                                        border: "1px solid #363a3eff",
                                        minWidth: "180px",
                                        maxWidth: "200px",
                                        height: "40px",
                                        fontSize: "16px",
                                    }}
                                >
                                    <option value="All">All Locations</option>
                                    {[...new Set(openings.map((op) => op.location))].map((loc, i) => (
                                        <option key={i} value={loc}>
                                            {loc}
                                        </option>
                                    ))}
                                </Form.Select>

                                {/* Status Filter */}
                                <Form.Select
                                    className="flex-grow-1"
                                    value={selectedFilterStatus}
                                    onChange={(e) => setSelectedFilterStatus(e.target.value)}
                                    style={{
                                        border: "1px solid #363a3eff",
                                        minWidth: "180px",
                                        maxWidth: "200px",
                                        height: "40px",
                                        fontSize: "16px",
                                    }}
                                >
                                    <option value="All">All Status</option>
                                    <option value="Publish">Publish</option>
                                    <option value="UnPublish">UnPublish</option>
                                </Form.Select>
                            </div>

                            {/* Add button on the right */}
                            <Button
                                className={`${addButton} mt-2 mt-md-0`}
                                onClick={handleShow}
                                style={{ whiteSpace: "nowrap" }}
                            >
                                <FaPlus className="me-2" /> Add Opening
                            </Button>
                        </div>


                    </div>


                    <Table striped bordered hover responsive className={compactVertical}>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                {/* <th>Logo</th> */}
                                <th>Opening Name</th>
                                <th>Job Description</th>
                                <th>Years of Experience</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getPaginatedData().length > 0 ? (
                                getPaginatedData().map((opening, index) => {
                                    const actualIndex = (currentPage - 1) * (pageSize === -1 ? filteredOpenings.length : pageSize) + index + 1;
                                    return (
                                        <tr key={opening.id}>
                                            <td>{actualIndex}</td>
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
                                            <td>{opening.co_years_of_experience}</td>
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

                                            <td>
                                                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "100%" }}>
                                                    <Button
                                                        onClick={() => handleEditShow(opening)}
                                                        variant="primary"
                                                        title="Edit Opening"
                                                        style={{
                                                            width: "28px",
                                                            height: "28px",
                                                            borderRadius: "50%",
                                                            padding: "0",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            fontSize: "14px",
                                                        }}
                                                    >
                                                        <FaPen />
                                                    </Button>

                                                    {(opening?.job_seeker_count ?? 0) === 0 && (
                                                        <Button
                                                            variant="danger"
                                                            title="Delete Opening"
                                                            style={{
                                                                width: "28px",
                                                                height: "28px",
                                                                borderRadius: "50%",
                                                                padding: "0",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                fontSize: "14px",
                                                                marginLeft: "6px",
                                                            }}
                                                            onClick={() => handleDeleteClick(opening)}
                                                        >
                                                            <FaRegTrashAlt />
                                                        </Button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center text-muted">
                                        No openings found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>

                    {/* Pagination Controls */}
                    {filteredOpenings.length > 0 && (
                        <PaginationControls
                            currentPage={currentPage}
                            totalPages={getTotalPages()}
                            onPageChange={handlePageChange}
                            pageSize={pageSize}
                            onPageSizeChange={handlePageSizeChange}
                            totalItems={filteredOpenings.length}
                            pageSizeOptions={pageSizeOptions}
                        />
                    )}
                </motion.div>
            </Container>


            <Modal
                show={showPreviewModal}
                onHide={handleClosePreview}
                centered
                size="md"
                className={lightModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Job Description</Modal.Title>
                </Modal.Header>
                <Modal.Body
                    style={{
                        maxHeight: '400px',
                        overflowY: 'auto',
                        whiteSpace: 'pre-wrap',
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                    }}
                >
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
                         <Form.Group className="mb-3" controlId="co_years_of_experience">
                            <Form.Label>Years of experience</Form.Label>
                            <Form.Control
                                type='number'
                                name="co_years_of_experience"
                                value={newOpening.co_years_of_experience}
                                onChange={handleChange}
                                placeholder="Enter  years of experience"
                                required
                            />
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
                            {newOpening.logo && (
                                <img
                                    src={
                                        newOpening.logo instanceof File
                                            ? URL.createObjectURL(newOpening.logo)
                                            : newOpening.logo
                                    }
                                    alt="logo"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        marginTop: "10px",
                                    }}
                                />
                            )}
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

            {/* Edit Opening Modal */}
            <Modal
                show={showEditModal}
                onHide={handleEditClose}
                centered
                size="lg"
                scrollable
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Opening</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleEditSubmit}>
                    <Modal.Body className={customModalBody}>
                        <Form.Group className="mb-3" controlId="openingName">
                            <Form.Label>Opening Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="e.g., Senior React Developer"
                                value={editingOpening.name}
                                onChange={handleEditChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="jobDescription">
                            <Form.Label>Job Description</Form.Label>
                            <div className={quillEditorStyle}>
                                <ReactQuill
                                    theme="snow"
                                    value={editingOpening.description}
                                    onChange={handleEditDescriptionChange}
                                    placeholder="Describe the job role and requirements..."
                                    modules={quillModules}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="co_years_of_experience">
                            <Form.Label>Years of experience</Form.Label>
                            <Form.Control
                                type='number'
                                name="co_years_of_experience"
                                value={editingOpening.co_years_of_experience}
                                onChange={handleEditChange}
                                placeholder="Enter years of experience"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="location">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                name="location"
                                placeholder="e.g., Dublin, Ireland"
                                value={editingOpening.location}
                                onChange={handleEditChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="logo" className="mb-3">
                            <Form.Label>Logo (optional)</Form.Label>
                            <Form.Control
                                type="file"
                                name="logo"
                                onChange={handleEditChange}
                                accept="image/*"
                            />

                            {editingOpening.logo && (
                                <img
                                    src={
                                        editingOpening.logo instanceof File
                                            ? URL.createObjectURL(editingOpening.logo)
                                            : editingOpening.logo
                                    }
                                    alt="logo"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        marginTop: "10px",
                                    }}
                                />
                            )}
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleEditClose}>
                            Close
                        </Button>
                        <Button type="submit" className={addButton}>
                            Update Opening
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            {/* Model Confirm Delete */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete{" "}
                    <strong>{selectedOpening?.name}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Yes, Delete
                    </Button>
                </Modal.Footer>
            </Modal>

        </motion.div>
    );
}