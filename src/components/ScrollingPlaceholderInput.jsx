import React from "react";

const ScrollingPlaceholderInput = ({ label, name, value, onChange, placeholder, type = "text", error, required = false, ...props }) => {
  return (
    <div className="scrolling-input-wrapper mb-3">
      <label className="mb-2">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        {...props}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`form-control p-3 ${error ? 'is-invalid' : ''}`}
        placeholder={placeholder}
      />
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default ScrollingPlaceholderInput;
