import { useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { keyframes } from '@emotion/css';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser, FaBuilding, FaGlobe, FaPhone, FaIdCard } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import logo from '../../assets/logo.png';
import { css as emotionClass } from '@emotion/css';
// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0.2, 0.2, 1] } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// CSS Classes
const signupContainer = emotionClass`
  min-height: 100vh;
  background: linear-gradient(135deg, #0076FF 0%, #1CA638 50%, #FFC72C 100%);
  background-size: 400% 400%;
  animation: ${gradientShift} 8s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.2;
  }
  
  @media (max-width: 576px) {
    padding: 0.5rem;
    align-items: center;
    justify-content: center;
  }
`;

const signupCard = emotionClass`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 118, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 3rem 2.5rem;
  max-width: 550px;
  width: 100%;
  position: relative;
  z-index: 1;
  
  @media (max-width: 576px) {
    padding: 2rem 1.5rem;
    margin: 0;
    border-radius: 20px;
    max-width: 100%;
  }
`;

const logoSection = emotionClass`
  text-align: center;
  margin-bottom: 2rem;
`;

const logoImage = emotionClass`
  width: 120px;
  height: auto;
  margin-bottom: 1rem;
  animation: ${float} 3s ease-in-out infinite;
  
  @media (max-width: 576px) {
    width: 100px;
  }
`;

const signupHeader = emotionClass`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const signupTitle = emotionClass`
  color: #0076FF;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #0076FF 0%, #1CA638 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const signupSubtitle = emotionClass`
  color: #666;
  font-size: 1rem;
  margin-bottom: 0;
`;

const formGroup = emotionClass`
  margin-bottom: 1.5rem;
  position: relative;
`;

const formLabel = emotionClass`
  color: #333;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  display: block;
`;

const formControl = emotionClass`
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 0.875rem 1rem 0.875rem 3rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  width: 100%;
  
  &:focus {
    border-color: #0076FF;
    box-shadow: 0 0 0 3px rgba(0, 118, 255, 0.1);
    outline: none;
    background: rgba(255, 255, 255, 0.95);
  }
  
  &::placeholder {
    color: #a0aec0;
  }
`;

const inputIcon = emotionClass`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #0076FF;
  font-size: 1.1rem;
  z-index: 2;
`;

const passwordToggle = emotionClass`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #0076FF;
  cursor: pointer;
  font-size: 1.1rem;
  z-index: 2;
  transition: color 0.3s ease;
  
  &:hover {
    color: #1CA638;
  }
