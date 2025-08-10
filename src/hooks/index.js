import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive design detection
 * Demonstrates modern React patterns and mobile-first approach
 */
export const useResponsive = () => {
  const [breakpoint, setBreakpoint] = useState(getBreakpoint());
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  function getBreakpoint() {
    if (typeof window === 'undefined') return 'desktop';
    
    const width = window.innerWidth;
    if (width < 640) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  useEffect(() => {
    const handleResize = () => {
      const newBreakpoint = getBreakpoint();
      setBreakpoint(newBreakpoint);
      setIsMobile(newBreakpoint === 'mobile');
      setIsTablet(newBreakpoint === 'tablet');
      setIsDesktop(newBreakpoint === 'desktop');
    };

    // Initialize
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
    // Utility functions
    isMobileOrTablet: isMobile || isTablet,
    isTabletOrDesktop: isTablet || isDesktop
  };
};

/**
 * Custom hook for dark mode theme management
 * Demonstrates state persistence and system preference detection
 */
export const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    
    // Check localStorage first
    const saved = localStorage.getItem('portfolio-theme');
    if (saved) return saved === 'dark';
    
    // Fall back to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    if (isDark) {
      root.classList.add('dark');
      body.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      body.setAttribute('data-theme', 'light');
    }
    
    // Persist preference
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return {
    isDark,
    isLight: !isDark,
    toggleTheme,
    setTheme: setIsDark
  };
};

/**
 * Custom hook for intersection observer (scroll animations)
 * Demonstrates performance-conscious modern web development
 */
export const useIntersectionObserver = (threshold = 0.1, rootMargin = '0px') => {
  const [ref, setRef] = useState(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, hasIntersected]);

  return {
    ref: setRef,
    isIntersecting,
    hasIntersected
  };
};