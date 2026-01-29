import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import FS from "../assets/team.webp";
import GS from "../assets/grow.png";
import Team from "../assets/team.png";
import ParticleBackground from "../components/ParticleBackground";
import { Link } from "react-router-dom";
import ApplicationSteps from "../components/ApplicationSteps";
import OurPartners from "../components/Ourpartners";
import StatCounter from "../components/StatsCounter";

const AboutUs = () => {
  const [cardsPerRow, setCardsPerRow] = useState(3);

  const updateCardsPerRow = () => {
    const width = window.innerWidth;
    if (width <= 600) {
      setCardsPerRow(1);
    } else if (width <= 992) {
      setCardsPerRow(2);
    } else {
      setCardsPerRow(3);
    }
  };

  useEffect(() => {
    updateCardsPerRow();
    window.addEventListener("resize", updateCardsPerRow);

    AOS.init({
      duration: 800,
      offset: 300,
      once: false,
    });

    return () => {
      window.removeEventListener("resize", updateCardsPerRow);
    };
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [cardsPerRow]);

  return (
    <>
      <div className="banner">
        <ParticleBackground />

        <div className="banner-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-12">
                <h1 className="font-48">About Us</h1>
                <p className="font-18 light-grey l-h-1 weight-400">
                  Ready to gain valuable digital skills? Hunarmand Punjab is
                  dedicated to empowering the youth with the training needed to
                  succeed in today’s job market.
                </p>
              </div>
              <div className="col-lg-4 col-md-12">
                <img
                  src="/images/About-us.jpeg"
                  alt="Course"
                  className="w-100 banner-image"
                />
                <div className="cube"> </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="all-courses p-0">
        <div className="container">
          <div className="courses-wrapper">
            <div className="row  pt-5  ">
              <div className="col-lg-6" data-aos="fade-right">
                <img className="w-100" src={GS} alt={GS} />
              </div>
              <div className="col-lg-6" data-aos="fade-left">
                <div className="d-p white m-0 mb-3">Who We Are</div>
                <h2 className="mb-3">
                  Grow Your Skills and Career with Hunarmand Punjab
                </h2>
                <p>
                  Welcome to Hunarmand Punjab! We're here to help the young
                  people of Punjab get the digital skills they need to find good
                  jobs. Our goal is to train 500,000 students and help them
                  become professional earners. We want to lower unemployment and
                  make Punjab's economy stronger by teaching skills that are in
                  demand.
                </p>
                <div className="pb-4 pt-4">
                  <h5>Our Mission</h5>
                  <p>
                    To provide training to 500,000 students and make them
                    professional earners.
                  </p>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <button class="build-icon-btn mb-4">
                      <svg
                        aria-hidden="true"
                        class="e-font-icon-svg e-fas-user-graduate __web-inspector-hide-shortcut__"
                        viewBox="0 0 448 512"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ color: "white" }}
                      >
                        <path
                          d="M319.4 320.6L224 416l-95.4-95.4C57.1 323.7 0 382.2 0 454.4v9.6c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-9.6c0-72.2-57.1-130.7-128.6-133.8zM13.6 79.8l6.4 1.5v58.4c-7 4.2-12 11.5-12 20.3 0 8.4 4.6 15.4 11.1 19.7L3.5 242c-1.7 6.9 2.1 14 7.6 14h41.8c5.5 0 9.3-7.1 7.6-14l-15.6-62.3C51.4 175.4 56 168.4 56 160c0-8.8-5-16.1-12-20.3V87.1l66 15.9c-8.6 17.2-14 36.4-14 57 0 70.7 57.3 128 128 128s128-57.3 128-128c0-20.6-5.3-39.8-14-57l96.3-23.2c18.2-4.4 18.2-27.1 0-31.5l-190.4-46c-13-3.1-26.7-3.1-39.7 0L13.6 48.2c-18.1 4.4-18.1 27.2 0 31.6z"
                          fill="#ffff"
                        ></path>
                      </svg>
                    </button>
                    <h5>Professional Instructors</h5>
                    <p>
                      Learn from dedicated industry experts and grow you digital
                      skills
                    </p>
                  </div>
                  <div className="col-lg-6">
                    <button class="build-icon-btn mb-4">
                      <svg
                        aria-hidden="true"
                        class="e-font-icon-svg e-far-grin-stars"
                        viewBox="0 0 496 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm105.6-151.4c-25.9 8.3-64.4 13.1-105.6 13.1s-79.6-4.8-105.6-13.1c-9.8-3.1-19.4 5.3-17.7 15.3 7.9 47.2 71.3 80 123.3 80s115.3-32.9 123.3-80c1.6-9.8-7.7-18.4-17.7-15.3zm-227.9-57.5c-1 6.2 5.4 11 11 7.9l31.3-16.3 31.3 16.3c5.6 3.1 12-1.7 11-7.9l-6-34.9 25.4-24.6c4.5-4.5 1.9-12.2-4.3-13.2l-34.9-5-15.5-31.6c-2.9-5.8-11-5.8-13.9 0l-15.5 31.6-34.9 5c-6.2.9-8.9 8.6-4.3 13.2l25.4 24.6-6.1 34.9zm259.7-72.7l-34.9-5-15.5-31.6c-2.9-5.8-11-5.8-13.9 0l-15.5 31.6-34.9 5c-6.2.9-8.9 8.6-4.3 13.2l25.4 24.6-6 34.9c-1 6.2 5.4 11 11 7.9l31.3-16.3 31.3 16.3c5.6 3.1 12-1.7 11-7.9l-6-34.9 25.4-24.6c4.5-4.6 1.8-12.2-4.4-13.2z"
                          fill="#ffff"
                        ></path>
                      </svg>
                    </button>
                    <h5>25+ courses</h5>
                    <p>
                      You'll find a-lot of different courses to help you learn
                      new skills!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div style={{ background: "#F7F7F7" }}>
                    <div className="container">
                        <div className="row align-items-center pt-5 pb-5">
                            <div className="col-lg-3  mb-3">
                                <h2>Our Instructors</h2>
                                <p>
                                    Learn from dedicated industry experts. Our instructors lead
                                    this initiative, supported by the Government of Pakistan, to
                                    build a skilled generation.
                                </p>
                                <Link to={"/become-instructors"}>
                                    <button className="btn-green register-btn  btn btn-success">
                                        Become a Instructor
                                    </button>
                                </Link>
                            </div>
                            <div className="col-lg-3 mb-3">
                                <div className="teams-card ">
                                    <img className="mb-3" src={Team} alt={Team} />
                                    <h5>Lauren Martinez</h5>
                                    <span>Python Tutor</span>
                                    <p>Aliquip eiusmod in voluptate do quis ipsum dolor</p>
                                </div>
                            </div>{" "}
                            <div className="col-lg-3 mb-3">
                                <div className="teams-card">
                                    <img className="mb-3" src={Team} alt={Team} />
                                    <h5>Lauren Martinez</h5>
                                    <span>Python Tutor</span>
                                    <p>Aliquip eiusmod in voluptate do quis ipsum dolor</p>
                                </div>
                            </div>{" "}
                            <div className="col-lg-3 mb-3">
                                <div className="teams-card">
                                    <img className="mb-3" src={Team} alt={Team} />
                                    <h5>Lauren Martinez</h5>
                                    <span>Python Tutor</span>
                                    <p>Aliquip eiusmod in voluptate do quis ipsum dolor</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
      </div>

      <StatCounter />

      <OurPartners />
    </>
  );
};

export default AboutUs;
