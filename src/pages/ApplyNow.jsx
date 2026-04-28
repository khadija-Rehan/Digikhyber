import React from "react";
import { Link } from "react-router-dom";
import AuthBanner from "../components/AuthBanner";

const ApplyNow = () => {
    return (
        <AuthBanner 
            title="Admission Portal" 
            description="Welcome to Digikhyber. Select your path to begin your professional journey."
        >
            <div className="auth-form-box px-3">
                <div className="text-center mb-5">
                    <h2 className="auth-title mb-1">Select Action</h2>
                    <p className="auth-subtitle">Choose how you want to proceed today</p>
                </div>

                <div className="admission-grid-unique">
                    <Link to="/register" className="admission-pill-btn">
                        <div className="pill-icon-glow">
                            <i className="fas fa-user-plus"></i>
                        </div>
                        <div className="pill-content">
                            <h3>New Registration</h3>
                            <span className="pill-tag">For new applicants</span>
                        </div>
                        <div className="pill-action">
                            <i className="fas fa-arrow-right"></i>
                        </div>
                    </Link>

                    <Link to="/login" className="admission-pill-btn">
                        <div className="pill-icon-glow">
                            <i className="fas fa-sign-in-alt"></i>
                        </div>
                        <div className="pill-content">
                            <h3>Candidate Login</h3>
                            <span className="pill-tag">Access your portal</span>
                        </div>
                        <div className="pill-action">
                            <i className="fas fa-arrow-right"></i>
                        </div>
                    </Link>

                    <Link to="/howitswork" className="admission-pill-btn">
                        <div className="pill-icon-glow">
                            <i className="fas fa-lightbulb"></i>
                        </div>
                        <div className="pill-content">
                            <h3>How It Works</h3>
                            <span className="pill-tag">Learn the process</span>
                        </div>
                        <div className="pill-action">
                            <i className="fas fa-arrow-right"></i>
                        </div>
                    </Link>
                </div>

                <div className="mt-5 text-center">
                    <p className="text-muted small mb-0">
                        Need technical support? <Link to="/contact-us" className="text-success fw-bold">Contact us</Link>
                    </p>
                </div>
            </div>
        </AuthBanner>
    );
};

export default ApplyNow;
