import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../assets/logo.png";
import { applyForScholarship } from "../api/user";
import { useCourses } from "../context/CoursesContext";

const ApplyScholarShipCard = () => {
  const navigate = useNavigate();
  const { availableCourses } = useCourses();
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
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // CNIC validation (Pakistani CNIC format)
    const cnicRegex = /^\d{13}$/;

    if (!cnicRegex.test(formData.cnic)) {
      newErrors.cnic = "Please enter a valid CNIC in format: 3550102359497";
    }

    // Mobile validation (Pakistani mobile format)
    const mobileRegex = /^03\d{9}$/;
    if (!mobileRegex.test(formData.mobileNumber.replace(/-/g, ""))) {
      newErrors.mobileNumber =
        "Please enter a valid mobile number starting with 03";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // File validation
    if (formData.image) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (formData.image.size > maxSize) {
        newErrors.image = "File size should be less than 5MB";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
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

      if (formData.image) {
        submitData.append("image", formData.image);
      }

      const response = await applyForScholarship(submitData);

      toast.success("Scholarship application submitted successfully!");

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
      });

      // Navigate to success page or home
      navigate("/");
    } catch (error) {
      console.error("Scholarship application error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to submit scholarship application. Please try again.";
      toast.error(errorMessage);
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
        <p>
          To Become eligible for scholarship card (free laptop, Solar scheme,
          Taleem Finance, Taleem Abroad, Advance Courses) you must be enrolled
          in one ore more programs under Hunarmand Punjab
        </p>

        <div className="mb-3">
          <label htmlFor="fullName" className="mb-2">
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
            required
          />
          {errors.fullName && (
            <div className="invalid-feedback">{errors.fullName}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="cnic" className="mb-2">
            CNIC/B-Form No <span className="text-danger">*</span>
          </label>
          <input
            className={`form-control p-3 ${errors.cnic ? "is-invalid" : ""}`}
            type="text"
            name="cnic"
            value={formData.cnic}
            onChange={handleChange}
            placeholder="e.g. 12345-1234567-1"
            required
          />
          {errors.cnic && <div className="invalid-feedback">{errors.cnic}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="rollNumber" className="mb-2">
            Roll No <span className="text-danger">*</span>
          </label>
          <input
            className={`form-control p-3 ${
              errors.rollNumber ? "is-invalid" : ""
            }`}
            type="text"
            name="rollNumber"
            placeholder="Enter roll no"
            value={formData.rollNumber}
            onChange={handleChange}
            required
          />
          {errors.rollNumber && (
            <div className="invalid-feedback">{errors.rollNumber}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="mb-2">
            Email <span className="text-danger">*</span>
          </label>
          <input
            className={`form-control p-3 ${errors.email ? "is-invalid" : ""}`}
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="mobileNumber" className="mb-2">
            Mobile No <span className="text-danger">*</span>
          </label>
          <input
            className={`form-control p-3 ${
              errors.mobileNumber ? "is-invalid" : ""
            }`}
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="03XX-XXXXXXX"
            required
          />
          {errors.mobileNumber && (
            <div className="invalid-feedback">{errors.mobileNumber}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="firstCourse" className="mb-2">
            Select First Course <span className="text-danger">*</span>
          </label>
          <select
            className={`form-control p-3 ${
              errors.firstCourse ? "is-invalid" : ""
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
        </div>

        <div className="mb-3">
          <label htmlFor="secondCourse" className="mb-2">
            Select Second Course <small>(Optional)</small>
          </label>
          <select
            className={`form-control p-3 ${
              errors.secondCourse ? "is-invalid" : ""
            }`}
            name="secondCourse"
            value={formData.secondCourse}
            onChange={handleChange}
          >
            <option value="">Select Course</option>
            {availableCourses.map((course, index) => (
              <option key={index} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>
          {errors.secondCourse && (
            <div className="invalid-feedback">{errors.secondCourse}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="challanNo" className="mb-2">
            Paid Bank Challan No <span className="text-danger">*</span>
          </label>
          <input
            className={`form-control p-3 ${
              errors.challanNumber ? "is-invalid" : ""
            }`}
            type="text"
            placeholder="e.g. 12345-1234567-1"
            name="challanNumber"
            value={formData.challanNumber}
            onChange={handleChange}
            required
          />
          {errors.challanNumber && (
            <div className="invalid-feedback">{errors.challanNumber}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="challanFile" className="mb-2">
            Upload Paid Challan <span className="text-danger">*</span>
          </label>
          <input
            className={`form-control p-3 ${errors.image ? "is-invalid" : ""}`}
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*,application/pdf"
            required
          />
          {errors.image && (
            <div className="invalid-feedback">{errors.image}</div>
          )}
        </div>

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
  );
};

export default ApplyScholarShipCard;
