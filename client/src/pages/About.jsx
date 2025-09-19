import { useTheme } from '@emotion/react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { css as emotionClass } from '@emotion/css';

import { FaLightbulb, FaHandshake, FaAward, FaUsers, FaUserTie, FaBriefcase, FaEnvelope, FaShieldAlt, FaClipboardCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ButtonFive, ButtonFour, ButtonOne, ButtonThree } from '../components/AnimatedButton';
import contact4 from '../assets/images/banner2.jpg';

const sectionTitle = emotionClass`
  font-size: 2rem;
  font-weight: 600;
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  background: linear-gradient(135deg, #0076FF 0%, #1CA638 50%, #FFC72C 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 2px 8px rgba(0, 118, 255, 0.15));
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-top: 2rem;
    margin-bottom: 1.25rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const coreValuesSection = emotionClass`
  padding: 4rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e6f3ff 100%);
  border-radius: 2rem;
  // margin: 3rem 0;
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


const aboutImageContainer = emotionClass`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 118, 255, 0.15);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid rgba(0, 118, 255, 0.1);
  background: linear-gradient(135deg, #f8faff 0%, #f0f7ff 100%);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 118, 255, 0.05) 0%, rgba(28, 166, 56, 0.05) 100%);
    z-index: 1;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 60px rgba(0, 118, 255, 0.25);
    border-color: rgba(0, 118, 255, 0.3);
    
    &::before {
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
    box-shadow: 0 8px 24px rgba(0, 118, 255, 0.12);
    border-radius: 16px;
  }
  
  @media (max-width: 480px) {
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(0, 118, 255, 0.1);
  }
`;

const aboutImage = emotionClass`
  width: 100%;
  height: 450px;
  object-fit: cover;
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  filter: contrast(1.05) saturate(1.1);
  position: relative;
  z-index: 2;
  
  &:hover {
    transform: scale(1.08);
    filter: contrast(1.1) saturate(1.2);
  }
  
  @media (max-width: 768px) {
    height: 350px;
    border-radius: 16px;
  }
  
  @media (max-width: 480px) {
    height: 280px;
    border-radius: 12px;
  }
`;

const aboutContent = emotionClass`
  padding: 0 1.5rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(180deg, #0076FF 0%, #1CA638 100%);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const aboutHeading = emotionClass`
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.5rem;
  line-height: 1.3;
  letter-spacing: -0.01em;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 1.3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.4rem;
    margin-bottom: 1.1rem;
  }
`;

const aboutText = emotionClass`
  font-size: 1.15rem;
  line-height: 1.8;
  color: #2d3748;
  margin-bottom: 1.8rem;
  font-weight: 400;
  letter-spacing: 0.01em;
  text-align: justify;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 1.3rem;
  }
`;

const aboutTags = emotionClass`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    gap: 0.75rem;
    margin-top: 1.5rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.5rem;
    margin-top: 1.25rem;
  }
`;

const aboutTag = emotionClass`
  background: linear-gradient(135deg, #0076FF 0%, #1CA638 100%);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-size: 0.95rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 118, 255, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 118, 255, 0.25);
  }
  
  @media (max-width: 768px) {
    padding: 0.7rem 1.3rem;
    font-size: 0.85rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.8rem;
  }
