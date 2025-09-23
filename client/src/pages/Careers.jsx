import { useTheme } from '@emotion/react';
import { Container, Row, Col, Card, Button, Badge, Modal, Form } from 'react-bootstrap';
import { keyframes } from '@emotion/react';
import { css as emotionClass, css } from '@emotion/css';
import { FaLaptopHouse, FaChartLine, FaMoneyBillWave, FaUsers, FaBriefcase, FaMapMarkerAlt, FaSuitcase, FaClipboardCheck, FaPassport, FaPlane, FaUserMd, FaFileAlt, FaHandshake, FaCheckCircle, FaShieldAlt, FaStar, FaHeart, FaGlobe } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect, use } from 'react';
import {
  ButtonOne,
  ButtonTwo,
  ButtonThree,
  ButtonFour,
  ButtonFive,
  Buttonsix
} from '../components/AnimatedButton';
import banner2 from '../assets/contact4.jpg';
import carrers_image from '../assets/images/carrers.jpg';
import for_job_asseekers from '../assets/images/for_job_ass_edit.jpg';
import axios from "axios";
import { toast } from "react-toastify";



const sectionTitle = css`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2.2rem;
  text-align: center;
  background: linear-gradient(135deg, #0076FF 0%, #1CA638 50%, #FFC72C 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 2px 8px rgba(0, 118, 255, 0.15));
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;
const sectionContent = css`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 2.2rem;
  text-align: center;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background: #000;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 2px 8px rgba(0, 118, 255, 0.15));
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;
const benefitCard = css`
  background: #f8fafc;
  border-radius: 1.2rem;
  box-shadow: 0 2px 8px #0001;
  padding: 1.2rem 1rem;
  text-align: center;
  font-weight: 500;
  color: #0076FF;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 
    transform 0.22s cubic-bezier(.4,2,.6,1),
    box-shadow 0.22s cubic-bezier(.4,2,.6,1);
  will-change: transform, box-shadow;
  &:hover {
    transform: scale(1.045) translateY(-4px);
    box-shadow: 0 8px 32px #1CA63833;
    z-index: 2;
  }
`;
const benefitIcon = emotionClass`
  font-size: 1.7rem;
  margin-bottom: 0.5rem;
  color: #1CA638;
`;
const jobCard = emotionClass`
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 4px 24px #0002;
  border: none;
  padding: 2rem 1.2rem 1.5rem 1.2rem;
  margin-bottom: 2rem;
  position: relative;
  transition: box-shadow 0.2s, transform 0.2s;
  &:hover {
    box-shadow: 0 8px 32px #0076ff22;
    transform: translateY(-4px) scale(1.03);
  }
`;
const jobBadge = emotionClass`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  background: #FFC72C;
  color: #fff;
  font-size: 0.95rem;
  border-radius: 1rem;
  padding: 0.2rem 0.9rem;
  font-weight: 600;
`;
const galleryImg = emotionClass`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 0.8rem;
  box-shadow: 0 2px 8px #0076ff11;
`;
const sectionDivider = emotionClass`
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #e0e7ff 0%, #fff 100%);
  opacity: 0.5;
  margin: 3rem 0 2.5rem 0;
  border-radius: 1px;
`;

// Add a style for equal-height cards
const equalHeightCard = emotionClass`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 240px;
`;

const modernButton = emotionClass`
  border-radius: 2rem;
  padding: 0.7rem 2.2rem;
  font-weight: 600;
  font-size: 1.08rem;
  background: #fff;
  color: #0076FF !important;
  border: 2.5px solid #0076FF;
  box-shadow: 0 2px 12px #0076ff11;
  transition: all 0.22s cubic-bezier(.4,2,.6,1);
  position: relative;
  overflow: hidden;
  z-index: 1;
  &:hover {
    color: #fff !important;
    background: linear-gradient(90deg, #0076FF 0%, #1CA638 100%);
    border-color: #1CA638;
    box-shadow: 0 6px 24px #1CA63833;
    transform: scale(1.045) translateY(-2px);
  }
  &::after {
    content: '';
    position: absolute;
    left: 0; top: 0; right: 0; bottom: 0;
    border-radius: 2rem;
    border: 2.5px solid transparent;
    background: linear-gradient(90deg, #0076FF 0%, #1CA638 100%);
    opacity: 0;
    z-index: 0;
    pointer-events: none;
    transition: opacity 0.22s;
  }
  &:hover::after {
    opacity: 0.18;
  }
`;

const gallery = [
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
];

// Add a class for nursing step card hover effect
const nursingStepCard = emotionClass`
  transition: box-shadow 0.2s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80px;
  height: 100%;
  padding: 1.2rem 1rem;
  border-radius: 16px;
  font-weight: 500;
  color: #0076FF;
  box-shadow: 0 2px 12px #0076ff11;
  text-align: center;
  font-size: 1.05rem;
  line-height: 1.4;
  word-break: break-word;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    font-size: 0.98rem;
    padding: 1rem 0.7rem;
    min-height: 60px;
  }
  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 0.7rem 0.4rem;
    min-height: 44px;
    line-height: 1.2;
    word-break: break-word;
    flex-wrap: wrap;
  }
`;

