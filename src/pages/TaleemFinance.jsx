import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import FS from "../assets/scholar.webp";
import ParticleBackground from "../components/ParticleBackground";
import { Link } from "react-router-dom";

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

    const statsData = [
        { end: 1000000, label: "Million Students", suffix: "" },
        { end: 30, label: "Certified Experts", suffix: "+" },
        { end: 200000, label: "Scholarships", suffix: "" },
        { end: 25, label: "Courses", suffix: "+" },
    ];

    const StatCounter = ({ end, label, suffix }) => {
        const { ref, inView } = useInView({ triggerOnce: true });
        return (
            <div className="stat col-lg-3 col-md-12" ref={ref}>
                <p className="font-48 m-0">
                    {inView && (
                        <CountUp end={end} duration={2} separator="," suffix={suffix} />
                    )}
                </p>
                <p className="font-16 weight-400">{label}</p>
            </div>
        );
    };

    return (
        <>
            <div className="banner">
                <ParticleBackground />

                <div className="banner-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-12">
                                <h1 className="font-48">Taleem Finance</h1>
                                <p className="font-18 light-grey l-h-1 weight-400">
                                    Apply now for exclusive tech taleem by the Punjab
                                    Government. Your skills, your success — all you need is a
                                    start.
                                </p>
                            </div>
                            <div className="col-lg-4 col-md-12">
                                <img src="/Solar-Panel.webp" alt="Course" className="w-100 banner-image" />
                                <div className="cube"> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container pt-5">
                <div className="row pt-5 pb-5  ">

                    <div className="col-lg-6" data-aos="fade-left">
                        <h2 className="fw-semibold">Brighten Your Tomorrow with Taleem Finance</h2>
                        <p>
                            At Taleem Finance, we believe every passionate student deserves the right environment to learn, grow, and thrive — regardless of financial challenges. That’s why our mission is to support young minds through accessible, student-centered financial solutions designed to remove barriers to education.
                            We understand that financial limitations can disrupt learning — from tuition fees and course materials to technology and transport. Taleem Finance is here to *bridge that gap* with smart, flexible financing options that help you stay focused on what truly matters: your education and future success.

                        </p>
                        <div className="d-flex align-items-center gap-3 flex-wrap flex-md-nowrap">


                            <Link to={"/apply-scholarshipcard"}>
                                <button className="btn-green register-btn  btn btn-success " style={{ fontFamily: "Poppins" }}> Apply Now  </button>

                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-6" data-aos="fade-right">
                        <img className="w-100 rounded-4" src="/Solar-Panel.webp" alt="" />
                    </div>
                </div>
            </div>
            <div className="container my-3">
                <div className="  p-4">
                    <h2 className="card-title text-success mb-4 text-center">Hunarmand Punjab – Taleem Finance Initiative</h2>



                    {/* Key Features */}
                    <div className="mb-4">
                        <h4>Overview</h4>
                        <p  >Whether you're pursuing science, technology, business, or the arts, our tailored education support programs are built to help you:</p>
                        <ul className="   ">
                            <li className=" ">Access quality education without financial stress</li>
                            <li className=" ">Continue online and in-person learning uninterrupted
                            </li>
                            <li className=" ">Build confidence and independence in your academic journey</li>

                        </ul>
                    </div>

                    <p className="mb-2">This is more than just financial support — it’s about empowering the next generation, closing opportunity gaps, and building a brighter, more inclusive future through education.</p>
                    <p>Thousands of students have already taken this step forward with Taleem Finance — now it's your turn.
                        Apply today and unlock your potential with the support you deserve.</p>
                </div>
            </div>
            <div className="platform white">
                <h1 className="font-40">Why choose our platform</h1>
                <div className="stats row">
                    {statsData.map((stat, index) => (
                        <StatCounter
                            key={index}
                            end={stat.end}
                            label={stat.label}
                            suffix={stat.suffix}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default TaleemFinance;
