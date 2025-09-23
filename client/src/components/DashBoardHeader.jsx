/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import logo from '../assets/logo.png';
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const navBarStyle = css`
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1100;
  padding: 0 2rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const navContainer = css`
  max-width: 1200px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #222;
`;

const brandStyle = css`
  font-weight: 900;
  font-size: 1.8rem;
  color: #222;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;

  img {
    height: 48px;
  }

  &:hover,
  &:focus-visible {
    color: #0076ff;
  }

  &:focus {
    outline: none;
  }
`;

const navLinksContainer = css`
  display: flex;
  gap: 2.5rem;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const navLinkBase = css`
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  padding-bottom: 8px;
  position: relative;
  transition: color 0.3s ease;
  user-select: none;
  cursor: pointer;
  background: none;
  border: none;
  font-family: inherit;
  color: #222;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 3px;
    background-color: #0076ff;
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  &:hover,
  &:focus-visible {
    color: #005fcc;

    &::after {
      width: 100%;
    }
  }

  &:focus {
    outline: none;
  }
`;

const activeLinkStyle = css`
  color: #0076ff !important;

  &::after {
    width: 100% !important;
  }
`;

const menuToggleStyle = css`
  display: none;

  @media (max-width: 1024px) {
    display: block;
    background: none;
    border: none;
    cursor: pointer;
    position: relative;
    width: 28px;
    height: 22px;
    padding: 0;
    user-select: none;

    span {
      display: block;
      height: 3px;
      background: #0076ff;
      border-radius: 2px;
      transition: transform 0.3s ease, opacity 0.3s ease;
      position: relative;
      transform-origin: center;
      margin-bottom: 6px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &:focus {
      outline: none;
    }
  }
`;

const openTopBar = css`
  transform: translateY(9px) rotate(45deg);
`;

const openMiddleBar = css`
  opacity: 0;
`;

const openBottomBar = css`
  transform: translateY(-9px) rotate(-45deg);
`;

const mobileNavLinksContainer = css`
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  overflow-y: auto;
  z-index: 1000;

  scrollbar-width: thin;
  scrollbar-color: #ddd transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 3px;
  }

  a, button {
    font-weight: 600;
    font-size: 1.2rem;
    color: #222;
    padding: 1rem 0;
    border-bottom: 1px solid #eee;
    text-decoration: none;
    background: none;
    border: none;
    text-align: left;
    font-family: inherit;

    &:last-child {
      border-bottom: none;
    }

    &:hover,
    &:focus-visible {
      color: #0076ff;
    }

    &:focus {
      outline: none;
    }
  }
`;

const modalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const modalBox = css`
  background: #fff;
  padding: 2rem;
  border-radius: 16px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0,0,0,0.2);
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }

 h2 {
  margin-bottom: 1rem;
  font-size: 1.3rem;
  font-weight: 800;
  text-align: center;
  letter-spacing: 0.5px;
  background: linear-gradient(90deg, #0076ff, #00c6ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}


  p {
    margin-bottom: 1.5rem;
    color: #555;
  }

  button {
    padding: 0.5rem 1.1rem;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    margin: 0 0.5rem;
    transition: background 0.3s ease;
  }

  .confirm {
    background: #0076ff;
    color: white;

    &:hover {
      background: #005fcc;
    }
  }

  .cancel {
    background: #f0f0f0;
    color: #333;

    &:hover {
      background: #ddd;
    }
  }
`;


export default function DashBoardHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const token = Cookies.get("token");

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
    toast.success("Logout successful");
    setShowLogoutModal(false);
  };


  const isSinglePage = location.pathname === '/';

  const navItems = [
    // { to: '/dashboard', label: 'Home' },
    { to: '/CurrentOpenings', label: 'Current Opening' },
    { to: '/candidateregistration', label: 'Registration' },
    { to: '/submittedquery', label: 'Query' },
    { to: '/jobseekerlist', label: 'Job Seeker' },

    ...(token
      ? [{ to: "/logout", label: "Logout", sectionId: null, onClick: () => setShowLogoutModal(true) }]
      : [{ to: "/login", label: "Login", sectionId: null }]),
  ];

  useEffect(() => {
    if (!isSinglePage) return;

    const sections = navItems
      .filter(item => item.sectionId)
      .map(item => document.getElementById(item.sectionId));

    const handleScroll = () => {
      const scrollY = window.scrollY;

      let currentSection = 'home';
      for (const section of sections) {
        if (section) {
          const sectionTop = section.offsetTop - 80; // Adjusted for header height
          if (scrollY >= sectionTop) {
            currentSection = section.id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isSinglePage, navItems]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLinkClick = (item) => {
    setMenuOpen(false);

    if (item.onClick) {
      item.onClick(); // logout action
      return;
    }

    if (item.sectionId && isSinglePage) {
      const element = document.getElementById(item.sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        setActiveSection(item.sectionId);
      }
    } else {
      navigate(item.to);
    }
  };

  const isActive = (item) => {
    if (item.sectionId && isSinglePage) {
      return activeSection === item.sectionId;
    }
    return location.pathname === item.to;
  };

  return (
    <nav css={navBarStyle} role="navigation" aria-label="Main Navigation">
      <div css={navContainer}>
        <NavLink to="/dashboard" css={brandStyle} onClick={() => setMenuOpen(false)} aria-label="Homepage">
          <img src={logo} alt="Logo" />
        </NavLink>

        <button
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={toggleMenu}
          type="button"
          css={menuToggleStyle}
        >
          <span css={menuOpen ? openTopBar : undefined} />
          <span css={menuOpen ? openMiddleBar : undefined} />
          <span css={menuOpen ? openBottomBar : undefined} />
        </button>

        <div css={navLinksContainer} id="primary-navigation" role="menu">
          {navItems.map((item) => (
            <button
              key={item.to + item.label}
              onClick={() => handleLinkClick(item)}
              css={[navLinkBase, isActive(item) && activeLinkStyle]}
              role="menuitem"
              tabIndex={0}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {showLogoutModal && (
        <div css={modalOverlay}>
          <div css={modalBox}>
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to log out?</p>
            <button className="confirm" onClick={handleLogout}>Yes, Logout</button>
            <button className="cancel" onClick={() => setShowLogoutModal(false)}>Cancel</button>
          </div>
        </div>
      )}


      {menuOpen && (
        <div css={mobileNavLinksContainer} role="menu" aria-label="Mobile Navigation">
          {navItems.map((item) => (
            <button
              key={item.to + item.label}
              onClick={() => handleLinkClick(item)}
              css={[navLinkBase, isActive(item) && activeLinkStyle]}
              role="menuitem"
              tabIndex={0}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}