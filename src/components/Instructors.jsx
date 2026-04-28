import React, { useEffect, useState, useRef } from 'react';
import icon3 from "../assets/ico-11.png";
import icon4 from "../assets/ico-14.png";
import TextReveal from './TextReveal';

const Instructors = () => {
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
            className='py-5 position-relative overflow-hidden' 
            style={{ backgroundColor: '#f8fcfa' }}
        >
            
            {/* Animated Dotted Background Layer */}
            <div className="animated-dots-bg"></div>

            <div className='container py-lg-4 position-relative' style={{ zIndex: 1 }}>
                <div className='row align-items-center'>
                    
                    {/* Image Section */}
                    <div className={`col-lg-6 col-md-12 mb-4 mb-lg-0 text-center ${isVisible ? 'native-fade-right' : 'opacity-0'}`}>
                        <div className="d-inline-block position-relative">
                            <img 
                                src="/Abstract-Profile-Photo-Instagram-Post-1.webp" 
                                alt="mission" 
                                className='img-fluid rounded shadow-sm' 
                                style={{ maxWidth: '90%', position: 'relative', zIndex: 2 }} 
                            />
                        </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className={`col-lg-6 col-md-12 ps-lg-4 ${isVisible ? 'native-fade-left' : 'opacity-0'}`}>
                        <div>
                            <p className='white font-14 d-p-2'>Who We Are</p>
                            
                            <h2 className='font-32 mt-3 mb-4'>
                                <TextReveal text="Grow Your Skills and Career with Digikhyber" />
                            </h2>
                            
                            <p className='font-15 l-h-1'>
                                Welcome to Digikhyber! We're here to help the young people of Punjab get the digital skills they need to find good jobs. Our goal is to train 500,000 students and help them become professional earners. We want to lower unemployment and make Punjab's economy stronger by teaching skills that are in demand.
                            </p>
                        </div>
                        
                        <div className="my-4 ps-3 py-1 custom-mission-hover" style={{ borderLeft: '4px solid #0B5D3B', transition: 'all 0.3s ease' }}>
                            <p className="font-20 mb-2">Our Mission</p>
                            <p className="font-14 weight-400 mb-0">
                                To provide training to 500,000 students and make them professional earners.
                            </p>
                        </div>

                        {/* Stripped down original layout structure without oversized cards */}
                        <div className='row mt-5'>
                            <div className='col-lg-6 col-md-12 mb-4 mb-lg-0'>
                                <div className="feature-item-minimal">
                                    <p className='img-round mb-3'>
                                        <img src={icon3} alt="" />
                                    </p>
                                    <p className='font-20 mb-2'>Professional Instructors</p>
                                    <p className='font-14 weight-400 mb-0'>
                                        Learn from dedicated industry experts and grow you digital skills
                                    </p>
                                </div>
                            </div>
                            
                            <div className='col-lg-6 col-md-12'>
                                <div className="feature-item-minimal">
                                    <p className='img-round mb-3'>
                                        <img src={icon4} alt="" />
                                    </p>
                                    <p className='font-20 mb-2'>25+ Courses</p>
                                    <p className='font-14 weight-400 mb-0'>
                                        You'll find a-lot of different courses to help you learn new skills!
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            
            <style>{`

                .native-fade-right {
                    opacity: 0;
                    animation: slideFromLeft 1s ease-out forwards;
                }
                .native-fade-left {
                    opacity: 0;
                    animation: slideFromRight 1s ease-out forwards;
                }
                @keyframes slideFromLeft {
                    0% { opacity: 0; transform: translateX(-50px); }
                    100% { opacity: 1; transform: translateX(0); }
                }
                @keyframes slideFromRight {
                    0% { opacity: 0; transform: translateX(50px); }
                    100% { opacity: 1; transform: translateX(0); }
                }

                /* Unique Moving Dotted Pattern Background */
                .animated-dots-bg {
                    position: absolute;
                    top: -50%; left: -50%; width: 200%; height: 200%;
                    background-image: radial-gradient(rgba(11, 93, 59, 0.15) 2px, transparent 2px);
                    background-size: 35px 35px;
                    opacity: 0.8;
                    animation: driftDots 40s linear infinite;
                    pointer-events: none;
                    z-index: 0;
                }
                @keyframes driftDots {
                    0% { transform: rotate(0deg) translate(0, 0); }
                    100% { transform: rotate(3deg) translate(-50px, -50px); }
                }
            `}</style>
        </section>
    );
};

export default Instructors;