import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import FS from "../assets/grow.jpg";
import GS from "../assets/Solar-Penal.webp";
import Team from "../assets/team.png";
import PageBanner from "../components/PageBanner";
import StatCounter from "../components/StatsCounter";
import { Link } from "react-router-dom";

const FreeSolarPanel = () => {
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
            duration: 400,
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
                title="digikhyber Solar Scheme"
                description="In a world where digital learning is the future, uninterrupted power is a necessity, not a luxury. Digikhyber Solar Scheme, Digikhyber provides solar energy systems to eligible students who meet our criteria as per policy of Digikhyber — so your learning never stops, no matter the power cuts."
                rightImage="/images/Solar Scheme.jpg"
            />
            <section className="py-4" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
                <div className="container">
                    <div className="row align-items-stretch bg-white rounded-4 shadow overflow-hidden border-0">
                        {/* Left Side - Solar Image */}
                        <div className="col-lg-5 p-0 solar-reveal" style={{ minHeight: '380px' }}>
                            <img
                                className="w-100 h-100"
                                src={FS}
                                alt="Free Solar Panel Scheme"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>

                        {/* Right Side - Compact Content */}
                        <div className="col-lg-7 p-4 d-flex flex-column justify-content-center solar-reveal" style={{ animationDelay: '0.1s' }}>
                            <h4 className="fw-semibold text-dark mb-3 lh-sm">
                                Powering Your Dreams — <span style={{ color: '#C9A227' }}>Even When the Lights</span> Go Out!
                            </h4>

                            <div className="text-secondary mb-3" style={{ fontSize: '0.88rem', lineHeight: '1.65' }}>
                                <p className="mb-2">
                                    In a world where digital learning is the future, uninterrupted power is a necessity, not a luxury. <strong className="text-success">Digikhyber</strong> provides solar energy systems to eligible students who meet our criteria as per policy — so your learning never stops, no matter the power cuts.
                                </p>
                                <div className="px-3 py-2 bg-success bg-opacity-10 rounded-3 border-start border-3 border-success">
                                    <p className="mb-0 text-dark" style={{ fontSize: '0.87rem' }}>
                                        This initiative removes a major barrier for students across underserved areas, ensuring reliable electricity to support online classes, skill development, and a brighter academic future — literally and figuratively.
                                    </p>
                                </div>
                            </div>

                            <div className="mb-3">
                                <p className="fw-semibold text-dark mb-2" style={{ fontSize: '0.9rem' }}>
                                    <span style={{ color: '#C9A227' }}>⚡</span> Key Benefits of the Solar Scheme:
                                </p>
                                <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                                    {[
                                        "Free Solar Panels",
                                        "Uninterrupted Power for Devices & Learning",
                                        "No More Load-Shedding Interruptions",
                                        "Eco-Friendly, Sustainable Energy Solution",
                                        "Perfect for Online Learning, Freelancing & IT Training"
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
                                    Don't let power cuts hold you back. With the Solar Scheme, your <span className="fw-semibold text-dark">future stays fully charged</span> — no matter where you live.
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

            <StatCounter />
            <style>{`
                .solar-reveal {
                    animation: solarRevealAnim 0.6s cubic-bezier(0.19, 1, 0.22, 1) forwards;
                    opacity: 0;
                }

                @keyframes solarRevealAnim {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
};

export default FreeSolarPanel;
