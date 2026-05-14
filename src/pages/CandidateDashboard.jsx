import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './CandidateDashboard.css';
import Logo from '../assets/logo.png';
import GIF from '../assets/approved.gif';
import { generateOnlineChallan, generatePhysicalChallan } from '../api/auth';

const PAYMENT_DEADLINE = "May 31, 2026";
const FEE_AMOUNT = "PKR 3,250";

const CandidateDashboard = () => {
    const { user, logout } = useAuth();
    const [userData, setUserData] = useState(null);
    const [onlinePsid, setOnlinePsid] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [activePaymentMethod, setActivePaymentMethod] = useState("psid");
    const [activeSubTab, setActiveSubTab] = useState("banking");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (user) {
            const data = user?.user?.data?.user || user?.user || user;
            setUserData(data);
            if (data?.psid) setOnlinePsid(data.psid);
        }
    }, [user]);

    if (!userData) return (
        <div className="loading-screen-professional">
            <div className="spinner-border text-success" role="status"></div>
            <p className="mt-3">VERIFYING PORTAL ACCESS...</p>
        </div>
    );

    const rollNumber = userData.rollNumber || `DK-${userData._id?.substring(0, 6).toUpperCase()}`;
    const testPassed = userData.testPassed;
    const testScore = userData.testScore || 0;
    const percentage = `${testScore}%`;
    const totalMcqs = 20;
    const correctAnswers = Math.round((testScore / 100) * totalMcqs);

    const enrolledCourses = userData.courses || [];
    const secondCourses = userData.secondEnrolledCourses || [];
    const physicalCourses = userData.physicalCourses || [];
    const allCourses = [
        ...enrolledCourses.map(c => ({ name: c, type: 'Online', session: 'Spring 2026' })),
        ...secondCourses.map(c => ({ name: c, type: 'Online (2nd)', session: 'Spring 2026' })),
        ...physicalCourses.map(c => ({ name: c, type: 'Physical', session: 'Spring 2026' })),
    ];
    const hasCourses = allCourses.length > 0;

    const handleGeneratePayment = async () => {
        setIsGenerating(true);
        try {
            if (activePaymentMethod === "psid") {
                const res = await generateOnlineChallan();
                if (res.data?.psid) setOnlinePsid(res.data.psid);
            } else {
                const res = await generatePhysicalChallan();
                if (res.data?.fileUrl) window.open(res.data.fileUrl, "_blank");
            }
        } catch (err) {
            console.error("Payment error:", err);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(onlinePsid);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="professional-dashboard-page">

            {/* ── Header ── */}
            <header className="portal-top-header">
                <div className="container d-flex justify-content-between align-items-center h-100">
                    <div className="d-flex align-items-center gap-3">
                        <img src={Logo} alt="Logo" className="portal-logo" />
                        <div className="portal-brand">
                            <h5 className="mb-0 fw-bold">DIGIKHYBER</h5>
                            <p className="mb-0">CANDIDATE PORTAL (BATCH-2026)</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-4">
                        <div className="portal-user-pill d-none d-md-flex align-items-center gap-2">
                            <i className="fas fa-user-circle"></i>
                            <span>{userData.fullName}</span>
                        </div>
                        <button onClick={logout} className="portal-logout-btn">
                            <i className="fas fa-sign-out-alt me-1"></i> Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="container py-4">

                {/* ── Welcome Banner ── */}
                <div className="portal-status-alert mb-4 p-4 animate-in">
                    <div className="row align-items-center">
                        <div className="col-md-9">
                            <div className="d-flex gap-3">
                                <i className="fas fa-check-circle text-success fs-4 mt-1"></i>
                                <div>
                                    <h4 className="fw-bold mb-1 text-success">Welcome Back, {userData.fullName}!</h4>
                                    <p className="mb-0 text-muted small fw-medium">
                                        Your candidate portal is active. You can manage your academic profile, view test results,
                                        and access scholarship benefits below. Please ensure your processing fee is locked to confirm your seat.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 text-md-end mt-3 mt-md-0">
                            <div className="portal-roll-box">
                                <small>ROLL NUMBER</small>
                                <strong>{rollNumber}</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-4">

                    {/* ── LEFT / MAIN COLUMN ── */}
                    <div className="col-lg-8">

                        {/* Test not passed — show lock */}
                        {!testPassed && (
                            <div className="portal-card mb-4 shadow-sm">
                                <div className="card-header-bar">
                                    <h6 className="mb-0 fw-bold"><i className="fas fa-graduation-cap me-2 text-success"></i> ADMISSION EVALUATION STATUS</h6>
                                </div>
                                <div className="p-4 text-center py-5">
                                    <i className="fas fa-lock fa-3x text-muted mb-3"></i>
                                    <h5 className="fw-bold">Test Evaluation Pending</h5>
                                    <p className="text-muted small mb-4">Complete your test to unlock your result card.</p>
                                    <Link to="/admission-test" className="btn-portal-dark">Take Test Now</Link>
                                </div>
                            </div>
                        )}

                        {/* ── TEST PASSED — show everything inline ── */}
                        {testPassed && (
                            <>
                                {/* Passed Status Card */}
                                <div className="portal-card mb-4 shadow-sm">
                                    <div className="card-header-bar">
                                        <h6 className="mb-0 fw-bold"><i className="fas fa-graduation-cap me-2 text-success"></i> ADMISSION EVALUATION STATUS</h6>
                                    </div>
                                    <div className="p-4 d-flex flex-column flex-md-row align-items-center gap-4">
                                        <img src={GIF} alt="Passed" width="70" />
                                        <div className="text-center text-md-start">
                                            <span className="badge-qualified mb-2">OFFICIALLY QUALIFIED</span>
                                            <h5 className="fw-bold mb-1">Congratulations! You have passed the test.</h5>
                                            <p className="text-muted small mb-0">You scored <strong>{percentage}</strong> in the admission test. Your provisional enrollment is confirmed.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* ── Congratulations Info Box ── */}
                                <div style={{ background: "#e8f5ee", border: "1px solid #b2dfcc", borderRadius: 10, padding: "20px 24px", marginBottom: 20 }}>
                                    <p style={{ color: "#1a1a1a", marginBottom: 10, lineHeight: 1.75 }}>
                                        <span style={{ color: "#0B5D3B", fontWeight: 700 }}>Congratulations! You've Successfully Passed the Admission Test. </span>
                                        We are thrilled to inform you that you have successfully cleared the Digikhyber Admission Test.
                                        Now you are eligible for a Scholarship Card. To confirm your seat &amp; proceed with your enrolled course,
                                        all courses under the Digikhyber scholarship card are 100% free, but the application processing
                                        fee is necessary to complete your application. Your processing fee will be reimbursed if you achieve
                                        above 85% Marks in the final evaluation test under the policy of Digikhyber.
                                    </p>
                                    <p style={{ color: "#0B5D3B", fontWeight: 600, marginBottom: 14 }}>
                                        You're just one step away from receiving your Scholarship Card!
                                    </p>
                                    <p style={{ fontWeight: 700, marginBottom: 8 }}>⚡ Benefits of the Scholarship Card:</p>
                                    <ul style={{ paddingLeft: 20, marginBottom: 0 }}>
                                        {["Access to Advanced IT Courses","Laptop Scheme","Solar Scheme","Access to Taleem Finance","Access to Study Abroad Free Consultancy","Hands-On Learning with Global Curriculum","Career Guidance & Freelancing Support"].map((b, i) => (
                                            <li key={i} style={{ marginBottom: 4 }}>{b}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* ── Student Result Card Table ── */}
                                <div style={{ border: "1px solid #ccc", borderRadius: 8, overflow: "hidden", marginBottom: 20 }}>
                                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                        <thead>
                                            <tr style={{ background: "#0B5D3B", color: "white" }}>
                                                <th colSpan={2} style={{ padding: "13px 20px", textAlign: "center", fontWeight: 700 }}>Student Result Card</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                { label: "Field", value: "Details", header: true },
                                                { label: "Student Name", value: userData.fullName },
                                                { label: "Roll Number", value: rollNumber },
                                                { label: "Total MCQs", value: totalMcqs },
                                                { label: "Total Marks", value: totalMcqs },
                                                { label: "Marks Obtained", value: correctAnswers },
                                                { label: "Percentage", value: percentage },
                                            ].map((row, i) => (
                                                <tr key={i} style={{ background: i % 2 === 0 ? "#c8e6c9" : "#fff" }}>
                                                    <td style={{ padding: "11px 20px", fontWeight: row.header ? 700 : 500, width: "45%", borderBottom: "1px solid #ddd" }}>{row.label}</td>
                                                    <td style={{ padding: "11px 20px", borderBottom: "1px solid #ddd" }}>{row.value}</td>
                                                </tr>
                                            ))}
                                            <tr style={{ background: "#fff" }}>
                                                <td style={{ padding: "11px 20px", fontWeight: 500, borderBottom: "1px solid #ddd" }}>Result Status</td>
                                                <td style={{ padding: "11px 20px", borderBottom: "1px solid #ddd" }}>
                                                    <span style={{ background: "#0B5D3B", color: "white", padding: "3px 14px", borderRadius: 20, fontWeight: 600, fontSize: 13 }}>Pass</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/* ── Selected Study Programs ── */}
                                <div style={{ marginBottom: 20 }}>
                                    <h6 style={{ fontWeight: 700, marginBottom: 8 }}>☑ Selected Study Programs</h6>
                                    <p style={{ color: "#555", fontSize: 14, marginBottom: 10 }}>
                                        You can enroll in up to 2 courses. All courses are free but a one-time processing fee of <strong>{FEE_AMOUNT}</strong> is required.
                                    </p>
                                    <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ccc", borderRadius: 8 }}>
                                        <thead>
                                            <tr style={{ background: "#f0f0f0" }}>
                                                <th style={{ padding: "10px 16px", fontWeight: 700, borderBottom: "1px solid #ccc", width: "30%" }}>Form #</th>
                                                <th style={{ padding: "10px 16px", fontWeight: 700, borderBottom: "1px solid #ccc" }}>Applied Courses</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style={{ padding: "12px 16px", borderBottom: "1px solid #eee", verticalAlign: "top" }}>
                                                    {userData._id?.substring(0, 5).toUpperCase() || "N/A"}
                                                </td>
                                                <td style={{ padding: "12px 16px", borderBottom: "1px solid #eee" }}>
                                                    {enrolledCourses.length > 0 ? (
                                                        <ul style={{ margin: 0, paddingLeft: 18 }}>
                                                            {enrolledCourses.map((c, i) => <li key={i}>{c}</li>)}
                                                        </ul>
                                                    ) : <span className="text-muted">No courses</span>}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/* ── Fee Deadline ── */}
                                <div style={{ background: "#fff8e8", border: "1px solid #f0c040", borderRadius: 8, padding: "13px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                                    <span style={{ fontWeight: 700 }}>Last Date to pay Application Processing Fee:</span>
                                    <span style={{ fontWeight: 600 }}>{PAYMENT_DEADLINE}</span>
                                    <span style={{ background: "#f0c040", color: "#5a3e00", padding: "3px 14px", borderRadius: 20, fontWeight: 600, fontSize: 13 }}>Pending</span>
                                </div>

                                {/* ── Payment Section ── */}
                                <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, overflow: "hidden", marginBottom: 20 }}>
                                    <div style={{ textAlign: "center", padding: "22px 20px 14px" }}>
                                        <h5 style={{ fontWeight: 800, marginBottom: 6 }}>Pay Application Processing Fee!</h5>
                                        <p style={{ color: "#555", fontSize: 14, marginBottom: 0 }}>
                                            Submit your processing fee through the options below to confirm your Scholarship Card.
                                        </p>
                                    </div>
                                    <div style={{ background: "#0B5D3B", color: "white", textAlign: "center", padding: "11px", fontWeight: 700 }}>
                                        Payment Options
                                    </div>

                                    {/* PSID / Challan Cards */}
                                    <div style={{ display: "flex", gap: 14, padding: "18px", flexWrap: "wrap" }}>
                                        {[
                                            { key: "psid", icon: "fas fa-wallet", title: "CONSUMER NUMBER / PSID", sub: "Pay using online mobile banking or wallet via 1 Biller" },
                                            { key: "challan", icon: "fas fa-university", title: "CLICK HERE FOR BANK CHALLAN", sub: "Pay at any BOP branch using Digikhyber Challan" },
                                        ].map(opt => (
                                            <div key={opt.key} onClick={() => setActivePaymentMethod(opt.key)}
                                                style={{ flex: 1, minWidth: 200, border: `2px solid ${activePaymentMethod === opt.key ? "#0B5D3B" : "#ddd"}`, borderRadius: 10, padding: "14px 16px", cursor: "pointer", background: activePaymentMethod === opt.key ? "#f0fff8" : "#fff", display: "flex", alignItems: "center", gap: 12, transition: "all 0.2s" }}>
                                                <div style={{ width: 42, height: 42, background: activePaymentMethod === opt.key ? "#0B5D3B" : "#f1f5f9", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                                    <i className={opt.icon} style={{ color: activePaymentMethod === opt.key ? "#fff" : "#0B5D3B", fontSize: 16 }}></i>
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 700, fontSize: 13 }}>{opt.title}</div>
                                                    <div style={{ fontSize: 11, color: "#666" }}>{opt.sub}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Instructions */}
                                    <div style={{ padding: "0 18px 20px" }}>
                                        <p style={{ fontWeight: 700, marginBottom: 10 }}>Instructions How to Pay:</p>
                                        <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
                                            {[
                                                { key: "banking", label: "Banking App" },
                                                { key: "jazzcash", label: "JazzCash" },
                                                { key: "easypaisa", label: "EasyPaisa" },
                                            ].map(tab => (
                                                <button key={tab.key} onClick={() => setActiveSubTab(tab.key)}
                                                    style={{ padding: "7px 16px", border: `1px solid ${activeSubTab === tab.key ? "#0B5D3B" : "#ccc"}`, borderRadius: 6, background: activeSubTab === tab.key ? "#0B5D3B" : "#fff", color: activeSubTab === tab.key ? "#fff" : "#333", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                                                    {tab.label}
                                                </button>
                                            ))}
                                        </div>

                                        <div style={{ background: "#f9f9f9", borderRadius: 8, padding: "14px 18px", marginBottom: 16 }}>
                                            <p style={{ fontWeight: 700, marginBottom: 8 }}>
                                                {activeSubTab === "banking" && "🏦 Banking App Payment (HBL, Meezan, UBL, Bank Alfalah, etc.)"}
                                                {activeSubTab === "jazzcash" && "📱 JazzCash Payment"}
                                                {activeSubTab === "easypaisa" && "📱 EasyPaisa Payment"}
                                            </p>
                                            <ol style={{ paddingLeft: 20, fontSize: 14, lineHeight: 2, margin: 0 }}>
                                                {activeSubTab === "banking" && ["Open your bank's mobile app","Log in with your credentials (MPIN, fingerprint, or face ID)","Go to Bill Payments or Payments","Select 1Bill from the biller list","Enter the Consumer/Invoice Number (12-15 digits)","System will fetch and display bill details","Verify the name, amount, and service","Tap Pay or Confirm","Enter your PIN/OTP to authorize","Receive confirmation receipt/SMS"].map((s, i) => <li key={i}>{s}</li>)}
                                                {activeSubTab === "jazzcash" && ["Open the JazzCash mobile app","Log in with your JazzCash credentials","Tap Pay Bills from the home screen","Select 1Bill from the biller list","Enter your Consumer Number / PSID","Verify the bill details","Enter your MPIN to confirm payment","Receive SMS confirmation"].map((s, i) => <li key={i}>{s}</li>)}
                                                {activeSubTab === "easypaisa" && ["Open the EasyPaisa mobile app","Log in with your EasyPaisa account","Tap Bill Payments from the main menu","Select 1Bill as the biller","Enter your Consumer Number / PSID","Review the amount and details","Confirm payment with MPIN or OTP","Screenshot confirmation for your records"].map((s, i) => <li key={i}>{s}</li>)}
                                            </ol>
                                        </div>

                                        {/* PSID Box */}
                                        {activePaymentMethod === "psid" && onlinePsid && (
                                            <div style={{ background: "#e8f5ee", border: "1px solid #0B5D3B", borderRadius: 8, padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
                                                <span style={{ fontWeight: 700, color: "#0B5D3B" }}>Your PSID: <span style={{ letterSpacing: 1 }}>{onlinePsid}</span></span>
                                                <button onClick={handleCopy} style={{ background: "transparent", border: "1px solid #0B5D3B", borderRadius: 6, padding: "4px 12px", cursor: "pointer", color: "#0B5D3B", fontWeight: 600, fontSize: 13 }}>
                                                    {copied ? "Copied!" : <><i className="fas fa-copy me-1"></i>Copy</>}
                                                </button>
                                            </div>
                                        )}

                                        <button onClick={handleGeneratePayment} disabled={isGenerating}
                                            style={{ background: "#0B5D3B", color: "white", border: "none", borderRadius: 8, padding: "11px 24px", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, opacity: isGenerating ? 0.7 : 1 }}>
                                            {isGenerating ? <><span className="spinner-border spinner-border-sm"></span> Generating...</> :
                                                activePaymentMethod === "psid"
                                                    ? <><i className="fas fa-download"></i> {onlinePsid ? "Re-Generate PSID" : "Generate PSID"}</>
                                                    : <><i className="fas fa-file-download"></i> Download Bank Challan</>
                                            }
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* ── Enrolled Programs ── */}
                        <div className="portal-card shadow-sm">
                            <div className="card-header-bar">
                                <h6 className="mb-0 fw-bold"><i className="fas fa-book-open me-2 text-success"></i> ENROLLED ACADEMIC PROGRAMS</h6>
                            </div>
                            <div className="p-4">
                                {hasCourses ? (
                                    <div className="row g-3">
                                        {allCourses.map((course, idx) => (
                                            <div key={idx} className="col-md-6">
                                                <div className="course-item-lite p-3 rounded-3 d-flex align-items-center justify-content-between">
                                                    <div>
                                                        <h6 className="mb-0 fw-bold">{course.name}</h6>
                                                        <small className="text-muted">{course.type} | {course.session}</small>
                                                    </div>
                                                    <i className="fas fa-check-circle text-success"></i>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-3">
                                        <i className="fas fa-inbox fa-2x text-muted mb-2"></i>
                                        <p className="text-muted small mb-0">No courses found in your enrollment history.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT COLUMN ── */}
                    <div className="col-lg-4">
                        <div className="portal-card mb-4 shadow-sm">
                            <div className="card-header-bar">
                                <h6 className="mb-0 fw-bold"><i className="fas fa-user-tag me-2 text-success"></i> CANDIDATE PROFILE</h6>
                            </div>
                            <div className="p-4">
                                {[
                                    { label: "FULL NAME", value: userData.fullName },
                                    { label: "FATHER NAME", value: userData.fatherName || 'N/A' },
                                    { label: "CNIC NUMBER", value: userData.cnic },
                                    { label: "MOBILE NUMBER", value: userData.mobile },
                                ].map((row, i) => (
                                    <div key={i} className={`profile-row-lite ${i < 3 ? "mb-3" : ""}`}>
                                        <label>{row.label}</label>
                                        <span>{row.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="scholarship-lite-card p-4 rounded-4 shadow-sm text-center mb-4">
                            <h6 className="fw-bold text-white mb-2">SCHOLARSHIP STATUS</h6>
                            <p className="text-white opacity-90 small mb-3">Activate your scholarship card to unlock laptop and finance schemes.</p>
                            <Link to="/apply-scholarshipcard" className="btn btn-light btn-sm w-100 fw-bold py-2" style={{ borderRadius: '8px', color: '#0B5D3B' }}>
                                APPLY FOR CARD <i className="fas fa-id-badge ms-1"></i>
                            </Link>
                        </div>

                        <div className="support-box-lite p-3 border rounded-4 bg-white text-center">
                            <h6 className="fw-bold mb-1 small text-success">Student Support Helpdesk</h6>
                            <p className="text-muted mb-0 fw-bold" style={{ fontSize: '0.9rem' }}>+92 300 1234567</p>
                        </div>
                    </div>
                </div>
            </main>

            <style>{`
                .professional-dashboard-page { background-color: #f5f5f5; min-height: 100vh; font-family: 'Outfit', sans-serif; }
                .portal-top-header { background: #fff; height: 75px; border-bottom: 1px solid #f1f5f9; box-shadow: 0 2px 10px rgba(0,0,0,0.02); }
                .portal-logo { height: 45px; }
                .portal-brand h5 { font-size: 1.05rem; color: #0B5D3B; letter-spacing: 0.5px; }
                .portal-brand p { font-size: 0.65rem; color: #94a3b8; font-weight: 700; }
                .portal-user-pill { background: #f8fafc; padding: 6px 15px; border-radius: 100px; border: 1px solid #e2e8f0; font-size: 0.85rem; font-weight: 700; color: #475569; }
                .portal-logout-btn { background: none; border: none; color: #94a3b8; font-weight: 700; font-size: 0.85rem; transition: all 0.2s; }
                .portal-logout-btn:hover { color: #ef4444; }
                .portal-status-alert { background: #ecfdf5; border: 1px solid #d1fae5; border-radius: 16px; }
                .portal-roll-box { background: #fff; padding: 12px 20px; border-radius: 12px; border: 1px solid #d1fae5; text-align: center; }
                .portal-roll-box small { display: block; font-size: 0.6rem; color: #94a3b8; font-weight: 800; letter-spacing: 1px; }
                .portal-roll-box strong { font-size: 1.2rem; color: #0B5D3B; }
                .portal-card { background: #fff; border-radius: 16px; overflow: hidden; border: 1px solid #f1f5f9; }
                .card-header-bar { background: #fcfdfe; padding: 15px 25px; border-bottom: 1px solid #f1f5f9; }
                .card-header-bar h6 { font-size: 0.85rem; color: #0B5D3B; letter-spacing: 0.5px; }
                .badge-qualified { background: #0B5D3B; color: #fff; font-size: 0.65rem; font-weight: 800; padding: 4px 12px; border-radius: 100px; display: inline-block; margin-bottom: 8px; }
                .course-item-lite { background: #fcfdfe; border: 1px solid #f1f5f9; transition: all 0.2s; }
                .course-item-lite:hover { border-color: #0B5D3B; background: #fff; }
                .profile-row-lite label { display: block; font-size: 0.65rem; color: #94a3b8; font-weight: 800; letter-spacing: 0.5px; margin-bottom: 2px; }
                .profile-row-lite span { font-weight: 700; color: #1e293b; font-size: 1rem; }
                .scholarship-lite-card { background: linear-gradient(135deg, #0B5D3B, #15803d); }
                .loading-screen-professional { height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #fff; color: #0B5D3B; font-weight: 700; }
                .animate-in { animation: fadeInUp 0.5s ease-out both; }
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default CandidateDashboard;
