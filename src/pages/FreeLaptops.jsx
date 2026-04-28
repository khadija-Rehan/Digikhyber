import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import FS from "../assets/laptops.webp";
import GS from "../assets/occupation.webp";
import Team from "../assets/team.png";
import PageBanner from "../components/PageBanner";
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

    return (
        <>
            <PageBanner 
                title="digikhyber Laptop Scheme"
                description="The digikhyber Laptop Scheme, launched under the visionary leadership of Minister of School & Higher Education Rana Sikandar Hayat, ensures that eligible students who meet our criteria never fall behind due to a lack of digital access"
                image="/images/Laptop Scheme.jpg"
            />
            <section className="py-4" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
                <div className="container">
                    <div className="row align-items-stretch bg-white rounded-4 shadow overflow-hidden border-0">
                        {/* Left Side - Pure Image Fully Visible */}
                        <div className="col-lg-5 p-0 laptop-reveal" style={{ minHeight: '380px' }}>
                            <img
                                className="w-100 h-100"
                                src="/images/Laptop Scheme Page Image (3).jpeg"
                                alt="Free Laptops Scheme"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>

                        {/* Right Side - Compact Data Flow */}
                        <div className="col-lg-7 p-4 d-flex flex-column justify-content-center laptop-reveal" style={{ animationDelay: '0.1s' }}>
                            <h4 className="fw-semibold text-dark mb-3 lh-sm">
                                Your Digital Future Starts Here – <span style={{ color: '#C9A227' }}>Free Laptops</span> for Eligible Students
                            </h4>

                            <div className="text-secondary mb-3" style={{ fontSize: '0.88rem', lineHeight: '1.65' }}>
                                <p className="mb-2">
                                    The <strong>Laptop Scheme</strong>, launched under the visionary leadership of{" "}
                                    <strong>Minister of School & Higher Education Rana Sikandar Hayat</strong>, ensures that eligible students who meet our criteria never fall behind due to a lack of digital access.
                                </p>
                                <div className="px-3 py-2 bg-success bg-opacity-10 rounded-3 border-start border-3 border-success">
                                    <p className="mb-0 text-dark" style={{ fontSize: '0.87rem' }}>
                                        This initiative provides laptops to students enrolled in{" "}
                                        <strong className="text-success">Digikhyber</strong> who pass the final evaluation test as per policy, enabling them to participate in online classes, complete practical assignments, and launch their freelance or tech careers with confidence.
                                    </p>
                                </div>
                            </div>

                            <div className="mb-3">
                                <p className="fw-semibold text-dark mb-2" style={{ fontSize: '0.9rem' }}>
                                    <span style={{ color: '#C9A227' }}>⚡</span> What the Laptop Scheme Delivers:
                                </p>
                                <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                                    {[
                                        "A Laptop/Chromebook — Absolutely Free",
                                        "Unlimited Access to Online Classes & Tools",
                                        "Empowerment to Learn, Create & Earn from Anywhere",
                                        "Fuel for Freelancing, Tech Startups & Career Growth",
                                        "A Level Playing Field for All Learners"
                                    ].map((item, idx) => (
                                        <li key={idx} className="d-flex align-items-start">
                                            <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mt-1 me-2 flex-shrink-0" style={{ width: '18px', height: '18px' }}>
                                                <i className="fa-solid fa-check text-success" style={{ fontSize: '9px' }}></i>
                                            </div>
                                            <span className="text-secondary" style={{ fontSize: '0.87rem' }}>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between pt-3 border-top">
                                <p className="mb-2 mb-sm-0 text-muted" style={{ fontSize: '0.85rem', maxWidth: '340px' }}>
                                    Apply today, get a chance to <span className="fw-semibold text-dark">avail your laptop</span>, and unlock a world of digital opportunities.
                                </p>
                                <Link
                                    to="/apply-scholarshipcard"
                                    className="btn btn-green px-3 py-2 rounded-pill fw-semibold shadow-sm flex-shrink-0"
                                    style={{ fontSize: '0.85rem' }}
                                >
                                    Apply Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <StatCounter compact={true} />
            <style>{`
                .laptop-reveal {
                    animation: laptopRevealAnim 0.6s cubic-bezier(0.19, 1, 0.22, 1) forwards;
                    opacity: 0;
                }

                @keyframes laptopRevealAnim {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
};

export default FreeLaptops;
