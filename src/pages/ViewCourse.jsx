import React from "react";
import ParticleBackground from "../components/ParticleBackground";
import { Link } from "react-router-dom";
import image from "../assets/ML.jpg";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
const ViewCourse = () => {
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
                  The Complete WordPress Development Course 2025
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
                  <div>Level: Beginners to Intermediate</div>
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
                create professional websites using WordPress, the world’s most
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
                  <Link to={"/register"}>
                    <button className="btn-green register-btn mb-3 mt-2  btn btn-success w-100">
                      Register Course
                    </button>
                  </Link>
                  <p className="font-20 ps-2">Benefits Obtained :</p>
                  <div className="ps-4">
                    <p>
                      <i className="jki jki-file-text-line"></i>
                      Training Evaluation Tests
                    </p>
                    <p>
                      <i className="jki jki-id-card"></i> Completion
                      Certification
                    </p>
                  </div>
                  
                  <p className="font-20 ps-2">Share:</p>

                  <div className="social">
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
