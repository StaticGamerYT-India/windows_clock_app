import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for theme management
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check for user preference in localStorage or system preference
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('windows-clock-theme');
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check system preference if available
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    
    // Default to dark mode
    return 'dark';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Apply theme changes to the document
  useEffect(() => {
    localStorage.setItem('windows-clock-theme', theme);
    
    // Update the classList for Tailwind dark mode
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.body.style.backgroundColor = '#1a1a1a';
      document.body.style.color = '#ffffff';
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f5f5f5';
      document.body.style.color = '#333333';
    }
    
    // Set data attribute for any non-Tailwind styling
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Listen for system preference changes
  useEffect(() => {
    if (!window.matchMedia) return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      const savedTheme = localStorage.getItem('windows-clock-theme');
      if (!savedTheme) {
        setTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
