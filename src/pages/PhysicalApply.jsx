import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { submitAdmission } from "../api/auth";
import { useModal } from "../context/ModalContext";
import { useNavigate } from "react-router-dom";

const PhysicalApply = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useModal();
  
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
    address: "",
    password: "",
  });

  const [photo, setPhoto] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const clearError = (name) => {
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    if (name === "cnic") processedValue = value.replace(/[^\d]/g, "").slice(0, 13);
    if (name === "mobile") processedValue = value.replace(/[^\d]/g, "").slice(0, 11);
    setFormData((prev) => ({ ...prev, [name]: processedValue }));
    clearError(name);
  };

  const validateFile = (file, maxSize = 5 * 1024 * 1024) => {
    if (!file) return "Picture is required";
    const allowed = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowed.includes(file.type)) return "Picture must be JPG or PNG";
    if (file.size > maxSize) return "Picture must be under 5MB";
    return "";
  };

  const validate = () => {
    const v = {};
    if (!formData.fullName.trim()) v.fullName = "Required";
    if (!formData.fatherName.trim()) v.fatherName = "Required";
    if (!/^\d{13}$/.test(formData.cnic)) v.cnic = "Enter 13 digit CNIC/B-form";
    if (!/\S+@\S+\.\S+/.test(formData.email)) v.email = "Enter valid email";
    if (!/^03\d{9}$/.test(formData.mobile)) v.mobile = "Use 03XXXXXXXXX";
    if (!formData.dateOfBirth) v.dateOfBirth = "Required";
    if (!formData.gender) v.gender = "Required";
    if (!formData.qualification) v.qualification = "Required";
    if (!formData.firstCourse) v.firstCourse = "Required";
    if (formData.secondCourse && formData.secondCourse === formData.firstCourse)
      v.secondCourse = "Must be different from first";
    if (!formData.city.trim()) v.city = "Required";
    if (!formData.address.trim()) v.address = "Required";
    if (!formData.password || formData.password.length < 8) v.password = "Min 8 chars";
    const fileErr = validateFile(photo);
    if (fileErr) v.photo = fileErr;
    setErrors(v);
    return Object.keys(v).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      showError("Please fix the errors in the form before submitting.");
      return;
    }

    setSubmitting(true);

    try {
      const formDataToSubmit = new FormData();

      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          formDataToSubmit.append(key, value);
        }
      });

      // Add admissionType
      formDataToSubmit.append("admissionType", "physical");

      // Create and append courses array
      const courses = [formData.firstCourse, formData.secondCourse].filter(Boolean);
      formDataToSubmit.append("courses", JSON.stringify(courses));

      // Append photo
      if (photo) {
        formDataToSubmit.append("photo", photo);
      }

      const { data } = await submitAdmission(formDataToSubmit);
      console.log("Admission submission successful:", data);
      showSuccess("Physical admission application submitted successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Admission submission failed:", error);
      console.error("Error response:", error.response);
      console.error("Error data:", error.response?.data);
      
      // Extract detailed error message
      let errorMessage = "Admission submission failed. Please try again.";
      
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
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      showError(errorMessage);
    } finally {
      setSubmitting(false);
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
          <h1 className="fs-5 fw-bold text-black text-center pt-4">Physical Admission Form</h1>

          <div className="mb-3">
            <label className="mb-2" htmlFor="fullName">Full Name <span className="text-danger">*</span></label>
            <input className={`form-control p-3 ${errors.fullName ? "is-invalid" : ""}`} type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" />
            {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
          </div>

          <div className="mb-3">
            <label className="mb-2" htmlFor="fatherName">Father Name <span className="text-danger">*</span></label>
            <input className={`form-control p-3 ${errors.fatherName ? "is-invalid" : ""}`} type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} placeholder="Enter father's name" />
            {errors.fatherName && <div className="invalid-feedback">{errors.fatherName}</div>}
          </div>

          <div className="mb-3">
            <label className="mb-2" htmlFor="cnic">CNIC/B-form Number <span className="text-danger">*</span></label>
            <input className={`form-control p-3 ${errors.cnic ? "is-invalid" : ""}`} type="text" name="cnic" value={formData.cnic} onChange={handleChange} placeholder="13 digits without dashes" maxLength="13" />
            {errors.cnic && <div className="invalid-feedback">{errors.cnic}</div>}
          </div>

          <div className="mb-3">
            <label className="mb-2" htmlFor="email">Email Address <span className="text-danger">*</span></label>
            <input className={`form-control p-3 ${errors.email ? "is-invalid" : ""}`} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label className="mb-2" htmlFor="mobile">Mobile Number <span className="text-danger">*</span></label>
            <input className={`form-control p-3 ${errors.mobile ? "is-invalid" : ""}`} type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="03XXXXXXXXX" maxLength="11" />
            {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
          </div>

          <div className="mb-3">
            <label className="mb-2" htmlFor="dateOfBirth">Date of Birth <span className="text-danger">*</span></label>
            <input className={`form-control p-3 ${errors.dateOfBirth ? "is-invalid" : ""}`} type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} max={new Date().toISOString().split('T')[0]} />
            {errors.dateOfBirth && <div className="invalid-feedback">{errors.dateOfBirth}</div>}
          </div>

          <div className="mb-3">
            <label className="mb-2" htmlFor="gender">Gender <span className="text-danger">*</span></label>
            <select className={`form-select p-3 ${errors.gender ? "is-invalid" : ""}`} name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
          </div>

          <div className="mb-3">
            <label className="mb-2" htmlFor="qualification">Qualification <span className="text-danger">*</span></label>
            <select className={`form-select p-3 ${errors.qualification ? "is-invalid" : ""}`} name="qualification" value={formData.qualification} onChange={handleChange}>
              <option value="">Select your highest qualification</option>
              <option value="matric">Matric</option>
              <option value="intermediate">Intermediate</option>
              <option value="bachelor">Bachelor / Higher</option>
            </select>
            {errors.qualification && <div className="invalid-feedback">{errors.qualification}</div>}
          </div>

          <div className="mb-3">
            <label className="mb-2" htmlFor="firstCourse">First Course <span className="text-danger">*</span></label>
            <select className={`form-select p-3 ${errors.firstCourse ? "is-invalid" : ""}`} name="firstCourse" value={formData.firstCourse} onChange={handleChange}>
              <option value="">Choose your Course</option>
              <option value="National Cyber Security">National Cyber Security</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Full Stack Web Development">Full Stack Web Development</option>
              <option value="E-Commerce 2.0">E-Commerce 2.0</option>
              <option value="Digital Marketing">Digital Marketing</option>
            </select>
            {errors.firstCourse && <div className="invalid-feedback">{errors.firstCourse}</div>}
          </div>

          <div className="mb-3">
            <label className="mb-2" htmlFor="secondCourse">Second Course</label>
            <select className={`form-select p-3 ${errors.secondCourse ? "is-invalid" : ""}`} name="secondCourse" value={formData.secondCourse} onChange={handleChange}>
              <option value="">Choose your Course (Optional)</option>
              <option value="National Cyber Security">National Cyber Security</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Full Stack Web Development">Full Stack Web Development</option>
              <option value="E-Commerce 2.0">E-Commerce 2.0</option>
              <option value="Digital Marketing">Digital Marketing</option>
            </select>
            {errors.secondCourse && <div className="invalid-feedback">{errors.secondCourse}</div>}
          </div>

          <div className="mb-3">
            <label className="mb-2" htmlFor="city">City <span className="text-danger">*</span></label>
            <input className={`form-control p-3 ${errors.city ? "is-invalid" : ""}`} type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Enter city" />
            {errors.city && <div className="invalid-feedback">{errors.city}</div>}
          </div>

          <div className="mb-3">
            <label className="mb-2" htmlFor="address">Address <span className="text-danger">*</span></label>
            <textarea className={`form-control p-3 ${errors.address ? "is-invalid" : ""}`} name="address" value={formData.address} onChange={handleChange} placeholder="Enter your complete address" rows="3" />
            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
          </div>

          <div className="mb-3">
            <label className="mb-2" htmlFor="photo">Upload Picture <span className="text-danger">*</span></label>
            <div className="drop_box" onClick={() => document.getElementById("photo").click()} style={{ cursor: "pointer" }}>
              <i className="fas fa-cloud-upload-alt fa-3x mb-3 text-muted"></i>
              <header>
                <h4>Click to choose or drop your file here</h4>
              </header>
              <p className="text-center">Accepted formats: jpg, jpeg, png (Max 5MB)</p>
              <input type="file" hidden id="photo" accept=".jpg,.jpeg,.png" onChange={(e) => { setPhoto(e.target.files[0] || null); clearError("photo"); }} />
              {photo && <p className="text-success">Selected: {photo.name}</p>}
            </div>
            {errors.photo && <div className="text-danger">{errors.photo}</div>}
          </div>

          <div className="mb-3">
            <label className="mb-2" htmlFor="password">Password <span className="text-danger">*</span></label>
            <div className="position-relative">
              <input className={`form-control p-3 pe-5 ${errors.password ? "is-invalid" : ""}`} type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Create a password (min 8 characters)" />
              <button type="button" className="btn position-absolute top-50 end-0 translate-middle-y me-3" onClick={() => setShowPassword((s) => !s)} style={{ background: "none", border: "none", zIndex: 10 }}>
                <i className={`fas ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
              </button>
            </div>
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-success fw-bold hbtn text-white p-3 w-100" disabled={submitting}>
              {submitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
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

export default PhysicalApply;


