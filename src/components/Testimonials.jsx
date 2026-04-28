import React, { useEffect, useState, useRef } from "react";
import TextReveal from "./TextReveal";

const Testimonials = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    return (
        <section 
            ref={sectionRef}
            className="mission-section py-5 position-relative overflow-hidden"
            style={{ backgroundColor: '#ffffff' }}
        >
            {/* Animated Dots Background (Consistent with Instructors.jsx) */}
            <div className="animated-dots-bg"></div>

            <div className="container py-lg-5 position-relative" style={{ zIndex: 1 }}>
                <div className="row align-items-center gy-4">
                    
                    {/* Image Column */}
                    <div className={`col-lg-6 ${isVisible ? 'fade-in-left' : 'opacity-0'}`}>
                        <div className="mission-image-container">
                            <img
                                src="/images/illustrations.jpeg"
                                alt="Digikhyber Impact"
                                className="img-fluid rounded-4 shadow-lg w-100"
                                style={{ border: '1px solid rgba(11, 93, 59, 0.1)' }}
                            />
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className={`col-lg-6 ps-lg-5 ${isVisible ? 'fade-in-right' : 'opacity-0'}`}>
                        <div className="mission-content-wrapper">
                            <p className="font-14 text-uppercase fw-bold mb-3" style={{ color: '#C9A227', letterSpacing: '2.5px' }}>
                                Economy & Growth
                            </p>
                            
                            <h2 className="font-32 mb-4 fw-normal">
                                <TextReveal text="Strengthening Digital Economy through Empowerment" />
                            </h2>
                            
                            <div className="ps-4 mb-4" style={{ borderLeft: '5px solid #0B5D3B', borderRadius: '2px' }}>
                                <p className="font-16 l-h-1 mb-0" style={{ color: '#1a1e1d' }}>
                                    Digikhyber’s e-learning platform empowers individuals by providing free access to digital skills and certifications, enabling employment and entrepreneurship across the province.
                                </p>
                            </div>

                            <p className="font-14 text-muted" style={{ lineHeight: '1.8' }}>
                                While Pakistan’s IT workforce is growing, the demand exceeds 2.5 million. 
                                Initiatives like e-Rozgar have created over 126,000 jobs. 
                                Boosting skills through online platforms strengthens local industries and grows Pakistan’s $3.5B IT sector closer to regional giants.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <style>{`
                .opacity-0 { opacity: 0; }
                
                .mission-float {
                    animation: floatMission 6s ease-in-out infinite;
                }
                @keyframes floatMission {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-12px); }
                    100% { transform: translateY(0px); }
                }

                .fade-in-left {
                    animation: missionSlideL 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
                }
                .fade-in-right {
                    animation: missionSlideR 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
                    animation-delay: 0.2s;
                }

                @keyframes missionSlideL {
                    from { opacity: 0; transform: translateX(-40px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes missionSlideR {
                    from { opacity: 0; transform: translateX(40px); }
                    to { opacity: 1; transform: translateX(0); }
                }

                /* Dots Background (Shared Style) */
                .animated-dots-bg {
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 100%;
                    background-image: radial-gradient(rgba(11, 93, 59, 0.1) 1.5px, transparent 1.5px);
                    background-size: 30px 30px;
                    opacity: 0.6;
                    z-index: 0;
                    pointer-events: none;
                }
            `}</style>
        </section>
    );
};

export default Testimonials;
