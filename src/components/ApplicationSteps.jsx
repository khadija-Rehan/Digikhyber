import React, { useEffect, useState, useRef } from "react";
import TextReveal from "./TextReveal";
import "./ApplicationSteps.css";

const ApplicationSteps = () => {
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

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    const stepsData = [
        { icon: "fa-user-plus", title: "Create Account", desc: "Register your free account" },
        { icon: "fa-lock", title: "Login Portal", desc: "Access with your credentials" },
        { icon: "fa-file-lines", title: "Submit Form", desc: "Fill your desired course form" },
        { icon: "fa-pen-to-square", title: "Attempt Test", desc: "Take the online assessment" },
        { icon: "fa-circle-check", title: "Enroll Now", desc: "Begin your technical training" },
        { icon: "fa-id-card", title: "Scholarship", desc: "Receive your merit-based card" },
    ];

    return (
        <section 
            ref={sectionRef}
            className={`steps-section position-relative overflow-hidden ${isVisible ? 'is-visible' : ''}`}
        >
            <div className="container">
                <div className="steps-title-wrapper">
                    <h2 className="mb-3">
                        <TextReveal text="How to Get Started with Digikhyber" />
                    </h2>
                    <p className="sub-text">
                        It's easy to become a part of Digikhyber and start learning new skills.
                    </p>
                    <span className="process-label">Official Application Process</span>
                </div>

                <div className="steps-row">
                    {stepsData.map((step, index) => (
                        <div 
                            key={index} 
                            className={`step-item ${isVisible ? 'step-reveal-animation' : 'opacity-0'}`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
                            <div className="step-icon-box shadow-sm">
                                <i className={`fa-solid ${step.icon}`}></i>
                            </div>
                            <div className="step-content">
                                <h4>{step.title}</h4>
                                <p>{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .opacity-0 { opacity: 0; }
                
                .step-reveal-animation {
                    animation: stepSlideIn 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards;
                }

                @keyframes stepSlideIn {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
};

export default ApplicationSteps;
