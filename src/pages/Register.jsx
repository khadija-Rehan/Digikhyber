import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { signUp } from "../api/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { AVAILABLE_COURSES } from "../utils/courses";

const Register = () => {
  let navigate = useNavigate();
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
    // maritalStatus: "",
    gender: "",
    qualification: "",
    // institute: "",
    // fieldOfStudy: "",
    // yearOfCompletion: "",
    firstCourse: "",
    secondCourse: "",
    // internetAccess: false,
    city: "",
    permanentAddress: "",
    // employmentStatus: false,
    password: "",
    agreement: false,
    referralCode: "", // Added referral code field (optional)
  });

  const [documents, setDocuments] = useState({
    cnicFront: null,
    cnicBack: null,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.fatherName.trim()) {
      newErrors.fatherName = "Father's name is required";
    }
    if (!formData.cnic.trim()) {
      newErrors.cnic = "CNIC/B-Form number is required";
    } else if (!/^\d{13}$/.test(formData.cnic)) {
      newErrors.cnic = "CNIC/B-Form must be 13 digits";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^03\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must start with 03 and be 11 digits";
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }
    if (!formData.qualification) {
      newErrors.qualification = "Qualification is required";
    }

    if (!formData.firstCourse) {
      newErrors.firstCourse = "First course selection is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.permanentAddress.trim()) {
      newErrors.permanentAddress = "Address is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    if (!documents.cnicFront) {
      newErrors.cnicFront = "CNIC Front is required";
    }
    if (!documents.cnicBack) {
      newErrors.cnicBack = "CNIC Backt is required";
    }
    if (!formData.agreement) {
      newErrors.agreement = "You must agree to the terms and conditions";
    }

    // No validation for referralCode since it's optional

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    setDocuments((prev) => ({
      ...prev,
      [type]: file,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let processedValue = value;

    if (type === "checkbox") {
      processedValue = checked;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (validateForm()) {
      const formDataToSubmit = new FormData();

      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formDataToSubmit.append(key, value);
        }
      });

      // Create and append courses array
      const courses = [formData.firstCourse, formData.secondCourse].filter(
        Boolean
      );

      formDataToSubmit.append("courses", JSON.stringify(courses));

      // Save courses to localStorage
      localStorage.setItem("selectedCourses", JSON.stringify(courses));

      // Append documents
      Object.entries(documents).forEach(([key, file]) => {
        if (file) {
          formDataToSubmit.append(key, file);
        }
      });

      try {
        const { data } = await signUp(formDataToSubmit);
        console.log("Registration successful:", data);
        toast.success(
          "Registration successful! Please check your email for verification."
        );
        setLoading(false);
        navigate("/admission-test");
      } catch (error) {
        console.error("Registration failed:", error);
        toast.error(
          error.response?.data?.message ||
            "Registration failed. Please try again."
        );
        setLoading(false);
      }
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
                  <p className="mb-0">Student Registration</p>
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
                  <p className="mb-0">Attempt Online Admission Test</p>
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
            Admission Form
          </h1>
          <p className="text-center text-danger">
            To Become eligible for scholarship card (free laptop, Solar scheme,
            Taleem Finance, Taleem Abroad, Advance Courses) you must be enrolled
            in one ore more programs under Hunarmand Punjab.
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
            />
            {errors.dateOfBirth && (
              <div className="invalid-feedback">{errors.dateOfBirth}</div>
            )}
          </div>

          {/* Marital Status */}
          {/* <div className="mb-3">
            <label className="mb-2" htmlFor="maritalStatus">
              Marital Status <span className="text-danger">*</span>
            </label>
            <select
              className={`form-select p-3 ${
                errors.maritalStatus ? "is-invalid" : ""
              }`}
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
            {errors.maritalStatus && (
              <div className="invalid-feedback">{errors.maritalStatus}</div>
            )}
          </div> */}

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
              <option value="bachelor">Bachelor's</option>
            </select>
            {errors.qualification && (
              <div className="invalid-feedback">{errors.qualification}</div>
            )}
          </div>

          {/* Institute/University Name */}
          {/* <div className="mb-3">
            <label className="mb-2" htmlFor="institute">
              Institute/University Name <span className="text-danger">*</span>
            </label>
            <input
              className={`form-control p-3 ${
                errors.institute ? "is-invalid" : ""
              }`}
              type="text"
              name="institute"
              value={formData.institute}
              onChange={handleChange}
              placeholder="Enter the name of your institute or university."
            />
            {errors.institute && (
              <div className="invalid-feedback">{errors.institute}</div>
            )}
          </div> */}

          {/* Field of Study */}
          {/* <div className="mb-3">
            <label className="mb-2" htmlFor="fieldOfStudy">
              Field of Study <span className="text-danger">*</span>
            </label>
            <input
              className={`form-control p-3 ${
                errors.fieldOfStudy ? "is-invalid" : ""
              }`}
              type="text"
              name="fieldOfStudy"
              value={formData.fieldOfStudy}
              onChange={handleChange}
              placeholder="Enter your field of study."
            />
            {errors.fieldOfStudy && (
              <div className="invalid-feedback">{errors.fieldOfStudy}</div>
            )}
          </div> */}

          {/* Year of Completion */}
          {/* <div className="mb-3">
            <label className="mb-2" htmlFor="yearOfCompletion">
              Year of Completion <span className="text-danger">*</span>
            </label>
            <input
              className={`form-control p-3 ${
                errors.yearOfCompletion ? "is-invalid" : ""
              }`}
              type="text"
              name="yearOfCompletion"
              value={formData.yearOfCompletion}
              onChange={handleChange}
              placeholder="Enter the year of completion."
            />
            {errors.yearOfCompletion && (
              <div className="invalid-feedback">{errors.yearOfCompletion}</div>
            )}
          </div> */}

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
              <option value="" disabled>
                Choose your Course
              </option>
              {AVAILABLE_COURSES.map((course) => (
                <option key={course.name} value={course.name}>
                  {course.name}
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
              <option value="" disabled>
                Choose your Course
              </option>
              {AVAILABLE_COURSES.map((course) => (
                <option key={course.name} value={course.name}>
                  {course.name}
                </option>
              ))}
            </select>
            {errors.secondCourse && (
              <div className="invalid-feedback">{errors.secondCourse}</div>
            )}
          </div>

          {/* Referral Code (Optional) */}
          <div className="mb-3">
            <label className="mb-2" htmlFor="referralCode">
              Referral Code (Optional)
            </label>
            <input
              className="form-control p-3"
              type="text"
              name="referralCode"
              value={formData.referralCode}
              onChange={handleChange}
              placeholder="Enter referral code if you have one"
            />
          </div>

          {/* Internet Access */}
          {/* <div className="mb-3">
            <label className="mb-2" htmlFor="internetAccess">
              Do you have access to a reliable internet connection?*
            </label>
            <select
              className={`form-select p-3 ${
                errors.internetAccess ? "is-invalid" : ""
              }`}
              name="internetAccess"
              value={formData.internetAccess ? "yes" : "no"}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.internetAccess && (
              <div className="invalid-feedback">{errors.internetAccess}</div>
            )}
          </div> */}

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
            <input
              className={`form-control p-3 ${
                errors.permanentAddress ? "is-invalid" : ""
              }`}
              type="text"
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              placeholder="Enter your complete address."
            />
            {errors.permanentAddress && (
              <div className="invalid-feedback">{errors.permanentAddress}</div>
            )}
          </div>

          {/* Employment Status */}
          {/* <div className="mb-3">
            <label className="mb-2" htmlFor="employmentStatus">
              Are you currently employed?*
            </label>
            <select
              className={`form-select p-3 ${
                errors.employmentStatus ? "is-invalid" : ""
              }`}
              name="employmentStatus"
              value={formData.employmentStatus ? "yes" : "no"}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.employmentStatus && (
              <div className="invalid-feedback">{errors.employmentStatus}</div>
            )}
          </div> */}

          {/* Upload Last Degree Document */}
          <div className="mb-3">
            <label className="mb-2" htmlFor="degreeDocument">
              Upload CNIC (Front Side) <span className="text-danger">*</span>
            </label>
            <div
              className="drop_box"
              onClick={() => document.getElementById("cnicFront").click()}
              style={{ cursor: "pointer" }}
            >
              <i className="fas fa-cloud-upload-alt fa-3x mb-3 text-muted"></i>
              <header>
                <h4>Click to choose or drop your file here</h4>
              </header>
              <p className="text-center">
                Accepted formats: jpg, jpeg, png, pdf
              </p>
              <input
                type="file"
                hidden
                id="cnicFront"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => handleFileChange(e, "cnicFront")}
              />
              {documents.cnicFront && (
                <p className="text-success">
                  Selected: {documents.cnicFront.name}
                </p>
              )}
            </div>
            {errors.cnicFront && (
              <div className="text-danger">{errors.cnicFront}</div>
            )}
          </div>

          {/* Upload CNIC (Front & Back Side) */}
          <div className="mb-3">
            <label className="mb-2" htmlFor="cnicDocument">
              Upload CNIC (Back Side) <span className="text-danger">*</span>
            </label>
            <div
              className="drop_box"
              onClick={() => document.getElementById("cnicBack").click()}
              style={{ cursor: "pointer" }}
            >
              <i className="fas fa-cloud-upload-alt fa-3x mb-3 text-muted"></i>
              <header>
                <h4>Click to choose or drop your file here</h4>
              </header>
              <p className="text-center">
                Accepted formats: jpg, jpeg, png, pdf
              </p>
              <input
                type="file"
                hidden
                id="cnicBack"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => handleFileChange(e, "cnicBack")}
              />
              {documents.cnicBack && (
                <p className="text-success">
                  Selected: {documents.cnicBack.name}
                </p>
              )}
            </div>
            {errors.cnicDocument && (
              <div className="text-danger">{errors.cnicBack}</div>
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
                placeholder="Create a password"
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
                the Hunarmand program. <span className="text-danger">*</span>
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

export default Register;
