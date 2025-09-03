import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Home from './Home';
import About from './About';
import Services from './Services';
import Careers from './Careers';
import Contact from './Contact';
const sectionStyle = {
  minHeight: '100vh',
  // padding: '2rem 0',
  scrollMarginTop: '70px' // Account for fixed header
};
const sectionStyle1 = {
  minHeight: '66vh',
  // padding: '2rem 0',
  scrollMarginTop: '70px' // Account for fixed header
};

const sectionDivider = {
  width: '100%',
  height: '2px',
  background: 'linear-gradient(90deg, #e0e7ff 0%, #fff 100%)',
  opacity: 0.5,
  margin: '0',
  borderRadius: '1px'
};


export default function SinglePage() {
  const [activeSection, setActiveSection] = useState('home');

  // Intersection Observer to track which section is in view
  useEffect(() => {
    const observerOptions = {
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
          
          // Dispatch custom event to notify Header component
          window.dispatchEvent(new CustomEvent('activeSectionChange', {
            detail: { section: sectionId }
          }));
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
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

  // Expose scrollToSection to window for header component
  useEffect(() => {
    window.scrollToSection = scrollToSection;
    return () => {
      delete window.scrollToSection;
    };
  }, []);

  return (
    <div>
      {/* Home Section */}
      <section id="home" style={sectionStyle1}>
        <Home />
      </section>

      {/* <div style={sectionDivider} /> */}

      {/* About Section */}
      <section id="about" style={sectionStyle}>
        <About />
      </section>

      <div style={sectionDivider} />

      {/* Services Section */}
      <section id="services" style={sectionStyle}>
        <Services />
      </section>

      {/* <div style={sectionDivider} /> */}


      {/* Careers Section */}
      <section id="careers" style={sectionStyle}>
        <Careers />
      </section>

      {/* <div style={sectionDivider} /> */}

      {/* Contact Section */}
      <section id="contact" style={sectionStyle}>
        <Contact />
      </section>
    </div>
  );
} 