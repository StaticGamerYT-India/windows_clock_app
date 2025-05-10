import React from "react";
import { motion } from "framer-motion";

/**
 * Card component with consistent styling and animations
 * 
 * @param {Object} props - Component props
 * @param {string} [props.title] - Card title
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.variant="default"] - Card variant (default, elevated, flat)
 * @param {boolean} [props.hoverable=false] - Whether card should have hover effect
 * @param {Object} [props.motionProps] - Props to pass to the motion component
 */
const Card = ({ 
  title,
  children, 
  className = "",
  variant = "default",
  hoverable = false,
  motionProps = {},
  ...rest
}) => {
  // Base styles all cards will have
  const baseStyles = "rounded-xl overflow-hidden";
  
  // Variant specific styles
  const variantStyles = {
    default: "bg-mica-component backdrop-blur-mica border border-[#3a3a3a] shadow-md",
    elevated: "bg-mica-component backdrop-blur-mica border border-[#333] shadow-lg",
    flat: "bg-[#2a2a2a] border border-[#333]",
  };
  
  // Hover styles
  const hoverStyles = hoverable ? "hover:shadow-lg transition-shadow duration-300" : "";

  return (
    <motion.div
      className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}
      {...motionProps}
      {...rest}
    >
      {title && (
        <div className="px-5 py-3 border-b border-[#333]">
          <h3 className="text-lg font-medium text-white">{title}</h3>
        </div>
      )}
      <div className={title ? "p-5" : "p-5"}>
        {children}
      </div>
    </motion.div>
  );
};

export default Card;
