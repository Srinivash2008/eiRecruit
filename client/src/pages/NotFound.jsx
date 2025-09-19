import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { useTheme } from '@emotion/react';
import { motion } from 'framer-motion';

const containerStyle = theme => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
`;

const titleStyle = theme => css`
  color: ${theme.colors.primary};
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const descStyle = theme => css`
  color: ${theme.colors.black};
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const linkStyle = theme => css`
  color: ${theme.colors.secondary};
  font-size: 1.1rem;
  text-decoration: underline;
  cursor: pointer;
`;

export default function NotFound() {
  const theme = useTheme();
  // Animation variant
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0.2, 0.2, 1] } }
  };
  return (
    <motion.div css={containerStyle(theme)} initial="hidden" animate="visible" variants={fadeUp}>
      <motion.div css={titleStyle(theme)} variants={fadeUp}>404</motion.div>
      <motion.div css={descStyle(theme)} variants={fadeUp}>Page not found.</motion.div>
      <motion.div variants={fadeUp}>
        <Link to="/" css={linkStyle(theme)}>Go back Home</Link>
      </motion.div>
    </motion.div>
  );
} 