import { useTheme } from '@emotion/react';
import { Container, Row, Col, Button, Card, Carousel } from 'react-bootstrap';
import { css as emotionClass } from '@emotion/css';
import { FaUserMd, FaCertificate, FaGlobe, FaUsers, FaStar, FaSearch, FaHeart, FaFileAlt, FaUserTie, FaBriefcase, FaEnvelope } from 'react-icons/fa';
import Team from '../assets/team.png';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HomeButton from '../components/HomeButton';
import Banner1 from '../assets/images/Banner1.jpg';
import Banner2 from '../assets/images/Banner3.jpg';
import Banner3 from '../assets/images/banner5.jpg';
import India from '../assets/flags/india.png';
import Ireland from '../assets/flags/ireland.png';
import Uk from '../assets/flags/uk.png';
import Germany from '../assets/flags/germany.png';




// Modern carousel hero styles
const heroCarousel = emotionClass`
  .carousel,
  .carousel-item {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 100vh;
    min-height: 350px;
    max-height: 90vh;
    overflow: hidden;
  }
  .carousel-item img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    z-index: 0;
    min-height: inherit;
    max-height: inherit;
  }
  .carousel-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.7) 100%);
    z-index: 1;
    pointer-events: none;
  }
  .carousel-caption {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: clamp(1rem, 4vw, 2rem);
    background: none;
    text-align: center;
    /* Removed overflow-y: auto and scroll styles */
  }
  .carousel-content-wrapper {
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    // max-width: 1038px;
    margin: 0 auto;
    padding: clamp(2.5rem, 6vw, 4rem) clamp(0.5rem, 2vw, 1.5rem);
    padding-top: clamp(2.5rem, 8vh, 5rem);
    padding-bottom: clamp(2.5rem, 8vh, 5rem);
  }
  @media (max-width: 1024px) {
    .carousel,
    .carousel-item {
      height: 70vh;
      min-height: 320px;
    }
    /* Hide button container on tablet and smaller */
    .hero-button-container {
      display: none !important;
    }
    .carousel-content-wrapper {
      padding-top: clamp(2rem, 6vh, 3.5rem);
      padding-bottom: clamp(3.5rem, 10vh, 5.5rem); /* Increased bottom padding for gap below buttons */
    }
  }
  @media (max-width: 768px), (max-height: 500px) {
    .carousel,
    .carousel-item {
      height: 60vh;
      min-height: 300px;
    }
    .carousel-caption {
      padding: 1rem;
    }
    .carousel-content-wrapper {
      padding: 0.5rem;
    }
    /* Hide both subtitle and button container on mobile */
    .hero-subtitle,
    .hero-button-container {
      display: none !important;
    }
    .carousel-content-wrapper {
      padding-top: clamp(1.2rem, 4vh, 2rem);
      padding-bottom: clamp(1.2rem, 4vh, 2rem);
    }
  }
  @media (max-width: 509px) {
    .carousel,
    .carousel-item {
      height: auto;
      min-height: 200px;
      max-height: 80vh;
    }
    .carousel-caption {
      padding: 0.5rem;
    }
    .carousel-content-wrapper {
      padding: 0.5rem;
      max-width: 100vw;
    }
    .carousel-content-wrapper {
      padding-top: 0.8rem;
      padding-bottom: 0.8rem;
    }
  }
`;