`;

const aboutTagAlt = emotionClass`
  composes: ${aboutTag};
  background: linear-gradient(135deg, #1CA638 0%, #0076FF 100%);
  box-shadow: 0 4px 12px rgba(28, 166, 56, 0.2);
  
  &:hover {
    box-shadow: 0 6px 16px rgba(28, 166, 56, 0.25);
  }
`;
const valueCard = emotionClass`
  background: #f8fafc;
  border-radius: 1.2rem;
  padding: 1.5rem 1rem;
  min-width: 180px;
  text-align: center;
  box-shadow: 0 2px 8px #0001;
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
  &:hover {
    box-shadow: 0 8px 24px #0076ff22;
    transform: translateY(-4px) scale(1.03);
  }
`;
const valueIcon = emotionClass`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #1CA638;
`;
const valueTitle = emotionClass`
  color: #0076FF;
  font-weight: 600;
  margin-bottom: 0.5rem;
  @media (max-width: 768px) {
    font-size: 0.98rem;
  }
  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;
const sectionDivider = emotionClass`
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #e0e7ff 0%, #fff 100%);
  opacity: 0.5;
  margin: 3rem 0 2.5rem 0;
  border-radius: 1px;
`;
const timeline = emotionClass`
  border-left: 3px solid #0076FF;
  margin: 2rem 0 2.5rem 0;
  padding-left: 2rem;
  position: relative;
`;
const timelineItem = emotionClass`
  margin-bottom: 2rem;
  position: relative;
`;
const timelineDot = emotionClass`
  position: absolute;
  left: -2.1rem;
  top: 0.2rem;
  width: 1.2rem;
  height: 1.2rem;
  background: #fff;
  border: 3px solid #0076FF;
  border-radius: 50%;
  z-index: 1;
`;
const teamAvatar = emotionClass`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.7rem;
  box-shadow: 0 2px 8px #0076ff22;
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

const team = [
  { name: 'Samantha Lee', role: 'CEO', img: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { name: 'David Kim', role: 'CTO', img: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { name: 'Priya Patel', role: 'Head of Talent', img: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { name: 'Alex Chen', role: 'Lead Developer', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
];

// Add a class for services snapshot card hover effect
const snapshotCard = emotionClass`
  transition: box-shadow 0.2s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  height: 100%;
  padding: 1.5rem 1rem;
  border-radius: 16px;
  font-weight: 500;
  color: #0076FF;
  box-shadow: 0 2px 12px #0076ff11;
  text-align: center;
  font-size: 1.08rem;
  line-height: 1.5;
  
  &:hover {
    box-shadow: 0 8px 32px #0076ff22;
    transform: translateY(-4px) scale(1.03);
  }
`;


// cat section


const ctaSection = emotionClass`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin: 2.5rem 0 3rem 0;
  flex-wrap: wrap;
`;

const ctaButtonPro = emotionClass`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 180px;
  padding: 1.05rem 2.1rem;
  font-size: 1.12rem;
  font-weight: 600;
  border-radius: 2.2rem;
  border: 1.5px solid #e6eaf0;
  color: #fff;
  background: linear-gradient(90deg, #0076FF 0%, #1CA638 100%);
  box-shadow: 0 2px 12px 0 #0076ff18;
  transition: box-shadow 0.18s, transform 0.18s, background 0.18s;
  cursor: pointer;
  outline: none;
  position: relative;
  z-index: 1;
  overflow: hidden;
  letter-spacing: 0.01em;
  user-select: none;
  &:hover, &:focus {
    background: linear-gradient(90deg, #0056b3 0%, #1CA638 100%);
    box-shadow: 0 6px 24px 0 #0076ff22;
    transform: translateY(-2px) scale(1.035);
    border-color: #b3d7ff;
  }
  &:active {
    transform: scale(0.98);
    box-shadow: 0 1px 4px 0 #0076ff22;
  }
`;

const ctaButtonProAlt = emotionClass`
  composes: ${ctaButtonPro};
  background: linear-gradient(90deg, #FFC72C 0%, #0076FF 100%);
  color: #222;
  border: 1.5px solid #ffe6a0;
  &:hover, &:focus {
    background: linear-gradient(90deg, #FFD966 0%, #0056b3 100%);
    color: #222;
    border-color: #b3d7ff;
  }
`;

const ctaBannerSection = emotionClass`
  width: 100vw;
  background: #F6FAFF;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 180px;
  margin: 3.5rem 0 3.5rem 0;
  padding: 0;
`;

const ctaBannerCard = emotionClass`
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 4px 24px 0 #0076ff10;
  padding: 2.2rem 2rem 1.7rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 700px;
  border: 1.5px solid #e6eaf0;
  @media (max-width: 768px) {
    padding: 1.2rem 0.7rem 1rem 0.7rem;
    border-radius: 1rem;
  }
`;

const ctaBannerTitle = emotionClass`
  font-size: 1.35rem;
  font-weight: 700;
  color: #0076FF;
  margin-bottom: 1.1rem;
  text-align: center;
  letter-spacing: -0.5px;
`;

const ctaButtonSimple = emotionClass`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  min-width: 160px;
  padding: 0.95rem 1.7rem;
  font-size: 1.08rem;
  font-weight: 600;
  border-radius: 2rem;
  border: 1.5px solid #0076FF;
  color: #fff;
  background: #0076FF;
  box-shadow: 0 2px 8px 0 #0076ff10;
  transition: box-shadow 0.16s, transform 0.16s, background 0.16s, color 0.16s;
  cursor: pointer;
  outline: none;
  position: relative;
  z-index: 1;
  user-select: none;
  &:hover, &:focus {
    background: #0056b3;
    color: #fff;
    box-shadow: 0 6px 18px 0 #0076ff18;
    border-color: #0056b3;
    transform: translateY(-2px) scale(1.025);
  }
  &:active {
    transform: scale(0.98);
    box-shadow: 0 1px 4px 0 #0076ff18;
  }
`;

const ctaButtonSimpleAlt = emotionClass`
  composes: ${ctaButtonSimple};
  background: #1CA638;
  border-color: #1CA638;
  &:hover, &:focus {
    background: #157c2c;
    border-color: #157c2c;
  }
`;

const ctaSectionSimple = emotionClass`
  width: 100%;
  padding: 0;
  margin: 3.5rem 0 3.5rem 0;
`;

const ctaSectionInner = emotionClass`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const ctaSectionTitle = emotionClass`
  font-size: 1.45rem;
  font-weight: 700;
  color: #0076FF;
  margin-bottom: 1.1rem;
  text-align: center;
  letter-spacing: -0.5px;
`;

const ctaButtonRow = emotionClass`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const ctaDivider = emotionClass`
  width: 100%;
  height: 1px;
  background: #e6eaf0;
  margin: 2.5rem 0 2.5rem 0;
  border-radius: 1px;
`;

const ctaFeatureSection = emotionClass`
  width: 100%;
  margin: 3.5rem 0 3.5rem 0;
  padding: 0;
`;

const ctaFeatureRow = emotionClass`
  display: flex;
  gap: 2.2rem;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;
  @media (max-width: 900px) {
    gap: 1.2rem;
  }
`;
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0.2, 0.2, 1] } }
};

const ctaFeatureCol = emotionClass`
  background: linear-gradient(135deg, #f8faff 0%, #f0f7ff 100%);
  border-radius: 1.2rem;
  box-shadow: 0 2px 12px 0 #0076ff0a;
  border: 1.5px solid #e6eaf0;
  flex: 1 1 260px;
  min-width: 240px;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.1rem 1.2rem 1.7rem 1.2rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #0076FF 0%, #1CA638 50%, #FFC72C 100%);
    opacity: 0.8;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    box-shadow: 0 12px 40px #0076ff25;
    transform: translateY(-6px) scale(1.02);
    background: linear-gradient(135deg, #f0f7ff 0%, #e6f0ff 100%);
    border-color: #0076ff40;
    
    &::before {
      opacity: 1;
    }
    
    .cta-feature-icon {
      transform: scale(1.1);
      color: #0076FF !important;
    }
    
    .cta-feature-title {
      color: #0076FF;
    }
    
    .cta-feature-button {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px #0076ff30;
    }
  }
  
  @media (max-width: 600px) {
    min-width: 0;
    width: 100%;
    padding: 1.2rem 0.7rem 1rem 0.7rem;
    margin-bottom: 1.2rem;
  }
`;

const ctaFeatureIcon = emotionClass`
  font-size: 2.3rem;
  color: #0076FF;
  margin-bottom: 1.1rem;
  transition: all 0.3s ease;
`;

const ctaFeatureTitle = emotionClass`
  font-size: 1.18rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
`;

const ctaFeatureDesc = emotionClass`
  font-size: 1.01rem;
  color: #555;
  margin-bottom: 1.2rem;
`;

const ctaFeatureButton = emotionClass`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.7rem 1.6rem;
  font-size: 1.01rem;
  font-weight: 600;
  border-radius: 2rem;
  border: 1.5px solid #0076FF;
  color: #fff;
  background: #0076FF;
  box-shadow: 0 2px 8px 0 #0076ff10;
  transition: all 0.3s ease;
  cursor: pointer;
  outline: none;
  user-select: none;
  
  &:hover, &:focus {
    background: #0056b3;
    color: #fff;
    box-shadow: 0 8px 25px #0076ff30;
    border-color: #0056b3;
    transform: translateY(-2px) scale(1.05);
  }
  
  &:active {
    transform: scale(0.98);
    box-shadow: 0 1px 4px 0 #0076ff18;
  }
`;

const ctaFeatureButtonAlt = emotionClass`
  composes: ${ctaFeatureButton};
  background: #1CA638;
  border-color: #1CA638;
  
  &:hover, &:focus {
    background: #157c2c;
    border-color: #157c2c;
    box-shadow: 0 8px 25px #1ca63830;
  }
`;

const ctaFeatureSmallHeading = emotionClass`
  position: relative;
  text-align: center;
  margin: 2rem 0 3rem 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, #e6eaf0 20%, #e6eaf0 80%, transparent 100%);
    z-index: 1;
  }
  
  span {
    background: #fff;
    padding: 0 1.5rem;
    color: #0076FF;
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    position: relative;
    z-index: 2;
    display: inline-block;
  }
  
  @media (max-width: 768px) {
    margin: 1.5rem 0 2.5rem 0;
    
    span {
      font-size: 1rem;
      padding: 0 1rem;
    }
  }
`;
//
const visionMissionSection = emotionClass`
  padding: 4rem 2rem;
  background: #ffff;
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const visionMissionTitle = emotionClass`
  font-size: 2.2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #0076FF 0%, #1CA638 50%, #FFC72C 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;


const visionMissionText = emotionClass`
  font-size: 1.15rem;
  line-height: 1.7;
  color: #4a5568;
  text-align: center;
  font-style: italic;
  max-width: 800px;
  margin: 0 auto 3rem auto;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const missionList = emotionClass`
  list-style: none;
  padding-left: 0;
  max-width: 900px;
  margin: 0 auto;
  li {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1.5rem;
    font-size: 1.05rem;
    color: #333;
    line-height: 1.6;
    text-align: left;
  }
  svg {
    color: #1CA638;
    margin-right: 1rem;
    margin-top: 0.25rem;
    flex-shrink: 0;
  }
`;


export default function About() {
  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0.2, 0.2, 1] } }
  };
  const stagger = {
    visible: { transition: { staggerChildren: 0.18 } }
  };
  // Quick, smooth variants for scroll-in reveal
  const fadeUpQuick = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };
  const staggerQuick = {
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };
  const theme = useTheme();
  const servicesSnapshot = [
    'Industry-Specific Hiring and Staffing',
    'Trusted partner for staff deployment, Contract staffing, and temporary staffing',
    'Executive Search: Discreet and targeted recruitment for leadership and C-suite roles.',
    'Recruitment Process Outsourcing (RPO)',
    'Employer Services',
    'Job Seeker Assistance',
    'Visa & Immigration Support',
  ];
  return (
    <Container className="py-0"  >
      {/* About Us Section */}
      <motion.h1 className={sectionTitle} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }} variants={fadeUpQuick}>About Us</motion.h1>

      <motion.div
        className="row align-items-center g-5 mb-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}
        variants={staggerQuick}
      >
        <motion.div className="col-lg-6" variants={fadeUpQuick}>
          <div className={aboutImageContainer}>
            <img
              src={contact4}
              alt="eiRecruit Team"
              className={aboutImage}
            />
          </div>
        </motion.div>

        <motion.div className="col-lg-6" variants={fadeUpQuick}>
          <div className={aboutContent}>
            <p className={aboutText}>
              With years of experience in international recruitment, we specialise in sourcing top-tier talent from around the globe. Whether you're an employer looking for skilled professionals or a candidate seeking your next overseas opportunity, we make the journey seamless. </p>
            <p className={aboutText}>
              Our dedicated team based in Ireland & India understands the local market dynamics and regulatory landscape, enabling us to provide specialised services to our clients. Our team combines industry insight with a people-first approach, ensuring the right fit for both employer and candidate every time. </p>

          </div>
        </motion.div>
      </motion.div>
      {/* Mission/Objective Section */}
      <motion.div className={sectionDivider} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.1 }} />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}
        variants={fadeUp}
      >
        <Container className={visionMissionSection}>
          <motion.div variants={fadeUpQuick}>
            <p className={visionMissionTitle}>Our Vision</p>
            <p className={visionMissionText}>
              Provide technology-aided, value-driven, integrated HR solutions that enable organisations to harness abundant global human capital for its diverse needs.
            </p>
          </motion.div>
          <motion.div variants={fadeUpQuick} style={{ marginTop: '3rem' }}>
            <h2 className={visionMissionTitle}>Our Mission</h2>
            <ul className={missionList}>
              <motion.li variants={fadeUpQuick}>
                <FaHandshake size={24} />
                <div style={{textAlign: 'justify'}}>
                  <strong>Client-focused perspectives:</strong> By standing in the client's shoes, we develop a panoramic view of their requirements, which helps us to provide customised solutions that add value.
                </div>
              </motion.li>
              <motion.li variants={fadeUpQuick}>
                <FaLightbulb size={24} />
                <div style={{textAlign: 'justify'}}>
                  <strong>Creative quotient:</strong> With the use of the right technology and people, we aspire to provide innovative and sustainable HR solutions for all business needs.
                </div>
              </motion.li>
              <motion.li variants={fadeUpQuick}>
                <FaAward size={24} />
                <div style={{textAlign: 'justify'}}>
                  <strong>Rapid scalability:</strong> Through streamlined processes, we enable auto-scaling for organisations to address all of their operational and market demands.
                </div>
              </motion.li>
            </ul>
          </motion.div>
        </Container>
      </motion.div>


      {/* Core Values Section */}
      <motion.section className={coreValuesSection} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2, margin: '0px 0px -5% 0px' }} variants={fadeUpQuick}>
        <Container>
          <motion.h2 className={coreValuesTitle} variants={fadeUpQuick}>Core Values</motion.h2>
          {/* <motion.p className={coreValuesSubtitle} variants={fadeUp}>
            The principles that guide our approach to recruitment and client relationships
          </motion.p> */}

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
      </motion.section>




      {/* Services Snapshot Section */}
      <motion.div className={sectionDivider} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.1 }} />
      <motion.h2 className={sectionTitle} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }} variants={fadeUpQuick}>Services Snapshot</motion.h2>
      <motion.div variants={staggerQuick} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}>
        <Row className="g-4 justify-content-center align-items-stretch">
          {servicesSnapshot.map((service, i) => (
            <Col md={4} sm={6} xs={12} key={i} className="d-flex">
              <motion.div variants={fadeUpQuick} style={{ width: '100%' }}>
                <div className={snapshotCard} style={{ background: i % 2 === 0 ? theme.colors.lightBlue : theme.colors.lightGreen }}>
                  {service}
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </motion.div>
      <motion.div className="text-center mt-4" style={{ fontSize: '1.08rem', opacity: 0.85 }} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }} variants={fadeUpQuick}>
        Please visit our <button
          style={{ background: 'none', border: 'none', color: '#0076FF', textDecoration: 'underline', cursor: 'pointer' }}
          onClick={() => {
            const element = document.getElementById('services');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
        >service offering page</button> for an overview of Eirecruit service offerings.
      </motion.div>



      {/* ////////////////////// */}



      {/* /////////////////////////// */}

      {/* Call to Action Feature Section (three-column style) */}
      <motion.section
        className={ctaFeatureSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}
        variants={staggerQuick}
      >
        <Container>
          {/* <motion.div className={ctaFeatureSmallHeading} variants={fadeInUp}>
            <span>Quick Actions</span>
          </motion.div> */}
          <motion.div className={ctaFeatureRow} variants={staggerQuick}>
            <motion.div className={ctaFeatureCol} variants={fadeUpQuick}>
              <div className={`${ctaFeatureIcon} cta-feature-icon`}><FaUserTie /></div>
              <div className={`${ctaFeatureTitle} cta-feature-title`}>Find Talent</div>
              {/* <div className={ctaFeatureDesc}>Connect with top professionals tailored to your business needs.</div> */}
              <button
                className={`${ctaFeatureButton} cta-feature-button`}
                type="button"
                onClick={() => {
                  const element = document.getElementById('services');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Find Talent
              </button>
            </motion.div>
            <motion.div className={ctaFeatureCol} variants={fadeUpQuick}>
              <div className={`${ctaFeatureIcon} cta-feature-icon`}><FaBriefcase style={{ color: '#1CA638' }} /></div>
              <div className={`${ctaFeatureTitle} cta-feature-title`}>Find a Job</div>
              <button
                className={`${ctaFeatureButtonAlt} cta-feature-button`}
                type="button"
                onClick={() => {
                  const element = document.getElementById('careers');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Find a Job
              </button>
            </motion.div>
            <motion.div className={ctaFeatureCol} variants={fadeUpQuick}>
              <div className={`${ctaFeatureIcon} cta-feature-icon`}><FaEnvelope style={{ color: '#FFC72C' }} /></div>
              <div className={`${ctaFeatureTitle} cta-feature-title`}>Contact Us</div>
              {/* <div className={ctaFeatureDesc}>Get in touch for personalized support and guidance.</div> */}
              <button
                className={`${ctaFeatureButton} cta-feature-button`}
                type="button"
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Contact Us
              </button>
            </motion.div>
          </motion.div>
        </Container>
      </motion.section>




    </Container>
  );
} 