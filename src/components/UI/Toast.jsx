import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Individual Toast component
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - Unique toast ID
 * @param {string} props.message - Toast message
 * @param {string} [props.type="info"] - Toast type (success, error, warning, info)
 * @param {number} [props.duration=3000] - Duration in milliseconds
 * @param {function} props.onDismiss - Dismiss callback
 */
const Toast = ({ id, message, type = "info", duration = 3000, onDismiss }) => {
  useEffect(() => {
    if (duration !== Infinity) {
      const timer = setTimeout(() => {
        onDismiss(id);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [id, duration, onDismiss]);
  
  // Define type-specific styling
  const typeStyles = {
    success: "bg-customColor-green border-green-600",
    error: "bg-customColor-red border-red-600",
    warning: "bg-customColor-yellow border-yellow-600",
    info: "bg-customColor-blue border-blue-600",
  };
  
  // Define type-specific icons
  const icons = {
    success: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    ),
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={`flex items-center p-3 mb-3 rounded-lg shadow-lg border ${typeStyles[type]} backdrop-blur-sm bg-opacity-90`}
      role="alert"
    >
      <div className="mr-3 flex-shrink-0">
        {icons[type]}
      </div>
      <div className="mr-6 flex-grow">{message}</div>
      <button 
        onClick={() => onDismiss(id)} 
        className="flex-shrink-0 text-white p-1 rounded-full hover:bg-white hover:bg-opacity-20"
        aria-label="Close notification"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </motion.div>
  );
};

/**
 * Toast Container with context
 */
export const ToastContext = React.createContext({
  showToast: () => {},
  dismissToast: () => {},
});

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  
  const showToast = (message, options = {}) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, ...options }]);
    return id;
  };
  
  const dismissToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  
  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col items-end max-w-xs sm:max-w-sm">
        <AnimatePresence>
          {toasts.map(toast => (
            <Toast
              key={toast.id}
              id={toast.id}
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              onDismiss={dismissToast}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

// Custom hook to use the toast context
export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
