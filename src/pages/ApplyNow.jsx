import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ParticleBackground from "../components/ParticleBackground";
import UnderConstructionModal from "../components/UnderConstructionModal";

const ApplyNow = () => {
    const [showConstructionModal, setShowConstructionModal] = useState(false);

    const handleShowConstructionModal = () => {
        setShowConstructionModal(true);
    };

    const handleCloseConstructionModal = () => {
        setShowConstructionModal(false);
    };

    return (
        <>
            <div style={{ backgroundColor: " #079560", height: "100vh" }}>
                <ParticleBackground />

                <div className="container">
                    <div className="row pt-5 pb-5">
                        <div className="col-lg-12">
                            <div className="applynow" style={{ position: "relative", zIndex: "1" }}>
                                <img
                                    className="  mb-4"
                                    style={{
                                        width: "200px",
                                    }}
                                    src={Logo}
                                    alt="logo"
                                />
                                <h2 className="mb-4">Welcome to the Hunarmand Punjab Admission Portal!</h2>
                                <p>
                                    Start by registering as a new applicant. Once registered. Use your email and password to log in to the Candidate Portal <br /> and continue your application journey.

                                </p>
                                <div className="auth-buttons d-flex align-items-center justify-content-center">
                                    {/* <Link to="/register">
                                        <Button variant="success" className="btn-green register-btn">
                                            New Registration
                                        </Button>
                                    </Link>
                                    <Link to="/login">
                                        <Button variant="success" className="btn-green register-btn">
                                            Candidate Login
                                        </Button>
                                    </Link> */}
                                    <Button 
                                        variant="success" 
                                        className="btn-green register-btn"
                                        onClick={handleShowConstructionModal}
                                    >
                                        New Registration
                                    </Button>
                                    <Button 
                                        variant="success" 
                                        className="btn-green register-btn"
                                        onClick={handleShowConstructionModal}
                                    >
                                        Candidate Login
                                    </Button>
                                    <Link to="/howitswork">
                                        <Button variant="success" className="btn-green register-btn">
                                            How It Works
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <UnderConstructionModal 
                show={showConstructionModal} 
                onHide={handleCloseConstructionModal} 
            />
        </>
    );
};

export default ApplyNow;
