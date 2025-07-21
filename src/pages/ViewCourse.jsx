import React, { useState, useEffect } from "react";
import ParticleBackground from "../components/ParticleBackground";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCourses } from "../context/CoursesContext";
import { toast } from "react-toastify";
import image from "../assets/ML.jpg";
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
} from "react-icons/fa";
import { CiCreditCard1 } from "react-icons/ci";
import { IoCardOutline } from "react-icons/io5";

const ViewCourse = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();
  const { userCourses, addCourse } = useCourses();

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
        toast.warning(
          "You can only enroll in up to 2 courses. Please remove a course from your selection first."
        );
        return;
      }

      // Check if course is already selected
      if (userCourses.includes(courseName)) {
        toast.info("This course is already in your selection!");
        return;
      }

      // Add course to user's selection
      addCourse(courseName);
      toast.success(`${courseName} has been added to your course selection!`);

      // Navigate to admission test
      navigate("/admission-test");
    } else {
      toast.info("Please login first to register for the course");
      navigate("/login");
    }
  };

  return (
    <>
      <div className="banner">
        <ParticleBackground />
        <div className="banner-content  ">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-12">
                <h5>{courseContent.category}</h5>
                <h1 className="font-48">{courseName}</h1>
                <p className="font-18 light-grey l-h-1 weight-400">
                  {courseContent.description}
                </p>
                <div
                  className="bg-white text-black d-flex  gap-4 p-2 px-4 w-fitcontent rounded-5 "
                  style={{ width: "fit-content" }}
                >
                  <div>Classes: Recorded</div>
                  <div>Duration: 3 Months
                     {/* {courseContent.duration} */}
                  </div>
                  {/* <div>Level: {courseContent.level}</div> */}
                  <div>Level: Beginner to Advanced</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row pt-5 pb-5 about-course">
          <div className="col-lg-7">
            <div className="py-3">
              <h3>Course Details</h3>
              <p style={{ lineHeight: "1.8", textAlign: "justify" }}>
                {courseContent.aboutCourse}
              </p>
            </div>

            <div className="py-3">
              <h3>Who Can Join This Course?</h3>
              <p>This course is ideal for:</p>
              <ul style={{ lineHeight: "1.8" }}>
                {courseContent.whoCanJoin.map((item, index) => (
                  <li key={index} style={{ marginBottom: "8px" }}>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3">
                <strong>No previous experience is required.</strong> This course
                takes you from beginner level to advanced level, step by step.
              </p>
            </div>

            <div className="py-3">
              <h3>What Will You Learn?</h3>
              <div style={{ lineHeight: "1.8" }}>
                {courseContent.whatWillYouLearn.map((item, index) => (
                  <div key={index} style={{ marginBottom: "12px" }}>
                    <strong>• {item}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="py-3">
              <h3>Requirements</h3>
              <ul style={{ lineHeight: "1.8" }}>
                {courseContent.requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="py-3">
              <h3>Material Includes</h3>
              <ul style={{ lineHeight: "1.8" }}>
                {courseContent.materialIncludes.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="courses-wrapper">
              <div className="course flex-grow-1">
                <img
                  className="w-100"
                  src={courseContent.image}
                  alt={courseName}
                />
                <div className="course-card-details">
                  <button 
                    onClick={handleRegisterClick}
                    className={getButtonClass()}
                    disabled={isButtonDisabled()}
                  >
                    {getButtonText()}
                  </button>
                  <p className="font-20 ps-2">Benefits Obtained :</p>
                  <div className="ps-2">
                    <div className="benefits-list mt-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <p>
                          <FaCheckCircle
                            className="icon"
                            style={{ color: "#079560", marginRight: "5px" }}
                          />{" "}
                          Completion Certificate:{" "}
                        </p>
                        <p className="fw-semibold">Yes</p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <p>
                          <FaLaptop
                            className="icon"
                            style={{ color: "#079560", marginRight: "5px" }}
                          />{" "}
                          Training Evaluation: 
                        </p>
                        <p className="fw-semibold">Yes</p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <p>
                          <FaGlobe
                            className="icon"
                            style={{ color: "#079560", marginRight: "5px" }}
                          />{" "}
                          Language: 
                        </p>
                        <p className="fw-semibold">Urdu / English</p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <p>
                          <FaConnectdevelop
                            className="icon"
                            style={{ color: "#079560", marginRight: "5px" }}
                          />{" "}
                          Who can Join: 
                        </p>
                        <p className="fw-semibold">Everyone</p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <p>
                          <FaCoins
                            className="icon"
                            style={{ color: "#079560", marginRight: "5px" }}
                          />{" "}
                          Fee:
                        </p>
                        <p className="fw-semibold"> Free of Cost</p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <p>
                          <IoCardOutline
                            className="icon"
                            style={{ color: "#079560", marginRight: "5px" }}
                          />{" "}
                          Scholarship Card Opportunity: 
                        </p>
                        <p className="fw-semibold">Yes</p>
                      </div>
                    </div>
                  </div>
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