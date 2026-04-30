import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../context/ModalContext";
import Logo from "../assets/logo-white.png";
import { applyForScholarship } from "../api/public";
import { useCourses } from "../context/CoursesContext";

const ApplyScholarShipCard = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    let vantaEffect = null;
    let tries = 0;

    const initVanta = () => {
      if (vantaRef.current && window.VANTA && window.VANTA.TOPOLOGY && window.p5) {
        try {
          vantaEffect = window.VANTA.TOPOLOGY({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0xc9a227,
            backgroundColor: 0x0b5d3b,
          });
        } catch (err) {
          console.error("Vanta initialization failed:", err);
        }
      } else if (tries < 30) {
        tries++;
        setTimeout(initVanta, 100);
      }
    };

    initVanta();

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  const navigate = useNavigate();
  const { availableCourses } = useCourses();
  const { showError, showSuccess } = useModal();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    cnic: "",
    rollNumber: "",
    email: "",
    mobileNumber: "",
    firstCourse: "",
    secondCourse: "",
    challanNumber: "",
    image: null,
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters long";
    } else if (formData.fullName.trim().length > 100) {
      newErrors.fullName = "Full name must be less than 100 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName.trim())) {
      newErrors.fullName = "Full name should only contain letters and spaces";
    }

    // CNIC validation (Pakistani CNIC format)
    const cnicRegex = /^\d{13}$/;
    if (!formData.cnic.trim()) {
      newErrors.cnic = "CNIC is required";
    } else if (!cnicRegex.test(formData.cnic.replace(/[^\d]/g, ""))) {
      newErrors.cnic = "Please enter a valid CNIC in format: 3550112345671";
    }
    // CNIC validation is complete with just the 13-digit check
    // Additional date validation removed as CNIC formats can vary

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    } else if (formData.email.length > 254) {
      newErrors.email = "Email address is too long";
    }

    // Mobile validation (Pakistani mobile format)
    const mobileRegex = /^03\d{9}$/;
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!mobileRegex.test(formData.mobileNumber.replace(/[-\s]/g, ""))) {
      newErrors.mobileNumber =
        "Please enter a valid mobile number starting with 03 (e.g., 03001234567)";
    }

    // Challan number validation
    if (!formData.challanNumber.trim()) {
      newErrors.challanNumber = "Challan number is required";
    } else if (formData.challanNumber.trim().length < 3) {
      newErrors.challanNumber =
        "Challan number must be at least 3 characters long";
    } else if (formData.challanNumber.trim().length > 50) {
      newErrors.challanNumber =
        "Challan number must be less than 50 characters";
    } else if (!/^[a-zA-Z0-9\-\s]+$/.test(formData.challanNumber.trim())) {
      newErrors.challanNumber =
        "Challan number should only contain letters, numbers, hyphens, and spaces";
    }

    // Course validation
    if (!formData.firstCourse.trim()) {
      newErrors.firstCourse = "Please select your first course";
    }

    // Second course validation (optional but if selected, must be different from first)
    if (
      formData.secondCourse.trim() &&
      formData.secondCourse === formData.firstCourse
    ) {
      newErrors.secondCourse =
        "Second course must be different from first course";
    }

    // File validation
    if (!formData.image) {
      newErrors.image = "Please select a file (JPG, PNG, or PDF)";
    } else {
      const maxSize = 20 * 1024 * 1024; // 20MB (matching backend)
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      const allowedExtensions = [".jpg", ".jpeg", ".png", ".pdf"];

      // Check file size
      if (formData.image.size > maxSize) {
        newErrors.image = "File size should be less than 20MB";
      }
      // Check file type
      else if (!allowedTypes.includes(formData.image.type)) {
        newErrors.image = "Only JPG, PNG, and PDF files are allowed";
      }
      // Check file extension
      else {
        const fileName = formData.image.name.toLowerCase();
        const hasValidExtension = allowedExtensions.some((ext) =>
          fileName.endsWith(ext)
        );
        if (!hasValidExtension) {
          newErrors.image =
            "File must have .jpg, .jpeg, .png, or .pdf extension";
        }
      }
    }

    // Terms and Conditions acceptance validation
    if (!formData.termsAccepted) {
      newErrors.termsAccepted =
        "You must accept the terms and conditions to proceed.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (name === "image") {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
      // Immediately clear error for checkbox when checked
      if (checked && errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Clear error when user starts typing (for non-checkbox fields)
    if (type !== "checkbox" && errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Real-time validation for specific fields
    if (name === "cnic" || name === "mobileNumber") {
      // Remove non-numeric characters for CNIC and mobile
      const cleanValue = value.replace(/[^\d]/g, "");
      if (name === "cnic" && cleanValue.length > 13) {
        setFormData((prev) => ({ ...prev, [name]: cleanValue.slice(0, 13) }));
      } else if (name === "mobileNumber" && cleanValue.length > 11) {
        setFormData((prev) => ({ ...prev, [name]: cleanValue.slice(0, 11) }));
      }
    }

    // Keep CNIC without dashes - just numbers
    if (name === "cnic") {
      const cleanCNIC = value.replace(/[^\d]/g, "");
      setFormData((prev) => ({ ...prev, [name]: cleanCNIC }));
    }

    // Format mobile number with dash
    if (name === "mobileNumber" && value.length === 11) {
      const formatted = value.replace(/(\d{4})(\d{7})/, "$1-$2");
      setFormData((prev) => ({ ...prev, [name]: formatted }));
    }

    // Course selection validation
    if (name === "secondCourse" && value && value === formData.firstCourse) {
      setErrors((prev) => ({
        ...prev,
        [name]: "Second course must be different from first course",
      }));
    } else if (name === "secondCourse" && errors.secondCourse) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const clearError = (fieldName) => {
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      cnic: "",
      rollNumber: "",
      email: "",
      mobileNumber: "",
      firstCourse: "",
      secondCourse: "",
      challanNumber: "",
      image: null,
      termsAccepted: false,
    });
    setErrors({});
  };

  // Helper function to validate CNIC format
  const validateCNIC = (cnic) => {
    const cleanCNIC = cnic.replace(/[^\d]/g, "");
    if (cleanCNIC.length !== 13) return false;

    // Check if all characters are digits
    return /^\d{13}$/.test(cleanCNIC);
  };

  // Helper function to validate mobile number
  const validateMobile = (mobile) => {
    const cleanMobile = mobile.replace(/[-\s]/g, "");
    return /^03\d{9}$/.test(cleanMobile);
  };

  // Helper function to validate email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  };

  // Calculate form completion percentage
  const getFormProgress = () => {
    const requiredFields = [
      "fullName",
      "cnic",
      "email",
      "mobileNumber",
      "firstCourse",
      "challanNumber",
      "image",
      "termsAccepted",
    ];
    const completedFields = requiredFields.filter((field) => {
      if (field === "image") return formData[field];
      if (field === "termsAccepted") return formData[field];
      return formData[field] && formData[field].trim() && !errors[field];
    });
    return Math.round((completedFields.length / requiredFields.length) * 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showError("Please fix the errors in the form");
      return;
    }

    setLoading(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();

      // Append only the required fields with correct keys
      submitData.append("fullName", formData.fullName);
      submitData.append("cnic", formData.cnic);
      submitData.append("rollNumber", formData.rollNumber);
      submitData.append("email", formData.email);
      submitData.append("mobileNumber", formData.mobileNumber);
      submitData.append("challanNumber", formData.challanNumber);
      submitData.append("termsAccepted", formData.termsAccepted); // Add termsAccepted to FormData

      if (formData.image) {
        submitData.append("image", formData.image);
      }

      const response = await applyForScholarship(submitData);

      showSuccess("Scholarship application submitted successfully!");

      // Reset form
      setFormData({
        fullName: "",
        cnic: "",
        rollNumber: "",
        email: "",
        mobileNumber: "",
        firstCourse: "",
        secondCourse: "",
        challanNumber: "",
        image: null,
        termsAccepted: false,
      });

      // Navigate to success page or home
      navigate("/");
    } catch (error) {
      console.error("Scholarship application error:", error);
      console.error("Error response:", error.response);
      console.error("Error data:", error.response?.data);

      // Extract detailed error message
      let errorMessage =
        "Failed to submit scholarship application. Please try again.";

      // Check for different error response formats
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.errors) {
        // Handle validation errors array
        const errors = error.response.data.errors;
        if (Array.isArray(errors)) {
          errorMessage = errors.map((err) => err.message || err.msg).join(", ");
        } else if (typeof errors === "object") {
          errorMessage = Object.values(errors).join(", ");
        }
      } else if (error.response?.data?.msg) {
        errorMessage = error.response.data.msg;
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.response?.status === 409) {
        errorMessage = "Application already exists. Please check your details.";
      } else if (error.response?.status === 400) {
        errorMessage = "Invalid data provided. Please check your information.";
      } else if (error.response?.status === 422) {
        errorMessage = "Validation failed. Please check your form data.";
      } else if (error.response?.status === 500) {
        errorMessage = "Server error. Please try again later.";
      } else if (error.response?.status === 401) {
        errorMessage = "Unauthorized. Please try again.";
      } else if (error.response?.status === 403) {
        errorMessage = "Access denied. Please try again.";
      } else if (error.response?.status === 404) {
        errorMessage = "Service not found. Please try again.";
      } else if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.statusText) {
        errorMessage = `Error: ${error.response.statusText}`;
      } else if (error.code === "NETWORK_ERROR") {
        errorMessage = "Network error. Please check your internet connection.";
      } else if (error.code === "ECONNABORTED") {
        errorMessage = "Request timeout. Please try again.";
      }

      // If still generic message, try to extract from response text
      if (
        errorMessage ===
          "Failed to submit scholarship application. Please try again." &&
        error.response?.data
      ) {
        try {
          const responseText = JSON.stringify(error.response.data);
          if (responseText && responseText !== "{}") {
            errorMessage = `Server response: ${responseText}`;
          }
        } catch (e) {
          console.error("Could not parse error response:", e);
        }
      }

      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scholarship-page-wrapper py-5" style={{ minHeight: "100vh", fontFamily: "'Inter', 'Poppins', sans-serif", position: "relative" }}>
      <div ref={vantaRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}></div>
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-9">
            
            {/* Official Application Portal */}
            <div className="card shadow border-0 overflow-hidden" style={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              
              {/* Header Banner */}
              <div className="card-header border-0 text-center py-4 position-relative" style={{ backgroundColor: "#0B5D3B", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "4px", backgroundColor: "#C9A227" }}></div>
                <img src={Logo} alt="Official Logo" style={{ width: "140px", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" }} className="mb-3 mt-2" />
                <h1 className="h4 fw-bold mb-1 text-white" style={{ letterSpacing: "1px", textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>SCHOLARSHIP CARD APPLICATION FORM</h1>
                <p className="mb-0 text-white" style={{ fontWeight: "normal", fontSize: "0.95rem" }}>Digikhyber Initiative</p>
              </div>

              <div className="card-body p-4 p-md-5 bg-white">
                
                {/* Official Notice */}
                <div className="alert border-start border-4 mb-4" style={{ backgroundColor: "#f0f8f4", borderLeftColor: "#0B5D3B !important", border: "1px solid #e0ede6" }}>
                  <div className="d-flex align-items-start">
                    <div className="me-3 mt-1">
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#0B5D3B", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                        <i className="fas fa-info" style={{ fontSize: "0.9rem" }}></i>
                      </div>
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1" style={{ color: "#0B5D3B" }}>Official Policy Guidelines</h6>
                      <p className="mb-0" style={{ fontSize: "0.9rem", color: "#3c4852", lineHeight: "1.6" }}>
                        To become eligible for the scholarship card (Free Laptop, Solar Scheme, Taleem Finance, Taleem Abroad, Advance Courses), you must be enrolled in one or more programs under Digikhyber. Only students who successfully complete their IT training courses and achieve a minimum of <strong>85% marks</strong> will be eligible for high-value merit-based rewards.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-5 pb-4 border-bottom">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-bold text-uppercase text-muted" style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>Application Progress</span>
                    <span className="fw-bold" style={{ color: "#0B5D3B", fontSize: "0.85rem" }}>{getFormProgress()}% Complete</span>
                  </div>
                  <div className="progress" style={{ height: "6px", borderRadius: "10px", backgroundColor: "#edf2f0" }}>
                    <div 
                      className="progress-bar" 
                      role="progressbar" 
                      style={{ width: `${getFormProgress()}%`, backgroundColor: "#0B5D3B", borderRadius: "10px", transition: "width 0.4s ease" }}
                      aria-valuenow={getFormProgress()}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="needs-validation">
                  
                  {/* Section 1: Personal Details */}
                  <h5 className="fw-bold mb-4" style={{ color: "#1a1e1d", fontSize: "1.1rem" }}>
                    <span className="me-2" style={{ color: "#0B5D3B" }}>01.</span> Personal Information
                  </h5>
                  
                  <div className="row gx-4 mb-2">
                    <div className="col-md-12 mb-4">
                      <label htmlFor="fullName" className="form-label fw-bold text-dark" style={{ fontSize: "0.9rem" }}>Full Name <span className="text-danger">*</span></label>
                      <input
                        className={`form-control p-3 ${errors.fullName ? "is-invalid" : formData.fullName.trim() && !errors.fullName ? "is-valid" : ""}`}
                        style={{ backgroundColor: "#f8faf9", border: "1px solid #d1d9d6" }}
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter full name exactly as per CNIC/B-Form"
                        maxLength={100}
                        required
                      />
                      {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                    </div>

                    <div className="col-md-6 mb-4">
                      <label htmlFor="cnic" className="form-label fw-bold text-dark" style={{ fontSize: "0.9rem" }}>CNIC / B-Form No <span className="text-danger">*</span></label>
                      <input
                        className={`form-control p-3 ${errors.cnic ? "is-invalid" : formData.cnic.trim() && validateCNIC(formData.cnic) ? "is-valid" : ""}`}
                        style={{ backgroundColor: "#f8faf9", border: "1px solid #d1d9d6" }}
                        type="text"
                        name="cnic"
                        value={formData.cnic}
                        onChange={handleChange}
                        placeholder="e.g. 3550112345671"
                        maxLength={13}
                        required
                      />
                      {errors.cnic && <div className="invalid-feedback">{errors.cnic}</div>}
                    </div>

                    <div className="col-md-6 mb-4">
                      <label htmlFor="rollNumber" className="form-label fw-bold text-dark" style={{ fontSize: "0.9rem" }}>Roll Number</label>
                      <input
                        className="form-control p-3"
                        style={{ backgroundColor: "#f8faf9", border: "1px solid #d1d9d6" }}
                        type="text"
                        name="rollNumber"
                        value={formData.rollNumber}
                        onChange={handleChange}
                        placeholder="Enter your roll number"
                        maxLength={20}
                      />
                    </div>
                  </div>

                  {/* Section 2: Contact Details */}
                  <h5 className="fw-bold mb-4 mt-2" style={{ color: "#1a1e1d", fontSize: "1.1rem" }}>
                    <span className="me-2" style={{ color: "#0B5D3B" }}>02.</span> Contact Details
                  </h5>

                  <div className="row gx-4 mb-2">
                    <div className="col-md-6 mb-4">
                      <label htmlFor="email" className="form-label fw-bold text-dark" style={{ fontSize: "0.9rem" }}>Email Address <span className="text-danger">*</span></label>
                      <input
                        className={`form-control p-3 ${errors.email ? "is-invalid" : formData.email.trim() && validateEmail(formData.email) ? "is-valid" : ""}`}
                        style={{ backgroundColor: "#f8faf9", border: "1px solid #d1d9d6" }}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter active email address"
                        maxLength={254}
                        required
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    <div className="col-md-6 mb-4">
                      <label htmlFor="mobileNumber" className="form-label fw-bold text-dark" style={{ fontSize: "0.9rem" }}>Mobile Number <span className="text-danger">*</span></label>
                      <input
                        className={`form-control p-3 ${errors.mobileNumber ? "is-invalid" : formData.mobileNumber.trim() && validateMobile(formData.mobileNumber) ? "is-valid" : ""}`}
                        style={{ backgroundColor: "#f8faf9", border: "1px solid #d1d9d6" }}
                        type="text"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        placeholder="e.g. 03001234567"
                        maxLength={12}
                        required
                      />
                      {errors.mobileNumber && <div className="invalid-feedback">{errors.mobileNumber}</div>}
                    </div>
                  </div>

                  {/* Section 3: Course Details */}
                  <h5 className="fw-bold mb-4 mt-2" style={{ color: "#1a1e1d", fontSize: "1.1rem" }}>
                    <span className="me-2" style={{ color: "#0B5D3B" }}>03.</span> Enrollment Details
                  </h5>

                  <div className="row gx-4 mb-2">
                    <div className="col-md-6 mb-4">
                      <label htmlFor="firstCourse" className="form-label fw-bold text-dark" style={{ fontSize: "0.9rem" }}>Primary Course <span className="text-danger">*</span></label>
                      <select
                        className={`form-select p-3 ${errors.firstCourse ? "is-invalid" : formData.firstCourse.trim() && !errors.firstCourse ? "is-valid" : ""}`}
                        style={{ backgroundColor: "#f8faf9", border: "1px solid #d1d9d6", cursor: "pointer" }}
                        name="firstCourse"
                        value={formData.firstCourse}
                        onChange={handleChange}
                        required
                      >
                        <option value="">-- Select Course --</option>
                        {availableCourses.map((course, index) => (
                          <option key={index} value={course.name}>{course.name}</option>
                        ))}
                      </select>
                      {errors.firstCourse && <div className="invalid-feedback">{errors.firstCourse}</div>}
                    </div>

                    <div className="col-md-6 mb-4">
                      <label htmlFor="secondCourse" className="form-label fw-bold text-dark" style={{ fontSize: "0.9rem" }}>Secondary Course <span className="fw-normal text-muted">(Optional)</span></label>
                      <select
                        className={`form-select p-3 ${errors.secondCourse ? "is-invalid" : formData.secondCourse.trim() && !errors.secondCourse ? "is-valid" : ""}`}
                        style={{ backgroundColor: "#f8faf9", border: "1px solid #d1d9d6", cursor: "pointer" }}
                        name="secondCourse"
                        value={formData.secondCourse}
                        onChange={handleChange}
                      >
                        <option value="">-- Select Course (Optional) --</option>
                        {availableCourses.map((course, index) => (
                          <option key={index} value={course.name}>{course.name}</option>
                        ))}
                      </select>
                      {errors.secondCourse && <div className="invalid-feedback">{errors.secondCourse}</div>}
                    </div>
                  </div>

                  {/* Section 4: Payment Verification */}
                  <h5 className="fw-bold mb-4 mt-2" style={{ color: "#1a1e1d", fontSize: "1.1rem" }}>
                    <span className="me-2" style={{ color: "#0B5D3B" }}>04.</span> Payment Verification
                  </h5>

                  <div className="row gx-4 mb-2">
                    <div className="col-md-6 mb-4">
                      <label htmlFor="challanNumber" className="form-label fw-bold text-dark" style={{ fontSize: "0.9rem" }}>Paid Bank Challan No <span className="text-danger">*</span></label>
                      <input
                        className={`form-control p-3 ${errors.challanNumber ? "is-invalid" : formData.challanNumber.trim() && formData.challanNumber.trim().length >= 3 ? "is-valid" : ""}`}
                        style={{ backgroundColor: "#f8faf9", border: "1px solid #d1d9d6" }}
                        type="text"
                        name="challanNumber"
                        value={formData.challanNumber}
                        onChange={handleChange}
                        placeholder="Enter challan number"
                        maxLength={50}
                        required
                      />
                      {errors.challanNumber && <div className="invalid-feedback">{errors.challanNumber}</div>}
                    </div>

                    <div className="col-md-6 mb-4">
                      <label htmlFor="image" className="form-label fw-bold text-dark" style={{ fontSize: "0.9rem" }}>Upload Paid Challan <span className="text-danger">*</span></label>
                      <input
                        className={`form-control p-3 ${errors.image ? "is-invalid" : formData.image && !errors.image ? "is-valid" : ""}`}
                        style={{ backgroundColor: "#f8faf9", border: "1px solid #d1d9d6" }}
                        type="file"
                        name="image"
                        onChange={handleChange}
                        accept=".jpg,.jpeg,.png,.pdf"
                        required
                      />
                      {errors.image && <div className="invalid-feedback">{errors.image}</div>}
                      <div className="form-text mt-2"><i className="fas fa-info-circle me-1"></i>Accepted formats: JPG, PNG, PDF (Max: 20MB)</div>
                    </div>
                  </div>

                  {/* Declaration & Submission */}
                  <div className="mt-4 p-4 rounded" style={{ backgroundColor: "#f9fafb", border: "1px solid #e2e8f0" }}>
                    <div className="form-check mb-4">
                      <input
                        className={`form-check-input ${errors.termsAccepted ? "is-invalid" : formData.termsAccepted ? "is-valid" : ""}`}
                        style={{ width: "1.2rem", height: "1.2rem", marginTop: "0.15rem", cursor: "pointer" }}
                        type="checkbox"
                        id="termsAccepted"
                        name="termsAccepted"
                        checked={formData.termsAccepted || false}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-check-label ms-2" htmlFor="termsAccepted" style={{ fontSize: "0.9rem", color: "#3c4852", lineHeight: "1.6" }}>
                        I solemnly declare that the information provided is correct to the best of my knowledge. I have read and agree to the <span className="fw-bold" style={{ color: "#0B5D3B" }}>Terms & Conditions</span> of the Digikhyber Scholarship Card program. <span className="text-danger">*</span>
                      </label>
                      {errors.termsAccepted && <div className="invalid-feedback d-block mt-2">You must accept the terms and conditions to proceed.</div>}
                    </div>

                    <div className="row g-3">
                      <div className="col-md-8">
                        <button
                          type="submit"
                          className="btn w-100 fw-bold text-white py-3 shadow-sm"
                          style={{ backgroundColor: "#0B5D3B", border: "none", borderRadius: "8px", letterSpacing: "1px", textTransform: "uppercase", fontSize: "0.95rem", transition: "all 0.3s ease" }}
                          disabled={loading}
                          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#094a2f"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 12px rgba(11, 93, 59, 0.3)"; }}
                          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#0B5D3B"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 .125rem .25rem rgba(0,0,0,.075)"; }}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Processing...
                            </>
                          ) : (
                            <><i className="fas fa-paper-plane me-2"></i> Submit Application</>
                          )}
                        </button>
                      </div>
                      <div className="col-md-4">
                        <button
                          type="button"
                          className="btn w-100 fw-bold py-3 text-uppercase"
                          style={{ backgroundColor: "transparent", border: "2px solid #e2e8f0", borderRadius: "8px", color: "#64748b", letterSpacing: "0.5px", fontSize: "0.95rem", transition: "all 0.3s ease" }}
                          onClick={resetForm}
                          disabled={loading}
                          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#f1f5f9"; e.currentTarget.style.borderColor = "#cbd5e1"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.transform = "translateY(0)"; }}
                        >
                          Reset Form
                        </button>
                      </div>
                    </div>
                  </div>

                </form>
              </div>
              
              {/* Footer Banner */}
              <div className="card-footer text-center py-3 border-0" style={{ backgroundColor: "#f8faf9" }}>
                <p className="mb-0 small text-muted"><i className="fas fa-shield-alt me-1 text-success"></i> Secure Official Portal &copy; {new Date().getFullYear()} Digikhyber</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyScholarShipCard;