`;

const signupButton = emotionClass`
  background: linear-gradient(135deg, #0076FF 0%, #1CA638 100%);
  border: none;
  border-radius: 12px;
  padding: 0.875rem 2rem;
  font-weight: 600;
  font-size: 1rem;
  color: white;
  width: 100%;
  margin-top: 1rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 118, 255, 0.3);
    background: linear-gradient(135deg, #0056b3 0%, #169a2e 100%);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const termsCheckbox = emotionClass`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin: 1.5rem 0;
  
  input[type="checkbox"] {
    margin-top: 0.25rem;
    accent-color: #0076FF;
    transform: scale(1.2);
  }
  
  label {
    color: #666;
    font-size: 0.9rem;
    line-height: 1.4;
    cursor: pointer;
    
    a {
      color: #0076FF;
      text-decoration: none;
      font-weight: 600;
      
      &:hover {
        color: #1CA638;
        text-decoration: underline;
      }
    }
  }
`;

const loginLink = emotionClass`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
  
  span {
    color: #666;
  }
  
  a {
    color: #0076FF;
    text-decoration: none;
    font-weight: 600;
    margin-left: 0.5rem;
    transition: color 0.3s ease;
    
    &:hover {
      color: #1CA638;
      text-decoration: underline;
    }
  }
`;



const floatingShapes = emotionClass`
  position: absolute;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: ${pulse} 4s ease-in-out infinite;
  
  &:nth-child(1) {
    top: 20%;
    left: 10%;
    animation-delay: 0s;
    background: rgba(255, 199, 44, 0.2);
  }
  
  &:nth-child(2) {
    top: 60%;
    right: 15%;
    animation-delay: 1s;
    background: rgba(28, 166, 56, 0.2);
  }
  
  &:nth-child(3) {
    bottom: 20%;
    left: 20%;
    animation-delay: 2s;
    background: rgba(0, 118, 255, 0.2);
  }
`;

const brandFeatures = emotionClass`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1.5rem;
  
  @media (max-width: 576px) {
    gap: 1rem;
  }
`;

const featureItem = emotionClass`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #0076FF;
  font-size: 0.9rem;
  font-weight: 500;
  
  @media (max-width: 576px) {
    font-size: 0.8rem;
  }
`;

const formRow = emotionClass`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export default function Signup() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!acceptTerms) {
      setError('Please accept the terms and conditions to continue.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, just navigate to home
      // In real app, you would create the account here
      navigate('/');
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={signupContainer}>
      {/* Floating shapes for background */}
      <div className={floatingShapes}></div>
      <div className={floatingShapes}></div>
      <div className={floatingShapes}></div>
      


      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <motion.div
              className={signupCard}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <motion.div className={logoSection} variants={stagger}>
                <img src={logo} alt="eiRecruit Logo" className={logoImage} />
              </motion.div>

              <motion.div className={signupHeader} variants={stagger}>
                {/* <h1 className={signupTitle}>Join Us</h1> */}
                <p className={signupSubtitle}>Create your account to access our recruitment services</p>
              </motion.div>

              <motion.form onSubmit={handleSubmit} variants={stagger}>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Alert variant="danger" className="mb-3">
                      {error}
                    </Alert>
                  </motion.div>
                )}

                <motion.div className={formRow} variants={fadeInUp}>
                  <div className={formGroup}>
                    <label className={formLabel}>First Name</label>
                    <div style={{ position: 'relative' }}>
                      <FaUser className={inputIcon} />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={formControl}
                        placeholder="Enter first name"
                        required
                      />
                    </div>
                  </div>

                  <div className={formGroup}>
                    <label className={formLabel}>Last Name</label>
                    <div style={{ position: 'relative' }}>
                      <FaUser className={inputIcon} />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={formControl}
                        placeholder="Enter last name"
                        required
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div className={formGroup} variants={fadeInUp}>
                  <label className={formLabel}>Email Address</label>
                  <div style={{ position: 'relative' }}>
                    <FaEnvelope className={inputIcon} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={formControl}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div className={formRow} variants={fadeInUp}>
                  <div className={formGroup}>
                    <label className={formLabel}>Phone Number</label>
                    <div style={{ position: 'relative' }}>
                      <FaPhone className={inputIcon} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={formControl}
                        placeholder="Enter phone number"
                        required
                      />
                    </div>
                  </div>

                  <div className={formGroup}>
                    <label className={formLabel}>Company</label>
                    <div style={{ position: 'relative' }}>
                      <FaBuilding className={inputIcon} />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className={formControl}
                        placeholder="Enter company name"
                        required
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div className={formGroup} variants={fadeInUp}>
                  <label className={formLabel}>Password</label>
                  <div style={{ position: 'relative' }}>
                    <FaLock className={inputIcon} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={formControl}
                      placeholder="Create a password"
                      required
                    />
                    <button
                      type="button"
                      className={passwordToggle}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </motion.div>

                <motion.div className={formGroup} variants={fadeInUp}>
                  <label className={formLabel}>Confirm Password</label>
                  <div style={{ position: 'relative' }}>
                    <FaLock className={inputIcon} />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={formControl}
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      className={passwordToggle}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </motion.div>

                <motion.div className={termsCheckbox} variants={fadeInUp}>
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                  />
                  <label htmlFor="terms">
                    I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
                  </label>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <button
                    type="submit"
                    className={signupButton}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </motion.div>

                <motion.div className={brandFeatures} variants={fadeInUp}>
                  <div className={featureItem}>
                    <FaBuilding />
                    <span>Global Talent</span>
                  </div>
                  <div className={featureItem}>
                    <FaGlobe />
                    <span>Ireland Focus</span>
                  </div>
                </motion.div>

                <motion.div className={loginLink} variants={fadeInUp}>
                  <span>Already have an account?</span>
                  <Link to="/login">Sign in</Link>
                </motion.div>
              </motion.form>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
} 