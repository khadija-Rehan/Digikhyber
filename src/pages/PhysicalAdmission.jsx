import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { signUp, submitPhysicalAdmission } from "../api/auth";
import { useModal } from "../context/ModalContext";
import { useNavigate } from "react-router";

const PhysicalAdmission = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useModal();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    cnic: "",
    email: "",
    mobile: "",
    dateOfBirth: "",
    gender: "",
    qualification: "",
    firstCourse: "",
    secondCourse: "",
    city: "",
    permanentAddress: "",
    password: "",
    agreement: false,
  });

  const [documents, setDocuments] = useState({
    cnicFront: null,
    cnicBack: null,
  });

  const [errors, setErrors] = useState({});

  // Available courses for physical admission
  const AVAILABLE_COURSES = [
    "National Cyber Security",
    "Artificial Intelligence",
    "Full Stack Web Development",
    "E-Commerce 2.0",
    "Digital Marketing",
  ];

  // Clear error when user starts typing
  const clearError = (fieldName) => {
    if (errors[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "",
      }));
    }
  };

  // Password strength validation
  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    if (password.length === 0) return "";
    if (hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar && isLongEnough) {
      return "strong";
    } else if ((hasUpperCase || hasLowerCase) && hasNumbers && isLongEnough) {
      return "medium";
    } else {
      return "weak";
    }
  };

  // Age validation (must be 16 or older)
  const validateAge = (dateOfBirth) => {
    if (!dateOfBirth) return false;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  // File validation
  const validateFile = (file, maxSize = 5 * 1024 * 1024) => {
    if (!file) return "File is required";
    
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return "File must be JPG, JPEG, PNG, or PDF";
    }
    
    if (file.size > maxSize) {
      return "File size must be less than 5MB";
    }
    
    return "";
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters";
    }

    if (!formData.fatherName.trim()) {
      newErrors.fatherName = "Father's name is required";
    } else if (formData.fatherName.trim().length < 3) {
      newErrors.fatherName = "Father's name must be at least 3 characters";
    }

    // CNIC validation
    if (!formData.cnic.trim()) {
      newErrors.cnic = "CNIC/B-Form number is required";
    } else if (!/^\d{13}$/.test(formData.cnic)) {
      newErrors.cnic = "CNIC/B-Form must be exactly 13 digits";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Mobile validation
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^03\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must start with 03 and be 11 digits (e.g., 03001234567)";
    }

    // Date of birth validation
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else {
      const age = validateAge(formData.dateOfBirth);
      if (age < 16) {
        newErrors.dateOfBirth = "You must be at least 16 years old to register";
      } else if (age > 100) {
        newErrors.dateOfBirth = "Please enter a valid date of birth";
      }
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.qualification) {
      newErrors.qualification = "Qualification is required";
    }

    // Course validation
    if (!formData.firstCourse) {
      newErrors.firstCourse = "First course selection is required";
    }

    // Second course validation (if selected, must be different from first)
    if (formData.secondCourse && formData.secondCourse === formData.firstCourse) {
      newErrors.secondCourse = "Second course must be different from first course";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    } else if (formData.city.trim().length < 2) {
      newErrors.city = "City name must be at least 2 characters";
    }

    if (!formData.permanentAddress.trim()) {
      newErrors.permanentAddress = "Address is required";
    } else if (formData.permanentAddress.trim().length < 10) {
      newErrors.permanentAddress = "Address must be at least 10 characters";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else {
      const passwordStrength = validatePassword(formData.password);
      if (passwordStrength === "weak") {
        newErrors.password = "Password is too weak. Include uppercase, lowercase, numbers, and special characters";
      }
    }



    const photoError = validateFile(documents.photo);
    if (photoError) {
      newErrors.photo = photoError;
    }

    if (!formData.agreement) {
      newErrors.agreement = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    setDocuments((prev) => ({
      ...prev,
      [type]: file,
    }));
    
    // Clear file error when user selects a new file
    clearError(type);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let processedValue = value;

    if (type === "checkbox") {
      processedValue = checked;
    }

    // Handle CNIC formatting - keep only digits
    if (name === "cnic") {
      processedValue = value.replace(/[^\d]/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    // Clear error when user starts typing
    clearError(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form first
    if (!validateForm()) {
      showError("Please fix the errors in the form before submitting.");
      return;
    }

    setLoading(true);

    try {
      const formDataToSubmit = new FormData();

      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          formDataToSubmit.append(key, value);
        }
      });

      // Add admissionType
      formDataToSubmit.append("form", "admission");

      // Create and append courses array
      const courses = [formData.firstCourse, formData.secondCourse].filter(Boolean);
      formDataToSubmit.append("physicalCourses", JSON.stringify(courses));




      // Append documents
      Object.entries(documents).forEach(([key, file]) => {
        if (file) {
          formDataToSubmit.append(key, file);
        }
      });

      const { data } = await signUp(formDataToSubmit);
      console.log("Physical admission successful:", data);
      showSuccess("Physical admission application submitted successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Physical admission failed:", error);
      console.error("Error response:", error.response);
      console.error("Error data:", error.response?.data);
      
      // Extract detailed error message
      let errorMessage = "Physical admission submission failed. Please try again.";
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        if (Array.isArray(errors)) {
          errorMessage = errors.map(err => err.message || err.msg).join(', ');
        } else if (typeof errors === 'object') {
          errorMessage = Object.values(errors).join(', ');
        }
      } else if (error.response?.data?.msg) {
        errorMessage = error.response.data.msg;
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.response?.status === 409) {
        errorMessage = "Email or CNIC already exists. Please use different credentials.";
      } else if (error.response?.status === 400) {
        errorMessage = "Invalid data provided. Please check your information.";
      } else if (error.response?.status === 422) {
        errorMessage = "Validation failed. Please check your form data.";
      } else if (error.response?.status === 500) {
        errorMessage = "Server error. Please try again later.";
      }
      
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    const strength = validatePassword(formData.password);
    switch (strength) {
      case "strong":
        return "text-success";
      case "medium":
        return "text-warning";
      case "weak":
        return "text-danger";
      default:
        return "";
    }
  };

  const getPasswordStrengthText = () => {
    const strength = validatePassword(formData.password);
    switch (strength) {
      case "strong":
        return "Strong password";
      case "medium":
        return "Medium strength password";
      case "weak":
        return "Weak password";
      default:
        return "";
    }
  };

  return (
    <div className="register mb-5">
      <div className="container">
        <div className="row pt-4 pb-4">
          <div className="col-lg-4 px-0">
            <div className="stepers">
              <div className="d-flex align-items-center gap-3">
                <i className="fas fa-user icon fs-3"></i>
                <div>
                  <h2 className="fs-5 fw-bold">Step:1</h2>
                  <p className="mb-0">Physical Application</p>
                </div>
              </div>
              <i className="fas fa-clock icon fs-2"></i>
            </div>
          </div>
          <div className="col-lg-4 px-0">
            <div className="stepers">
              <div className="d-flex align-items-center gap-3">
                <i className="fas fa-book icon fs-3"></i>
                <div>
                  <h2 className="fs-5 fw-bold">Step:2</h2>
                  <p className="mb-0">Document Verification</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 px-0">
            <div className="stepers">
              <div className="d-flex align-items-center gap-3">
                <i className="fas fa-file-alt icon fs-2"></i>
                <div>
                  <h2 className="fs-5 fw-bold">Step:3</h2>
                  <p className="mb-0">Enrollment Confirmation</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="text-center">
            <img style={{ width: "200px" }} src={Logo} alt="" />
          </div>
          <h1 className="fs-5 fw-bold text-black text-center pt-4">
            Physical Admission Form
          </h1>
          <p className="text-center text-danger">
            To Become eligible for scholarship card (free laptops, Solar scheme,
            Taleem Finance, Taleem Abroad, Advance Courses) you must be enrolled
            in one or more programs under Digikhyber.
          </p>
          
          {/* Full Name */}
          <div className="mb-3">
            <label className="mb-2" htmlFor="fullName">
              Full Name <span className="text-danger">*</span>
            </label>
            <input
              className={`form-control p-3 ${
                errors.fullName ? "is-invalid" : ""
              }`}
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name as per your CNIC/B-Form."
            />
            {errors.fullName && (
              <div className="invalid-feedback">{errors.fullName}</div>
            )}
          </div>

          {/* Father's Name */}
          <div className="mb-3">
            <label className="mb-2" htmlFor="fatherName">
              Father's Name <span className="text-danger">*</span>
            </label>
            <input
              className={`form-control p-3 ${
                errors.fatherName ? "is-invalid" : ""
              }`}
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              placeholder="Provide your father's name as per your CNIC."
            />
            {errors.fatherName && (
              <div className="invalid-feedback">{errors.fatherName}</div>
            )}
          </div>

          {/* CNIC/B-Form Number */}
          <div className="mb-3">
            <label className="mb-2" htmlFor="cnic">
              CNIC/B-Form Number <span className="text-danger">*</span>
            </label>
            <input
              className={`form-control p-3 ${errors.cnic ? "is-invalid" : ""}`}
              type="text"
              name="cnic"
              value={formData.cnic}
              onChange={handleChange}
              placeholder="Enter your 13 digits CNIC or B-Form number without hyphenation"
              maxLength="13"
            />
            {errors.cnic && (
              <div className="invalid-feedback">{errors.cnic}</div>
            )}
          </div>

          {/* Email Address */}
          <div className="mb-3">
            <label className="mb-2" htmlFor="email">
              Email Address <span className="text-danger">*</span>
            </label>
            <input
              className={`form-control p-3 ${errors.email ? "is-invalid" : ""}`}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Provide your active email address."
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          {/* Mobile Number */}
          <div className="mb-3">
            <label className="mb-2" htmlFor="mobile">
              Mobile Number <span className="text-danger">*</span>
            </label>
            <input
              className={`form-control p-3 ${
                errors.mobile ? "is-invalid" : ""
              }`}
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile number in the format e.g. 03001234567"
              maxLength="11"
            />
            {errors.mobile && (
              <div className="invalid-feedback">{errors.mobile}</div>
            )}
          </div>

          {/* Date of Birth */}
          <div className="mb-3">
            <label className="mb-2" htmlFor="dateOfBirth">
              Date of Birth <span className="text-danger">*</span>
            </label>
            <input
              className={`form-control p-3 ${
                errors.dateOfBirth ? "is-invalid" : ""
              }`}
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.dateOfBirth && (
              <div className="invalid-feedback">{errors.dateOfBirth}</div>
            )}
          </div>

          {/* Gender */}
          <div className="mb-3">
            <label className="mb-2" htmlFor="gender">
              Gender <span className="text-danger">*</span>
            </label>
            <select
              className={`form-select p-3 ${errors.gender ? "is-invalid" : ""}`}
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <div className="invalid-feedback">{errors.gender}</div>
            )}
          </div>

          {/* Highest Qualification Attained */}
          <div className="mb-3">
            <label className="mb-2" htmlFor="qualification">
              Highest Qualification Attained{" "}
              <span className="text-danger">*</span>
            </label>
            <select
              className={`form-select p-3 ${
                errors.qualification ? "is-invalid" : ""
              }`}
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
            >
              <option value="">
                Select your highest educational qualification
              </option>
              <option value="matric">Matric</option>
              <option value="intermediate">Intermediate</option>
              <option value="bachelor">Bachelor / Higher</option>
            </select>
            {errors.qualification && (
              <div className="invalid-feedback">{errors.qualification}</div>
            )}
          </div>

          {/* First Course */}
          <div className="mb-3">
            <label className="mb-2" htmlFor="firstCourse">
              First Course <span className="text-danger">*</span>
            </label>
            <select
              className={`form-select p-3 ${
                errors.firstCourse ? "is-invalid" : ""
              }`}
              name="firstCourse"
              value={formData.firstCourse}
              onChange={handleChange}
            >
              <option value="">
                Choose your Course
              </option>
              {AVAILABLE_COURSES.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
            {errors.firstCourse && (
              <div className="invalid-feedback">{errors.firstCourse}</div>
            )}
          </div>

          {/* Second Course */}
          <div className="mb-3">
            <label className="mb-2" htmlFor="secondCourse">
              Second Course
            </label>
            <select
              className={`form-select p-3 ${
                errors.secondCourse ? "is-invalid" : ""
              }`}
              name="secondCourse"
              value={formData.secondCourse}
              onChange={handleChange}
            >
              <option value="">
                Choose your Course (Optional)
              </option>
              {AVAILABLE_COURSES.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
            {errors.secondCourse && (
              <div className="invalid-feedback">{errors.secondCourse}</div>
            )}
          </div>

          {/* City */}
          <div className="mb-3">
            <label className="mb-2" htmlFor="city">
              City <span className="text-danger">*</span>
            </label>
            <input
              className={`form-control p-3 ${errors.city ? "is-invalid" : ""}`}
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city of residence."
            />
            {errors.city && (
              <div className="invalid-feedback">{errors.city}</div>
            )}
          </div>

          {/* Address */}
          <div className="mb-3">
            <label className="mb-2" htmlFor="permanentAddress">
              Address <span className="text-danger">*</span>
            </label>
            <textarea
              className={`form-control p-3 ${
                errors.permanentAddress ? "is-invalid" : ""
              }`}
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              placeholder="Enter your complete address."
              rows="3"
            />
            {errors.permanentAddress && (
              <div className="invalid-feedback">{errors.permanentAddress}</div>
            )}
          </div>


          {/* Upload Photo */}
          <div className="mb-3">
            <label className="mb-2" htmlFor="photo">
              Upload Photo <span className="text-danger">*</span>
            </label>
            <div
              className="drop_box"
              onClick={() => document.getElementById("photo").click()}
              style={{ cursor: "pointer" }}
            >
              <i className="fas fa-cloud-upload-alt fa-3x mb-3 text-muted"></i>
              <header>
                <h4>Click to choose or drop your file here</h4>
              </header>
              <p className="text-center">
                Accepted formats: jpg, jpeg, png, pdf (Max 5MB)
              </p>
              <input
                type="file"
                hidden
                id="photo"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => handleFileChange(e, "photo")}
              />
              {documents.photo && (
                <p className="text-success">
                  Selected: {documents.photo.name}
                </p>
              )}
            </div>
            {errors.photo && (
              <div className="text-danger">{errors.photo}</div>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="mb-2" htmlFor="password">
              Password <span className="text-danger">*</span>
            </label>
            <div className="position-relative">
              <input
                className={`form-control p-3 pe-5 ${
                  errors.password ? "is-invalid" : ""
                }`}
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password (min 8 characters)"
              />
              <button
                type="button"
                className="btn position-absolute top-50 end-0 translate-middle-y me-3"
                onClick={togglePasswordVisibility}
                style={{ background: "none", border: "none", zIndex: 10 }}
              >
                <i
                  className={`fas ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                ></i>
              </button>
            </div>
            {formData.password && (
              <small className={`${getPasswordStrengthColor()} mt-1 d-block`}>
                {getPasswordStrengthText()}
              </small>
            )}
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          {/* Agreement */}
          <div className="mb-3">
            <div className="form-check">
              <input
                className={`form-check-input ${
                  errors.agreement ? "is-invalid" : ""
                }`}
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={handleChange}
                id="agreement"
              />
              <label className="form-check-label" htmlFor="agreement">
                I declare that all the information provided is correct to the
                best of my knowledge, and I agree to the terms and conditions of
                the digikhyber program. <span className="text-danger">*</span>
              </label>
              {errors.agreement && (
                <div className="invalid-feedback">{errors.agreement}</div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-4">
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
        </form>
      </div>
    </div>
  );
};

export default PhysicalAdmission;