const heroTitle = emotionClass`
  font-size: clamp(0.8rem, 4vw, 6rem);
  font-weight: 900;
  margin-bottom: clamp(0.2rem, 1vw, 1rem);
  color: white;
  line-height: 1.1;
  text-align: center;
  text-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);
  position: relative;
  letter-spacing: -0.02em;
  @media (max-width: 1200px) {
    font-size: clamp(1.2rem, 5vw, 4.2rem);
  }
  @media (max-width: 768px) {
    font-size: clamp(0.9rem, 4vw, 2.2rem);
    margin-bottom: clamp(0.3rem, 1.5vw, 0.7rem);
    line-height: 1.15;
  }
  @media (max-width: 480px), (max-height: 514px), (max-width: 493px), (max-height: 529px), (max-height: 509px) {
    font-size: clamp(0.9rem, 4vw, 1.3rem);
    margin-bottom: clamp(0.3rem, 1.5vw, 0.4rem);
    line-height: 1.1;
    word-break: break-word;
    white-space: normal;
    padding: 0 clamp(0.1rem, 1vw, 0.2rem);
  }
  @media (max-width: 508px), (max-height: 529px) {
    font-size: clamp(0.8rem, 3.5vw, 1.1rem);
    margin-bottom: clamp(0.25rem, 1.2vw, 0.35rem);
    line-height: 1.05;
    word-break: break-word;
    white-space: normal;
    padding: 0 clamp(0.1rem, 0.8vw, 0.15rem);
  }
  @media (max-width: 360px), (max-height: 400px) {
    font-size: clamp(0.9rem, 4vw, 1.3rem);
    margin-bottom: clamp(0.3rem, 1.5vw, 0.4rem);
    line-height: 1.1;
    word-break: break-word;
    white-space: normal;
    padding: 0 clamp(0.1rem, 1vw, 0.2rem);
  }
`;

const heroSubtitle = emotionClass`
  font-size: clamp(0.6rem, 2.5vw, 1.3rem);
  margin-bottom: clamp(0.5rem, 2vw, 1.5rem);
  opacity: 0.95;
  line-height: 1.4;
  text-align: center;
  color: #F8F8F8;
  max-width: 1000px;
  font-weight: 400;
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.6);
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 1200px) {
    font-size: clamp(0.8rem, 3vw, 1.2rem);
    max-width: 900px;
  }
  @media (max-width: 768px) {
    font-size: clamp(0.7rem, 2.8vw, 0.92rem);
    margin-bottom: clamp(0.4rem, 1.5vw, 0.7rem);
    max-width: 100%;
    padding: 0 clamp(0.2rem, 1vw, 0.3rem);
    line-height: 1.15;
    display: block;
  }
  @media (max-width: 480px), (max-height: 514px), (max-width: 493px), (max-height: 529px), (max-height: 509px) {
    font-size: clamp(0.7rem, 2.5vw, 0.85rem);
    margin-bottom: clamp(0.3rem, 1.5vw, 0.4rem);
    line-height: 1.1;
    padding: 0 clamp(0.1rem, 1vw, 0.2rem);
    max-width: 98vw;
    /* Remove truncation - show full description */
    overflow: visible;
    text-overflow: unset;
    display: block;
    -webkit-line-clamp: unset;
    -webkit-box-orient: unset;
    white-space: normal;
    max-height: none;
  }
  @media (max-width: 508px), (max-height: 529px) {
    font-size: clamp(0.6rem, 2.2vw, 0.75rem);
    margin-bottom: clamp(0.25rem, 1.2vw, 0.35rem);
    line-height: 1.05;
    padding: 0 clamp(0.1rem, 0.8vw, 0.15rem);
    max-width: 98vw;
    /* Remove truncation - show full description */
    overflow: visible;
    text-overflow: unset;
    display: block;
    -webkit-line-clamp: unset;
    -webkit-box-orient: unset;
    white-space: normal;
    max-height: none;
  }
  @media (max-width: 360px), (max-height: 400px) {
    font-size: clamp(0.7rem, 2.5vw, 0.85rem);
    margin-bottom: clamp(0.3rem, 1.5vw, 0.4rem);
    line-height: 1.1;
    padding: 0 clamp(0.1rem, 1vw, 0.2rem);
    max-width: 98vw;
    /* Remove truncation - show full description */
    overflow: visible;
    text-overflow: unset;
    display: block;
    -webkit-line-clamp: unset;
    -webkit-box-orient: unset;
    white-space: normal;
    max-height: none;
  }
`;

