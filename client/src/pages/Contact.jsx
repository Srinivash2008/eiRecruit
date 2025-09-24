import { useTheme } from '@emotion/react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { css } from '@emotion/react';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt, FaPaperPlane, FaGlobe } from 'react-icons/fa';
import { Buttonseven, Buttonsix, ButtonTwo } from '../components/AnimatedButton';
import contact1 from '../assets/images/contact5_updated.jpg';
import axios from "axios";
import carrers_image from '../assets/carrers.jpg';
import { toast } from "react-toastify";
import { useState } from 'react';
const sectionTitle = theme => css`
  color: ${theme.colors.primary};
  font-size: 2.3rem;
  font-weight: 700;
  margin-bottom: 2.2rem;
  text-align: center;
  letter-spacing: 0.5px;
  @media (max-width: 768px) {
    font-size: 1.9rem;
  }
  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;
const colorfulInfoCard = theme => css`
  background: linear-gradient(135deg, #0076FF 60%, #1CA638 100%);
  color: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 6px 32px #0076ff33;
  padding: 2.2rem 1.7rem 2rem 1.7rem;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.22s cubic-bezier(.4,2,.6,1), transform 0.22s cubic-bezier(.4,2,.6,1);
  &:hover {
    box-shadow: 0 12px 40px #0076ff44;
    transform: scale(1.045) translateY(-2px);
  }
`;
const infoIcon = css`
  font-size: 1.5rem;
  margin-right: 0.8rem;
  vertical-align: middle;
`;
const colorfulFormCard = theme => css`
  background: linear-gradient(120deg, #f0f7ff 60%, #e6fbe9 100%);
  border-radius: 1.5rem;
  box-shadow: 0 4px 24px #1ca63811;
  border: 2px solid #0076FF22;
  padding: 2.2rem 1.7rem 2rem 1.7rem;
  min-height: 320px;
  position: relative;
  transition: box-shadow 0.22s cubic-bezier(.4,2,.6,1), transform 0.22s cubic-bezier(.4,2,.6,1);
  &:hover {
    box-shadow: 0 12px 40px #1ca63833;
    transform: scale(1.045) translateY(-2px);
  }
`;
const vibrantButton = css`
  border-radius: 2rem;
  padding: 0.7rem 2.2rem;
  font-weight: 700;
  font-size: 1.13rem;
  background: linear-gradient(90deg, #0076FF 0%, #1CA638 100%);
  color: #fff !important;
  border: none;
  box-shadow: 0 4px 24px #0076ff22;
  transition: all 0.22s cubic-bezier(.4,2,.6,1);
  position: relative;
  overflow: hidden;
  z-index: 1;
  &:hover {
    color: #fff !important;
    background: linear-gradient(90deg, #1CA638 0%, #0076FF 100%);
    box-shadow: 0 8px 32px #1CA63833;
    transform: scale(1.045) translateY(-2px);
  }
`;
const decorativeBlob = css`
  position: absolute;
  top: -80px;
  right: -120px;
  width: 320px;
  height: 320px;
  background: radial-gradient(circle at 60% 40%, #0076FF55 0%, #1CA63833 100%);
  filter: blur(60px);
  z-index: 0;
  pointer-events: none;
`;
const connectTitle = css`
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 18px;
  letter-spacing: 0.2px;
  line-height: 1.2;
  @media (max-width: 768px) {
    font-size: 1.15rem;
  }
  @media (max-width: 480px) {
    font-size: 1.05rem;
  }
`;
const glassInfoCard = theme => css`
  background: rgba(0, 118, 255, 0.18);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px 0 rgba(0, 118, 255, 0.18), 0 2px 16px 0 rgba(28, 166, 56, 0.13);
  backdrop-filter: blur(12px);
  border: 1.5px solid rgba(0, 118, 255, 0.22);
  padding: 2.5rem 2rem 2.2rem 2rem;
  min-height: 340px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.22s cubic-bezier(.4,2,.6,1), transform 0.22s cubic-bezier(.4,2,.6,1);
  &:hover {
    box-shadow: 0 16px 48px 0 rgba(0, 118, 255, 0.28), 0 4px 24px 0 rgba(28, 166, 56, 0.18);
    transform: scale(1.045) translateY(-2px);
  }
`;
const glassFormCard = theme => css`
  background: rgba(255, 255, 255, 0.82);
  border-radius: 1.5rem;
  box-shadow: 0 6px 32px #1ca63811;
  border: 2px solid #0076FF22;
  padding: 2.5rem 2rem 2.2rem 2rem;
  min-height: 340px;
  position: relative;
  transition: box-shadow 0.22s cubic-bezier(.4,2,.6,1), transform 0.22s cubic-bezier(.4,2,.6,1);
  &:hover {
    box-shadow: 0 12px 40px 0 #1CA63822;
    transform: translateY(-4px) scale(1.018);
  }
`;
const glassInfoIcon = css`
  font-size: 2.1rem;
  margin-right: 1.1rem;
  vertical-align: middle;
  color: #fff;
  background: linear-gradient(135deg, #0076FF 60%, #1CA638 100%);
  border-radius: 50%;
  padding: 0.45rem;
  box-shadow: 0 2px 8px #0076ff33;
`;

const addressBlock = theme => css`
  font-size: 1rem;
  opacity: 0.95;
  margin-bottom: 1.5rem;
  z-index: 2;
  position: relative;
  color: #1a2a3a;
  background: linear-gradient(135deg, #e6f8ff 60%, #defbe6 100%);
  border-radius: 1rem;
  padding: 1.4rem 1.8rem;
  box-shadow: 0 8px 24px #0076ff22;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  &:hover {
    box-shadow: 0 12px 36px #1ca63844;
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    font-size: 0.94rem;
    padding: 1.2rem 1.4rem;
  }
`;

const addressTitle = css`
  font-weight: 700;
  font-size: 1.22rem;
  margin-bottom: 0.7rem;
  color: #0076ff;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border-left: 5px solid #1ca638;
  padding-left: 12px;
  @media (max-width: 768px) {
    font-size: 1.08rem;
  }
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

// Modern Animation Keyframes
const modernAnimations = css`
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: translateZ(25px) scale(1);
      box-shadow: 0 4px 16px rgba(0, 118, 255, 0.3);
    }
    50% {
      transform: translateZ(25px) scale(1.1);
      box-shadow: 0 6px 24px rgba(0, 118, 255, 0.5);
    }
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-5px);
    }
  }
`;


export default function Contact() {
  const theme = useTheme();
  const fileInputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[a-zA-Z\s]+$/.test(formData.full_name)) {
      toast.error("Name must contain only letters and spaces");
      return;
    }

    if (!/^\d+$/.test(formData.phone_number)) {
      toast.error("Phone number must contain only numbers");
      return;
    }

    setLoading(true);

    try {
      const submitData = new FormData();
      submitData.append("full_name", formData.full_name);
      submitData.append("phone_number", formData.phone_number);
      submitData.append("message", formData.message);

      if (fileInputRef.current.files[0]) {
        submitData.append("attachment", fileInputRef.current.files[0]);
      }



      console.log(submitData, "submitDatacvbnm,")

      const response = await axios.post(
        "http://localhost:5000/api/v1/submit-queries/create",
        submitData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.data.success) {
        toast.success(response?.data?.message);
        setFormData({
          full_name: "",
          phone_number: "",
          message: ""
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error("Error submitting query:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
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
  return (
    <div>
      <Container className="py-5" style={{ position: 'relative', zIndex: 1, maxWidth: '90%' }}>
        <div css={[decorativeBlob, modernAnimations]} />
        {/* <motion.h1 css={sectionTitle(theme)} initial="hidden" animate="visible" variants={fadeUp}>Contact Us</motion.h1> */}
        <motion.div variants={staggerQuick} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}>
          <Row className="g-0  align-items-stretch" style={{ justifyContent: 'space-evenly' }}>
            <Col lg={3} md={12} className="mb-4 mb-lg-0">
              <motion.div variants={fadeUpQuick} style={{ position: 'relative', height: '100%' }}>
                <div
                  style={{
                    background: 'linear-gradient(135deg, #e0f2ff 0%, #e6fbe9 100%)',
                    borderRadius: '1.5rem',
                    boxShadow: '0 4px 24px 0 rgba(0, 118, 255, 0.10)',
                    padding: '2rem 1.5rem 1.8rem 1.5rem',
                    minHeight: 280,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    position: 'relative',
                    overflow: 'hidden',
                    height: '100%',
                    '@media (maxWidth: 768px)': {
                      padding: '1.5rem 1rem 1.3rem 1rem',
                      minHeight: 'auto'
                    }
                  }}
                >
                  {/* Clear Image with Content Overlay */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}
                    variants={fadeUpQuick}
                    whileHover={{
                      y: -8,
                      boxShadow: '0 25px 50px rgba(0, 118, 255, 0.25)'
                    }}
                    style={{
                      width: '100%',
                      height: '320px',
                      borderRadius: '2rem',
                      overflow: 'hidden',
                      boxShadow: '0 15px 35px rgba(0, 118, 255, 0.15)',
                      marginBottom: '2.5rem',
                      position: 'relative',
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      '@media (maxWidth: 768px)': {
                        height: '280px',
                        borderRadius: '1.5rem',
                        marginBottom: '2rem'
                      },
                      '@media (maxWidth: 576px)': {
                        height: '260px',
                        borderRadius: '1.2rem',
                        marginBottom: '1.8rem'
                      }
                    }}
                  >
                    {/* Clear Background Image */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      zIndex: 1
                    }}>
                      <img
                        src={contact1}
                        alt="Contact Eirecruit - Background"
                        style={{
                          width: '100%',
                          height: '100%',
                          // objectFit: 'cover',
                          objectFit: 'fill',
                          // filter: 'brightness(1) contrast(1.1)',
                          transition: 'all 0.5s ease'
                        }}
                      />

                      {/* Light Overlay for Better Text Readability */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        // background: 'linear-gradient(135deg, rgba(0, 118, 255, 0.3) 0%, rgba(28, 166, 56, 0.2) 100%)',
                        borderRadius: '2rem'
                      }} />
                    </div>

                    {/* Simple Content Overlay */}
                    <div style={{
                      position: 'relative',
                      zIndex: 2,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '2rem',
                      textAlign: 'center',
                      '@media (maxWidth: 768px)': {
                        padding: '1.5rem'
                      },
                      '@media (maxWidth: 576px)': {
                        padding: '1rem'
                      }
                    }}>

                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        alignItems: 'center'
                      }}>
                      </div>
                    </div>
                  </motion.div>
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    marginBottom: 16,
                    letterSpacing: 0.2,
                    lineHeight: 1.2,
                    zIndex: 2,
                    background: 'linear-gradient(135deg, #0076FF 0%, #1CA638 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: 'transparent'
                  }}>Let's Connect!</div>
                  <div style={{
                    marginBottom: 22, fontSize: '1.13rem', opacity: 0.98, display: 'flex', alignItems: 'center', zIndex: 2, position: 'relative', color: '#1a2a3a', flexWrap: 'wrap', wordBreak: 'break-all', maxWidth: '100%',
                    // Responsive for mobile
                    ...(window.innerWidth <= 480 ? {
                      fontSize: '0.92rem',
                      marginBottom: 14,
                      lineHeight: 1.15,
                      paddingRight: 0,
                      wordBreak: 'break-all',
                      maxWidth: '98vw',
                    } : {})
                  }}>
                    <FaEnvelope style={{ fontSize: '1.3rem', marginRight: 8, color: '#0076FF', background: '#fff', borderRadius: '50%', padding: 4, boxShadow: '0 2px 8px #0076ff22' }} /> hr@eirecruitconsulting.com
                  </div>
                  <div style={{
                    marginBottom: 22, fontSize: '1.13rem', opacity: 0.98, display: 'flex', alignItems: 'center', zIndex: 2, position: 'relative', color: '#1a2a3a', flexWrap: 'wrap', wordBreak: 'break-all', maxWidth: '100%',
                    ...(window.innerWidth <= 480 ? {
                      fontSize: '0.92rem',
                      marginBottom: 14,
                      lineHeight: 1.15,
                      paddingRight: 0,
                      wordBreak: 'break-all',
                      maxWidth: '98vw',
                    } : {})
                  }}>
                    <FaPhoneAlt style={{ fontSize: '1.3rem', marginRight: 8, color: '#1CA638', background: '#fff', borderRadius: '50%', padding: 4, boxShadow: '0 2px 8px #1ca63822' }} /> +91 8870694685
                  </div>
                  <div style={{ fontSize: '1.04rem', opacity: 0.90, marginBottom: 8, zIndex: 2, position: 'relative', color: '#1a2a3a' }}>
                    We'd love to hear from you! Reach out via email, phone, or the form. Our team will respond promptly.
                  </div>
                  {/* <div style={{ fontSize: '1.04rem', opacity: 0.90, marginBottom: 8, zIndex: 2, position: 'relative', color: '#1a2a3a' }}>
                  Please feel free to call any one of our offices.
                </div> */}
                  <br></br>
                  <div style={{ position: 'absolute', bottom: 10, right: 18, opacity: 0.10, fontSize: 110, pointerEvents: 'none', zIndex: 0 }}>
                    <FaPaperPlane />
                  </div>
                </div>
              </motion.div>
            </Col>
            <Col lg={8} md={12} className="mb-4 mb-lg-0">
              <motion.div variants={fadeUpQuick}>
                <div
                  style={{
                    background: 'linear-gradient(135deg, #f8faff 0%, #f0f7ff 50%, #f8faff 100%)',
                    borderRadius: '1.8rem',
                    boxShadow: '0 8px 32px rgba(0, 118, 255, 0.12), 0 4px 16px rgba(28, 166, 56, 0.08)',
                    border: '2px solid rgba(0, 118, 255, 0.15)',
                    padding: '2.5rem 2rem 2.2rem 2rem',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Decorative elements */}
                  <div style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-20%',
                    width: '200px',
                    height: '200px',
                    background: 'radial-gradient(circle, rgba(0, 118, 255, 0.08) 0%, transparent 70%)',
                    borderRadius: '50%',
                    zIndex: 0,
                    filter: 'blur(2px)'
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: '-30%',
                    left: '-15%',
                    width: '150px',
                    height: '150px',
                    background: 'radial-gradient(circle, rgba(28, 166, 56, 0.06) 0%, transparent 70%)',
                    borderRadius: '50%',
                    zIndex: 0,
                    filter: 'blur(2px)'
                  }} />

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '2rem',
                      paddingBottom: '1rem',
                      borderBottom: '2px solid rgba(0, 118, 255, 0.1)'
                    }}>
                      <div style={{
                        background: 'linear-gradient(135deg, #0076FF 0%, #1CA638 100%)',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '1rem',
                        boxShadow: '0 4px 12px rgba(0, 118, 255, 0.3)'
                      }}>
                        <FaPaperPlane style={{ color: '#fff', fontSize: '1.1rem' }} />
                      </div>
                      <h5 style={{
                        fontWeight: 700,
                        marginBottom: 0,
                        letterSpacing: 0.2,
                        background: 'linear-gradient(135deg, #0076FF 0%, #1CA638 50%, #FFC72C 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        color: 'transparent',
                        filter: 'drop-shadow(0 2px 8px rgba(0, 118, 255, 0.15))'
                      }}>Submit Your Query</h5>
                    </div>

                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group className="mb-3" controlId="contactName">
                            <Form.Label style={{ fontWeight: 600, color: '#2C3E50', marginBottom: '0.5rem' }}>Full Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="full_name"
                              placeholder="Enter your full name"
                              value={formData.full_name}
                              onChange={handleChange}
                              required
                              style={{
                                borderRadius: '0.8rem',
                                border: '1.5px solid rgba(0, 118, 255, 0.2)',
                                padding: '0.8rem 1rem',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                background: 'rgba(255, 255, 255, 0.8)'
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col lg={6} md={12} sm={12}>
                          <Form.Group className="mb-3" controlId="contactPhone">
                            <Form.Label style={{ fontWeight: 600, color: '#2C3E50', marginBottom: '0.5rem' }}>Phone Number</Form.Label>
                            <Form.Control
                              type="tel"
                              name="phone_number"
                              placeholder="Enter your phone number"
                              value={formData.phone_number}
                              onChange={handleChange}
                              required
                              style={{
                                borderRadius: '0.8rem',
                                border: '1.5px solid rgba(0, 118, 255, 0.2)',
                                padding: '0.8rem 1rem',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                background: 'rgba(255, 255, 255, 0.8)'
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3" controlId="contactQuery">
                        <Form.Label style={{ fontWeight: 600, color: '#2C3E50', marginBottom: '0.5rem' }}>Your Message</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          placeholder="Tell us about your query or request for information..."
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          style={{
                            borderRadius: '0.8rem',
                            border: '1.5px solid rgba(0, 118, 255, 0.2)',
                            padding: '1rem',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            background: 'rgba(255, 255, 255, 0.8)',
                            resize: 'none'
                          }}
                        />
                      </Form.Group>

                      <Form.Group className="mb-4" controlId="contactFile">
                        <Form.Label style={{ fontWeight: 600, color: '#2C3E50', marginBottom: '0.5rem' }}>
                          <FaPaperPlane style={{ marginRight: '0.5rem', color: '#0076FF' }} />
                          Attachments (Optional)
                        </Form.Label>
                        <Form.Control
                          type="file"
                          ref={fileInputRef}
                          accept=".pdf,.doc,.docx,.jpg,.jpeg"
                          style={{
                            borderRadius: '0.8rem',
                            border: '1.5px solid rgba(0, 118, 255, 0.2)',
                            padding: '0.6rem 1rem',
                            fontSize: '0.95rem',
                            transition: 'all 0.3s ease',
                            background: 'rgba(255, 255, 255, 0.8)'
                          }}
                        />
                      </Form.Group>

                      <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                        <Buttonseven label="Send Message" to="#" loading={loading} />
                      </div>

                    </Form>
                  </div>
                </div>
              </motion.div>
            </Col>

            {/* <Col lg={3} md={12} className="mb-4 mb-lg-0">
              <motion.div variants={fadeUpQuick} style={{ height: '100%' }}>
                <div
                  style={{
                    background: 'linear-gradient(135deg, #e0f2ff 0%, #e6fbe9 100%)',
                    borderRadius: '1.5rem',
                    boxShadow: '0 4px 24px 0 rgba(0, 118, 255, 0.10)',
                    padding: '2rem 1.5rem',
                    height: '100%',
                  }}
                >
                  <div style={{
                    fontSize: '1.04rem',
                    opacity: 0.90,
                    marginBottom: '1.5rem',
                    position: 'relative',
                    color: '#1a2a3a',
                    fontWeight: 500,
                  }}>
                    Please feel free to call any one of our offices.
                  </div>
                  <div style={{
                    display: 'flex', flexDirection: 'column', gap: '1.5rem',
                  }}>
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(0, 118, 255, 0.08) 0%, rgba(28, 166, 56, 0.05) 100%)',
                      borderRadius: '1.2rem',
                      padding: '1.4rem',
                      border: '1.5px solid rgba(0, 118, 255, 0.15)',
                      boxShadow: '0 4px 20px rgba(0, 118, 255, 0.1)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                      <div style={{ position: 'absolute', top: '0', right: '0', width: '25px', height: '40px', background: 'linear-gradient(135deg, #0076FF 0%, #1CA638 100%)', borderRadius: '0 1.2rem 0 1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.6rem', fontWeight: '600' }}>
                        EU
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ background: 'linear-gradient(135deg, #0076FF 0%, #1CA638 100%)', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.2rem', boxShadow: '0 4px 12px rgba(0, 118, 255, 0.3)' }}>
                          <FaGlobe />
                        </div>
                        <div>
                          <h5 style={{ fontWeight: '700', fontSize: '1.3rem', marginBottom: '0.5rem', background: 'linear-gradient(135deg, #0076FF 0%, #1CA638 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>Europe Office</h5>
                          <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '500' }}>Republic of Ireland</p>
                        </div>
                      </div>
                      <div style={{ background: 'rgba(255, 255, 255, 0.7)', borderRadius: '0.8rem', padding: '1.2rem', border: '1px solid rgba(0, 118, 255, 0.1)' }}>
                        <div style={{ fontWeight: '600', color: '#2C3E50', marginBottom: '0.5rem', fontSize: '1rem' }}>Compuscript Ltd</div>
                        <div style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '0.8rem' }}>
                          Shannon Industrial Estate West,<br />
                          Shannon, Co. Clare,<br />
                          Republic of Ireland
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0076FF', fontWeight: '600', fontSize: '0.9rem' }}>
                            <FaPhoneAlt style={{ fontSize: '0.8rem' }} />
                            +353 61 472818
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1CA638', fontWeight: '600', fontSize: '0.9rem' }}>
                            <FaEnvelope style={{ fontSize: '0.8rem' }} />
                            +353 61 472688
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{
                      background: 'linear-gradient(135deg, rgba(255, 199, 44, 0.08) 0%, rgba(28, 166, 56, 0.05) 100%)',
                      borderRadius: '1.2rem',
                      padding: '1.4rem',
                      border: '1.5px solid rgba(255, 199, 44, 0.15)',
                      boxShadow: '0 4px 20px rgba(255, 199, 44, 0.1)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                      <div style={{ position: 'absolute', top: '0', right: '0', width: '25px', height: '40px', background: 'linear-gradient(135deg, #FFC72C 0%, #1CA638 100%)', borderRadius: '0 1.2rem 0 1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.6rem', fontWeight: '600' }}>
                        IN
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ background: 'linear-gradient(135deg, #FFC72C 0%, #1CA638 100%)', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.2rem', boxShadow: '0 4px 12px rgba(255, 199, 44, 0.3)' }}>
                          <FaGlobe />
                        </div>
                        <div>
                          <h5 style={{ fontWeight: '700', fontSize: '1.3rem', marginBottom: '0.5rem', background: 'linear-gradient(135deg, #FFC72C 0%, #1CA638 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>India Office</h5>
                          <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '500' }}>Chennai, Tamil Nadu</p>
                        </div>
                      </div>
                      <div style={{ background: 'rgba(255, 255, 255, 0.7)', borderRadius: '0.8rem', padding: '1.2rem', border: '1px solid rgba(255, 199, 44, 0.1)' }}>
                        <div style={{ fontWeight: '600', color: '#2C3E50', marginBottom: '0.5rem', fontSize: '1rem' }}>Perfect Digital Media Resources (P) Ltd</div>
                        <div style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '0.8rem' }}>
                          Old No. 196, New No. 307,<br />
                          Poonamallee High Road, Kilpauk,<br />
                          Chennai 600 010, India
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0076FF', fontWeight: '600', fontSize: '0.9rem' }}>
                            <FaPhoneAlt style={{ fontSize: '0.8rem' }} />
                            +91-44-42858389
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1CA638', fontWeight: '600', fontSize: '0.9rem' }}>
                            <FaPhoneAlt style={{ fontSize: '0.8rem' }} />
                            +91-44-26650317
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Col> */}
          </Row>
        </motion.div>
      </Container>
    </div>
  );
} 