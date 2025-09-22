import { Container, Row, Col } from 'react-bootstrap';
import { css as emotionClass } from '@emotion/css';
import { Link } from 'react-router-dom';
import { FaBriefcase, FaUserPlus, FaQuestionCircle, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Styles inspired by other pages in the project
const dashboardContainer = emotionClass`
  padding: 3rem 1rem;
  background-color: #f8faff;
  min-height: calc(100vh - 70px); // Adjust for header height
`;

const sectionTitle = emotionClass`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 3rem;
  text-align: center;
  background: linear-gradient(135deg, #0076FF 0%, #1CA638 50%, #FFC72C 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 2px 8px rgba(0, 118, 255, 0.15));
`;

const dashboardCard = emotionClass`
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 118, 255, 0.08);
  border: 1px solid rgba(0, 118, 255, 0.1);
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: inherit;


  &:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: 0 12px 40px rgba(28, 166, 56, 0.15);
    border-color: rgba(28, 166, 56, 0.2);
  }
`;

const cardIcon = emotionClass`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #0076FF;
  background: linear-gradient(135deg, #e6f0ff 0%, #fff 100%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0, 118, 255, 0.1);
  transition: all 0.3s ease;

  .${dashboardCard}:hover & {
    background: linear-gradient(135deg, #0076FF 0%, #1CA638 100%);
    color: #fff;
    transform: rotate(10deg) scale(1.1);
  }
`;

const cardTitle = emotionClass`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0;
`;

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0.2, 0.2, 1] } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
};

export default function Dashboard() {
  const dashboardItems = [
    { title: 'Manage Openings', icon: <FaBriefcase />, to: '/CurrentOpenings' },
    { title: 'Candidate Registration', icon: <FaUserPlus />, to: '/careers' },
    { title: 'Submit a Query', icon: <FaQuestionCircle />, to: '/submittedquery' },
    { title: 'Job seeker list', icon: <FaUsers  />, to: '/jobseekerlist' },
  ];

  return (
    <motion.div className={dashboardContainer} initial="hidden" animate="visible" variants={stagger}>
      <Container>
        <motion.h1 className={sectionTitle} variants={fadeUp}>Admin Dashboard</motion.h1>
        <Row className="g-4 justify-content-center">
          {dashboardItems.map((item, index) => (
            <Col md={6} lg={4} xl={3} key={index} className="d-flex">
              <motion.div variants={fadeUp} className="w-100">
                <Link to={item.to} className={dashboardCard}>
                  <div className={cardIcon}>{item.icon}</div>
                  <h3 className={cardTitle}>{item.title}</h3>
                </Link>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </motion.div>
  );
}
