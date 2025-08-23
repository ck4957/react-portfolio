import React, { useState, useEffect } from 'react';
import Switch from "react-switch";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onThemeSwitchChange = (checked) => {
    setDarkMode(checked);
    const dataThemeAttribute = "data-theme";
    const body = document.body;
    const newTheme = body.getAttribute(dataThemeAttribute) === "dark" ? "light" : "dark";
    body.setAttribute(dataThemeAttribute, newTheme);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('home')}
              className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >
              CK
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <div className="flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200 hover:bg-gray-100"
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            {/* Theme Switch */}
            <div className="flex items-center gap-2 ml-4">
              <span className="text-sm text-gray-600">🌙</span>
              <Switch
                checked={darkMode}
                onChange={onThemeSwitchChange}
                offColor="#e5e7eb"
                onColor="#374151"
                className="react-switch"
                width={50}
                height={25}
                handleDiameter={20}
                uncheckedIcon={false}
                checkedIcon={false}
              />
              <span className="text-sm text-gray-600">☀️</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              <div className="space-y-1">
                <span 
                  className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${
                    isOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                />
                <span 
                  className={`block w-6 h-0.5 bg-current transition-opacity duration-300 ${
                    isOpen ? 'opacity-0' : ''
                  }`}
                />
                <span 
                  className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${
                    isOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0'
        } overflow-hidden bg-white/95 backdrop-blur-md border-b border-gray-200`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-lg font-medium w-full text-left transition-colors duration-200 hover:bg-gray-100"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