const careersHero = emotionClass`
  background: linear-gradient(135deg, #f8faff 0%, #e6f0ff 100%);
  border-radius: 2rem;
  // padding: 2rem 1rem;
  margin: 2rem 0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #0076FF 0%, #1CA638 50%, #FFC72C 100%);
    border-radius: 2rem 2rem 0 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(0, 118, 255, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    z-index: 0;
  }
`;
const careersHero1 = emotionClass`
  background: linear-gradient(135deg, #f8faff 0%, #e6f0ff 100%);
  border-radius: 2rem;
  // padding: 2rem 1rem;
  margin: 2rem 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #0076FF 0%, #1CA638 50%, #FFC72C 100%);
    border-radius: 2rem 2rem 0 0;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #0076FF 0%, #1CA638 50%, #FFC72C 100%);
    border-radius: 0 0 2rem 2rem;
    z-index: 1;
  }

  // existing radial overlay
  .&:global(&)::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(0, 118, 255, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    z-index: 0;
  }
`;


const careersTitle = emotionClass`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  position: relative;
  z-index: 1;
  background: linear-gradient(135deg, #0076FF 0%, #1CA638 50%, #FFC72C 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 2px 8px rgba(0, 118, 255, 0.15));
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

const careersSubtitle = emotionClass`
  font-size: 1.3rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
  color: #0F766E;
  font-family: 'Georgia', serif;
  font-style: italic;
  letter-spacing: 0.03em;
  line-height: 1.6;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%);
  border-radius: 1rem;
  border: 1px solid rgba(0, 118, 255, 0.08);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  backdrop-filter: blur(10px);
  
  &::before {
    content: '"';
    position: absolute;
    top: -0.5rem;
    left: 1rem;
    font-size: 3rem;
    color: #0076FF;
    font-family: 'Georgia', serif;
    opacity: 0.6;
    line-height: 1;
  }
  
  &::after {
    content: '"';
    position: absolute;
    bottom: -1rem;
    right: 1rem;
    font-size: 3rem;
    color: #1CA638;
    font-family: 'Georgia', serif;
    opacity: 0.6;
    line-height: 1;
  }
  @media (max-width: 768px) {
    font-size: 1.05rem;
    padding: 1.2rem 1.2rem;
  }
  @media (max-width: 480px) {
    font-size: 0.98rem;
    padding: 1rem 1rem;
  }
`;

const careersContent = emotionClass`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const contentBlock = emotionClass`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 2%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 118, 255, 0.1);
  transition: all 0.3s ease;
  
  // &:hover {
  //   transform: translateY(-4px);
  //   box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  //   border-color: rgba(0, 118, 255, 0.2);
  // }
`;

const blockTitle = emotionClass`
  color: #0076FF;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const blockContent = emotionClass`
  color: #555;
  font-size: 1.2rem;
  padding-bottom: 2rem;
  line-height: 1.6;
  text-align: justify;
  margin: 0;
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  @media (max-width: 480px) {
    font-size: 0.92rem;
  }
`;

const mainIntroContent = emotionClass`
  color: #1a202c;
  font-size: clamp(0.95rem, 1vw + 0.8rem, 1.15rem); /* smaller than before */
  line-height: 1.75;
  margin: 0 auto;
  text-align: center;
  width: 100%;
  padding: clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 6vw, 4rem);

  background: linear-gradient(180deg, #ffffff 0%, #f9fbfd 100%, #f1f5f9 100%);
  position: relative;
  overflow: hidden;
  border-radius: 0; 
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: inset 0 -2px 6px rgba(0,0,0,0.04);

  font-weight: 400;
  letter-spacing: 0.015em;

  /* Decorative gradient bar at the top */
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6, #06b6d4, #10b981);
  }

  /* Subtle background circles for styling */
  &:after {
    content: "";
    position: absolute;
    bottom: -50px;
    right: -50px;
    width: 180px;
    height: 180px;
    // background: radial-gradient(circle, rgba(59,130,246,0.08), transparent 70%);
    border-radius: 50%;
    z-index: 0;
  }

  /* text on top of decoration elements */
  p {
    position: relative;
    z-index: 1;
  }
