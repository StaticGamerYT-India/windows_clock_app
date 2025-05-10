import React from "react";
import { motion } from "framer-motion";

/**
 * Button component with consistent styling and animations
 * 
 * @param {Object} props - Component props
 * @param {string} [props.variant="primary"] - Button variant (primary, secondary, outline, danger)
 * @param {string} [props.size="md"] - Button size (sm, md, lg)
 * @param {boolean} [props.fullWidth=false] - Whether button should take full width
 * @param {boolean} [props.disabled=false] - Whether button is disabled
 * @param {boolean} [props.isLoading=false] - Whether button is in loading state
 * @param {React.ReactNode} props.children - Button content
 * @param {function} props.onClick - Click handler
 * @param {string} [props.className] - Additional CSS classes
 */
const Button = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  isLoading = false,
  children,
  onClick,
  className = "",
  ...rest
}) => {
  // Base styles all buttons will have
  const baseStyles = "rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-[#2a2a2a] flex items-center justify-center";
  
  // Variant specific styles
  const variantStyles = {
    primary: "bg-customColor-blue hover:bg-blue-600 text-white focus:ring-customColor-blue",
    secondary: "bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white focus:ring-gray-500",
    outline: "border border-[#4a4a4a] hover:bg-[#2a2a2a] text-white focus:ring-gray-400",
    danger: "bg-customColor-red hover:bg-red-600 text-white focus:ring-red-500",
    success: "bg-customColor-green hover:bg-green-600 text-white focus:ring-green-500"
  };
  
  // Size specific styles
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  };
  
  // State styles
  const disabledStyles = disabled || isLoading ? 
    "opacity-60 cursor-not-allowed pointer-events-none" : "";
  
  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <motion.button
      whileHover={!disabled && !isLoading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
      onClick={!disabled && !isLoading ? onClick : undefined}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabledStyles}
        ${widthStyles}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </div>
      ) : children}
    </motion.button>
  );
};

export default Button;
