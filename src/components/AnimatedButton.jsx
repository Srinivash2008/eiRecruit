import { Link } from 'react-router-dom';
import { css as emotionClass, keyframes } from '@emotion/css';

// Button 1: Hero Center Button with Glow and Shine
const shineSlide = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 15px rgba(0, 132, 255, 0.6); }
  50% { box-shadow: 0 0 25px rgba(0, 132, 255, 1); }
`;

const button1 = emotionClass`
  padding: 20px 64px;
  background: linear-gradient(120deg, #00c6ff, #0072ff);
  background-size: 300% 300%;
  color: white;
  font-weight: 700;
  font-size: 20px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  animation: ${glow} 3s ease-in-out infinite;
  transition: all 0.4s ease;
  display: inline-block;
  position: relative;
  overflow: hidden;
  &:hover {
    animation: ${shineSlide} 2s linear infinite;
    transform: scale(1.08);
  }
`;

// Button 2: Icon Slide In (Updated)
const slideIn = keyframes`
  0% { transform: translateX(-8px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

const button2 = emotionClass`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  background-color: #43a047;
  color: white;
  font-weight: 600;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.15s ease;
  outline: none;

  /* Slide in icon on hover */
  &:hover svg {
    animation: ${slideIn} 0.3s forwards;
    transform-origin: center;
    transform: scale(1.1);
  }

  /* Subtle shadow and darker background on hover */
  &:hover {
    background-color: #388e3c;
    box-shadow: 0 4px 12px rgba(56, 142, 60, 0.5);
  }

  /* Active/click effect */
  &:active {
    background-color: #2e7d32;
    box-shadow: none;
    transform: scale(0.95);
  }

  /* Focus visible outline for keyboard users */
  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(67, 160, 71, 0.6);
  }

  svg {
    transition: transform 0.3s ease;
  }
`;

// Button 3: Outline Morph
const button3 = emotionClass`
  padding: 14px 32px;
  background: none;
  border: 2px solid #f50057;
  color: #f50057;
  font-weight: 600;
  font-size: 16px;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover {
    border-radius: 30px;
    background-color: #f50057;
    color: white;
  }
`;

// Button 4: Blurred Background
const button4 = emotionClass`
  padding: 14px 32px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  background: rgba(33, 150, 243, 0.2);
  border: 2px solid rgba(33, 150, 243, 0.4);
  border-radius: 12px;
  backdrop-filter: blur(8px);
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(33, 150, 243, 0.4);
    box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
  }
`;

// Button 5: Simple Color Transition (Blue to Green)
const shine = keyframes`
  0% { background-position: -200%; }
  100% { background-position: 200%; }
`;

const button5 = emotionClass`
  padding: 14px 32px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: blue;
  border: none;
  border-radius: 50px;
  text-decoration: none;
  transition: transform 0.3s ease, background-color 0.5s ease;
  &:hover {
    animation: ${shine} 2s linear infinite;
    transform: translateY(-3px);
    background-color: green;
  }
`;

export const ButtonOne = ({ label, to }) => <Link to={to} className={button1}>{label}</Link>;

export const ButtonTwo = ({ label, to }) => (
  <Link to={to} className={button2}>
    <span>{label}</span>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </Link>
);

export const ButtonThree = ({ label, to }) => <Link to={to} className={button3}>{label}</Link>;
export const ButtonFour = ({ label, to }) => <Link to={to} className={button4}>{label}</Link>;
export const ButtonFive = ({ label, to }) => <Link to={to} className={button5}>{label}</Link>;

// Example usage:
// <ButtonOne label="Services" to="/services" />