`;

const mainIntroContent1 = emotionClass`
  color: #1a202c;
  font-size: clamp(0.95rem, 1vw + 0.8rem, 1.15rem);
  line-height: 1.75;
  gap: 2%;
  margin: 0 auto;
  text-align: center;
  width: 100%;
  padding: clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 6vw, 4rem);
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #ffffff 0%, #f9fbfd 100%, #f1f5f9 100%);
  position: relative;
  overflow: hidden;
  border-radius: 0; 
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: inset 0 -2px 6px rgba(0,0,0,0.04);

  font-weight: 400;
  letter-spacing: 0.015em;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6, #06b6d4, #10b981);
  }

  &:after {
    content: "";
    position: absolute;
    bottom: -50px;
    right: -50px;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    z-index: 0;
  }

  p {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 1200px) {
    flex-direction: column !important;
    justify-content: center;
    gap: 3rem;
  }
`;


const highlightText = emotionClass`
  color: #1CA638;
  font-weight: 600;
`;

const statsSection = emotionClass`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const statItem = emotionClass`
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 0.8rem;
  padding: 1rem 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 118, 255, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const statNumber = emotionClass`
  color: #0076FF;
  font-size: 1.5rem;
  font-weight: 700;
  display: block;
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
  @media (max-width: 480px) {
    font-size: 1.15rem;
  }
