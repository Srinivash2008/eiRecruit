import { useTheme } from '@emotion/react';
import { Container, Row, Col, Card, Button, Accordion } from 'react-bootstrap';
import { css, keyframes } from '@emotion/react';
import { css as emotionClass } from '@emotion/css';
import {
  FaUserTie, FaRobot, FaHandshake, FaBullhorn, FaRocket, FaClipboardCheck,
  FaQuestionCircle, FaGlobeEurope, FaClipboardList, FaUsersCog, FaUserCheck,
  FaFileContract, FaChartBar, FaPassport, FaHeart, FaUserMd, FaCertificate, FaGlobe, FaUsers, FaStar, FaSearch, FaFileAlt, FaPlane, FaShieldAlt
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ButtonOne } from '../components/AnimatedButton';
import { Link } from 'react-router-dom';
import Services_image from '../assets/images/services.jpg';
// Import icons for stepper


const sectionTitle = emotionClass`
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


const serviceCard = emotionClass`
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 4px 24px #0002;
  border: none;
  padding: 2rem 1.2rem 1.5rem 1.2rem;
  text-align: center;
  transition: box-shadow 0.2s, transform 0.2s;
  display: flex;             /* Added */
  flex-direction: column;   /* Added */
  height: 100%;             /* Added */
  &:hover {
    box-shadow: 0 8px 32px #0076ff22;
    transform: translateY(-4px) scale(1.03);
  }
`;


const cardBodyFlex = emotionClass`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 200px;
`;


const serviceIcon = emotionClass`
  font-size: 2rem;
  margin-bottom: 0.7rem;
  color: #1CA638;
`;


const ctaSection = emotionClass`
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
`;


const sectionDivider = emotionClass`
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #e0e7ff 0%, #fff 100%);
  opacity: 0.5;
  margin: 3rem 0 2.5rem 0;
  border-radius: 1px;
`;

// Updated stepper styles for responsive icon stepper
const stepperResponsive = emotionClass`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  margin: 2.5rem 0 3rem 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1.2rem;
  }
`;

const stepResponsive = emotionClass`
  background: #f8fafc;
  border-radius: 1rem;
  padding: 1.5rem 1.8rem;
  min-width: 180px;
  flex: 1 1 200px;
  text-align: center;
  box-shadow: 0 2px 8px #0001;
  font-weight: 600;
  color: #0076FF;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.2s, transform 0.2s, background-color 0.3s ease;
  &:hover {
    background-color: #e6f0ff;
    box-shadow: 0 8px 32px #0076ff22;
    transform: translateY(-4px) scale(1.03);
  }
`;

const stepIcon = emotionClass`
  font-size: 2.8rem;
  margin-bottom: 0.8rem;
`;

const stepLabel = emotionClass`
  font-size: 1.12rem;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
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

const jobSeekerSection = emotionClass`
  padding: 4rem 0;
  background: linear-gradient(135deg, #f8faff 0%, #f0f8ff 100%);
  border-radius: 2rem;
  margin: 3rem 0;
  position: relative;
  
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
`;

const jobSeekerTitle = emotionClass`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
  background: linear-gradient(135deg, #0076FF 0%, #1CA638 50%, #FFC72C 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 2px 8px rgba(0, 118, 255, 0.15));
  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const jobSeekerSubtitle = emotionClass`
  color: #555;
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 3rem;
  opacity: 0.8;
`;

const timelineContainer = emotionClass`
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, #0076FF 0%, #1CA638 50%, #FFC72C 100%);
    transform: translateX(-50%);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    &::before {
      left: 30px;
      transform: none;
    }
  }
`;

const timelineItem = emotionClass`
  position: relative;
  margin-bottom: 2.5rem;
  display: flex;
  align-items: center;
  
  &:nth-child(odd) {
    flex-direction: row;
    
    .timeline-content {
      margin-left: 3rem;
      text-align: left;
    }
  }
  
  &:nth-child(even) {
    flex-direction: row-reverse;
    
    .timeline-content {
      margin-right: 3rem;
      text-align: right;
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: row !important;
    
    .timeline-content {
      margin-left: 3rem !important;
      margin-right: 0 !important;
      text-align: left !important;
    }
  }
`;

const timelineIcon = emotionClass`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  position: relative;
  z-index: 2;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.2);
  }
`;

const timelineContent = emotionClass`
  flex: 1;
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e6eaf0;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  }
`;

const timelineTitle = emotionClass`
  font-size: 1.2rem;
  font-weight: 600;
  color: #0076FF;
  margin-bottom: 0.5rem;
