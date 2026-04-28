import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import FS from "../assets/scholar.webp";
import PageBanner from "../components/PageBanner";
import { Link } from "react-router-dom";
import StatCounter from "../components/StatsCounter";

const TaleemFinance = () => {
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
            <PageBanner 
                title="Taleem Finance Scheme"
                description="Education is a right — not a privilege limited by affordability. That’s why Digikhyber has launched the Taleem Finance Scheme — a groundbreaking support system designed to help students overcome financial hurdles and continue their journey toward digital and professional success."
                image="/images/Digikhyber banner19-min.jpg"
            />
            <div className="container pt-5">
                <div className="row pt-5 pb-5  ">
                    <div className="col-lg-6" data-aos="fade-left">
                        <h2 className="fw-semibold">
                            Financial Barriers Shouldn’t Block Brighter Futures!
                        </h2>
                        <p>
                            Education is a right — not a privilege limited by affordability.
                            That’s why Digikhyber has launched the Taleem Finance Scheme
                            — a groundbreaking support system designed to help students
                            overcome financial hurdles and continue their journey toward
                            digital and professional success.
                        </p>
                        <p>
                            Whether it’s tuition fees, essential devices like laptops, or
                            learning materials — Taleem Finance gives you the freedom to learn
                            without the stress of financial pressure. It's time to invest in
                            your future, not worry about the cost of it.
                        </p>
                        <div className="mt-4">
                            <p className="fw-semibold ">⚡ Taleem Finance Helps You With:</p>
                            <ul className="  mt-2">
                                <li> Education Fee Support for skill-based programs</li>
                                <li> Device Financing to access laptops and digital tools</li>
                                <li> Learning Resources and materials covered</li>
                                {/* <li>Eco-Friendly, Sustainable Energy Solution</li> */}
                                <li>
                                    {" "}
                                    Financial Guidance for smart, student-friendly planning
                                </li>
                            </ul>
                        </div>
                        <p className="fw-bold">
                            Apply for Taleem Finance today and take control of your education,
                            your growth — and your future.
                        </p>
                        <div className="d-flex align-items-center gap-3 flex-wrap flex-md-nowrap">
                            <Link to={"/apply-scholarshipcard"}>
                                <button
                                    className="btn-green register-btn  btn btn-success "
                                    style={{ fontFamily: "Poppins" }}
                                >
                                    {" "}
                                    Apply Now{" "}
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-6" data-aos="fade-right">
                        <img className="w-100 rounded-4" src="/images/Taleem Finance Page Image (1).jpeg" alt="" />
                    </div>
                </div>
            </div>
            {/* <div className="container my-3">
                <div className="  p-4">
                    <h2 className="card-title text-success mb-4 text-center">
                        Digikhyber – Taleem Finance Initiative
                    </h2>

                     
                    <div className="mb-4">
                        <h4>Overview</h4>
                        <p>
                            Whether you're pursuing science, technology, business, or the
                            arts, our tailored education support programs are built to help
                            you:
                        </p>
                        <ul className="   ">
                            <li className=" ">
                                Access quality education without financial stress
                            </li>
                            <li className=" ">
                                Continue online and in-person learning uninterrupted
                            </li>
                            <li className=" ">
                                Build confidence and independence in your academic journey
                            </li>
                        </ul>
                    </div>

                    <p className="mb-2">
                        This is more than just financial support — it’s about empowering the
                        next generation, closing opportunity gaps, and building a brighter,
                        more inclusive future through education.
                    </p>
                    <p>
                        Thousands of students have already taken this step forward with
                        Taleem Finance — now it's your turn. Apply today and unlock your
                        potential with the support you deserve.
                    </p>
                </div>
            </div> */}
            <StatCounter />
        </>
    );
};

export default TaleemFinance;