`;

const statLabel = emotionClass`
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
`;

// Styles for the conditional content box
const categoryContentBox = emotionClass`
  margin-top: 2rem;
  padding: 1.8rem 2rem;
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(255, 255, 255, 0.95) 100%);
  border-radius: 1rem;
  border: 1px solid rgba(0, 118, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(8px);
`;

const categoryContentText = emotionClass`
  font-size: 1.05rem;
  color: #334155;
  line-height: 1.7;
`;

// Counter component for animated numbers
const AnimatedCounter = ({ target, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.querySelector('.stats-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = target * easeOutQuart;

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  return (
    <span className={statNumber}>
      {Math.floor(count)}{suffix}
    </span>
  );
};

const draftMessage = emotionClass`
  background: linear-gradient(135deg, #f8faff 0%, #eef4ff 100%);
  border-radius: 1.5rem;
  padding: 4rem 2rem;
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(0, 118, 255, 0.08);
`;

const draftTitle = emotionClass`
  font-size: 2.5rem;
  font-weight: 800;
  color: #1a202c;
  margin-bottom: 1rem;
  line-height: 1.2;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const draftSubtitle = emotionClass`
  font-size: 1.1rem;
  color: #4a5568;
  line-height: 1.6;
  max-width: 500px;
  margin: 0 auto 1.5rem auto;
  @media (min-width: 768px) {
    margin: 0;
    max-width: 100%;
  }
`;

export default function Careers() {
  const theme = useTheme();
  const [activeCategory, setActiveCategory] = useState('healthcare');
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applying, setApplying] = useState(false);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    contact_number: '',
    message: '',
    resume: null,
  });

  const handleShowModal = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
    setApplicationData({ name: '', email: '', contact_number: '', message: '', resume: null });
  };

  const handleApplicationChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setApplicationData((prev) => ({ ...prev, resume: files[0] }));
    } else if (name === "name") {

      const regex = /^[A-Za-z\s]*$/;
      if (regex.test(value)) {
        setApplicationData((prev) => ({ ...prev, name: value }));
      }
    }
    else if (name === "email") {

      setApplicationData((prev) => ({ ...prev, email: value }));
    }
    else if (name === "contact_number") {

      const regex = /^[0-9]{0,10}$/;
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
    if (!/^[A-Za-z\s]+$/.test(applicationData.name)) {
      toast.warning("Name should contain alphabets only");
      return;
    }

    // Email check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(applicationData.email)) {
      toast.warning("Enter a valid email address");
      return;
    }

    // Contact number check
    if (!/^\d{10}$/.test(applicationData.contact_number)) {
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

    try {
      const response = await axios.post('http://localhost:5000/api/v1/job-seeker/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success('Application submitted successfully!');
        handleCloseModal();
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
  const [jobs, setJobs] = useState([]);

  function useDeviceType() {
    const [device, setDevice] = useState('desktop');

    useEffect(() => {
      function checkDevice() {
        const width = window.innerWidth;
        if (width <= 767) {
          setDevice('mobile');
        } else if (width <= 1024) {
          setDevice('tablet');
        } else {
          setDevice('laptop');
        }
      }
      checkDevice();

      window.addEventListener('resize', checkDevice);
      return () => window.removeEventListener('resize', checkDevice);
    }, []);

    return device;
  }
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

  const device = useDeviceType();

  const imageContainerStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: '400px',
    aspectRatio: '8 / 7',
    margin: '0 auto',
    borderRadius: '24px',
    overflow: 'hidden',
    // boxShadow: '0 25px 80px rgba(0, 0, 0, 0.12)',
    background: 'linear-gradient(145deg, #ffffff 0%, #f8faff 100%)',
    border: '1px solid rgba(255, 255, 255, 0.8)',
    transform: 'perspective(1000px) rotateY(-5deg)',
    transformStyle: 'preserve-3d'

  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0.2, 0.2, 1] } }
  };
  const stagger = {
    visible: { transition: { staggerChildren: 0.18 } }
  };
  // Quick, smooth variants for scroll-in reveal (re-trigger on scroll)
  const fadeUpQuick = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };
  const staggerQuick = {
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } }
  };
  // Job seeker services
  const seekerServices = [
    { icon: <FaSuitcase color={theme.colors.primary} size={28} />, title: 'Overseas Job Matching', desc: 'Find jobs that suit your skills, experience, and aspirations. Presently, we cater only to Ireland.' },
    { icon: <FaClipboardCheck color={theme.colors.accent} size={28} />, title: 'Resume & Interview Prep', desc: 'Guidance to help you stand out in the global job market.' },
    { icon: <FaPassport color={theme.colors.secondary} size={28} />, title: 'Visa Process Assistance', desc: 'Support with paperwork and legal compliance.' },
    { icon: <FaPlane color={theme.colors.primary} size={28} />, title: 'Post-Placement Support', desc: 'Help with relocation and settlement in your destination country.' },
  ];
  // Core values
  const coreValues = [
    { icon: <FaStar color={theme.colors.primary} size={24} />, title: 'Expertise', desc: 'With our in-depth knowledge of the Irish healthcare industry, we deliver expert guidance and solutions to our clients.' },
    { icon: <FaCheckCircle color={theme.colors.accent} size={24} />, title: 'Integrity', desc: 'We uphold the highest ethical standards in all our interactions, ensuring transparency and trust with our clients and candidates.' },
    { icon: <FaHandshake color={theme.colors.secondary} size={24} />, title: 'Collaboration', desc: 'We believe in fostering collaborative relationships with our clients, working closely with them to understand their needs and delivering tailored solutions.' },
    { icon: <FaShieldAlt color={theme.colors.primary} size={24} />, title: 'Compliance', desc: 'We are committed to ensuring compliance with local regulations and industry standards, helping our clients mitigate risks and achieve business objectives.' },
  ];
  // Nursing career stepper
  const nursingSteps = [
    'NMBI registration',
    'IELTS or OET training and test preparations',
    'Clinical adaptation test and registration',
    'Visa and immigration support',
    'Preparation for interview',
    'Relocation logistics',
    'Cultural orientation post relocation',
    'Family reunification for dependent',
    'Community integration',
    'Initial accommodation assistance and support',
  ];
  // Dummy job postings
  const jobs1 = [
    { title: 'title: Content will be added', location: 'location: Content will be added', type: 'type: Content will be added', desc: 'description: Content will be added' },
    { title: 'title: Content will be added', location: 'location: Content will be added', type: 'type: Content will be added', desc: 'description: Content will be added' },
    { title: 'title: Content will be added', location: 'location: Content will be added', type: 'type: Content will be added', desc: 'description: Content will be added' },

  ];
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    current_place_of_stay: "",
    preferred_country_to_apply: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData, "onSubmit={handleSubmit}")

    if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      toast.error("Name must contain only letters and spaces");
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(formData.position)) {
      toast.error("Position must contain only letters and spaces");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/job-applications/apply",
        formData
      );

      console.log(response, "response")

      if (response?.data.success) {
        toast.success(response?.data?.message);
        console.log("Server response:", response.data);
        setFormData({
          name: "",
          position: "",
          current_place_of_stay: "",
          preferred_country_to_apply: ""
        });
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
    }
  };
  return (
    <Container >
      {/* Draft Message */}
      {/* <motion.div
        className={draftMessage}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}
        variants={fadeUpQuick}
      >
        <Row className="align-items-center justify-content-center">
          <Col md={5} lg={4} className="mb-4 mb-md-0">
            <motion.img
              src={carrers_image}
              alt="Join the Eirecruit team"
              style={{
                width: '100%',
                borderRadius: '1.25rem',
                boxShadow: '0 20px 40px -10px rgba(0, 118, 255, 0.25)',
              }}
              whileHover={{ scale: 1.05, y: -8 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          </Col>
          <Col md={6} lg={7} className="text-center text-md-start ps-md-4">
            <h2 className={draftTitle}>Careers</h2>
            <p className={draftSubtitle}>
              We are currently curating exciting career opportunities. Please check back soon to discover how you can grow with us and make an impact in the healthcare industry.
            </p>
          </Col>
        </Row>
      </motion.div> */}


      {/* Careers Summary */}
      <motion.section className={careersHero} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }} variants={fadeUpQuick} style={{ position: 'relative' }}>

        <Container style={{ padding: '2rem 1rem', position: 'relative', zIndex: 2 }}>
          {/* Existing Content - Unchanged */}
          <motion.h1 className={careersTitle} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }} variants={fadeUpQuick}>
            Careers
          </motion.h1>

          <motion.p className={careersSubtitle} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }} variants={fadeUpQuick}>
            &ldquo;Connecting Global Talent with World-Class Opportunities.&rdquo;
          </motion.p>


          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}
            // className={careersHero1}
            variants={fadeUpQuick}
            style={{
              position: 'relative',
              // margin: '4rem 0',
              overflow: 'hidden',
            }}
          >
            {/* Background Pattern */}
            {/* <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '1.5rem',
              opacity: 0.05,
              zIndex: 0
            }} /> */}

            {/* Main Content Container */}
            <Container style={{ position: 'relative', zIndex: 2 }}>
              <Row className="g-0" style={{ flexDirection: 'row-reverse' }}>
                {/* Left Side - Image with Modern Card Design */}
                <Col lg={5} md={12} className="mb-4 mb-lg-0">
                  <motion.div
                    style={{
                      position: 'relative',
                      height: '100%',
                      minHeight: device === 'mobile' ? 'auto' : '400px',
                      marginTop: device === 'mobile' ? '5%' : '0%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    variants={fadeUpQuick}
                  >
                    <motion.div
                      style={imageContainerStyle}
                      whileHover={{
                        transform: 'perspective(1000px) rotateY(-2deg) scale(1.02)',
                        // boxShadow: '0 35px 100px rgba(0, 0, 0, 0.2)'
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        duration: 0.6
                      }}
                    >
                      <motion.img
                        src={carrers_image}
                        alt="Healthcare Team"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center'
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </Col>

                {/* Right Side - Content with Modern Typography */}
                <Col lg={7} md={12}>
                  <motion.div
                    style={{
                      padding: device === 'mobile' ?
                        '0rem 0rem 0rem 0rem'
                        : '3rem 2rem 3rem 1.5rem',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      textAlign: 'center',
                      alignItems: 'center',
                    }}
                    variants={fadeUpQuick}
                  >
                    {/* Description */}
                    <motion.p
                      style={{
                        fontSize: '1.3rem',
                        color: '#4a5568',
                        lineHeight: 1.7,
                        marginBottom: '2.5rem',
                        textAlign: 'center',
                        fontWeight: 400
                      }}
                      variants={fadeUpQuick}
                    >
                      As a leading recruitment agency, we believe that great talent is the foundation of every success story. We specialise in connecting skilled healthcare professionals with hospitals, clinics, and care facilities worldwide.

                    </motion.p>

                  </motion.div>
                </Col>
              </Row>
            </Container>
          </motion.div>



          {/* Enhanced Job Opportunities Introduction - Modern Layout */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}
            variants={fadeUpQuick}
            style={{
              position: 'relative',
              // margin: '4rem 0',
              marginTop: '2rem',
              marginBottom: '2rem',
              overflow: 'hidden'
            }}
          >
            {/* Background Pattern */}
            {/* <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '1.5rem',
              opacity: 0.05,
              zIndex: 0
            }} /> */}

            {/* Main Content Container */}
            <Container style={{ position: 'relative', zIndex: 2 }}>
              <Row className="g-0" >
                {/* Left Side - Image with Modern Card Design */}
                <Col lg={5} md={12} className="mb-4 mb-lg-0">
                  <motion.div
                    style={{
                      position: 'relative',
                      height: '100%',
                      minHeight: device === 'mobile' ? 'auto' : '400px',
                      marginTop: device === 'mobile' ? '5%' : '0%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    variants={fadeUpQuick}
                  >
                    <motion.div
                      style={imageContainerStyle}
                      whileHover={{
                        transform: 'perspective(1000px) rotateY(-2deg) scale(1.02)',
                        // boxShadow: '0 35px 100px rgba(0, 0, 0, 0.2)'
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        duration: 0.6
                      }}
                    >
                      <motion.img
                        src={for_job_asseekers}
                        alt="Healthcare Team"
                        style={{
                          width: '100%',
                          height: '100%',
                          // objectFit: 'cover',
                          objectFit: 'fill',
                          objectPosition: 'center'
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </Col>

                {/* Right Side - Content with Modern Typography */}
                <Col lg={7} md={12}>
                  <motion.div
                    style={{
                      padding: device === 'mobile'
                        ? '0rem 2rem 3rem 0.5rem'
                        : '3rem 2rem 3rem 0.5rem',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}
                    variants={fadeUpQuick}
                  >
                    {/* Main Title */}
                    <motion.h3
                      style={{
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        marginBottom: '1.5rem',
                        lineHeight: 1.2,
                        color: '#1a202c',
                        position: 'relative'
                      }}
                      variants={fadeUpQuick}
                    >
                      For Job Assistance
                      <span style={{
                        position: 'absolute',
                        bottom: '-8px',
                        left: 0,
                        width: '60px',
                        height: '4px',
                        background: 'linear-gradient(135deg, #0076FF 0%, #1CA638 100%)',
                        borderRadius: '2px'
                      }} />
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                      style={{
                        fontSize: '1rem',
                        color: '#4a5568',
                        lineHeight: 1.7,
                        marginBottom: '2.5rem',
                        fontWeight: 400
                      }}
                      variants={fadeUpQuick}
                    >
                      Eirecruit, a trusted healthcare recruitment agency, is now hiring nurses and medical professionals for top hospitals and healthcare facilities in Ireland.
                    </motion.p>

                    <motion.div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '1rem',
                        marginTop: '2rem',
                        alignItems: 'stretch',
                        justifyItems: 'stretch',
                        gridAutoRows: '1fr'
                      }}
                      variants={staggerQuick}
                    >
                      <motion.div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          background: 'linear-gradient(135deg, rgba(28, 166, 56, 0.1) 0%, rgba(28, 166, 56, 0.05) 100%)',
                          padding: '16px 20px',
                          borderRadius: '16px',
                          border: '1px solid rgba(28, 166, 56, 0.2)',
                          boxShadow: '0 4px 20px rgba(28, 166, 56, 0.1)',
                          transition: 'all 0.3s ease',
                          height: '100%',
                          willChange: 'transform',
                          cursor: 'pointer',
                          transform: 'translateZ(0)'
                        }}
                        variants={fadeUpQuick}
                        whileHover={{
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 30px rgba(28, 166, 56, 0.2)',
                          borderColor: 'rgba(28, 166, 56, 0.4)'
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                        onClick={() => {
                          document.getElementById('healthcare_professionals').scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '12px',
                          background: 'linear-gradient(135deg, #1CA638 0%, #16a34a 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 15px rgba(28, 166, 56, 0.3)'
                        }}>
                          <FaUserMd style={{ color: 'white', fontSize: '1.1rem' }} />
                        </div>
                        <span style={{
                          color: '#1a202c',
                          fontWeight: 600,
                          fontSize: '1rem'
                        }}>Healthcare Professionals</span>
                      </motion.div>

                      <motion.div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          background: 'linear-gradient(135deg, rgba(255, 199, 44, 0.1) 0%, rgba(255, 199, 44, 0.05) 100%)',
                          padding: '16px 10px',
                          borderRadius: '16px',
                          border: '1px solid rgba(255, 199, 44, 0.2)',
                          boxShadow: '0 4px 20px rgba(255, 199, 44, 0.1)',
                          transition: 'all 0.3s ease',
                          height: '100%',
                          willChange: 'transform',
                          cursor: 'pointer',
                          transform: 'translateZ(0)'
                        }}
                        variants={fadeUpQuick}
                        whileHover={{
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 30px rgba(255, 199, 44, 0.2)',
                          borderColor: 'rgba(255, 199, 44, 0.4)'
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                        onClick={() => {
                          document.getElementById('software_professionals').scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '12px',
                          background: 'linear-gradient(135deg, #FFC72C 0%, #f59e0b 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 15px rgba(255, 199, 44, 0.3)'
                        }}>
                          <FaHeart style={{ color: 'white', fontSize: '1.1rem' }} />
                        </div>
                        <span style={{
                          color: '#1a202c',
                          fontWeight: 600,
                          fontSize: '1rem'
                        }}>Software Professionals</span>
                      </motion.div>

                      <motion.div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          background: 'linear-gradient(135deg, rgba(0, 118, 255, 0.1) 0%, rgba(0, 118, 255, 0.05) 100%)',
                          padding: '16px 20px',
                          borderRadius: '16px',
                          border: '1px solid rgba(0, 118, 255, 0.2)',
                          boxShadow: '0 4px 20px rgba(0, 118, 255, 0.1)',
                          transition: 'all 0.3s ease',
                          height: '100%',
                          willChange: 'transform',
                          cursor: 'pointer',
                          transform: 'translateZ(0)'
                        }}
                        variants={fadeUpQuick}
                        whileHover={{
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 30px rgba(0, 118, 255, 0.2)',
                          borderColor: 'rgba(0, 118, 255, 0.4)'
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                        onClick={() => {
                          document.getElementById('other_professionals').scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '12px',
                          background: 'linear-gradient(135deg, #0076FF 0%, #0056b3 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 15px rgba(0, 118, 255, 0.3)'
                        }}>
                          <FaMapMarkerAlt style={{ color: 'white', fontSize: '1.1rem' }} />
                        </div>
                        <span style={{
                          color: '#1a202c',
                          fontWeight: 600,
                          fontSize: '1rem'
                        }}>Other Professionals</span>
                      </motion.div>
                    </motion.div>

                  </motion.div>
                </Col>
              </Row>
            </Container>

            {/* Decorative Background Elements */}
            <motion.div
              style={{
                position: 'absolute',
                top: '10%',
                right: '5%',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(0, 118, 255, 0.08) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: 1
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              style={{
                position: 'absolute',
                bottom: '15%',
                left: '3%',
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, rgba(28, 166, 56, 0.08) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: 1
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>



          <motion.h2 id="healthcare_professionals" style={{ scrollMarginTop: '90px', marginBottom: '0px' }} className={sectionTitle} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }} variants={fadeUpQuick}>Healthcare Professionals</motion.h2>

          <motion.div className={careersContent} variants={staggerQuick}>
            {/* <motion.div className={contentBlock} >
              <div className={blockTitle}>
                <FaUsers style={{ color: '#0076FF' }} />
                Leading Recruitment Agency
              </div>
              <p className={blockContent}>
                As a leading recruitment agency, we believe that great talent is the foundation of every success story. We specialise in connecting skilled healthcare professionals with hospitals, clinics, and care facilities worldwide.
              </p>
            </motion.div> */}
            {/* <motion.div className={contentBlock} >
              <div className={blockTitle}>
                <FaHeart style={{ color: '#1CA638' }} />
                Nursing Career in Ireland
              </div>
              <p className={blockContent}>
                For those considering a nursing career in Ireland, it promises excitement and fulfilment. There are various nursing roles and career pathways to explore. To make informed decisions about pursuing a nursing career, it's essential to understand the diverse responsibilities that come with the profession.
              </p>
            </motion.div>
            <motion.div className={contentBlock} >
              <div className={blockTitle}>
                <FaGlobe style={{ color: '#FFC72C' }} />
                Ireland's Developed Economy
              </div>
              <p className={blockContent}>
                Ireland's developed economy presents lucrative career opportunities for professionals, strengthening all sectors and ensuring comfortable living for families. The country is known for its natural beauty, rich cultural heritage, and vibrant cities.
              </p>
            </motion.div>
            <motion.div className={contentBlock} >
              <div className={blockTitle}>
                <FaHandshake style={{ color: '#0076FF' }} />
                Mutual Benefits
              </div>
              <p className={blockContent}>
                The symbiotic connection between Ireland and professionals seeking nursing careers has resulted in mutual benefits and thriving careers.
              </p>
            </motion.div> */}
            {/* <motion.div
              className={contentBlock}

              style={{ gridColumn: '1 / -1' }}
            >
              <p className={blockContent} style={{ width: '100%', textAlign: 'justify' }}>
                For those considering a nursing career in Ireland, it promises excitement and fulfilment. There are various nursing roles and career pathways to explore. To make informed decisions about pursuing a nursing career, it's essential to understand the diverse responsibilities that come with the profession. </p>
              <p className={blockContent} style={{ width: '100%', textAlign: 'justify' }}>Ireland's developed economy presents lucrative career opportunities for professionals, strengthening all sectors and ensuring comfortable living for families. The country is known for its natural beauty, rich cultural heritage, and vibrant cities. The symbiotic connection between Ireland and professionals seeking nursing careers has resulted in mutual benefits and thriving careers.</p>
            <p className={blockContent} style={{ width: '100%', textAlign: 'justify' }}>
                Are you an experienced nurse or qualified doctor looking for better career opportunities, international exposure, and rewarding work environments?
              </p>
            </motion.div> */}

            {/* <motion.div
              className={contentBlock}
              style={{ gridColumn: '1 / -1' }}
            >
              <p className={blockContent} style={{ width: '100%', textAlign: 'center' }}>
                Are you an experienced nurse or qualified doctor looking for better career opportunities, international exposure, and rewarding work environments?
              </p>
            </motion.div> */}

          </motion.div>
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }} variants={fadeUpQuick} style={{ position: 'relative', marginTop: '2rem' }}>
            <motion.div
              className={contentBlock}
              style={{ gridColumn: '1 / -1', marginBottom: '3%', background: 'transparent', boxShadow: 'none', border: 'none' }}
            >
              <p className={blockContent} style={{ width: '100%', textAlign: 'justify' }}>
                For those considering a nursing career in Ireland, it promises excitement and fulfilment. There are various nursing roles and career pathways to explore. To make informed decisions about pursuing a nursing career, it's essential to understand the diverse responsibilities that come with the profession. </p>
              <p className={blockContent} style={{ width: '100%', textAlign: 'justify' }}>Ireland's developed economy presents lucrative career opportunities for professionals, strengthening all sectors and ensuring comfortable living for families. The country is known for its natural beauty, rich cultural heritage, and vibrant cities. The symbiotic connection between Ireland and professionals seeking nursing careers has resulted in mutual benefits and thriving careers.</p>
              <p className={blockContent} style={{ width: '100%', textAlign: 'justify', background: 'transparent', boxShadow: 'none', border: 'none' }}>
                Are you an experienced nurse or qualified doctor looking for better career opportunities, international exposure, and rewarding work environments?
              </p>
            </motion.div>
            {/* <motion.div
              className={contentBlock}
              style={{ gridColumn: '1 / -1',background: 'transparent', boxShadow: 'none',border: 'none' }}
            >
              <p className={blockContent} style={{ width: '100%', textAlign: 'justify',background: 'transparent', boxShadow: 'none',border: 'none' }}>
                Are you an experienced nurse or qualified doctor looking for better career opportunities, international exposure, and rewarding work environments?
              </p>
            </motion.div> */}

          </motion.section>



          <motion.div >
            <motion.h2 className={sectionTitle} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }} variants={fadeUpQuick}>Eirecruit support you with employability assistance and relocation to Ireland</motion.h2>
            <motion.div variants={staggerQuick} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }} className="">
              <Row className="g-3 justify-content-center align-items-stretch py-5" >
                {nursingSteps.map((step, i) => (
                  <Col md={6} lg={4} key={i} className="d-flex">
                    <motion.div variants={fadeUpQuick} style={{ width: '100%' }}>
                      <div className={nursingStepCard} style={{ background: i % 2 === 0 ? theme.colors.lightBlue : theme.colors.lightGreen }}>
                        <span style={{ fontWeight: 700, marginRight: 8, fontSize: window.innerWidth <= 480 ? '1rem' : '1.1rem' }}>{i + 1}.</span> {step}
                      </div>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </motion.div>
          </motion.div>

          <motion.h2 id="software_professionals" style={{ scrollMarginTop: '100px' }} className={sectionTitle} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }} variants={fadeUpQuick}>Software Professionals</motion.h2>
          <motion.h2 className={sectionContent} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }} variants={fadeUpQuick}>Content will be added</motion.h2>
          <motion.h2 id="other_professionals" style={{ scrollMarginTop: '90px' }} className={sectionTitle} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }} variants={fadeUpQuick}>Other Professionals</motion.h2>
          <motion.h2 className={sectionContent} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }} variants={fadeUpQuick}>Content will be added</motion.h2>

        </Container>
      </motion.section>

      {/* Nursing Career Stepper */}

      <div id="current_job_opportunities" style={{ scrollMarginTop: '70px' }}></div>
      <motion.div className={sectionDivider} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }} variants={fadeUpQuick} />

      <motion.h2 className={sectionTitle} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }} variants={fadeUpQuick}>Current Job Opportunities</motion.h2>
      <motion.div variants={staggerQuick} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}>
        <Row className="g-4 mb-4 justify-content-center align-items-stretch" style={{ display: 'flex' }}>
          {jobs?.map((job, i) => (
            <Col md={6} key={i} className="d-flex align-items-stretch">
              <motion.div variants={staggerQuick} style={{ width: '100%', display: 'flex' }}>
                <Card className={jobCard + ' ' + equalHeightCard} style={{ background: i % 2 === 0 ? theme.colors.lightBlue : theme.colors.lightGreen, border: `2px solid ${theme.colors.primary}22`, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'stretch' }}>
                  <Card.Body className="d-flex flex-column justify-content-between" style={{ flex: 1, minHeight: 140 }}>
                    <div>
                      <Card.Title style={{ fontWeight: 600, fontSize: '1.13rem', color: theme.colors.primary }}>{job.name}</Card.Title>
                      <div style={{ color: '#888', fontSize: '0.98rem', marginBottom: 8 }}>
                        {job.location}
                      </div>
                      <Card.Text style={{ fontSize: '1.01rem', opacity: 0.92 }} dangerouslySetInnerHTML={{ __html: job.description }} />
                    </div>
                    <div style={{ marginTop: 15, width: '100%' }} onClick={() => handleShowModal(job)}>
                      <ButtonTwo label="Apply Now" />
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </motion.div>
      {/* Application Form */}
      <motion.h2 className={sectionTitle} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }} variants={fadeUpQuick}>Apply for Future Job Postings</motion.h2>
      <motion.div variants={fadeUpQuick} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}>
        <Card className="mb-5" style={{ maxWidth: 600, margin: '0 auto', background: theme.colors.lightBlue, border: `2px solid ${theme.colors.primary}22` }}>
          <Card.Body>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Position</label>
                <input
                  type="text"
                  className="form-control"
                  name="position"
                  placeholder="Position you are applying for"
                  value={formData.position}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Current Place of Stay</label>
                <input
                  type="text"
                  className="form-control"
                  name="current_place_of_stay"
                  placeholder="Your current location"
                  value={formData.current_place_of_stay}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Preferred Country to Apply</label>
                <input
                  type="text"
                  className="form-control"
                  name="preferred_country_to_apply"
                  placeholder="Preferred country"
                  value={formData.preferred_country_to_apply}
                  onChange={handleChange}
                  required
                />
              </div>
              <Buttonsix label="Submit" to="#" type="submit" />
            </form>
          </Card.Body>
        </Card>
      </motion.div>

      {/* Application Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Apply for  {selectedJob?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleApplicationSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Job Title</Form.Label>
                  <Form.Control type="text" value={selectedJob?.name || ''} readOnly />
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
    </Container>
  );
}