const heroButton = emotionClass`
  background: linear-gradient(135deg, #0076FF 0%, #1CA638 100%);
  color: white;
  border: none;
  border-radius: clamp(10px, 2vw, 50px);
  padding: clamp(4px, 1vw, 22px) clamp(8px, 2vw, 50px);
  font-weight: 700;
  font-size: clamp(0.5rem, 2vw, 1.2rem);
  margin: 0 clamp(0.2rem, 1vw, 1.5rem);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 12px 35px rgba(0, 118, 255, 0.5);
  position: relative;
  overflow: hidden;
  min-width: clamp(30px, 15vw, 200px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  
  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 20px 50px rgba(0, 118, 255, 0.7);
    background: linear-gradient(135deg, #0056CC 0%, #158A2E 100%);
  }
  
  &:active {
    transform: translateY(-1px) scale(1.02);
    box-shadow: 0 15px 40px rgba(0, 118, 255, 0.6);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.6s ease;
  }
  
  &:hover::before {
    left: 100%;
  }
  @media (max-width: 1024px) {
    font-size: clamp(0.6rem, 2.2vw, 0.95rem);
    padding: clamp(6px, 1.5vw, 10px) clamp(10px, 2vw, 18px);
    min-width: clamp(50px, 12vw, 90px);
    margin: 0 clamp(0.3rem, 1vw, 0.5rem);
    border-radius: clamp(20px, 3vw, 40px);
  }
  @media (max-width: 768px) {
    font-size: clamp(0.5rem, 1.8vw, 0.7rem);
    padding: clamp(4px, 1vw, 6px) clamp(6px, 1.5vw, 10px);
    min-width: clamp(35px, 10vw, 55px);
    margin: 0 clamp(0.1rem, 0.5vw, 0.15rem);
    border-radius: clamp(12px, 2vw, 20px);
  }
  @media (max-width: 480px), (max-height: 514px), (max-width: 493px), (max-height: 529px), (max-height: 509px) {
    font-size: clamp(0.55rem, 1.8vw, 0.75rem);
    padding: clamp(3px, 1vw, 5px) clamp(5px, 1.2vw, 8px);
    min-width: clamp(30px, 10vw, 50px);
    margin: 0 clamp(0.1rem, 0.5vw, 0.15rem);
    border-radius: clamp(10px, 2vw, 16px);
  }
  @media (max-width: 508px), (max-height: 529px) {
    font-size: clamp(0.5rem, 1.6vw, 0.65rem);
    padding: clamp(2px, 0.8vw, 4px) clamp(4px, 1vw, 6px);
    min-width: clamp(25px, 8vw, 40px);
    margin: 0 clamp(0.05rem, 0.3vw, 0.1rem);
    border-radius: clamp(8px, 1.5vw, 12px);
  }
  @media (max-width: 360px), (max-height: 400px) {
    font-size: clamp(0.55rem, 1.8vw, 0.75rem);
    padding: clamp(3px, 1vw, 5px) clamp(5px, 1.2vw, 8px);
    min-width: clamp(30px, 10vw, 50px);
    margin: 0 clamp(0.1rem, 0.5vw, 0.15rem);
    border-radius: clamp(10px, 2vw, 16px);
  }
`;

const heroButtonContainer = emotionClass`hero-button-container
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
`;

const carouselSection = emotionClass`
  padding: 4rem 0;
  background: #f8f9fa;
`;

