import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  const toggleTheme = () => {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    setIsDarkMode(newTheme === 'dark');
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'blog', label: 'Blog', icon: '📝' },
    { id: 'portfolio', label: 'Projects', icon: '💼' },
    { id: 'skills', label: 'Skills', icon: '🛠️' },
    { id: 'resume', label: 'Experience', icon: '📋' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 70; // navbar height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  // Don't show navbar on blog post pages
  if (location.pathname.includes('/blog/')) {
    return null;
  }

  return (
    <nav className={`navbar-fixed ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => scrollToSection('home')}>
          <span className="brand-icon">CK</span>
        </div>

        <button 
          className={`navbar-toggle ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={`navbar-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => scrollToSection(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            </li>
          ))}
          <li className="theme-toggle-item">
            <button
              className="navbar-link theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              <span className="nav-icon">{isDarkMode ? '☀️' : '🌙'}</span>
              <span className="nav-label">{isDarkMode ? 'Light' : 'Dark'}</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
