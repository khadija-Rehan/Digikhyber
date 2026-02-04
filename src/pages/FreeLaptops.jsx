import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import FS from "../assets/laptops.webp";
import GS from "../assets/occupation.webp";
import Team from "../assets/team.png";
import ParticleBackground from "../components/ParticleBackground";
import StatCounter from "../components/StatsCounter";
import { Link } from "react-router-dom";

const FreeLaptops = () => {
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
                                <h1 className="font-48">Hunarmand Laptop Scheme</h1>
                                <p className="font-18 light-grey l-h-1 weight-400">
                                    The Hunarmand Laptop Scheme, launched under the visionary
                                    leadership of Minister of School & Higher Education Rana
                                    Sikandar Hayat, ensures that eligible students who meet our
                                    criteria never fall behind due to a lack of digital access
                                </p>
                            </div>
                            <div className="col-lg-4 col-md-12">
                                <img
                                    src="/images/Laptop Scheme.jpg"
                                    alt="Course"
                                    className="w-100 banner-image"
                                />
                                <div className="cube"> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row pt-5 pb-5 align-items-center">
                    <div className="col-lg-6" data-aos="fade-right">
                        <img
                            className="w-100"
                            src="/images/Laptop Scheme Page Image (3).jpeg"
                            alt=""
                        />
                       
                    </div>
                    <div className="col-lg-6" data-aos="fade-left">
                        <h2 className="fw-semibold">
                            Your Digital Future Starts Here – Free Laptops for Eligible
                            Students
                        </h2>
                        <p>
                            <p className="card-text text-muted">
                                The <strong>Laptop Scheme</strong>, launched under the visionary
                                leadership of{" "}
                                <strong>
                                    Minister of School & Higher Education Rana Sikandar Hayat
                                </strong>
                                , ensures that eligible students who meet our criteria never
                                fall behind due to a lack of digital access.
                            </p>
                            <p className="card-text text-muted">
                                This initiative provides laptops to students enrolled in{" "}
                                <strong>Hunarmand Punjab</strong> who pass the final evaluation
                                test as per policy, enabling them to participate in online
                                classes, complete practical assignments, and launch their
                                freelance or tech careers with confidence.
                            </p>
                            <div className="mt-4">
                                <p className="fw-semibold ">
                                    ⚡ What the Laptop Scheme Delivers:
                                </p>
                                <ul className="  mt-2">
                                    <li> 
                                        {/* A Brand-New Laptop — Absolutely Free */}
                                        A Laptop/Chromebook — Absolutely Free
                                    </li>
                                    <li> Unlimited Access to Online Classes & Tools</li>
                                    <li> Empowerment to Learn, Create & Earn from Anywhere</li>
                                    <li>Fuel for Freelancing, Tech Startups & Career Growth</li>
                                    <li> A Level Playing Field for All Learners</li>
                                </ul>
                            </div>
                            <p>Apply today, get a chance to <b> avail your laptop</b>, and unlock a world of digital opportunities.</p>
                            <div className="mt-4    ">
                                <Link
                                    to="/apply-scholarshipcard"

                                    className="btn-green register-btn btn btn-success"
                                >
                                    Apply Now
                                </Link>
                            </div>
                        </p>
                    </div>
                    {/* <h2 className="text-center mb-4 mt-5">
                        How to Avail the Laptop Scheme
                    </h2>
                    <div className="col-lg-6">
                        <section className="container laptop-scheme-section py-5">
                            <ol
                                className="laptop-scheme-steps mb-4"
                                style={{ fontFamily: "poppins" }}
                            >
                                <li>
                                    Register for any Hunarmand Punjab course to become eligible
                                    for the Scholarship Card. <br />
                                </li>
                                <li>
                                    Gain benefits under the Scholarship Card: Laptop Scheme, Solar
                                    Scheme, Taleem Finance, Taleem Abroad, and access to Advanced
                                    IT Courses.
                                </li>
                                <li>
                                    Submit your laptop application via the portal and receive a
                                    confirmation.
                                </li>
                                <li>
                                    Appear for the Final Evaluation Test and complete the final
                                    assessment. Shortlisted candidates will qualify for the Laptop
                                    Scheme or other benefits under the Hunarmand Scholarship Card.
                                </li>
                            </ol>
                            <p className=" font-16 mt-2">
                                Register today and take the first step toward a successful
                                digital career with Hunarmand Punjab!
                            </p>
                        </section>
                    </div>
                    <div className="col-lg-6">
                        <img
                            className="w-100"
                            src="https://pftpedu.org/assets/img/map.png"
                            alt=""
                        />
                    </div> */}
                </div>
            </div>

            <StatCounter />
        </>
    );
};

export default FreeLaptops;
