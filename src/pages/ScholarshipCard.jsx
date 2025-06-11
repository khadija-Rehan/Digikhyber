import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import FS from "../assets/scholar.webp";
import GS from "../assets/card-s.webp";
import Team from "../assets/team.png";
import ParticleBackground from "../components/ParticleBackground";
import { Link } from "react-router-dom";

const ScholarshipCard = () => {
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
                                <h1 className="font-48">Scholarship Cards</h1>
                                <p className="font-18 light-grey l-h-1 weight-400">
                                    Apply now for exclusive tech scholarships by the Punjab
                                    Government. Your skills, your success — all you need is a
                                    start.
                                </p>
                            </div>
                            <div className="col-lg-4 col-md-12">
                                <img src={FS} alt="Course" className="w-100 banner-image" />
                                <div className="cube"> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row pt-5 pb-5 align-items-center">
                    <div className="col-lg-6"  data-aos="fade-right">
                        <img className="w-100" src="/scholarship card.jpg" alt="" />
                    </div>
                    <div className="col-lg-6"  data-aos="fade-left">
                        <h2 className="fw-semibold">Unlock Your Future with Our Scholarship Cards</h2>
                        <p>
                            We believe every passionate learner deserves a chance to grow —
                            regardless of financial background. That’s why we’ve introduced
                            Scholarship Cards, your gateway to free, high-quality IT training.
                            These cards are designed to remove financial barriers and open
                            doors to the world of digital skills and modern technology. With a
                            Scholarship Card, you can enroll in industry-relevant training
                            programs and gain hands-on experience in fields that are shaping
                            the future — from coding to cybersecurity and beyond. We’re here
                            to support your journey every step of the way, offering access to
                            expert mentors, learning labs, and career opportunities. This
                            initiative is about more than just education — it’s about creating
                            lasting change, empowering individuals to become job-ready, and
                            contributing to the digital transformation of our society.
                            Thousands have already taken the first step toward successful tech
                            careers — now it’s your turn. Let us help you build the future
                            you’ve dreamed of. Apply today for your Scholarship Card and
                            become part of the next generation of skilled digital
                            professionals.
                        </p>
                        <div className="d-flex align-items-center gap-3 flex-wrap flex-md-nowrap">

                        <a
                            href="/Scholarship Card Eligibility Criteria.doc"
                            download="Scholarship Card Eligibility Criteria.doc"
                            >

                            <button className="btn-green register-btn  btn btn-success " style={{ fontFamily: "Poppins" }}><i class="fa-solid fa-arrow-down"></i> Download Eligibility criteria  </button>
                        </a>
                        <Link to={"/apply-scholarshipcard"}>
                            <button className="btn-green register-btn  btn btn-success " style={{ fontFamily: "Poppins" }}> Apply Now  </button>

                        </Link>
                            </div>
                    </div>
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

export default ScholarshipCard;
