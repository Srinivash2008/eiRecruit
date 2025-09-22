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
  padding-top: 3rem;
  padding-bottom: 2rem;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
  margin-top: 1%;

  @media (max-width: 576px) {
    padding: 2rem 1.5rem 2.5rem 1.5rem;
  }
`;


const footerContainer = css`
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;


const copyright = css`
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.6;
  user-select: none;
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

export default function DashBoardFooter() {
  const theme = useTheme();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with ${email}!`);
    setEmail('');
  };

  return (
    <footer css={footerWrapper} role="contentinfo">

      <Container css={footerContainer}>
        <div css={copyright}>
          &copy; {new Date().getFullYear()} eiRecruit. All rights reserved.
        </div>
      </Container>

      {/* <ScrollToTopButton /> */}
    </footer>
  );
}
