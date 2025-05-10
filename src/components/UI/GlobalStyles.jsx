import React from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * GlobalStyles component that applies dynamic styles based on theme
 * and screen size. This component doesn't render any visible UI.
 */
const GlobalStyles = () => {
  const { theme } = useTheme();
  
  React.useEffect(() => {
    // Define custom properties that vary by theme
    const rootStyles = {
      dark: {
        '--shadow-color': 'rgba(0, 0, 0, 0.3)',
        '--shadow-color-strong': 'rgba(0, 0, 0, 0.5)',
        '--button-hover': 'rgba(255, 255, 255, 0.1)',
        '--button-active': 'rgba(255, 255, 255, 0.2)',
        '--transition-speed': '0.15s',
      },
      light: {
        '--shadow-color': 'rgba(0, 0, 0, 0.1)',
        '--shadow-color-strong': 'rgba(0, 0, 0, 0.2)',
        '--button-hover': 'rgba(0, 0, 0, 0.05)',
        '--button-active': 'rgba(0, 0, 0, 0.1)',
        '--transition-speed': '0.15s',
      }
    };
    
    // Apply custom properties
    const styles = rootStyles[theme];
    Object.entries(styles).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
    });
    
    // Apply touch optimizations for mobile devices
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouchDevice) {
      document.documentElement.classList.add('touch-device');
    } else {
      document.documentElement.classList.remove('touch-device');
    }
    
    // Fix iOS height issues
    const setAppHeight = () => {
      document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    
    window.addEventListener('resize', setAppHeight);
    setAppHeight();
    
    // Apply iOS safe area paddings if needed
    const applySafeAreas = () => {
      const hasInset = CSS.supports('padding: max(0px)') && 
                      CSS.supports('padding: env(safe-area-inset-bottom)');
      if (hasInset) {
        document.documentElement.classList.add('has-safe-areas');
      }
    };
    
    applySafeAreas();
    
    return () => {
      window.removeEventListener('resize', setAppHeight);
    };
  }, [theme]);
  
  return null; // This component doesn't render anything visible
};

export default GlobalStyles;
