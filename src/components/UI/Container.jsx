import React from "react";

/**
 * Container component for consistent layout
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Container content
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.fluid=false] - Whether container should be full width
 * @param {string} [props.as="div"] - HTML element to render
 */
const Container = ({
  children,
  className = "",
  fluid = false,
  as: Component = "div",
  ...rest
}) => {
  return (
    <Component
      className={`
        ${fluid ? "w-full" : "container mx-auto px-4 md:px-6"}
        ${className}
      `}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Container;
