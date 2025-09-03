/** @jsxImportSource @emotion/react */
import { Container, Row, Col, Button } from 'react-bootstrap';
import { css } from '@emotion/react';
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaInfoCircle,
  FaBriefcase,
  FaUserFriends,
  FaPaperPlane,
  FaArrowUp,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';
import logo from '../assets/logo.png';

const colors = {
  mainBlue: '#0076FF',
  accentGreen: '#1CA638',
  accentOrange: '#FFB800',
  white: '#FFFFFF',
  darkBgStart: '#0F1014',
  darkBgEnd: '#23242a',
};

const footerWrapper = css`
  position: relative;
  background: linear-gradient(135deg, ${colors.darkBgStart}, ${colors.darkBgEnd});
  color: ${colors.white};
  padding-top: 4rem;
  padding-bottom: 2.5rem;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
  margin-top: 1%;

  @media (max-width: 576px) {
    padding: 2rem 1.5rem 2.5rem 1.5rem;
  }
`;

// Decorative wave svg
const waveSvg = css`
  position: absolute;
  top: 10px;
  left: 0;
  width: 100%;
  height: 96px;
  z-index: 0;
  pointer-events: none;

  path {
    fill: rgba(255, 255, 255, 0.06);
  }
`;

const footerContainer = css`
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

// Footer grid with increased gaps and better spacing:
// About: 1.2fr, Quick Links: 0.8fr, Contact: 1.5fr
const footerGrid = css`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr 1.5fr;
  gap: 4.5rem;
  margin-bottom: 2.8rem;

  @media (max-width: 991px) {
    grid-template-columns: 1fr 1fr;
    gap: 3.5rem;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const footerCol = css`
  display: flex;
  flex-direction: column;
  margin-top: 0;

  // Add bottom margin on small screens for spacing between stacked cols
  @media (max-width: 576px) {
    margin-top: 0.5rem;
  }
`;

// Logo styling with fixed max-width for consistency
const footerLogo = css`
  max-width: 160px;
  width: 100%;
  margin-bottom: 1rem;
  cursor: default;
  user-select: none;
  display: block;
  object-fit: contain;
`;

// About description styling with text-align justify
const footerAboutText = css`
  color: #ccc;
  font-size: 1rem;
  text-align: justify;
  line-height: 1.6;
  opacity: 0.85;
  user-select: none;

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

const sectionTitle = css`
  font-weight: 700;
  font-size: 1.15rem;
  color: ${colors.accentGreen};
  margin-top: 4%;
  margin-bottom: 1.3rem;
`;

const footerList = css`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.9rem 1.5rem;

  li {
    margin-bottom: 0;

    a {
      color: #bbb;
      font-size: 1rem;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.6rem;
      transition: color 0.3s ease;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &:hover,
      &:focus {
        color: ${colors.mainBlue};
        outline: none;
      }
    }
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 0.9rem;
  }
`;

const iconStyle = css`
  min-width: 20px;
  color: ${colors.accentGreen};
`;

const socialRow = css`
  display: flex;
  gap: 1.1rem;
  margin-top: 0.8rem;
`;

const socialIcon = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.08);
  width: 38px;
  height: 38px;
  border-radius: 50%;
  color: ${colors.white};
  font-size: 1.25rem;
  transition: all 0.25s ease;
  cursor: pointer;
  user-select: none;

  &:hover,
  &:focus {
    background: ${colors.accentGreen};
    color: ${colors.white};
    outline: none;
  }
`;

const divider = css`
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  margin: 0 2rem 1.2rem 2rem;

  @media (max-width: 576px) {
    margin: 0 1.5rem 1.2rem 1.5rem;
  }
`;

const copyright = css`
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.6;
  user-select: none;
`;

const quickContactForm = css`
  display: flex;
  flex-direction: column;

  input {
    border-radius: 30px;
    padding: 0.6rem 1.2rem;
    border: none;
    margin-bottom: 1rem;
    font-size: 1rem;
    outline: none;
    transition: box-shadow 0.25s ease;

    &::placeholder {
      color: #999;
    }

    &:focus {
      box-shadow: 0 0 8px ${colors.accentGreen};
    }
  }
`;

const submitBtn = css`
  padding: 0.6rem 1rem;
  border-radius: 30px;
  font-weight: 700;
  background: linear-gradient(90deg, #0076ff 0%, #1ca638 100%);
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover,
  &:focus {
    background: linear-gradient(90deg, #1ca638 0%, #0076ff 100%);
    box-shadow: 0 0 12px ${colors.mainBlue};
    outline: none;
    transform: translateY(-2px);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(3px);
  }
`;

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 120);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          css={css`
            position: fixed;
            right: 30px;
            bottom: 30px;
            background: ${colors.mainBlue};
            color: white;
            border: none;
            border-radius: 50%;
            width: 52px;
            height: 52px;
            font-size: 1.4rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 6px 20px #0076ff55;
            transition: all 0.3s ease-in-out;
            z-index: 999;
            user-select: none;

            &:hover {
              background: ${colors.accentOrange};
              color: black;
              transform: scale(1.1);
            }
          `}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function Footer() {
  const theme = useTheme();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with ${email}!`);
    setEmail('');
  };

  return (
    <footer css={footerWrapper} role="contentinfo">
      <svg
        css={waveSvg}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 64L1440 0v96H0v-32z" />
      </svg>

      <Container css={footerContainer}>
        <div css={footerGrid}>
          {/* About */}
          <div css={footerCol} aria-label="About eiRecruit">
            <img src={logo} alt="eiRecruit Logo" css={footerLogo} />
            <p css={footerAboutText}>
              Empowering your hiring with technology and expertise. We connect businesses with top talent and help teams grow.
            </p>
            <p
              css={css`
              margin-top: 1rem;
              font-weight: 700;
              font-size: 1.2rem;
              letter-spacing: 0.07em;
              text-align: center;
              background: linear-gradient(90deg, #1CA638, #0076FF);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              color: transparent;
            `}
            >
              &ldquo;Connecting Global Talent with World-Class Opportunities.&rdquo;
            </p>

          </div>

          {/* Quick Links */}
          <nav css={footerCol} aria-label="Quick links">
            <div css={sectionTitle}>Quick Links</div>
            <ul css={footerList}>
              <li>
                <a href="#about">
                  <FaInfoCircle css={iconStyle} /> About Us
                </a>
              </li>
              <li>
                <a href="#services">
                  <FaBriefcase css={iconStyle} /> Our Services
                </a>
              </li>
              <li>
                <a href="#careers">
                  <FaUserFriends css={iconStyle} /> Career Opportunities
                </a>
              </li>
              <li>
                <a href="#contact">
                  <FaEnvelope css={iconStyle} /> Contact Us
                </a>
              </li>
            </ul>

          </nav>

          {/* Contact */}
          <div css={footerCol} aria-label="Contact information">
            <div css={sectionTitle}>Contact</div>
            <a
              href="mailto:hr@eirecruitconsulting.com"
              css={footerList}
              style={{
                marginBottom: '1rem',
                color: '#bbb',
                fontSize: '1rem',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                textAlign: 'justify',
              }}
            >
              <FaEnvelope css={iconStyle} /> hr@eirecruitconsulting.com
            </a>
            <a
              href="tel:+12345678900"
              css={footerList}
              style={{
                marginBottom: '1.5rem',
                color: '#bbb',
                fontSize: '1rem',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                textAlign: 'justify',
              }}
            >
              <FaPhone css={iconStyle} /> +91 8870694685
            </a>
            <div css={socialRow} role="list">
              <a href="#" css={socialIcon} aria-label="Facebook" role="listitem" tabIndex={0}>
                <FaFacebook />
              </a>
              <a href="#" css={socialIcon} aria-label="Twitter" role="listitem" tabIndex={0}>
                <FaTwitter />
              </a>
              <a href="#" css={socialIcon} aria-label="LinkedIn" role="listitem" tabIndex={0}>
                <FaLinkedin />
              </a>
              <a href="#" css={socialIcon} aria-label="Instagram" role="listitem" tabIndex={0}>
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        <hr css={divider} />

        <div css={copyright}>
          &copy; {new Date().getFullYear()} eiRecruit. All rights reserved.
        </div>
      </Container>

      <ScrollToTopButton />
    </footer>
  );
}
