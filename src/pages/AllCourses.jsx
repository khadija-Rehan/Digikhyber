import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

import ML from "../assets/Digikhyber Website Banner 4-min.jpg";
import UI from "../assets/Digikhyber Website Banner 4-min.jpg";
import DM from "../assets/Digikhyber Website Banner 4-min.jpg";
import FS from "../assets/Digikhyber Website Banner 4-min.jpg";
import AD from "../assets/Digikhyber Website Banner 4-min.jpg";
import WP from "../assets/Digikhyber Website Banner 4-min.jpg";
import StarRating from "../components/StarRating";
import PageBanner from "../components/PageBanner";
import { Link } from "react-router-dom";
import StatCounter from "../components/StatsCounter";
import { AVAILABLE_COURSES } from "../utils/courses";

const AllCourses = () => {
    const [cardsPerRow, setCardsPerRow] = useState(3);
    const [showAll, setShowAll] = useState(false);

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
            duration: 300,
            offset: 0,
            once: true,
            easing: 'ease-out',
        });

        return () => {
            window.removeEventListener("resize", updateCardsPerRow);
        };
    }, []);

    useEffect(() => {
        AOS.refresh();
    }, [cardsPerRow]);

    // Only show first 9 courses unless showAll is true
    const coursesToShow = showAll ? AVAILABLE_COURSES : AVAILABLE_COURSES.slice(0, 9);

    return (
        <>
            <PageBanner 
                title="Courses"
                description="Digikhyber courses are not just different — they are revolutionary. Designed with hands-on practice, live projects, and international standards, we prepare you to lead in today's global digital economy."
                image="/images/courses-img.jpeg"
            />

            <div className="all-courses py-5">
                <div className="container">
                    <div className="well-courses-grid">
                        {coursesToShow.map((course, index) => {
                            const delay = (index % cardsPerRow) * 10;

                            return (
                                <Link 
                                    to={`/course-detail?course=${encodeURIComponent(course.name)}`} 
                                    className="well-course-card well-reveal" 
                                    style={{ animationDelay: `${delay}ms` }}
                                    key={index}
                                >
                                    <div className="well-image-wrap">
                                        <img src={course.image} alt={course.name} />
                                    </div>
                                    
                                    <div className="well-content">
                                        <h3 className="well-title">{course.name}</h3>
                                        
                                        {/* Premium 5-star Rating Block */}
                                        <div className="well-rating-block">
                                            <span className="score">4.9</span>
                                            <span className="stars">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star-half-alt"></i>
                                            </span>
                                            <span className="reviews">(1.2k)</span>
                                        </div>
                                        
                                        <div className="well-meta">
                                            <div className="well-meta-item">
                                                <i className="far fa-clock"></i> 3 Months
                                            </div>
                                            <div className="well-meta-item">
                                                <i className="fas fa-certificate"></i> Certificate
                                            </div>
                                        </div>

                                        <div className="well-footer">
                                            <span className="well-provider">Digikhyber</span>
                                            <span className="well-action">
                                                View Details <i className="fas fa-arrow-right"></i>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    {!showAll && AVAILABLE_COURSES.length > 9 && (
                        <div className="text-center mt-5">
                            <button
                                className="show-more-btn"
                                onClick={() => setShowAll(true)}
                            >
                                Show More Courses
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <StatCounter />

            <style>{`
                /* Modern Flowing Background */
                .all-courses {
                    background: linear-gradient(-45deg, #f8fafc, #f1f5f9, #ffffff, #f8fafc);
                    background-size: 400% 400%;
                    animation: gradientFlow 15s ease infinite;
                    position: relative;
                    overflow: hidden;
                }

                .well-reveal {
                    animation: wellRevealAnim 0.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
                    opacity: 0;
                }

                @keyframes wellRevealAnim {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                /* Seamless Flowing Dots */
                .all-courses::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: radial-gradient(#cbd5e1 1.5px, transparent 1.5px);
                    background-size: 26px 26px;
                    animation: dotsFlow 15s linear infinite;
                    pointer-events: none;
                    z-index: 0;
                    opacity: 0.8;
                }

                @keyframes gradientFlow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                @keyframes dotsFlow {
                    from { background-position: 0px 0px; }
                    to { background-position: 26px 26px; }
                }

                .all-courses .container {
                    position: relative;
                    z-index: 1;
                }

                .well-courses-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 30px;
                }

                .well-course-card {
                    background: #ffffff;
                    border-radius: 16px;
                    border: 1px solid #f1f5f9;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.03);
                    transition: all 0.3s ease;
                    text-decoration: none !important;
                    position: relative;
                    height: 100%;
                }

                .well-course-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 35px rgba(0,0,0,0.08);
                    border-color: #e2e8f0;
                }

                .well-image-wrap {
                    width: 100%;
                    height: 190px;
                    position: relative;
                    overflow: hidden;
                    background: #f8fafc;
                }

                .well-image-wrap img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }

                .well-course-card:hover .well-image-wrap img {
                    transform: scale(1.05);
                }

                .well-content {
                    padding: 24px;
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                }

                .well-title {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #1e293b;
                    margin-bottom: 8px; /* Tighter gap to attach to rating */
                    line-height: 1.5;
                    transition: color 0.3s ease;
                }

                .well-course-card:hover .well-title {
                    color: #0b5d3b;
                }

                /* New Premium Rating Block */
                .well-rating-block {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    margin-bottom: 18px;
                    font-size: 0.85rem;
                }
                
                .well-rating-block .score {
                    font-weight: 800;
                    color: #1e293b;
                }
                
                .well-rating-block .stars {
                    color: #f59e0b; /* Golden stars */
                    display: flex;
                    gap: 2px;
                    font-size: 0.75rem;
                }
                
                .well-rating-block .reviews {
                    color: #94a3b8;
                    font-weight: 500;
                }

                .well-meta {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 25px;
                    font-size: 0.85rem;
                    color: #64748b;
                }

                .well-meta-item {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-weight: 500;
                }

                .well-meta-item i {
                    color: #0b5d3b;
                }

                .well-footer {
                    margin-top: auto;
                    padding-top: 16px;
                    border-top: 1px solid #f1f5f9;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .well-provider {
                    font-size: 0.8rem;
                    color: #94a3b8;
                    font-weight: 500;
                }

                .well-action {
                    color: #0b5d3b;
                    font-weight: 600;
                    font-size: 0.9rem;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    transition: gap 0.3s ease;
                }

                .well-course-card:hover .well-action {
                    gap: 10px;
                }

                /* Show More Button */
                .show-more-btn {
                    background: #ffffff;
                    color: #0b5d3b;
                    border: 2px solid #0b5d3b;
                    padding: 14px 40px;
                    border-radius: 50px;
                    font-weight: 700;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                }

                .show-more-btn:hover {
                    background: #0b5d3b;
                    color: #ffffff;
                    box-shadow: 0 10px 20px rgba(11, 93, 59, 0.2);
                    transform: translateY(-2px);
                }
            `}</style>
        </>
    );
};

export default AllCourses;