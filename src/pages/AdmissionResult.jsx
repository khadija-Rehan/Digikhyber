import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/logo.png";
import { generateOnlineChallan, generatePhysicalChallan } from "../api/auth";
import { Link } from "react-router-dom";

const AdmissionResult = () => {
    const { user } = useAuth();
    const [onlinePsid, setOnlinePsid] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [activePaymentMethod, setActivePaymentMethod] = useState("psid");
    const [activeSubTab, setActiveSubTab] = useState("banking");

    const userData = user?.user?.data?.user || user?.user || user;
    const testScore = userData?.testScore || 0;
    const totalMcqs = 20; 
    const correctAnswers = Math.round((testScore / 100) * totalMcqs);
    const percentage = `${testScore}%`;
    const testId = userData?.rollNumber || `DK-${userData?._id?.substring(0, 6).toUpperCase()}`;
    const testPassed = userData?.testPassed;

    useEffect(() => {
        if (userData?.psid) {
            setOnlinePsid(userData.psid);
        }
    }, [userData]);

    const handleGeneratePayment = async () => {
        setIsGenerating(true);
        try {
            if (activePaymentMethod === 'psid') {
                const res = await generateOnlineChallan();
                if (res.data?.psid) {
                    setOnlinePsid(res.data.psid);
                }
            } else {
                const res = await generatePhysicalChallan();
                if (res.data?.fileUrl) {
                    window.open(res.data.fileUrl, "_blank");
                }
            }
        } catch (error) {
            console.error("Payment generation error:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    if (!testPassed) {
        return (
            <div className="container py-5 text-center">
                <div className="card shadow-sm border-0 p-5" style={{ borderRadius: '24px' }}>
                    <div className="mb-4">
                        <i className="fas fa-hourglass-half fa-4x text-muted opacity-50"></i>
                    </div>
                    <h2 className="fw-bold">Evaluation in Progress</h2>
                    <p className="text-muted">Please complete your admission test first to view your official results.</p>
                    <div className="mt-4">
                        <Link to="/admission-test" className="btn btn-success px-4 rounded-pill">Start Test Now</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="admission-result-page py-5" style={{ backgroundColor: '#f0f4f8', minHeight: '100vh', fontFamily: "'Outfit', sans-serif" }}>
            <div className="container" style={{ maxWidth: '900px' }}>
                
                {/* Unified Result Card */}
                <div className="card border-0 shadow-lg overflow-hidden animate-in" style={{ borderRadius: '28px' }}>
                    
                    {/* Top Section: Celebration Banner */}
                    <div className="p-5 text-center text-white" style={{ background: 'linear-gradient(135deg, #0B5D3B 0%, #063d27 100%)', position: 'relative' }}>
                        <div className="mb-3">
                            <div className="icon-circle shadow-sm">
                                <i className="fas fa-graduation-cap"></i>
                            </div>
                        </div>
                        <h1 className="fw-bold h2 mb-2">Admission Test Qualified!</h1>
                        <p className="opacity-75 mb-0">Congratulations <strong>{userData?.fullName}</strong>, you have successfully cleared the entrance criteria.</p>
                        
                        {/* Score Floating Badge */}
                        <div className="score-badge shadow-lg">
                            <span className="small d-block opacity-75">SCORE</span>
                            <span className="h4 fw-bold mb-0">{percentage}</span>
                        </div>
                    </div>

                    <div className="p-4 p-md-5">
                        <div className="row g-4 mb-5">
                            {/* Candidate Info Columns */}
                            <div className="col-6 col-md-3">
                                <div className="info-stat">
                                    <label>ROLL NUMBER</label>
                                    <h6>{testId}</h6>
                                </div>
                            </div>
                            <div className="col-6 col-md-3">
                                <div className="info-stat">
                                    <label>MARKS</label>
                                    <h6>{correctAnswers} / {totalMcqs}</h6>
                                </div>
                            </div>
                            <div className="col-6 col-md-3">
                                <div className="info-stat">
                                    <label>STATUS</label>
                                    <h6 className="text-success">QUALIFIED</h6>
                                </div>
                            </div>
                            <div className="col-6 col-md-3">
                                <div className="info-stat">
                                    <label>BATCH</label>
                                    <h6>2026-B2</h6>
                                </div>
                            </div>
                        </div>

                        {/* Payment Section - Integrated */}
                        <div className="payment-unified-section p-4 rounded-4" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                            <div className="text-center mb-4">
                                <h5 className="fw-bold mb-1">Claim Your Scholarship Card</h5>
                                <p className="text-muted small">Submit your processing fee to finalize your enrollment.</p>
                            </div>

                            <div className="payment-options-grid d-flex flex-column flex-md-row gap-3 mb-4">
                                <div className={`pay-opt ${activePaymentMethod === 'psid' ? 'active' : ''}`} onClick={() => setActivePaymentMethod('psid')}>
                                    <div className="opt-icon"><i className="fas fa-mobile-alt"></i></div>
                                    <div className="opt-text">
                                        <strong>PSID / Consumer ID</strong>
                                        <span>Mobile Apps & ATM</span>
                                    </div>
                                    <div className="check-mark"><i className="fas fa-check-circle"></i></div>
                                </div>
                                <div className={`pay-opt ${activePaymentMethod === 'challan' ? 'active' : ''}`} onClick={() => setActivePaymentMethod('challan')}>
                                    <div className="opt-icon"><i className="fas fa-file-invoice-dollar"></i></div>
                                    <div className="opt-text">
                                        <strong>Bank Challan</strong>
                                        <span>Print & Pay at Bank</span>
                                    </div>
                                    <div className="check-mark"><i className="fas fa-check-circle"></i></div>
                                </div>
                            </div>

                            {activePaymentMethod === 'psid' && (
                                <div className="psid-details-box text-center p-3 mb-4 rounded-3" style={{ background: '#ecfdf5', border: '1px dashed #0B5D3B' }}>
                                    {onlinePsid ? (
                                        <>
                                            <span className="text-muted small">YOUR UNIQUE PSID NUMBER</span>
                                            <div className="h2 fw-bold text-success mb-1" style={{ letterSpacing: '2px' }}>{onlinePsid}</div>
                                            <div className="text-dark small fw-bold">AMOUNT: PKR 3250</div>
                                        </>
                                    ) : (
                                        <p className="mb-0 text-muted small">Click the button below to generate your unique PSID.</p>
                                    )}
                                </div>
                            )}

                            <div className="text-center">
                                <button 
                                    className="btn btn-success rounded-pill px-5 py-3 fw-bold shadow-sm"
                                    style={{ backgroundColor: '#0B5D3B', minWidth: '280px' }}
                                    onClick={handleGeneratePayment}
                                    disabled={isGenerating}
                                >
                                    {isGenerating ? (
                                        <><span className="spinner-border spinner-border-sm me-2"></span> Processing...</>
                                    ) : (
                                        <>{activePaymentMethod === 'psid' ? (onlinePsid ? 'RE-GENERATE PSID' : 'GENERATE PSID') : 'DOWNLOAD BANK CHALLAN'}</>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Help Link */}
                        <div className="text-center mt-4">
                            <p className="text-muted small mb-0">Need help with payment? <Link to="/help" className="text-success fw-bold">Contact Support</Link></p>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .icon-circle { width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto; backdrop-filter: blur(5px); }
                .score-badge { position: absolute; bottom: -30px; right: 50px; background: #c9a227; color: #fff; padding: 15px 25px; border-radius: 20px; text-align: center; z-index: 5; }
                
                .info-stat label { display: block; font-size: 10px; font-weight: 800; color: #94a3b8; letter-spacing: 1px; margin-bottom: 5px; }
                .info-stat h6 { margin: 0; font-weight: 700; color: #1e293b; font-size: 1rem; }
                
                .pay-opt { flex: 1; display: flex; align-items: center; gap: 15px; padding: 20px; background: #fff; border: 2.5px solid transparent; border-radius: 16px; cursor: pointer; transition: all 0.3s; position: relative; }
                .pay-opt:hover { border-color: #e2e8f0; }
                .pay-opt.active { border-color: #0B5D3B; background: #fff; }
                
                .opt-icon { width: 45px; height: 45px; background: #f1f5f9; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; color: #0B5D3B; }
                .pay-opt.active .opt-icon { background: #0B5D3B; color: #fff; }
                
                .opt-text strong { display: block; font-size: 14px; color: #1e293b; }
                .opt-text span { font-size: 11px; color: #64748b; }
                
                .check-mark { position: absolute; top: 10px; right: 10px; color: #0B5D3B; opacity: 0; transform: scale(0); transition: 0.3s; }
                .pay-opt.active .check-mark { opacity: 1; transform: scale(1); }
                
                .animate-in { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
                @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                
                @media (max-width: 768px) {
                    .score-badge { right: 50%; transform: translateX(50%); bottom: -25px; padding: 10px 20px; }
                    .admission-result-page { padding-top: 20px !important; }
                }
            `}</style>
        </div>
    );
};

export default AdmissionResult;
