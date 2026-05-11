import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.png";
import { signUp } from "../api/auth";
import { useModal } from "../context/ModalContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { AVAILABLE_COURSES } from "../utils/courses";
import AuthBanner from "../components/AuthBanner";
import ScrollingPlaceholderInput from "../components/ScrollingPlaceholderInput";

const Register = () => {
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
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
    referralCode: "",
  });

  const [documents, setDocuments] = useState({
    cnicFront: null,
    cnicBack: null,
  });

  const [previews, setPreviews] = useState({
    cnicFront: null,
    cnicBack: null,
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const referralCode = searchParams.get('ref') || searchParams.get('referral') || searchParams.get('code');
    if (referralCode) {
      setFormData(prev => ({ ...prev, referralCode: referralCode }));
    }
  }, [searchParams]);

  const clearError = (fieldName) => {
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: "" }));
    }
    if (serverError) setServerError("");
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;
    if (password.length === 0) return "";
    if (hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar && isLongEnough) return "strong";
    if ((hasUpperCase || hasLowerCase) && hasNumbers && isLongEnough) return "medium";
    return "weak";
  };

  const validateAge = (dateOfBirth) => {
    if (!dateOfBirth) return false;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const validateFile = (file, maxSize = 5 * 1024 * 1024) => {
    if (!file) return "File is required";
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) return "File must be JPG, JPEG, PNG, or PDF";
    if (file.size > maxSize) return "File size must be less than 5MB";
    return "";
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.fatherName.trim()) newErrors.fatherName = "Father's name is required";
    if (!formData.cnic.trim() || !/^\d{13}$/.test(formData.cnic)) newErrors.cnic = "CNIC must be 13 digits";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required";
    if (!formData.mobile.trim() || !/^03\d{9}$/.test(formData.mobile)) newErrors.mobile = "Valid mobile is required (03xxxxxxxxx)";
    if (!formData.dateOfBirth || validateAge(formData.dateOfBirth) < 16) newErrors.dateOfBirth = "Minimum age is 16";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.qualification) newErrors.qualification = "Qualification is required";
    if (!formData.firstCourse) newErrors.firstCourse = "Course selection is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.permanentAddress.trim()) newErrors.permanentAddress = "Address is required";
    if (!formData.password || formData.password.length < 8) newErrors.password = "Password min 8 characters";
    const fErr = validateFile(documents.cnicFront); if (fErr) newErrors.cnicFront = fErr;
    const bErr = validateFile(documents.cnicBack); if (bErr) newErrors.cnicBack = bErr;
    if (!formData.agreement) newErrors.agreement = "Please agree to the terms";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setDocuments(prev => ({ ...prev, [type]: file }));
      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews(prev => ({ ...prev, [type]: reader.result }));
        };
        reader.readAsDataURL(file);
      } else {
        setPreviews(prev => ({ ...prev, [type]: null }));
      }
      clearError(type);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let val = type === "checkbox" ? checked : value;
    if (name === "cnic") val = value.replace(/[^\d]/g, "");
    setFormData(prev => ({ ...prev, [name]: val }));
    clearError(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validateForm()) {
      showError("Please fix errors.");
      return;
    }
    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => { if (v !== "" && v !== null) data.append(k, v); });
      const courses = [formData.firstCourse, formData.secondCourse].filter(Boolean);
      data.append("courses", JSON.stringify(courses));
      Object.entries(documents).forEach(([k, v]) => { if (v) data.append(k, v); });
      await signUp(data);
      showSuccess("Registration successful!");
      navigate("/admission-test");
    } catch (error) {
      const msg = error.response?.data?.message || "Registration failed.";
      setServerError(msg);
      
      // If error is about a specific field, highlight it
      if (msg.toLowerCase().includes("cnic")) {
        setErrors(prev => ({ ...prev, cnic: msg }));
      } else if (msg.toLowerCase().includes("email")) {
        setErrors(prev => ({ ...prev, email: msg }));
      }
      
      showError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthBanner 
      title="Join Us Today" 
      description="Create an account to unlock advanced IT training and premium scholarship opportunities."
      isRegister={true}
    >
      <div className="auth-form-box">
        {/* Registration Steps */}
        <div className="auth-steps mb-4">
          <div className="step-item active">
            <span className="step-num">Step:1</span>
            <span className="step-txt">Student Registration</span>
          </div>
          <div className="step-item">
            <span className="step-num">Step:2</span>
            <span className="step-txt">Attempt Online Admission Test</span>
          </div>
          <div className="step-item">
            <span className="step-num">Step:3</span>
            <span className="step-txt">Enrollment Confirmation</span>
          </div>
        </div>

        <h2 className="auth-title">Admission Form</h2>
        <p className="auth-subtitle">Fill in your details to create an account</p>

        {serverError && (
          <div className="alert alert-danger d-flex align-items-center mb-4" style={{ borderRadius: '12px', border: 'none', backgroundColor: '#fff5f5', color: '#e53e3e' }}>
            <i className="fas fa-exclamation-circle me-3" style={{ fontSize: '1.2rem' }}></i>
            <div>
              <strong>Submission Error:</strong> {serverError}
            </div>
          </div>
        )}

        <div className="auth-notice">
          <strong>Notice:</strong> To become eligible for scholarship card (free laptops, Solar scheme, 
          Taleem Finance, Taleem Abroad, Advance Courses) you must be enrolled in one or more 
          programs under Digikhyber.
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <ScrollingPlaceholderInput 
                label="Full Name" 
                required 
                name="fullName" 
                value={formData.fullName} 
                onChange={handleChange} 
                placeholder="Enter your full name as per your CNIC/B-Form." 
                error={errors.fullName} 
              />
            </div>
            <div className="col-md-6">
              <ScrollingPlaceholderInput 
                label="Father's Name" 
                required 
                name="fatherName" 
                value={formData.fatherName} 
                onChange={handleChange} 
                placeholder="Provide your father's name as per your CNIC." 
                error={errors.fatherName} 
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <ScrollingPlaceholderInput 
                label="CNIC/B-Form Number" 
                required 
                name="cnic" 
                value={formData.cnic} 
                onChange={handleChange} 
                placeholder="Enter your 13 digits CNIC or B-Form number without hyphenation" 
                maxLength="13" 
                error={errors.cnic} 
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="mb-2">Email Address <span className="text-danger">*</span></label>
              <input className={`form-control p-3 ${errors.email ? "is-invalid" : ""}`} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Provide your active email address." />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <ScrollingPlaceholderInput 
                label="Mobile Number" 
                required 
                name="mobile" 
                value={formData.mobile} 
                onChange={handleChange} 
                placeholder="Enter your mobile number in the format e.g 03001234567" 
                maxLength="11" 
                error={errors.mobile} 
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="mb-2">Date of Birth <span className="text-danger">*</span></label>
              <input className={`form-control p-3 ${errors.dateOfBirth ? "is-invalid" : ""}`} type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
              {errors.dateOfBirth && <div className="invalid-feedback">{errors.dateOfBirth}</div>}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="mb-2">Gender <span className="text-danger">*</span></label>
              <select className={`form-select p-3 ${errors.gender ? "is-invalid" : ""}`} name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
            </div>
            <div className="col-md-6 mb-3">
              <label className="mb-2">Highest Qualification Attained <span className="text-danger">*</span></label>
              <select className={`form-select p-3 ${errors.qualification ? "is-invalid" : ""}`} name="qualification" value={formData.qualification} onChange={handleChange}>
                <option value="">Select your highest educational qualification</option>
                <option value="matric">Matric</option>
                <option value="intermediate">Intermediate</option>
                <option value="bachelor">Bachelor / Higher</option>
              </select>
              {errors.qualification && <div className="invalid-feedback">{errors.qualification}</div>}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="mb-2">First Course <span className="text-danger">*</span></label>
              <select className={`form-select p-3 ${errors.firstCourse ? "is-invalid" : ""}`} name="firstCourse" value={formData.firstCourse} onChange={handleChange}>
                <option value="">Choose your Course</option>
                {AVAILABLE_COURSES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
              {errors.firstCourse && <div className="invalid-feedback">{errors.firstCourse}</div>}
            </div>
            <div className="col-md-6 mb-3">
              <label className="mb-2">Second Course</label>
              <select className="form-select p-3" name="secondCourse" value={formData.secondCourse} onChange={handleChange}>
                <option value="">Choose your Course (Optional)</option>
                {AVAILABLE_COURSES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="mb-2">Referral Code (Optional)</label>
            <input className="form-control p-3" type="text" name="referralCode" value={formData.referralCode} onChange={handleChange} placeholder="Enter referral code if you have one" />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="mb-2">City <span className="text-danger">*</span></label>
              <input className={`form-control p-3 ${errors.city ? "is-invalid" : ""}`} type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Enter your city of residence." />
              {errors.city && <div className="invalid-feedback">{errors.city}</div>}
            </div>
            <div className="col-md-12 mb-3">
              <label className="mb-2">Address <span className="text-danger">*</span></label>
              <textarea className={`form-control p-3 ${errors.permanentAddress ? "is-invalid" : ""}`} name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} rows="2" placeholder="Enter your complete address."></textarea>
              {errors.permanentAddress && <div className="invalid-feedback">{errors.permanentAddress}</div>}
            </div>
          </div>

          <div className="mb-3">
            <label className="mb-2">Upload CNIC (Front Side) <span className="text-danger">*</span></label>
            <div className="drop_box" onClick={() => document.getElementById("cnicFront").click()} style={{ position: 'relative', overflow: 'hidden' }}>
              {previews.cnicFront ? (
                <div className="preview-container" style={{ width: '100%', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={previews.cnicFront} alt="CNIC Front Preview" style={{ maxHeight: '100%', maxWidth: '100%', borderRadius: '8px', objectFit: 'contain' }} />
                  <div className="preview-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: 0, transition: '0.3s' }}>
                    <span className="text-white fw-bold">Change Image</span>
                  </div>
                </div>
              ) : (
                <>
                  <i className="fas fa-cloud-upload-alt fa-2x mb-2 text-muted"></i>
                  <header><h4>Click to choose or drop your file here</h4></header>
                  <p className="small mb-0">Accepted formats: jpg, jpeg, png, pdf (Max 5MB)</p>
                </>
              )}
              <input type="file" id="cnicFront" hidden accept="image/*,.pdf" onChange={(e) => handleFileChange(e, "cnicFront")} />
              {documents.cnicFront && !previews.cnicFront && <p className="text-success small mt-2">Selected: {documents.cnicFront.name}</p>}
            </div>
            {errors.cnicFront && <div className="text-danger small mt-1">{errors.cnicFront}</div>}
          </div>

          <div className="mb-3">
            <label className="mb-2">Upload CNIC (Back Side) <span className="text-danger">*</span></label>
            <div className="drop_box" onClick={() => document.getElementById("cnicBack").click()} style={{ position: 'relative', overflow: 'hidden' }}>
              {previews.cnicBack ? (
                <div className="preview-container" style={{ width: '100%', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={previews.cnicBack} alt="CNIC Back Preview" style={{ maxHeight: '100%', maxWidth: '100%', borderRadius: '8px', objectFit: 'contain' }} />
                  <div className="preview-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: 0, transition: '0.3s' }}>
                    <span className="text-white fw-bold">Change Image</span>
                  </div>
                </div>
              ) : (
                <>
                  <i className="fas fa-cloud-upload-alt fa-2x mb-2 text-muted"></i>
                  <header><h4>Click to choose or drop your file here</h4></header>
                  <p className="small mb-0">Accepted formats: jpg, jpeg, png, pdf (Max 5MB)</p>
                </>
              )}
              <input type="file" id="cnicBack" hidden accept="image/*,.pdf" onChange={(e) => handleFileChange(e, "cnicBack")} />
              {documents.cnicBack && !previews.cnicBack && <p className="text-success small mt-2">Selected: {documents.cnicBack.name}</p>}
            </div>
            {errors.cnicBack && <div className="text-danger small mt-1">{errors.cnicBack}</div>}
          </div>

          <div className="mb-3">
            <label className="mb-2">Password <span className="text-danger">*</span></label>
            <div className="position-relative">
              <input className={`form-control p-3 ${errors.password ? "is-invalid" : ""}`} type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Create a strong password (min 8 characters)" />
              <button type="button" className="btn position-absolute top-50 end-0 translate-middle-y me-2" onClick={togglePasswordVisibility}>
                <i className={`fas ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
              </button>
            </div>
            {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
          </div>

          <div className="mb-4">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" name="agreement" checked={formData.agreement} onChange={handleChange} id="agree" />
              <label className="form-check-label small" htmlFor="agree">
                I declare that all the information provided is correct to the best of my knowledge, and I agree to the terms and conditions of the Digikhyber program. <span className="text-danger">*</span>
              </label>
            </div>
            {errors.agreement && <div className="text-danger small mt-1">{errors.agreement}</div>}
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </button>

          <div className="text-center mt-4 auth-prompt">
            <span className="text-muted">Already have an account? </span>
            <Link to="/login">Log in here!</Link>
          </div>
        </form>
      </div>
    </AuthBanner>
  );
};

export default Register;
