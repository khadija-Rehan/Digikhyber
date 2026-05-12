import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/logo.png";
import { generateOnlineChallan, generatePhysicalChallan } from "../api/auth";
import { Link } from "react-router-dom";

const AdmissionResult = () => {
    const { user } = useAuth();
    const [onlinePsid, setOnlinePsid] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [activePaymentMethod, setActivePaymentMethod] = useState("psid"); // 'psid' or 'challan'
    const [activeSubTab, setActiveSubTab] = useState("banking"); // 'banking', 'jazzcash', 'easypaisa'

    const userData = user?.user?.data?.user || user?.user || user;
    const testScore = userData?.testScore || 0;
    const totalMcqs = 20; 
    const correctAnswers = Math.round((testScore / 100) * totalMcqs);
    const percentage = `${testScore}%`;
    const testId = userData?.rollNumber || `DK-${userData?._id?.substring(0, 6).toUpperCase()}`;
    const testPassed = userData?.testPassed;

    // Load existing PSID if any
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
                    alert(`PSID Generated: ${res.data.psid}`);
                }
            } else {
                const res = await generatePhysicalChallan();
                if (res.data?.fileUrl) {
                    window.open(res.data.fileUrl, "_blank");
                } else if (res.data?.fileName) {
                    window.open(`http://localhost:5000/uploads/${res.data.fileName}`, "_blank");
                }
            }
        } catch (error) {
            console.error("Payment generation error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    if (!testPassed) {
        return (
            <div className="container py-5 text-center">
                <div className="card shadow-sm border-0 p-5" style={{ borderRadius: '20px' }}>
                    <i className="fas fa-lock fa-4x text-muted mb-4"></i>
                    <h2 className="fw-bold">Evaluation in Progress</h2>
                    <p className="text-muted">Please complete your admission test first to view your official results.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admission-result-page py-5" style={{ backgroundColor: '#fff', minHeight: '100vh', fontFamily: "'Outfit', sans-serif" }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                
                {/* 1. Header */}
                <div className="text-center mb-4 animate-in">
                    <div className="mb-3">
                        <i className="fas fa-award text-success" style={{ fontSize: '4rem' }}></i>
                    </div>
                    <h1 className="fw-bold h2 text-success">Admission Test Result Card</h1>
                    <p className="text-muted small">Official Statement of Marks - Batch 2026</p>
                </div>

                {/* 2. Success Alert Box (Hunarmand Style) */}
                <div className="alert-custom-green p-4 mb-4 shadow-sm">
                    <div className="d-flex gap-3">
                        <i className="fas fa-check-circle mt-1 fs-5"></i>
                        <div>
                            <h5 className="fw-bold mb-2">Congratulations! You've Successfully Passed.</h5>
                            <p className="mb-3 small opacity-90">
                                You are officially eligible for the <strong>Digikhyber Scholarship Card</strong>. 
                                Secure your enrollment by submitting the processing fee.
                            </p>
                            <div className="benefits-grid row g-2 mt-2">
                                <div className="col-md-6 small"><i className="fas fa-laptop me-2"></i> Free Laptop Scheme</div>
                                <div className="col-md-6 small"><i className="fas fa-solar-panel me-2"></i> Solar Financing</div>
                                <div className="col-md-6 small"><i className="fas fa-certificate me-2"></i> Global Certifications</div>
                                <div className="col-md-6 small"><i className="fas fa-briefcase me-2"></i> Job Placement Help</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Transcript Table */}
                <div className="result-table-container mb-5 shadow-sm rounded-4 overflow-hidden">
                    <table className="table table-bordered mb-0">
                        <thead>
                            <tr>
                                <th colSpan="2" className="text-center text-white py-3" style={{ backgroundColor: '#0B5D3B', fontSize: '1.1rem' }}>Transcript Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className="bg-light-green fw-bold w-40">Candidate Name</td><td>{userData?.fullName}</td></tr>
                            <tr><td>Roll Number</td><td>{testId}</td></tr>
                            <tr><td className="bg-light-green">Total Marks</td><td className="bg-light-green">{totalMcqs}</td></tr>
                            <tr><td>Marks Obtained</td><td>{correctAnswers}</td></tr>
                            <tr><td className="bg-light-green">Percentage</td><td className="bg-light-green">{percentage}</td></tr>
                            <tr><td>Result Status</td><td><span className="badge bg-success px-3">Qualified</span></td></tr>
                        </tbody>
                    </table>
                </div>

                {/* 4. Payment Section (The Logic Fix) */}
                <div className="payment-box border rounded-4 shadow-sm overflow-hidden mb-5">
                    <div className="p-4 text-center border-bottom bg-light">
                        <h4 className="fw-bold mb-1">Pay Application Processing Fee!</h4>
                        <p className="text-muted small mb-0">Select your preferred payment method below</p>
                    </div>

                    <div className="payment-tabs-row d-flex flex-column flex-md-row p-3 gap-3">
                        <div 
                            className={`payment-tab-btn ${activePaymentMethod === 'psid' ? 'active' : ''}`}
                            onClick={() => setActivePaymentMethod('psid')}
                        >
                            <div className="d-flex align-items-center gap-3">
                                <div className="tab-icon"><i className="fas fa-mobile-alt"></i></div>
                                <div className="text-start">
                                    <h6 className="mb-0 fw-bold">CONSUMER NUMBER / PSID</h6>
                                    <small>MOBILE BANKING / JAZZCASH / EASYPAISA</small>
                                </div>
                            </div>
                        </div>

                        <div 
                            className={`payment-tab-btn ${activePaymentMethod === 'challan' ? 'active' : ''}`}
                            onClick={() => setActivePaymentMethod('challan')}
                        >
                            <div className="d-flex align-items-center gap-3">
                                <div className="tab-icon"><i className="fas fa-university"></i></div>
                                <div className="text-start">
                                    <h6 className="mb-0 fw-bold">BANK CHALLAN</h6>
                                    <small>PRINT CHALLAN & PAY AT ANY BANK</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="instructions-area p-4">
                        {activePaymentMethod === 'psid' ? (
                            <div className="psid-flow animate-in">
                                <h6 className="fw-bold mb-4">Instructions How to Pay:</h6>
                                <div className="sub-tabs d-flex gap-4 mb-4 border-bottom pb-2">
                                    <div className={`sub-tab-item ${activeSubTab === 'banking' ? 'active' : ''}`} onClick={() => setActiveSubTab('banking')}>
                                        <i className="fas fa-university me-2"></i> BANKING APP
                                    </div>
                                    <div className={`sub-tab-item ${activeSubTab === 'jazzcash' ? 'active' : ''}`} onClick={() => setActiveSubTab('jazzcash')}>
                                        <i className="fas fa-mobile me-2"></i> JAZZCASH
                                    </div>
                                    <div className={`sub-tab-item ${activeSubTab === 'easypaisa' ? 'active' : ''}`} onClick={() => setActiveSubTab('easypaisa')}>
                                        <i className="fas fa-wallet me-2"></i> EASYPAISA
                                    </div>
                                </div>

                                <div className="instruction-content">
                                    {activeSubTab === 'banking' && (
                                        <ol className="small text-muted">
                                            <li>Login to your Banking App.</li>
                                            <li>Go to "Bill Payments" and select "1Bill".</li>
                                            <li>Choose "Invoice/Consumer Payment".</li>
                                            <li>Enter your unique PSID number.</li>
                                            <li>Verify the amount (PKR 3250) and Pay.</li>
                                        </ol>
                                    )}
                                    {activeSubTab === 'jazzcash' && (
                                        <ol className="small text-muted">
                                            <li>Open JazzCash App.</li>
                                            <li>Tap on "Pay Bills".</li>
                                            <li>Search for "1Bill" and select "Invoice Payment".</li>
                                            <li>Enter your PSID and confirm.</li>
                                            <li>Enter MPIN to complete payment.</li>
                                        </ol>
                                    )}
                                    {activeSubTab === 'easypaisa' && (
                                        <ol className="small text-muted">
                                            <li>Open Easypaisa App.</li>
                                            <li>Tap on "Bill Payment".</li>
                                            <li>Search "1Bill" in category.</li>
                                            <li>Enter PSID and tap next.</li>
                                            <li>Confirm payment of PKR 3250.</li>
                                        </ol>
                                    )}
                                </div>
                                {onlinePsid && (
                                    <div className="mt-4 p-3 border rounded bg-light text-center">
                                        <span className="text-muted small d-block">YOUR CONSUMER ID / PSID:</span>
                                        <h3 className="fw-bold text-success mb-0">{onlinePsid}</h3>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="challan-flow animate-in">
                                <h6 className="fw-bold mb-3">Bank Challan Payment Steps:</h6>
                                <ol className="small text-muted">
                                    <li>Click on "Generate Challan" to generate your unique Bank Challan.</li>
                                    <li>Download the generated challan by clicking the download button.</li>
                                    <li>Pay the challan at any nearest bank branch to confirm your seat.</li>
                                </ol>
                            </div>
                        )}

                        <div className="mt-4 pt-3 text-center border-top">
                            <button 
                                className="btn btn-success px-5 py-2 fw-bold rounded-pill" 
                                style={{ backgroundColor: '#0B5D3B' }}
                                onClick={handleGeneratePayment}
                                disabled={isGenerating}
                            >
                                <i className={`fas ${activePaymentMethod === 'psid' ? 'fa-bolt' : 'fa-download'} me-2`}></i>
                                {isGenerating ? 'Processing...' : (activePaymentMethod === 'psid' ? 'GENERATE PSID' : 'GENERATE CHALLAN')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .alert-custom-green { background-color: #ecfdf5; border: 1px solid #d1fae5; border-radius: 12px; color: #0B5D3B; }
                .bg-light-green { background-color: #f8fafc !important; }
                .w-40 { width: 40%; }
                
                .payment-tab-btn { flex: 1; border: 1px solid #e2e8f0; padding: 15px; border-radius: 12px; cursor: pointer; transition: all 0.2s; }
                .payment-tab-btn.active { background-color: #ecfdf5; border-color: #0B5D3B; }
                .tab-icon { width: 40px; height: 40px; background: #f1f5f9; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #0B5D3B; font-size: 1.2rem; }
                .payment-tab-btn.active .tab-icon { background: #0B5D3B; color: #fff; }
                
                .sub-tab-item { font-size: 0.8rem; font-weight: 700; color: #94a3b8; cursor: pointer; padding-bottom: 5px; }
                .sub-tab-item.active { color: #0B5D3B; border-bottom: 2px solid #0B5D3B; }
                
                .animate-in { animation: fadeIn 0.4s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default AdmissionResult;
