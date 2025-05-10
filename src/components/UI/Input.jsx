import React, { forwardRef } from "react";

/**
 * Custom Input component with consistent styling
 * 
 * @param {Object} props - Component props
 * @param {string} [props.label] - Input label
 * @param {string} [props.type="text"] - Input type
 * @param {string} [props.placeholder] - Input placeholder
 * @param {string} [props.value] - Input value
 * @param {function} [props.onChange] - Change handler
 * @param {string} [props.error] - Error message
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.disabled] - Whether input is disabled
 * @param {boolean} [props.required] - Whether input is required
 */
const Input = forwardRef(({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  className = "",
  disabled = false,
  required = false,
  ...rest
}, ref) => {
  const inputId = `input-${label?.toLowerCase().replace(/\s+/g, "-") || Math.random().toString(36).substring(2, 9)}`;
  
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          {label}
          {required && <span className="text-customColor-red ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          id={inputId}
          ref={ref}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`w-full p-3 rounded-lg bg-[#2a2a2a] border ${
            error 
              ? "border-customColor-red focus:border-customColor-red" 
              : "border-[#444] focus:border-customColor-blue"
          } focus:outline-none transition-colors text-white ${
            disabled ? "opacity-60 cursor-not-allowed" : ""
          }`}
          {...rest}
        />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-customColor-red">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