`;

const timelineDesc = emotionClass`
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 0;
`;

const ctaButton = emotionClass`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.8rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 2rem;
  border: 2px solid #0076FF;
  color: #fff;
  background: #0076FF;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  outline: none;
  user-select: none;
  margin-top: 1rem;
  
  &:hover, &:focus {
    background: #0056b3;
    color: #fff;
    box-shadow: 0 8px 25px #0076ff30;
    border-color: #0056b3;
    transform: translateY(-2px) scale(1.05);
    text-decoration: none;
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

// Core Values Section Styles
const coreValuesSection = emotionClass`
  padding: 4rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e6f3ff 100%);
  border-radius: 2rem;
  // margin: 3rem 0;
`;

const coreValuesTitle = emotionClass`
  font-size: 2.2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #0076FF 0%, #1CA638 50%, #FFC72C 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 2px 8px rgba(0, 118, 255, 0.15));
`;

const coreValuesSubtitle = emotionClass`
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 3rem;
  opacity: 0.8;
  color: #555;
`;

const coreValuesGrid = emotionClass`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const coreValueCard = emotionClass`
  background: white;
  border-radius: 1.5rem;
  padding: 2rem 1.5rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid #e6eaf0;
  transition: all 0.3s ease;
  text-align: center;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const coreValueIcon = emotionClass`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #0076FF;
  transition: all 0.3s ease;
  
  &:hover {
    color: #1CA638;
    transform: scale(1.1);
  }
`;

const coreValueTitle = emotionClass`
  font-size: 1.3rem;
  font-weight: 600;
  color: #0076FF;
  margin-bottom: 1rem;
`;

const coreValueDesc = emotionClass`
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 0;
`;


// Core Values Data
const coreValues = [
  {
    title: 'Expertise',
    description: 'With our in-depth knowledge of the Irish healthcare industry, we deliver expert guidance and solutions to our clients.',
    icon: <FaUserTie />
  },
  {
    title: 'Integrity',
    description: 'We uphold the highest ethical standards in all our interactions, ensuring transparency and trust with our clients and candidates.',
    icon: <FaShieldAlt />
  },
  {
    title: 'Collaboration',
    description: 'We believe in fostering collaborative relationships with our clients, working closely with them to understand their needs and delivering tailored solutions.',
    icon: <FaHandshake />
  },
  {
    title: 'Compliance',
    description: 'We are committed to ensuring compliance with local regulations and industry standards, helping our clients mitigate risks and achieve business objectives.',
    icon: <FaClipboardCheck />
  }
];

const faqs = [
  { q: 'How does your AI matching work?', a: 'Our AI analyzes job requirements and candidate profiles to recommend the best matches instantly.' },
  { q: 'Can you help with executive search?', a: 'Yes, we have a dedicated team for executive and senior-level recruitment.' },
  { q: 'Do you offer onboarding support?', a: 'Absolutely! We help with onboarding to ensure new hires are set up for success.' },
];


export default function Services() {
  const theme = useTheme();
  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0.2, 0.2, 1] } }
  };
  const stagger = {
    visible: { transition: { staggerChildren: 0.2 } }
  };
  // Quick, smooth variants for scroll-in reveal (re-trigger on scroll)
  const fadeUpQuick = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1
      } 
    }
  };

  const staggerQuick = {
    visible: { 
      transition: { 
        staggerChildren: 0.1, 
        delayChildren: 0.06,
        duration: 0.6
      } 
    }
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Ensure employer services content is always visible
  useEffect(() => {
    const ensureContentVisibility = () => {
      const serviceCards = document.querySelectorAll('.service-card');
      serviceCards.forEach(card => {
        if (card) {
          card.style.opacity = '1';
          card.style.visibility = 'visible';
        }
      });
    };
    
    // Run immediately and after a short delay to ensure visibility
    ensureContentVisibility();
    const timer = setTimeout(ensureContentVisibility, 500);
    
    return () => clearTimeout(timer);
  }, []);
  // Service offerings for Employers/Companies in Ireland
  const employerServices = [
    {
      icon: <FaSearch className={serviceIcon} />, title: 'Talent Sourcing',
      desc: 'We identify and shortlist qualified candidates globally. We conduct comprehensive research, multi-channel sourcing, and detailed market mapping to create a bespoke talent pool.'
    },
    {
      icon: <FaCertificate className={serviceIcon} />, title: 'Skill Assessment',
      desc: "Pre-screening, testing, and interviews tailored to your job roles. Competency-based screening and assessment help companies assess the candidates for the role fitment as well as cultural fitment, so that they can adapt to the organisation's culture. "
    },
    {
      icon: <FaGlobe className={serviceIcon} />, title: 'Outsourced recruitment partner ',
      desc: 'Recruitment process outsourcing (RPO) enables you to outsource full or part of your recruitment process to us. Our expert recruiters provide flexible recruitment solutions that adapt as your business evolves and grows.'
    },
    {
      icon: <FaUsers className={serviceIcon} />, title: 'Staffing services- Permanent/contract staffing',
      desc: "Our community of contingent workers can jump in whenever you need them, helping you hit project deadlines, meet peaks in demand, and minimise staff costs. The process is streamlined and simple, taking care of the admin, costs and financial risk. What’s more, in Ireland's fast-changing market, our contract personnel have their finger on the pulse of what’s new – providing you with emerging and cutting-edge skills. We’ve developed trusted relationships with our contingent workforce, so you can depend on them for short-term or long-term assignments."
    },
    {
      icon: <FaHeart className={serviceIcon} />, title: 'Visa and immigration process',
      desc: "We ensure full compliance with visa, labour, and immigration regulations. We sponsor and guide the resources to manage their visas and immigration process specific to Ireland, which includes visa documentation and legal procedures, ensuring a smooth transition for professionals joining the Irish-based companies. We have an office presence in both the location Ireland and India, which helps to manage the Visa documentation at both places."
    },
    {
      icon: <FaChartBar className={serviceIcon} />, title: 'Employer Care Support',
      desc: 'Our employer care support services focus on creating a positive work environment for the resource relocating to Ireland. We offer guidance on employee relations, wellness programs, and compliance with Irish labour laws to enhance employee satisfaction and retention.'
    },
    {
      icon: <FaSearch className={serviceIcon} />, title: 'Market Intelligence Analysis Support',
      desc: 'Benchmarking exercises, Business analysis. We equip our clients with salary guides, salary benchmarking exercises, expertly curated interview questions and job specifications.'
    },
  ];

  const jobSeekerServices = [
    {
      icon: <FaGlobe />,
      title: 'Overseas Job Matching',
      desc: 'Find jobs that suit your skills, experience, and aspirations. Presently, we cater only to Ireland.',
      color: '#0076FF'
    },
    {
      icon: <FaFileAlt />,
      title: 'Resume & Interview Prep',
      desc: 'Guidance to help you stand out in the global job market.',
      color: '#1CA638'
    },
    {
      icon: <FaPassport />,
      title: 'Visa Process Assistance',
      desc: 'Support with paperwork and legal compliance.',
      color: '#FFC72C'
    },
    {
      icon: <FaHandshake />,
      title: 'Post-Placement Support',
      desc: 'Help with relocation and settlement in your destination country.',
      color: '#0076FF'
    }
  ];

  return (
    <Container className="py-5" >
      {/* Hero Section with Services Image Background */}
      <motion.section
        style={{
          position: 'relative',
          padding: '4rem 0 3rem 0',
          marginBottom: '2rem',
          borderRadius: '2rem',
          overflow: 'hidden',
          background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${Services_image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2, margin: '0px 0px -5% 0px' }}
        variants={fadeUpQuick}
      >
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <h1 style={{
            fontSize: 'clamp(1.6rem, 6vw, 2.5rem)',
            fontWeight: 700,
            marginBottom: '1rem',
            color: '#fff',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)'
          }}>Service Offerings</h1>
        </div>
      </motion.section>
      <motion.h2 className="mb-4 text-center" style={{
        background: 'linear-gradient(135deg, #0076FF 0%, #1CA638 50%, #FFC72C 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
        fontWeight: 600,
        filter: 'drop-shadow(0 2px 8px rgba(0, 118, 255, 0.15))',
        fontSize: 'clamp(1.2rem, 4.8vw, 1.8rem)'
      }} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }} 
        variants={fadeUpQuick}
        onAnimationComplete={() => {
          // Ensure content is visible after animation
          const cards = document.querySelectorAll('.service-card');
          cards.forEach(card => {
            if (card) card.style.opacity = '1';
          });
        }}
      >For Companies To Build A Workforce In India</motion.h2>
      <motion.div 
        variants={staggerQuick} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}
        style={{ minHeight: '200px' }}
      >
        <Row className="g-4 mb-4 justify-content-center align-items-stretch">
          {employerServices.map((service, i) => {
            const [expanded, setExpanded] = useState(false);
            const isLong = service.desc.length > 220;
            const shortDesc = isLong ? service.desc.slice(0, 220) + '...' : service.desc;
            return (
              <Col md={6} lg={4} key={i} className="d-flex">
                <motion.div 
                  variants={fadeUpQuick} 
                  className="d-flex flex-column flex-grow-1"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}
                  onAnimationComplete={() => {
                    // Fallback to ensure visibility
                    const card = document.querySelector(`[data-service-index="${i}"]`);
                    if (card) card.style.opacity = '1';
                  }}
                >
                  <Card
                    className={serviceCard + ' h-100 text-center service-card'}
                    data-service-index={i}
                    style={{
                      background: i % 2 === 0 ? theme.colors.lightBlue : theme.colors.lightGreen,
                      border: `2px solid ${theme.colors.primary}22`,
                      opacity: 1,
                      minHeight: '300px'
                    }}
                  >
                    <Card.Body className={cardBodyFlex}>
                      <div style={{ fontSize: 36, marginBottom: 12, color: i % 2 === 0 ? theme.colors.primary : theme.colors.secondary }}>
                        {service.icon}
                      </div>
                      <Card.Title style={{ fontWeight: 600, fontSize: '1.18rem', marginBottom: 8, color: theme.colors.primary }}>
                        {service.title}
                      </Card.Title>
                      <Card.Text style={{ fontSize: '1.04rem', opacity: 0.92, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', textAlign: 'center' }}>
                        {expanded || !isLong ? service.desc : shortDesc}
                        {isLong && (
                          <span
                            style={{ color: theme.colors.accent, cursor: 'pointer', marginLeft: 6, fontWeight: 500 }}
                            onClick={() => setExpanded(e => !e)}
                          >
                            {expanded ? 'Read Less' : 'Read More'}
                          </span>
                        )}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            );
          })}
        </Row>
      </motion.div>
      <motion.div className={sectionDivider} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2, margin: '0px 0px -5% 0px' }} variants={fadeUpQuick} />

      {/* For Job Seekers Section */}
      <motion.section className={jobSeekerSection} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2, margin: '0px 0px -5% 0px' }} variants={fadeUpQuick}>
        <Container>
          <motion.h2 className={jobSeekerTitle} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2, margin: '0px 0px -5% 0px' }} variants={fadeUpQuick}>For Job Seekers</motion.h2>
          <motion.p className={jobSeekerSubtitle} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2, margin: '0px 0px -5% 0px' }} variants={fadeUpQuick}>
            Comprehensive support for your international career journey
          </motion.p>

          <motion.div className={timelineContainer} variants={staggerQuick}>
            {jobSeekerServices.map((service, i) => (
              <motion.div key={i} className={timelineItem} variants={fadeUpQuick}>
                <div
                  className={timelineIcon}
                  style={{ background: service.color }}
                >
                  {service.icon}
                </div>
                <div className={`${timelineContent} timeline-content`}>
                  <div className={timelineTitle}>{service.title}</div>
                  <div className={timelineDesc}>{service.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            style={{
              marginTop: '3rem',
              width: '100%',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row', // stack vertically on mobile
              opacity: '1',
              transform: 'none',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            variants={fadeUpQuick}
          >
            <button
              className={ctaButton}
              style={{
                width: isMobile ? '100%' : '270px',
                marginBottom: isMobile ? '1rem' : '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              type="button"
              onClick={() => {
                const element = document.getElementById('current_job_opportunities');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              <FaFileContract style={{ marginRight: '0.5rem' }} />
              View Current Openings
            </button>

            {!isMobile && (
              <span style={{ margin: '0 1rem', color: '#888' }}>or</span>
            )}

            <button
              className={ctaButton}
              type="button"
              style={{
                background: '#1CA638',
                borderColor: '#1CA638',
                width: isMobile ? '100%' : '270px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              <FaFileAlt style={{ marginRight: '0.5rem' }} />
              Post Your Resume
            </button>
          </motion.div>
        </Container>
      </motion.section>
      <motion.div className={sectionDivider} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2, margin: '0px 0px -5% 0px' }} variants={fadeUpQuick} />

      {/* Core Values Section */}
      {/* <motion.section className={coreValuesSection} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2, margin: '0px 0px -5% 0px' }} variants={fadeUpQuick}>
        <Container>
          <motion.h2 className={coreValuesTitle} variants={fadeUpQuick}>Core Values</motion.h2>
         

          <motion.div className={coreValuesGrid} variants={staggerQuick}>
            {coreValues.map((value, i) => (
              <motion.div key={i} className={coreValueCard} variants={fadeUpQuick}>
                <div className={coreValueIcon}>
                  {value.icon}
                </div>
                <div className={coreValueTitle}>{value.title}</div>
                <div className={coreValueDesc}>{value.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </motion.section> */}
    </Container>
  );
}
