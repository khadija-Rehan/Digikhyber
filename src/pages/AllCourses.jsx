import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

import ML from "../assets/Machine Learning & Data Science.jpg";
import UI from "../assets/Advanced UIUX Designing.jpg";
import DM from "../assets/Digital Marketing & AI.jpg";
import FS from "../assets/Full Stack Web Developement with React & Node JS.jpg";
import AD from "../assets/Hunarmand Punjab Website Banner 4-min.jpg";
import WP from "../assets/WordPress Web Development.jpg";
import StarRating from "../components/StarRating";
import Particles from "../components/ParticleBackground";
import ParticleBackground from "../components/ParticleBackground";
import { Link } from "react-router-dom";
import StatCounter from "../components/StatsCounter";
const AllCourses = () => {
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

    const courses = [
        { image: FS, title: "Full-Stack Web Development with JavaScript" },
        { image: AD, title: "Native Android Application Development" },
        { image: ML, title: "Machine Learning, AI, and Data Science" },
        { image: WP, title: "WordPress Website Design & Deployment" },
        { image: UI, title: "User Interface (UI) and User Experience (UX) Design" },
        { image: DM, title: "Full Stack Digital Marketing" },
    ];

   
 
    return (
        <>
            <div className="banner">
                <ParticleBackground />
                <div className="banner-content  ">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-12">
                                <h1 className="font-48">Courses</h1>
                                <p className="font-18 light-grey l-h-1 weight-400">
                                    Hunarmand Punjab courses are not just different — they are
                                    revolutionary. Designed with hands-on practice, live projects,
                                    and international standards, we prepare you to lead in today's
                                    global digital economy.
                                </p>
                            </div>
                            <div className="col-lg-4 col-md-12">
                                <img src="/images/Advanced IT Courses -2.jpg" alt="Course" className="w-100 banner-image" />
                                <div className="cube"> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="all-courses">
                <div className="container">
                    <div className="courses-wrapper">
                        {courses.map((course, index) => {
                            const delay = Math.floor(index / cardsPerRow) * 200;
                            return (
                                <div
                                    className="course"
                                    data-aos="fade-up"
                                    data-aos-delay={delay}
                                    data-aos-duration="800"
                                    key={index}
                                >
                                    <img
                                        className="w-100"
                                        src={course.image}
                                        alt={course.title}
                                    />
                                    <div className="course-card-details d-flex flex-column justify-content-between h-100">
                                        <p className="font-20">{course.title}</p>
                                        <p className="font-12 green">By Hunarmand Punjab</p>
                                        <p className="font-14 green ratings">
                                            <StarRating />
                                            <span className="rate"> 4.9</span>
                                        </p>
                                        <Link to={`/course-detail?course=${encodeURIComponent(course.title)}`}>
                                            <button className="btn-green-sq">View Details</button>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            
            <StatCounter/>
        </>
    );
};

export default AllCourses;
