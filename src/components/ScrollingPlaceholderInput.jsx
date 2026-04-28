import React, { useState, useEffect } from "react";

const ScrollingPlaceholderInput = ({ label, name, value, onChange, placeholder, type = "text", error, required = false, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  
  // Only scroll if text is long
  const shouldScroll = placeholder && placeholder.length > 30;

  return (
    <div className="scrolling-input-wrapper mb-3">
      <label className="mb-2">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      
      <div className={`input-container-rel ${isFocused ? 'focused' : ''} ${error ? 'is-invalid' : ''}`}>
        <input
          {...props}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`form-control p-3 ${error ? 'is-invalid' : ''}`}
          placeholder={(!value && !shouldScroll) ? placeholder : ""}
        />
        
        {/* Custom Scrolling Placeholder Layer */}
        {!value && shouldScroll && (
          <div className="placeholder-marquee-container">
            <div className="placeholder-marquee-text">
              {placeholder} &nbsp;&nbsp;&nbsp; {placeholder} &nbsp;&nbsp;&nbsp;
            </div>
          </div>
        )}
      </div>
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default ScrollingPlaceholderInput;