const carouselTitle = emotionClass`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const carouselCard = emotionClass`
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  height: 100%;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const carouselImage = emotionClass`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

// Simple section styles
const sectionTitle = emotionClass`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(90deg, #0076FF 0%, #1CA638 60%, #FFC72C 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #0076FF;
`;

const simpleCard = emotionClass`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  height: 100%;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

const simpleButton = emotionClass`
  background: linear-gradient(90deg, #0076FF 0%, #1CA638 100%);
  color: white;
  border: none;
  border-radius: 1rem;
  padding: 0.8rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,118,255,0.3);
  }
`;



/////////////////////////////////////////


const trustedSection = emotionClass`
  background:rgb(255, 255, 255);
  padding: 3rem 0;
  text-align: center;
  border-top: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
  margin-bottom: 2.5rem;
  
  @media (max-width: 768px) {
    padding: 2.5rem 0;
  }
  
  @media (max-width: 480px) {
    padding: 2rem 0;
  }
`;

const trustedLogosRow = emotionClass`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1.5rem;
  margin: 0 auto;
  max-width: 800px;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1.25rem;
    max-width: 600px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    max-width: 400px;
  }
`;

const logoBox = emotionClass`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;
  width: 100%;
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    border-color: #e0e0e0;
  }
  
  @media (max-width: 768px) {
    height: 100px;
    padding: 1.25rem 0.75rem;
  }
  
  @media (max-width: 480px) {
    height: 90px;
    padding: 1rem 0.5rem;
  }
`;

const logoImg = emotionClass`
  height: 32px !important;
  width: auto;
  max-width: 100px;
  object-fit: contain;
  opacity: 0.9;
  transition: all 0.3s ease;
  margin-bottom: 0.75rem;
  
  &:hover { 
    opacity: 1; 
    transform: scale(1.05); 
  }
  
  @media (max-width: 768px) {
    height: 28px !important;
    max-width: 80px;
    margin-bottom: 0.5rem;
  }
  
  @media (max-width: 480px) {
    height: 24px !important;
    max-width: 70px;
    margin-bottom: 0.5rem;
  }
`;

  const trustedLogos = [
    { flag: Ireland, name: 'Ireland' },
    { flag: India, name: 'India' },
    { flag: Uk, name: 'United Kingdom' },
    { flag: Germany, name: 'Germany' },
  ];

//////////////////

export default function Home() {
  const theme = useTheme();

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' }
    }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } }
  };

  const features = [
    {
      icon: <FaSearch size={32} color={theme.colors.primary} />,
      title: 'Talent Sourcing',
      desc: 'We identify and shortlist qualified candidates globally. We conduct comprehensive research, multi-channel sourcing, and detailed market mapping to create a bespoke talent pool.'
    },
    {
      icon: <FaHeart size={32} color={theme.colors.accent} />,
      title: 'Employer Care Support',
      desc: 'Our employer care support services focus on creating a positive work environment for the resource relocating to Ireland. We offer guidance on employee relations, wellness programs, and compliance with Irish labour laws to enhance employee satisfaction and retention.'
    },
    {
      icon: <FaGlobe size={32} color={theme.colors.primary} />,
      title: 'Overseas Job Matching',
      desc: 'Find jobs that suit your skills, experience, and aspirations.'
    },
    {
      icon: <FaFileAlt size={32} color={theme.colors.accent} />,
      title: 'Resume & Interview Prep',
      desc: 'Guidance to help you stand out in the global job market.'
    },
  ];

  const testimonials = [
    {
      text: 'eiRecruit helped us find the perfect healthcare professionals, fully certified and ready to make an impact.',
      author: 'HR Manager, Perfect Digital Media Resources (P) Ltd',
      rating: 5
    },
    {
      text: 'Their global reach and compliance expertise made our hiring process seamless.',
      author: 'Talent Lead, Perfect Digital Media Resources (P) Ltd',
      rating: 5
    },
  ];


  const heroCarouselItems = [
    // {
    //   image: 'https://plus.unsplash.com/premium_photo-1681966826227-d008a1cfe9c7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   title: 'Healthcare Professionals'
    // },
    // {
    //   image: 'https://plus.unsplash.com/premium_photo-1681843015470-5dec0470c64d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   title: 'Professional Development'
    // },
    // {
    //   image: 'https://plus.unsplash.com/premium_photo-1681842906523-f27efd0d1718?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   title: 'Medical Innovation'
    // },
    {
      image: Banner1,
      title: 'Medical Innovation'
    },
    {
      image: Banner2,
      title: 'Medical Innovation'
    },
    {
      image: Banner3,
      title: 'Medical Innovation'
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className={heroCarousel}>
        <Carousel fade indicators={false} controls={false} interval={1000}>
          {heroCarouselItems.map((item, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={item.image}
                alt={item.title}
              />
              <Carousel.Caption className="carousel-caption">
                <div className="carousel-content-wrapper">
                  <h1 className={heroTitle}>Connecting Global Talent with World-Class Opportunities</h1>
                  <p className={heroSubtitle}>Discover all your staffing needs with the one place of solutions tailored to your business, especially focused on healthcare professionals' needs across the pharmaceutical and medical device sectors, including compliance with quality certifications. Let us be your trusted partner in building a talented and compliant workforce that drives business growth and innovation.</p>
                  <div className={heroButtonContainer}>
                    <button
                      className={heroButton}
                      type="button"
                      onClick={() => {
                        const element = document.getElementById('services');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                    >
                      Explore Services
                    </button>
                    <button
                      className={heroButton}
                      type="button"
                      onClick={() => {
                        const element = document.getElementById('careers');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                    >
                      Find Opportunities
                    </button>
                  </div>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      {/* Our Footprints */}
      <motion.section className={trustedSection} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }} variants={fadeUp}>
        <Container>
          <motion.div 
            className="mb-4" 
            style={{ 
              fontWeight: '600', 
              color: '#374151', 
              fontSize: 'clamp(1rem, 4.5vw, 1.25rem)',
              letterSpacing: '0.025em'
            }}
            variants={fadeUp}
          >
            Our Global Footprints
          </motion.div>
          <motion.div className={trustedLogosRow} variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}>
            {trustedLogos.map((logo, i) => (
              <motion.div className={logoBox} key={i} variants={fadeUp}>
                <img src={logo.flag} alt={`${logo.name} flag`} className={logoImg} />
                <div style={{ 
                  textAlign: 'center', 
                  fontSize: 'clamp(0.78rem, 3.2vw, 0.875rem)', 
                  fontWeight: '600', 
                  color: '#4B5563',
                  lineHeight: '1.2',
                  letterSpacing: '0.025em'
                }}>
                  {logo.name}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </motion.section>

      {/* Simple Features Section */}
      {/* <Container className="py-5">
        <motion.h2 className={sectionTitle} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          Why Choose eiRecruit?
        </motion.h2>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Row className="g-4">
            {features.map((f, i) => (
              <Col lg={3} md={6} sm={12} key={i}>
                <motion.div variants={fadeUp} className={simpleCard}>
                  <div style={{ textAlign: 'center', marginBottom: '1rem' }}>{f.icon}</div>
                  <h5 style={{ fontWeight: 600, fontSize: '1.1rem', color: theme.colors.primary, textAlign: 'center' }}>{f.title}</h5>
                  <p style={{ fontSize: '0.95rem', opacity: 0.8, textAlign: 'center' }}>{f.desc}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </Container> */}

      {/* Simple Testimonials */}
      {/* <Container className="py-5">
        <motion.h2 className={sectionTitle} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          What Our Clients Say
        </motion.h2>
        <Row className="g-4">
          {testimonials.map((t, i) => (
            <Col md={6} key={i}>
              <motion.div variants={fadeUp} className={simpleCard}>
                <div style={{ fontSize: 20, color: theme.colors.accent, marginBottom: 10, textAlign: 'center' }}>
                  {[...Array(t.rating)].map((_, j) => (
                    <FaStar key={j} />
                  ))}
                </div>
                <p style={{ fontStyle: 'italic', fontSize: '1rem', color: '#333', marginBottom: 10, textAlign: 'center' }}>
                  "{t.text}"
                </p>
                <div style={{ color: theme.colors.primary, fontWeight: 500, textAlign: 'center' }}>{t.author}</div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container> */}
    </>
  );
}
