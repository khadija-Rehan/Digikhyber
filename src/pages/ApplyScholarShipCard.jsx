import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../context/ModalContext";
import Logo from "../assets/logo.png";
import { applyForScholarship } from "../api/public";
import { useCourses } from "../context/CoursesContext";

const ApplyScholarShipCard = () => {
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
    <div className="container register">
      <form onSubmit={handleSubmit} className="pb-5 pt-5">
        <div className="text-center">
          <img style={{ width: "200px" }} src={Logo} alt="Logo" />
        </div>
        <h1 className="fs-5 fw-bold text-black text-center pt-4">
          Scholarship Card Form
        </h1>
        <p
          className="text-center text-danger"
          // className="text-center text-black"
        >
          To Become eligible for scholarship card (Free laptop, Solar scheme,
          Taleem Finance, Taleem Abroad, Advance Courses) you must be enrolled
          in one or more programs under Hunarmand Punjab.
          Hunarmand Punjab is introducing a merit-based Scholarship Card to
          encourage and reward outstanding students. This policy states that
          only those students who successfully complete their enrolled IT
          training courses and achieve a minimum of 85% marks will be eligible
          for the Scholarship Card. Recipients of this card will have the
          opportunity to be considered for high-value merit-based rewards such
          as laptops, solar panels, and e-bikes. These incentives aim to
          motivate students to perform at their best and equip them with the
          tools needed to further their skills and career development in the
          digital age.
        </p>

        {/* Form Progress Indicator */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <small className="text-muted">Form Progress</small>
            <small className="text-muted">{getFormProgress()}% Complete</small>
          </div>
          <div className="progress" style={{ height: "8px" }}>
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${getFormProgress()}%` }}
              aria-valuenow={getFormProgress()}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="fullName" className="mb-2">
            Full Name <span className="text-danger">*</span>
          </label>
          <input
            className={`form-control p-3 ${
              errors.fullName
                ? "is-invalid"
                : formData.fullName.trim() && !errors.fullName
                ? "is-valid"
                : ""
            }`}
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name as per your CNIC/B-Form."
            maxLength={100}
            required
          />
          {errors.fullName && (
            <div className="invalid-feedback">{errors.fullName}</div>
          )}
          {formData.fullName.trim() && !errors.fullName && (
            <div className="valid-feedback">Full name looks good!</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="cnic" className="mb-2">
            CNIC/B-Form No <span className="text-danger">*</span>
          </label>
          <input
            className={`form-control p-3 ${
              errors.cnic
                ? "is-invalid"
                : formData.cnic.trim() && validateCNIC(formData.cnic)
                ? "is-valid"
                : ""
            }`}
            type="text"
            name="cnic"
            value={formData.cnic}
            onChange={handleChange}
            placeholder="e.g. 3550112345671"
            maxLength={13}
            required
          />
          {errors.cnic && <div className="invalid-feedback">{errors.cnic}</div>}
          {formData.cnic.trim() && validateCNIC(formData.cnic) && (
            <div className="valid-feedback">CNIC format is correct!</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="rollNumber" className="mb-2">
            Roll No
          </label>
          <input
            className="form-control p-3"
            type="text"
            name="rollNumber"
            placeholder="Enter your roll number"
            value={formData.rollNumber}
            onChange={handleChange}
            maxLength={20}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="mb-2">
            Email <span className="text-danger">*</span>
          </label>
          <input
            className={`form-control p-3 ${
              errors.email
                ? "is-invalid"
                : formData.email.trim() && validateEmail(formData.email)
                ? "is-valid"
                : ""
            }`}
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            maxLength={254}
            required
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
          {formData.email.trim() && validateEmail(formData.email) && (
            <div className="valid-feedback">Email format is correct!</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="mobileNumber" className="mb-2">
            Mobile No <span className="text-danger">*</span>
          </label>
          <input
            className={`form-control p-3 ${
              errors.mobileNumber
                ? "is-invalid"
                : formData.mobileNumber.trim() &&
                  validateMobile(formData.mobileNumber)
                ? "is-valid"
                : ""
            }`}
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="e.g. 03001234567"
            maxLength={12}
            required
          />
          {errors.mobileNumber && (
            <div className="invalid-feedback">{errors.mobileNumber}</div>
          )}
          {formData.mobileNumber.trim() &&
            validateMobile(formData.mobileNumber) && (
              <div className="valid-feedback">
                Mobile number format is correct!
              </div>
            )}
        </div>

        <div className="mb-3">
          <label htmlFor="firstCourse" className="mb-2">
            In which Course Did you Apply?
            <span className="text-danger">*</span>
          </label>
          <select
            className={`form-control p-3 ${
              errors.firstCourse
                ? "is-invalid"
                : formData.firstCourse.trim() && !errors.firstCourse
                ? "is-valid"
                : ""
            }`}
            name="firstCourse"
            value={formData.firstCourse}
            onChange={handleChange}
            required
          >
            <option value="">Select Course</option>
            {availableCourses.map((course, index) => (
              <option key={index} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>
          {errors.firstCourse && (
            <div className="invalid-feedback">{errors.firstCourse}</div>
          )}
          {formData.firstCourse.trim() && !errors.firstCourse && (
            <div className="valid-feedback">Course selected successfully!</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="secondCourse" className="mb-2">
            Second Course (Optional)
            <small className="text-muted">
              {" "}
              - Select if you applied for multiple courses
            </small>
          </label>
          <select
            className={`form-control p-3 ${
              errors.secondCourse
                ? "is-invalid"
                : formData.secondCourse.trim() && !errors.secondCourse
                ? "is-valid"
                : ""
            }`}
            name="secondCourse"
            value={formData.secondCourse}
            onChange={handleChange}
          >
            <option value="">Select Course (Optional)</option>
            {availableCourses.map((course, index) => (
              <option key={index} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>
          {errors.secondCourse && (
            <div className="invalid-feedback">{errors.secondCourse}</div>
          )}
          {formData.secondCourse.trim() && !errors.secondCourse && (
            <div className="valid-feedback">
              Second course selected successfully!
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="challanNo" className="mb-2">
            Paid Bank Challan No <span className="text-danger">*</span>
          </label>
          <input
            className={`form-control p-3 ${
              errors.challanNumber
                ? "is-invalid"
                : formData.challanNumber.trim() &&
                  formData.challanNumber.trim().length >= 3
                ? "is-valid"
                : ""
            }`}
            type="text"
            placeholder="Enter your challan number"
            name="challanNumber"
            value={formData.challanNumber}
            onChange={handleChange}
            maxLength={50}
            required
          />
          {errors.challanNumber && (
            <div className="invalid-feedback">{errors.challanNumber}</div>
          )}
          {formData.challanNumber.trim() &&
            formData.challanNumber.trim().length >= 3 &&
            !errors.challanNumber && (
              <div className="valid-feedback">Challan number looks good!</div>
            )}
        </div>

        <div className="mb-4">
          <label htmlFor="challanFile" className="mb-2">
            Upload Paid Challan <span className="text-danger">*</span>
          </label>
          <input
            className={`form-control p-3 ${
              errors.image
                ? "is-invalid"
                : formData.image && !errors.image
                ? "is-valid"
                : ""
            }`}
            type="file"
            name="image"
            onChange={handleChange}
            accept=".jpg,.jpeg,.png,.pdf"
            required
          />
          {errors.image && (
            <div className="invalid-feedback">{errors.image}</div>
          )}
          {formData.image && !errors.image && (
            <div className="valid-feedback">
              File selected: {formData.image.name} (
              {(formData.image.size / 1024 / 1024).toFixed(2)} MB)
            </div>
          )}
          <small className="form-text text-muted">
            Accepted formats: JPG, PNG, PDF (Max size: 20MB)
          </small>
        </div>
        <div className="mb-4">
          <div className="form-check">
            <input
              className={`form-check-input ${
                errors.termsAccepted
                  ? "is-invalid"
                  : formData.termsAccepted
                  ? "is-valid"
                  : ""
              }`}
              type="checkbox"
              id="termsAccepted"
              name="termsAccepted"
              checked={formData.termsAccepted || false}
              onChange={handleChange}
              required
            />
            <label className="form-check-label" htmlFor="termsAccepted">
              I have read and agree to the{" "}
              <span className="fw-bold">Terms & Conditions</span> of the
              Hunarmand Punjab Scholarship Card program.
              <span className="text-danger">*</span>
            </label>
            {errors.termsAccepted && (
              <div className="invalid-feedback d-block">
                You must accept the terms and conditions to proceed.
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-4">
          <div className="row">
            <div className="col-md-8">
              <button
                type="submit"
                className="btn btn-success fw-bold hbtn text-white p-3 w-100"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
            <div className="col-md-4">
              <button
                type="button"
                className="btn btn-outline-secondary p-3 w-100"
                onClick={resetForm}
                disabled={loading}
              >
                Reset Form
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ApplyScholarShipCard;
