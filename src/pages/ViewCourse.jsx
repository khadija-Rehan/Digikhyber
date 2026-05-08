import React, { useState, useEffect } from "react";
import PageBanner from "../components/PageBanner";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCourses } from "../context/CoursesContext";
import { useModal } from "../context/ModalContext";
import image from "../assets/ML.jpg";
import Logo from "../assets/logo-white.png";
// import graphicDesignImage from "../assets/graphic-design.jpg"; // You'll need to add this image
import { courseContentData } from "../data/courseContent";
import {
  FaCheckCircle,
  FaCoins,
  FaConnectdevelop,
  FaEnvelope,
  FaFacebookF,
  FaGlobe,
  FaInstagram,
  FaLaptop,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTwitter,
  FaWhatsapp,
  FaPalette,
  FaUsers,
  FaGraduationCap,
  FaInfoCircle,
  FaChalkboardTeacher,
  FaBookOpen,
  FaClipboardList,
  FaBoxOpen,
  FaClock,
} from "react-icons/fa";
import { CiCreditCard1 } from "react-icons/ci";
import { IoCardOutline } from "react-icons/io5";

const ViewCourse = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();
  const { userCourses, addCourse } = useCourses();
  const { showSuccess, showError, showWarning, showInfo } = useModal();

  

  // Get course name from URL parameter, default to WordPress if not provided
  const courseNameFromURL = searchParams.get("course");
  const courseName = courseNameFromURL || "WordPress Website Development";

  // Get course content from external data
  const courseContent = courseContentData[courseName] || courseContentData["WordPress Website Development"];

  // Determine button text and state
  const getButtonText = () => {
    if (!isAuthenticated()) {
      return "Login to Register";
    }
    if (userCourses.includes(courseName)) {
      return "Already Added ✓";
    }
    if (userCourses.length >= 2) {
      return "Max Courses Reached";
    }
    return "Register Course";
  };

  const getButtonClass = () => {
    if (!isAuthenticated()) {
      return "btn-green register-btn mb-3 mt-2 btn btn-warning w-100";
    }
    if (userCourses.includes(courseName)) {
      return "btn-green register-btn mb-3 mt-2 btn btn-success w-100";
    }
    if (userCourses.length >= 2) {
      return "btn-green register-btn mb-3 mt-2 btn btn-secondary w-100";
    }
    return "btn-green register-btn mb-3 mt-2 btn btn-success w-100";
  };

  const isButtonDisabled = () => {
    // Only disable if already added or max courses reached, but NOT for login
    if (!isAuthenticated()) {
      return false;
    }
    return userCourses.includes(courseName) || userCourses.length >= 2;
  };

  // New: handle click based on button text
  const handleRegisterClick = (e) => {
    e.preventDefault();
    const btnText = getButtonText();
    if (btnText === "Login to Register") {
      navigate("/login");
      return;
    }
    if (isAuthenticated()) {
      // Check if user already has 2 courses
      if (userCourses.length >= 2) {
        showWarning(
          "You can only enroll in up to 2 courses. Please remove a course from your selection first."
        );
        return;
      }

      // Check if course is already selected
      if (userCourses.includes(courseName)) {
        showInfo("This course is already in your selection!");
        return;
      }

      // Add course to user's selection
      addCourse(courseName);
      showSuccess(`${courseName} has been added to your course selection!`);

      // Navigate to admission test
      navigate("/admission-test");
    } else {
      showInfo("Please login first to register for the course");
      navigate("/login");
    }
  };

  return (
    <>
      <PageBanner 
        title={courseName}
        description={courseContent.description}
      >
        <div className="d-flex flex-wrap justify-content-center gap-2 gap-md-3 mt-4 px-2">
          <div className="d-flex align-items-center px-3 px-md-4 py-2 rounded-pill shadow-sm" style={{ backgroundColor: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255, 255, 255, 0.2)", color: "#ffffff" }}>
            <FaLaptop className="me-2 fs-6 fs-md-5" style={{ color: "#C9A227" }} />
            <span style={{ fontSize: "0.85rem", mdFontSize: "0.95rem", fontWeight: "500", letterSpacing: "0.5px" }}>Classes: Recorded</span>
          </div>
          <div className="d-flex align-items-center px-3 px-md-4 py-2 rounded-pill shadow-sm" style={{ backgroundColor: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255, 255, 255, 0.2)", color: "#ffffff" }}>
            <FaClock className="me-2 fs-6 fs-md-5" style={{ color: "#C9A227" }} />
            <span style={{ fontSize: "0.85rem", mdFontSize: "0.95rem", fontWeight: "500", letterSpacing: "0.5px" }}>Duration: 3 Months</span>
          </div>
          <div className="d-flex align-items-center px-3 px-md-4 py-2 rounded-pill shadow-sm" style={{ backgroundColor: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255, 255, 255, 0.2)", color: "#ffffff" }}>
            <FaGraduationCap className="me-2 fs-6 fs-md-5" style={{ color: "#C9A227" }} />
            <span style={{ fontSize: "0.85rem", mdFontSize: "0.95rem", fontWeight: "500", letterSpacing: "0.5px" }}>Level: Beginner - Advanced</span>
          </div>
        </div>
      </PageBanner>

      <div className="container pt-5 pb-5 mb-5 mt-4 mt-lg-5" style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
        <div className="row g-4 g-lg-5">
          
          {/* Left Column: Course Details */}
          <div className="col-lg-8 order-2 order-lg-1">
            <div className="pe-lg-4">
              
              <div className="mb-5">
                <h3 className="fw-bold mb-3 d-flex align-items-center" style={{ color: "#0B5D3B", borderBottom: "2px solid #f1f5f9", paddingBottom: "10px", fontSize: "calc(1.3rem + .6vw)" }}>
                  <FaInfoCircle className="me-2 text-warning" /> Course Details
                </h3>
                <p style={{ lineHeight: "1.8", color: "#475569", fontSize: "1rem", textAlign: "justify" }}>
                  {courseContent.aboutCourse}
                </p>
              </div>

              <div className="mb-5">
                <h3 className="fw-bold mb-3 d-flex align-items-center" style={{ color: "#0B5D3B", borderBottom: "2px solid #f1f5f9", paddingBottom: "10px", fontSize: "calc(1.3rem + .6vw)" }}>
                  <FaUsers className="me-2 text-warning" /> Who Can Join This Course?
                </h3>
                <p className="fw-semibold text-dark mb-3">This course is ideal for:</p>
                <div className="row g-3">
                  {courseContent.whoCanJoin.map((item, index) => (
                    <div className="col-md-6" key={index}>
                      <div className="d-flex p-3 rounded shadow-sm h-100" style={{ backgroundColor: "#ffffff", borderLeft: "4px solid #0B5D3B" }}>
                        <FaCheckCircle className="mt-1 me-2 flex-shrink-0" style={{ color: "#0B5D3B" }} />
                        <span style={{ color: "#475569", fontSize: "0.9rem" }}>{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 rounded alert-success border-start border-4 border-success d-flex align-items-center shadow-sm">
                  <p className="mb-0 text-dark small">
                    <strong>No previous experience is required.</strong> This course takes you from beginner level to advanced level, step by step.
                  </p>
                </div>
              </div>

              <div className="mb-5">
                <h3 className="fw-bold mb-3 d-flex align-items-center" style={{ color: "#0B5D3B", borderBottom: "2px solid #f1f5f9", paddingBottom: "10px", fontSize: "calc(1.3rem + .6vw)" }}>
                  <FaBookOpen className="me-2 text-warning" /> What Will You Learn?
                </h3>
                <div className="d-flex flex-column gap-2">
                  {courseContent.whatWillYouLearn.map((item, index) => (
                    <div className="d-flex align-items-center p-3 rounded shadow-sm" style={{ backgroundColor: "#ffffff", borderLeft: "4px solid #C9A227" }} key={index}>
                      <span className="badge rounded-circle p-2 me-3 d-none d-sm-block" style={{ backgroundColor: "rgba(11, 93, 59, 0.1)", color: "#0B5D3B" }}>
                        {index + 1}
                      </span>
                      <span className="fw-semibold text-dark small">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="row g-4">
                <div className="col-md-6">
                  <div className="p-4 rounded h-100 shadow-sm" style={{ backgroundColor: "#ffffff", borderTop: "4px solid #0B5D3B" }}>
                    <h4 className="fw-bold mb-3 d-flex align-items-center" style={{ color: "#0B5D3B", fontSize: "1.2rem" }}>
                      <FaClipboardList className="me-2 text-warning" /> Requirements
                    </h4>
                    <ul className="list-unstyled mb-0">
                      {courseContent.requirements.map((item, index) => (
                        <li key={index} className="d-flex align-items-start mb-3 border-bottom pb-2">
                          <FaCheckCircle className="mt-1 me-2 flex-shrink-0" style={{ color: "#0B5D3B" }} />
                          <span style={{ color: "#475569", fontSize: "0.9rem" }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-4 rounded h-100 shadow-sm" style={{ backgroundColor: "#ffffff", borderTop: "4px solid #C9A227" }}>
                    <h4 className="fw-bold mb-3 d-flex align-items-center" style={{ color: "#0B5D3B", fontSize: "1.2rem" }}>
                      <FaBoxOpen className="me-2 text-warning" /> Material Includes
                    </h4>
                    <ul className="list-unstyled mb-0">
                      {courseContent.materialIncludes.map((item, index) => (
                        <li key={index} className="d-flex align-items-start mb-3 border-bottom pb-2">
                          <FaCheckCircle className="mt-1 me-2 flex-shrink-0" style={{ color: "#C9A227" }} />
                          <span style={{ color: "#475569", fontSize: "0.9rem" }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Registration Card */}
          <div className="col-lg-4 order-1 order-lg-2">
            <div className="course-sidebar-sticky" style={{ position: "sticky", top: "100px" }}>
              <div className="card shadow-lg border-0 rounded-4 overflow-hidden mb-4 viewcourse-reg-card" style={{ transition: "all 0.3s ease" }}>
                
                <div className="position-relative">
                  <img
                    className="w-100 object-fit-cover"
                    src={courseContent.image}
                    alt={courseName}
                    style={{ height: "200px", borderBottom: "4px solid #0B5D3B" }}
                  />
                </div>

                <div className="card-body p-4 bg-white">
                  <div className="mb-4">
                    <button 
                      onClick={handleRegisterClick}
                      className="btn w-100 fw-bold text-white py-3 shadow-sm text-uppercase rounded-pill"
                      disabled={isButtonDisabled()}
                      style={{ 
                        letterSpacing: "1px", 
                        transition: "all 0.3s ease",
                        backgroundColor: "#0B5D3B",
                        border: "none",
                      }}
                      onMouseOver={(e) => {
                        if (!isButtonDisabled()) {
                          e.currentTarget.style.backgroundColor = "#C9A227";
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow = "0 6px 12px rgba(201, 162, 39, 0.3)";
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!isButtonDisabled()) {
                          e.currentTarget.style.backgroundColor = "#0B5D3B";
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "0 .125rem .25rem rgba(0,0,0,.075)";
                        }
                      }}
                    >
                      <i className={getButtonText() === "Login to Register" ? "fas fa-sign-in-alt me-2" : "fas fa-check-circle me-2"}></i>
                      {getButtonText()}
                    </button>
                    {isButtonDisabled() && isAuthenticated() && userCourses.length >= 2 && !userCourses.includes(courseName) && (
                      <div className="text-center text-danger small mt-2 fw-bold">
                        Maximum 2 courses limit reached.
                      </div>
                    )}
                  </div>

                  <h5 className="fw-bold mb-3 border-bottom pb-2" style={{ color: "#0B5D3B" }}>Course Benefits</h5>
                  
                  <div className="d-flex flex-column gap-2">
                    <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                      <div className="d-flex align-items-center text-muted small">
                        <FaCheckCircle className="me-2" style={{ color: "#0B5D3B" }} />
                        <span className="fw-semibold">Certificate</span>
                      </div>
                      <span className="fw-bold text-dark small">Included</span>
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                      <div className="d-flex align-items-center text-muted small">
                        <FaLaptop className="me-2" style={{ color: "#0B5D3B" }} />
                        <span className="fw-semibold">Evaluation</span>
                      </div>
                      <span className="fw-bold text-dark small">Included</span>
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                      <div className="d-flex align-items-center text-muted small">
                        <FaGlobe className="me-2" style={{ color: "#0B5D3B" }} />
                        <span className="fw-semibold">Language</span>
                      </div>
                      <span className="fw-bold text-dark small">Urdu / English</span>
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                      <div className="d-flex align-items-center text-muted small">
                        <FaConnectdevelop className="me-2" style={{ color: "#0B5D3B" }} />
                        <span className="fw-semibold">Eligibility</span>
                      </div>
                      <span className="fw-bold text-dark small">Everyone</span>
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                      <div className="d-flex align-items-center text-muted small">
                        <FaCoins className="me-2" style={{ color: "#0B5D3B" }} />
                        <span className="fw-semibold">Fee</span>
                      </div>
                      <span className="badge rounded-pill bg-success">Free</span>
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-center py-2">
                      <div className="d-flex align-items-center text-muted small">
                        <IoCardOutline className="me-2" style={{ color: "#0B5D3B" }} />
                        <span className="fw-semibold">Scholarship</span>
                      </div>
                      <span className="fw-bold text-success small">Yes</span>
                    </div>
                  </div>

                </div>
              </div>
              
              {/* Help Box - Compact */}
              <div className="card shadow-sm border-0 rounded-4" style={{ backgroundColor: "#f0f8f4", borderLeft: "4px solid #0B5D3B" }}>
                <div className="card-body p-3 d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="fw-bold mb-1" style={{ color: "#0B5D3B" }}>Need Help?</h6>
                    <p className="text-muted small mb-0" style={{ fontSize: "0.75rem" }}>Contact support team.</p>
                  </div>
                  <a href="mailto:support@digikhyber.com" className="btn btn-sm btn-success rounded-pill fw-bold px-3">
                    Email Us
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCourse;
