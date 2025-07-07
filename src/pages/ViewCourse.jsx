import React, { useState, useEffect } from "react";
import ParticleBackground from "../components/ParticleBackground";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCourses } from "../context/CoursesContext";
import { toast } from 'react-toastify';
import image from "../assets/ML.jpg";
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
} from "react-icons/fa";
import { CiCreditCard1 } from "react-icons/ci";
import { IoCardOutline } from "react-icons/io5";

const ViewCourse = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();
  const { userCourses, addCourse } = useCourses();
  
  // Get course name from URL parameter, default to WordPress if not provided
  const courseNameFromURL = searchParams.get('course');
  const courseName = courseNameFromURL || "WordPress Website Development";

  const handleRegisterClick = (e) => {
    e.preventDefault();
    if (isAuthenticated()) {
      // Check if user already has 3 courses
      if (userCourses.length >= 3) {
        toast.warning("You can only enroll in up to 3 courses. Please remove a course from your selection first.");
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
      navigate('/admission-test');
    } else {
      toast.info("Please login first to register for the course");
      navigate('/login');
    }
  };

  // Determine button text and state
  const getButtonText = () => {
    if (!isAuthenticated()) {
      return "Login to Register";
    }
    if (userCourses.includes(courseName)) {
      return "Already Added ✓";
    }
    if (userCourses.length >= 3) {
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
    if (userCourses.length >= 3) {
      return "btn-green register-btn mb-3 mt-2 btn btn-secondary w-100";
    }
    return "btn-green register-btn mb-3 mt-2 btn btn-success w-100";
  };

  const isButtonDisabled = () => {
    return !isAuthenticated() || userCourses.includes(courseName) || userCourses.length >= 3;
  };

  return (
    <>
      <div className="banner">
        <ParticleBackground />
        <div className="banner-content  ">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-12">
                <h5>Software Development</h5>
                <h1 className="font-48">
                  {courseName}
                </h1>
                <p className="font-18 light-grey l-h-1 weight-400">
                  Discover a wide range of skill-building programs designed to
                  boost your career prospects. Find the perfect course to help
                  you shine!
                </p>
                <div
                  className="bg-white text-black d-flex  gap-4 p-2 px-4 w-fitcontent rounded-5 "
                  style={{ width: "fit-content" }}
                >
                  <div>Classes: Recorded</div>
                  <div>Duration: 3 Months</div>
                  <div>Level: Intermediate</div>
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
              <h3>About Course</h3>
              <p>
                This course is perfect for beginners who want to learn how to
                create professional websites using WordPress, the world's most
                popular content management system. It covers everything from
                installation to creating dynamic, fully functional websites. By
                the end of the course, students will have the skills to build,
                manage, and customize WordPress sites for various purposes.
              </p>
            </div>
            <div className="py-3">
              <h3>Requirements</h3>
              <ul>
                <li>Basic computer and internet skills.</li>
                <li>A laptop or desktop with internet access.</li>
                <li>
                  No prior knowledge of WordPress or web development is needed.
                </li>
              </ul>
            </div>
            <div className="py-3">
              <h3>Material Includes</h3>
              <ul>
                <li>Step-by-step course guide.</li>
                <li>Resource links for free and premium themes/plugins.</li>
                <li>Sample website project for practice.</li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="courses-wrapper">
              <div className="course">
                <img className="w-100" src={image} alt="" />
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

                  {/* <p className="font-20 ps-2">Share:</p> */}

                  {/* <div className="social">
                    <button className="social-button" style={{border:"1px solid #079560" }}>
                      <a href="#">
                        <FaFacebookF />
                      </a>
                    </button>
                    <button className="social-button" style={{border:"1px solid #079560" }}>
                      <a href="#">
                        <FaTwitter />
                      </a>
                    </button>
                    <button className="social-button" style={{border:"1px solid #079560" }}>
                      <a href="#">
                        <FaInstagram />
                      </a>
                    </button>
                    <button className="social-button" style={{border:"1px solid #079560" }}>
                      <a href="#">
                        <FaLinkedinIn />
                      </a>
                    </button>
                    <button className="social-button" style={{border:"1px solid #079560" }}>
                      <a href="#">
                        <FaWhatsapp />
                      </a>
                    </button>
                  </div> */}
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
