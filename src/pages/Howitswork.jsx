import React, { useEffect } from "react";
import PageBanner from "../components/PageBanner";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Howitswork.css";

const HowItsWork = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-out-quad'
        });
    }, []);

    const stepsData = [
        {
            number: "01",
            title: "Go to the Apply Section",
            desc: "To apply for digikhyber courses, navigate to the Apply section on our website.",
            icon: "fas fa-mouse-pointer"
        },
        {
            number: "02",
            title: "Click New Registration & Submit Admission Form",
            desc: "Fill out the admission form by clicking on New Registration and provide all necessary details.",
            icon: "fas fa-file-signature"
        },
        {
            number: "03",
            title: "Verify Your Admission Application",
            desc: "To verify your Pakistan residency, documents latest Degree Certificate etc.",
            icon: "fas fa-id-card"
        },
        {
            number: "04",
            title: "Application Login Credentials Sent To Your Email",
            desc: "Check your email for the login credentials needed to access your application.",
            icon: "fas fa-envelope-open-text"
        },
        {
            number: "05",
            title: "Visit Back & Login Using Given Credentials",
            desc: "Log in to your account using the provided credentials, and start your Online Admission Test.",
            icon: "fas fa-user-lock"
        },
        {
            number: "06",
            title: "Admission Test Result",
            desc: "If you qualify, you will proceed to the next steps. If not, you can try again in the next batch after 3 months.",
            icon: "fas fa-chart-bar"
        },
        {
            number: "07",
            title: "Application Processing & Confirm Your Seat",
            desc: "If you pass the admission test, you will be prompted to pay a minor application processing fee to submit your application and confirm your seat in the current batch.",
            icon: "fas fa-chair"
        },
        {
            number: "08",
            title: "Application Review",
            desc: "Your application will be reviewed by our team to ensure all details and documents are in order.",
            icon: "fas fa-search-plus"
        },
        {
            number: "09",
            title: "LMS Access",
            desc: "Final verification by our team will ensure all details and documents are correct Upon approval you'll gain LMS access; if not, your application processing charges will be refunded back to your account.",
            icon: "fas fa-laptop-code"
        },
        {
            number: "10",
            title: "Scholarship Card",
            desc: "If you're eligible, you will receive a Scholarship Card. This card confirms your scholarship status and can be used to avail various course-related benefits. Please ensure you meet the scholarship criteria and have submitted all required documentation.",
            icon: "fas fa-graduation-cap"
        }
    ];

    return (
        <div className="how-it-works-page">
            <PageBanner 
                title="How It Works"
                description="Follow our professional 10-step guide to secure your scholarship."
            />

            <div className="container">
                {/* Video Tutorial Section */}
                <div className="row justify-content-center pt-5 pb-5 premium-video-wrapper">
                    <div className="col-lg-10" data-aos="fade-up">
                        <div className="premium-video-box">
                            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                                <iframe
                                    src="https://www.youtube.com/embed/MwaXTW0_jc8"
                                    title="YouTube video player"
                                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                                    frameBorder="0"
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Premium Process Flow Section */}
                <div className="premium-process-section">
                    <div className="process-timeline-container">
                        {stepsData.map((step, index) => (
                            <div 
                                key={index} 
                                className="process-item"
                                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                                data-aos-delay={index * 100}
                                data-aos-duration="1200"
                            >
                                <div className="process-node">
                                    {step.number}
                                </div>
                                
                                <div className="process-content">
                                    <div className="process-card">
                                        <div className="process-bg-num">{step.number}</div>
                                        <div className="process-icon-wrapper">
                                            <i className={step.icon}></i>
                                        </div>
                                        <h4>{step.title}</h4>
                                        <p>{step.desc}</p>
                                        
                                        {/* Institutional Phase Tag */}
                                        {(index === 6 || index === 8 || index === 9) && (
                                            <div className="verified-tag">
                                                <i className="fas fa-check-circle"></i> VERIFIED STEP
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Spacer for the other side */}
                                <div className="process-content" style={{ opacity: 0, pointerEvents: 'none' }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItsWork;
