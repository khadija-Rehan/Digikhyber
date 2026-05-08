import React, { useEffect, useState, useRef } from 'react';
import icon from "../assets/ico-4.png";
import { Link } from 'react-router-dom';
import TextReveal from './TextReveal';

const Awairness = () => {
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
            className='position-relative overflow-hidden py-5 custom-bg-layer' 
            style={{ backgroundColor: '#f8fcfa' }}
        >
            
            <div className='container position-relative z-1'>
                <div className='row align-items-center pt-lg-5 pb-lg-5'>
                    
                    {/* Content Section */}
                    <div className={`col-lg-6 col-md-12 mb-5 mb-lg-0 ${isVisible ? 'awairness-fade-right' : 'opacity-0'}`}>
                        <div className='pe-lg-4'>
                            
                            <div className='d-flex align-items-center mb-4'>
                                <button className='build-icon-btn shadow-none border-0'>
                                    <img src={icon} alt="" />
                                </button>
                                <h2 className='mb-0 ms-2' style={{ fontSize: '1.15rem', color: '#0B5D3B', fontWeight: '500' }}>
                                 Earn 1000$ to 5000 $ <br />Through Freelancing
                                </h2>
                            </div>

                            <h1 className='mb-4 position-relative fw-normal'>
                                <TextReveal text="Build Your Future with Digikhyber" />
                            </h1>
                            
                            <p className='font-18 mb-5 position-relative z-1' style={{ lineHeight: '1.7' }}>
                                Digikhyber provides the Digital Skills Training and Support Program aims to empower youth by providing free digital skills education, creating online employment opportunities for a brighter future.
                            </p>
                            
                            <div className='d-flex gap-4 buttons position-relative z-1'>
                                <Link to='/courses'>
                                    <button className='premium-btn-green'>
                                        Explore Courses
                                    </button>
                                </Link>
                                <Link to='/apply-now'>
                                    <button className='premium-btn-gold'>
                                        Enroll Now
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    {/* Image Section */}
                    <div className={`col-lg-6 col-md-12 ${isVisible ? 'awairness-fade-left' : 'opacity-0'}`}>
                        <div className='position-relative mx-auto ms-lg-auto' style={{ maxWidth: '95%' }}>
                            {/* Professional Floating Accent Frame */}
                            <div className="abstract-shape-frame"></div>
                            
                            <img 
                                className='w-100 rounded-4 shadow-lg position-relative z-2' 
                                src="./images/team.jpeg" 
                                alt="Build your future" 
                                style={{ border: '8px solid white' }}
                            />
                            
                            <div className="dot-pattern-accent position-absolute" style={{ bottom: '-20px', left: '-20px', zIndex: 1 }}></div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .premium-btn-green {
                    background: #0B5D3B;
                    color: white;
                    padding: 12px 32px;
                    border-radius: 50px;
                    border: none;
                    font-weight: 600;
                    font-size: 14px;
                    letter-spacing: 0.5px;
                    transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
                    text-transform: uppercase;
                }
                .premium-btn-green:hover {
                    background: #1a2b25;
                    transform: translateY(-3px);
                    box-shadow: 0 10px 20px rgba(11, 93, 59, 0.2);
                }
                
                .premium-btn-gold {
                    background: #C9A227;
                    color: white;
                    padding: 12px 32px;
                    border-radius: 50px;
                    border: none;
                    font-weight: 600;
                    font-size: 14px;
                    letter-spacing: 0.5px;
                    transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
                    text-transform: uppercase;
                }
                .premium-btn-gold:hover {
                    background: #b08d1f;
                    transform: translateY(-3px);
                    box-shadow: 0 10px 20px rgba(201, 162, 39, 0.2);
                }

                /* Highly stable native slide animations */
                .awairness-fade-right {
                    opacity: 0;
                    animation: awrSlideRight 1.2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
                }
                .awairness-fade-left {
                    opacity: 0;
                    animation: awrSlideLeft 1.2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
                }

                @keyframes awrSlideRight {
                    from { opacity: 0; transform: translateX(-40px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes awrSlideLeft {
                    from { opacity: 0; transform: translateX(40px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                /* Smooth Animated Grid / Small Walls Background */
                .custom-bg-layer {
                    position: relative;
                }
                .custom-bg-layer::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background-image: 
                        linear-gradient(rgba(11, 93, 59, 0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(11, 93, 59, 0.05) 1px, transparent 1px);
                    background-size: 40px 40px;
                    pointer-events: none;
                    z-index: 0;
                }
                
                /* Image Accent Structure */
                .abstract-shape-frame {
                    position: absolute;
                    top: 20px; right: -25px; bottom: -20px; left: 25px;
                    background: linear-gradient(135deg, rgba(11, 93, 59, 0.1) 0%, rgba(201, 162, 39, 0.05) 100%);
                    border-radius: 2rem;
                    z-index: 0;
                }

                .dot-pattern-accent {
                    width: 120px; height: 100px;
                    background-image: radial-gradient(rgba(11, 93, 59, 0.3) 2px, transparent 2px);
                    background-size: 15px 15px;
                    border-radius: 10px;
                }
            `}</style>
        </section>
    );
};

export default Awairness;
