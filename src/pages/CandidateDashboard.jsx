import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './CandidateDashboard.css';
import Logo from '../assets/logo.png';
import GIF from '../assets/approved.gif';
import Footer from '../components/Footer';
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
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fff', color: '#0B5D3B', fontWeight: 700 }}>
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

    const DK_GREEN = '#0B5D3B';
    const DK_LIGHT = '#e8f5ee';
    const DK_BORDER = '#b2dfcc';
    const DK_ROW = '#d4edda';

    return (
        <div style={{ background: '#f4f6f8', minHeight: '100vh', fontFamily: "'Outfit', sans-serif", display: 'flex', flexDirection: 'column' }}>

            {/* ══════════ HEADER ══════════ */}
            <header style={{ background: '#fff', borderBottom: '1px solid #e8f0ea', padding: '0 24px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', position: 'sticky', top: 0, zIndex: 100 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <img src={Logo} alt="Logo" style={{ height: 46 }} />
                    <div>
                        <div style={{ fontWeight: 800, fontSize: 16, color: DK_GREEN, letterSpacing: 0.5 }}>DIGIKHYBER</div>
                        <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700, letterSpacing: 1 }}>CANDIDATE PORTAL (BATCH-2026)</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ background: '#f0faf4', border: '1px solid #d1fae5', borderRadius: 100, padding: '6px 16px', fontSize: 14, fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <i className="fas fa-user-circle" style={{ color: DK_GREEN }}></i> {userData.fullName}
                    </div>
                    <button onClick={logout} style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: 8, padding: '7px 16px', color: '#64748b', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                </div>
            </header>

            <main style={{ flex: 1 }}>
                <div className="container py-4" style={{ maxWidth: 1100 }}>

                    {/* ══════════ WELCOME BANNER ══════════ */}
                    <div style={{ background: DK_LIGHT, border: `1px solid ${DK_BORDER}`, borderRadius: 16, padding: '20px 28px', marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                            <i className="fas fa-check-circle" style={{ color: DK_GREEN, fontSize: 22, marginTop: 2 }}></i>
                            <div>
                                <h4 style={{ fontWeight: 800, color: DK_GREEN, marginBottom: 4 }}>Welcome Back, {userData.fullName}!</h4>
                                <p style={{ color: '#475569', fontSize: 14, marginBottom: 0 }}>
                                    Your candidate portal is active. Manage your academic profile, view test results and access scholarship benefits.
                                    Please ensure your processing fee is paid to confirm your seat.
                                </p>
                            </div>
                        </div>
                        <div style={{ background: '#fff', border: `1px solid ${DK_BORDER}`, borderRadius: 12, padding: '12px 24px', textAlign: 'center', minWidth: 180 }}>
                            <div style={{ fontSize: 10, fontWeight: 800, color: '#94a3b8', letterSpacing: 1 }}>ROLL NUMBER</div>
                            <div style={{ fontSize: 18, fontWeight: 800, color: DK_GREEN, marginTop: 4 }}>{rollNumber}</div>
                        </div>
                    </div>

                    <div className="row g-4">

                        {/* ══════════ LEFT COLUMN ══════════ */}
                        <div className="col-lg-8">

                            {/* Test NOT passed */}
                            {!testPassed && (
                                <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8f0ea', overflow: 'hidden', marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                                    <div style={{ background: '#f8fafb', borderBottom: '1px solid #e8f0ea', padding: '14px 24px' }}>
                                        <h6 style={{ margin: 0, fontWeight: 700, color: DK_GREEN, fontSize: 13, letterSpacing: 0.5 }}>
                                            <i className="fas fa-graduation-cap me-2"></i> ADMISSION EVALUATION STATUS
                                        </h6>
                                    </div>
                                    <div style={{ padding: '48px 24px', textAlign: 'center' }}>
                                        <i className="fas fa-lock fa-3x mb-3" style={{ color: '#cbd5e1' }}></i>
                                        <h5 style={{ fontWeight: 700 }}>Test Evaluation Pending</h5>
                                        <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 24 }}>Complete your admission test to unlock your result card.</p>
                                        <Link to="/admission-test" style={{ background: DK_GREEN, color: '#fff', padding: '11px 28px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 14 }}>
                                            Take Test Now
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {/* ══════════ TEST PASSED — INLINE RESULT ══════════ */}
                            {testPassed && (<>

                                {/* Qualified Card */}
                                <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8f0ea', overflow: 'hidden', marginBottom: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                                    <div style={{ background: '#f8fafb', borderBottom: '1px solid #e8f0ea', padding: '14px 24px' }}>
                                        <h6 style={{ margin: 0, fontWeight: 700, color: DK_GREEN, fontSize: 13, letterSpacing: 0.5 }}>
                                            <i className="fas fa-graduation-cap me-2"></i> ADMISSION EVALUATION STATUS
                                        </h6>
                                    </div>
                                    <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                                        <img src={GIF} alt="Passed" style={{ width: 70 }} />
                                        <div>
                                            <span style={{ background: DK_GREEN, color: '#fff', fontSize: 11, fontWeight: 800, padding: '4px 14px', borderRadius: 100, display: 'inline-block', marginBottom: 8, letterSpacing: 0.5 }}>OFFICIALLY QUALIFIED</span>
                                            <h5 style={{ fontWeight: 800, marginBottom: 4 }}>Congratulations! You have passed the test.</h5>
                                            <p style={{ color: '#64748b', fontSize: 14, marginBottom: 0 }}>
                                                You scored <strong style={{ color: DK_GREEN }}>{percentage}</strong> in the admission test. Your provisional enrollment is confirmed.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Congratulations Info Box */}
                                <div style={{ background: DK_LIGHT, border: `1px solid ${DK_BORDER}`, borderRadius: 12, padding: '20px 24px', marginBottom: 20 }}>
                                    <p style={{ lineHeight: 1.8, marginBottom: 12, fontSize: 15 }}>
                                        <span style={{ color: DK_GREEN, fontWeight: 700 }}>Congratulations! You have Successfully Passed the Admission Test. </span>
                                        We are thrilled to inform you that you have successfully cleared the Digikhyber Admission Test.
                                        Now you are eligible for a Scholarship Card. To confirm your seat, all courses under the
                                        Digikhyber scholarship card are 100% free, but the application processing fee is necessary
                                        to complete your application. Your processing fee will be reimbursed if you achieve above
                                        85% Marks in the final evaluation test under the policy of Digikhyber.
                                    </p>
                                    <p style={{ color: DK_GREEN, fontWeight: 700, marginBottom: 12 }}>
                                        You are just one step away from receiving your Scholarship Card!
                                    </p>
                                    <p style={{ fontWeight: 700, marginBottom: 8 }}>⚡ Benefits of the Scholarship Card:</p>
                                    <ul style={{ paddingLeft: 20, marginBottom: 0, lineHeight: 2 }}>
                                        {['Access to Advanced IT Courses', 'Laptop Scheme', 'Solar Scheme', 'Access to Taleem Finance', 'Access to Study Abroad Free Consultancy', 'Hands-On Learning with Global Curriculum', 'Career Guidance & Freelancing Support'].map((b, i) => (
                                            <li key={i}>{b}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* ── Student Result Card Table ── */}
                                <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${DK_BORDER}`, marginBottom: 20, boxShadow: '0 2px 8px rgba(11,93,59,0.08)' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ background: DK_GREEN }}>
                                                <th colSpan={2} style={{ padding: '15px 24px', textAlign: 'center', color: '#fff', fontWeight: 800, fontSize: 15, letterSpacing: 0.5 }}>
                                                    Student Result Card
                                                </th>
                                            </tr>
                                            <tr style={{ background: '#145e3c' }}>
                                                <th style={{ padding: '11px 24px', color: '#fff', fontWeight: 700, fontSize: 14, width: '45%' }}>Field</th>
                                                <th style={{ padding: '11px 24px', color: '#fff', fontWeight: 700, fontSize: 14 }}>Details</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                { label: 'Student Name', value: userData.fullName },
                                                { label: 'Roll Number', value: rollNumber },
                                                { label: 'Total MCQs', value: totalMcqs },
                                                { label: 'Total Marks', value: totalMcqs },
                                                { label: 'Marks Obtained', value: correctAnswers },
                                                { label: 'Percentage', value: percentage },
                                            ].map((row, i) => (
                                                <tr key={i} style={{ background: i % 2 === 0 ? '#f0faf4' : '#fff' }}>
                                                    <td style={{ padding: '13px 24px', fontWeight: 600, borderBottom: '1px solid #e0f0e8', color: '#1e293b' }}>{row.label}</td>
                                                    <td style={{ padding: '13px 24px', borderBottom: '1px solid #e0f0e8', color: '#334155', fontWeight: 500 }}>{row.value}</td>
                                                </tr>
                                            ))}
                                            <tr style={{ background: '#f0faf4' }}>
                                                <td style={{ padding: '13px 24px', fontWeight: 600, color: '#1e293b' }}>Result Status</td>
                                                <td style={{ padding: '13px 24px' }}>
                                                    <span style={{ background: DK_GREEN, color: '#fff', padding: '4px 18px', borderRadius: 100, fontWeight: 700, fontSize: 13 }}>Pass</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/* ── Selected Study Programs ── */}
                                <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e8f0ea', padding: '20px 24px', marginBottom: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                                    <h6 style={{ fontWeight: 800, marginBottom: 6, fontSize: 15 }}>☑ Selected Study Programs</h6>
                                    <p style={{ color: '#64748b', fontSize: 14, marginBottom: 14 }}>
                                        You can enroll in up to 2 courses. All courses are completely free, but a one-time processing
                                        fee of <strong style={{ color: DK_GREEN }}>{FEE_AMOUNT}</strong> is required regardless of the number of courses.
                                    </p>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e0f0e8', borderRadius: 8, overflow: 'hidden' }}>
                                        <thead>
                                            <tr style={{ background: '#f0faf4' }}>
                                                <th style={{ padding: '11px 18px', fontWeight: 700, borderBottom: '1px solid #e0f0e8', width: '28%', textAlign: 'left' }}>Form #</th>
                                                <th style={{ padding: '11px 18px', fontWeight: 700, borderBottom: '1px solid #e0f0e8', textAlign: 'left' }}>Applied Courses</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style={{ padding: '12px 18px', verticalAlign: 'top', color: '#334155', fontWeight: 600 }}>
                                                    {userData._id?.substring(0, 5).toUpperCase() || 'N/A'}
                                                </td>
                                                <td style={{ padding: '12px 18px' }}>
                                                    {enrolledCourses.length > 0 ? (
                                                        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2 }}>
                                                            {enrolledCourses.map((c, i) => <li key={i} style={{ color: '#334155' }}>{c}</li>)}
                                                        </ul>
                                                    ) : <span style={{ color: '#94a3b8' }}>No courses selected</span>}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/* ── Fee Deadline ── */}
                                <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 10, padding: '14px 22px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                                    <i className="fas fa-calendar-alt" style={{ color: '#d97706' }}></i>
                                    <span style={{ fontWeight: 700, color: '#1e293b' }}>Last Date to pay Application Processing Fee:</span>
                                    <span style={{ fontWeight: 700, color: '#d97706' }}>{PAYMENT_DEADLINE}</span>
                                    <span style={{ background: '#fbbf24', color: '#78350f', padding: '3px 14px', borderRadius: 100, fontWeight: 700, fontSize: 12 }}>Pending</span>
                                </div>

                                {/* ══════════ PAYMENT SECTION ══════════ */}
                                <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8f0ea', overflow: 'hidden', marginBottom: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                                    <div style={{ textAlign: 'center', padding: '28px 24px 16px' }}>
                                        <h4 style={{ fontWeight: 800, color: '#1e293b', marginBottom: 8 }}>Pay Application Processing Fee!</h4>
                                        <p style={{ color: '#64748b', fontSize: 14, maxWidth: 560, margin: '0 auto' }}>
                                            You are just one step away from confirming your Scholarship Card. Please follow the
                                            instructions below to submit the processing fee through the given payment methods.
                                        </p>
                                    </div>

                                    {/* Green Header */}
                                    <div style={{ background: DK_GREEN, color: '#fff', textAlign: 'center', padding: '13px', fontWeight: 700, fontSize: 15, letterSpacing: 0.5 }}>
                                        Payment Options
                                    </div>

                                    {/* PSID / Challan Toggle */}
                                    <div style={{ display: 'flex', gap: 16, padding: '20px', flexWrap: 'wrap' }}>
                                        {[
                                            { key: 'psid', icon: 'fas fa-wallet', title: 'CONSUMER NUMBER / PSID', sub: 'PAY USING ONLINE MOBILE BANKING OR MOBILE WALLET USING 1 BILLER' },
                                            { key: 'challan', icon: 'fas fa-university', title: 'CLICK HERE FOR BANK CHALLAN', sub: 'PAY AT ANY BOP BRANCH USING DIGIKHYBER CHALLAN' },
                                        ].map(opt => (
                                            <div key={opt.key} onClick={() => setActivePaymentMethod(opt.key)}
                                                style={{ flex: 1, minWidth: 210, border: `2px solid ${activePaymentMethod === opt.key ? DK_GREEN : '#e2e8f0'}`, borderRadius: 12, padding: '16px 18px', cursor: 'pointer', background: activePaymentMethod === opt.key ? '#f0fff8' : '#fafafa', display: 'flex', alignItems: 'center', gap: 14, transition: 'all 0.2s' }}>
                                                <div style={{ width: 46, height: 46, background: activePaymentMethod === opt.key ? DK_GREEN : '#f1f5f9', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                    <i className={opt.icon} style={{ color: activePaymentMethod === opt.key ? '#fff' : DK_GREEN, fontSize: 18 }}></i>
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 700, fontSize: 13, color: '#1e293b' }}>{opt.title}</div>
                                                    <div style={{ fontSize: 10, color: '#94a3b8', letterSpacing: 0.3, marginTop: 3 }}>{opt.sub}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* ── PSID Section ── */}
                                    {activePaymentMethod === 'psid' && (
                                        <div style={{ padding: '0 20px 24px' }}>
                                            <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 14, color: '#1e293b' }}>Instructions How to Pay:</p>
                                            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                                                {[
                                                    { key: 'banking', label: 'Banking App', icon: 'fas fa-university' },
                                                    { key: 'jazzcash', label: 'JazzCash', icon: 'fas fa-mobile-alt' },
                                                    { key: 'easypaisa', label: 'EasyPaisa', icon: 'fas fa-mobile-alt' },
                                                ].map(tab => (
                                                    <button key={tab.key} onClick={() => setActiveSubTab(tab.key)}
                                                        style={{ padding: '8px 18px', border: `1px solid ${activeSubTab === tab.key ? DK_GREEN : '#e2e8f0'}`, borderRadius: 8, background: activeSubTab === tab.key ? DK_GREEN : '#fff', color: activeSubTab === tab.key ? '#fff' : '#475569', fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                                                        <i className={tab.icon}></i> {tab.label}
                                                    </button>
                                                ))}
                                            </div>

                                            <div style={{ background: '#f8fafc', borderRadius: 10, padding: '16px 20px', marginBottom: 18, border: '1px solid #e8f0ea' }}>
                                                <p style={{ fontWeight: 700, marginBottom: 10, color: '#1e293b' }}>
                                                    {activeSubTab === 'banking' && '🏦 Banking App Payment (HBL, Meezan, UBL, Bank Alfalah, etc.)'}
                                                    {activeSubTab === 'jazzcash' && '📱 JazzCash Payment'}
                                                    {activeSubTab === 'easypaisa' && '📱 EasyPaisa Payment'}
                                                </p>
                                                <ol style={{ paddingLeft: 20, fontSize: 14, lineHeight: 2.1, margin: 0, color: '#334155' }}>
                                                    {activeSubTab === 'banking' && ['Open your bank mobile app', 'Log in with your credentials (MPIN, fingerprint, or face ID)', 'Go to Bill Payments or Payments', 'Select 1Bill from the biller list', 'Enter the Consumer/Invoice Number (12-15 digits)', 'System will fetch and display bill details', 'Verify the name, amount, and service', 'Tap Pay or Confirm', 'Enter your PIN/OTP to authorize', 'Receive confirmation receipt/SMS'].map((s, i) => <li key={i}>{s}</li>)}
                                                    {activeSubTab === 'jazzcash' && ['Open the JazzCash mobile app', 'Log in with your JazzCash credentials', 'Tap Pay Bills from the home screen', 'Select 1Bill from the biller list', 'Enter your Consumer Number / PSID', 'Verify the bill details', 'Enter your MPIN to confirm payment', 'Receive SMS confirmation'].map((s, i) => <li key={i}>{s}</li>)}
                                                    {activeSubTab === 'easypaisa' && ['Open the EasyPaisa mobile app', 'Log in with your EasyPaisa account', 'Tap Bill Payments from the main menu', 'Select 1Bill as the biller', 'Enter your Consumer Number / PSID', 'Review the amount and details', 'Confirm payment with MPIN or OTP', 'Screenshot confirmation for your records'].map((s, i) => <li key={i}>{s}</li>)}
                                                </ol>
                                            </div>

                                            {onlinePsid && (
                                                <div style={{ background: DK_LIGHT, border: `1px solid ${DK_GREEN}`, borderRadius: 10, padding: '13px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                                                    <span style={{ fontWeight: 700, color: DK_GREEN, fontSize: 15 }}>
                                                        Your PSID: <span style={{ letterSpacing: 2 }}>{onlinePsid}</span>
                                                    </span>
                                                    <button onClick={handleCopy} style={{ background: '#fff', border: `1px solid ${DK_GREEN}`, borderRadius: 7, padding: '5px 14px', cursor: 'pointer', color: DK_GREEN, fontWeight: 700, fontSize: 13 }}>
                                                        {copied ? '✓ Copied!' : <><i className="fas fa-copy me-1"></i>Copy</>}
                                                    </button>
                                                </div>
                                            )}

                                            <button onClick={handleGeneratePayment} disabled={isGenerating}
                                                style={{ background: DK_GREEN, color: '#fff', border: 'none', borderRadius: 9, padding: '12px 26px', fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, opacity: isGenerating ? 0.75 : 1 }}>
                                                {isGenerating ? <><span className="spinner-border spinner-border-sm"></span> Generating...</> : <><i className="fas fa-download"></i> {onlinePsid ? 'PSID Already Generated' : 'Generate PSID'}</>}
                                            </button>
                                        </div>
                                    )}

                                    {/* ── Bank Challan Section ── */}
                                    {activePaymentMethod === 'challan' && (
                                        <div style={{ padding: '0 20px 24px' }}>
                                            <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: '#1e293b' }}>Follow these steps to complete your payment:</p>
                                            <p style={{ fontWeight: 700, marginBottom: 10, color: '#334155' }}>For Bank Challan Payment:</p>
                                            <div style={{ background: '#f8fafc', borderRadius: 10, padding: '16px 20px', marginBottom: 18, border: '1px solid #e8f0ea' }}>
                                                <ol style={{ paddingLeft: 20, fontSize: 14, lineHeight: 2.1, margin: 0, color: '#334155' }}>
                                                    <li>Click on <strong style={{ color: DK_GREEN }}>"Generate Challan"</strong> to generate your unique Bank Challan.</li>
                                                    <li><strong>Download the generated challan</strong> by clicking the download button.</li>
                                                    <li><strong>Pay the challan at any nearest BOP Bank Branch</strong> to complete your payment, confirm your Enrollment &amp; get a chance to avail Scholarship Card.</li>
                                                </ol>
                                            </div>
                                            <button onClick={handleGeneratePayment} disabled={isGenerating}
                                                style={{ background: DK_GREEN, color: '#fff', border: 'none', borderRadius: 9, padding: '12px 26px', fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, opacity: isGenerating ? 0.75 : 1 }}>
                                                {isGenerating ? <><span className="spinner-border spinner-border-sm"></span> Generating...</> : <><i className="fas fa-file-download"></i> Challan Already Submitted</>}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>)}

                            {/* ── Enrolled Programs ── */}
                            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8f0ea', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                                <div style={{ background: '#f8fafb', borderBottom: '1px solid #e8f0ea', padding: '14px 24px' }}>
                                    <h6 style={{ margin: 0, fontWeight: 700, color: DK_GREEN, fontSize: 13, letterSpacing: 0.5 }}>
                                        <i className="fas fa-book-open me-2"></i> ENROLLED ACADEMIC PROGRAMS
                                    </h6>
                                </div>
                                <div style={{ padding: 24 }}>
                                    {allCourses.length > 0 ? (
                                        <div className="row g-3">
                                            {allCourses.map((course, idx) => (
                                                <div key={idx} className="col-md-6">
                                                    <div style={{ background: '#f8fafb', border: '1px solid #e8f0ea', borderRadius: 10, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'border-color 0.2s' }}>
                                                        <div>
                                                            <div style={{ fontWeight: 700, color: '#1e293b', fontSize: 14 }}>{course.name}</div>
                                                            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{course.type} | {course.session}</div>
                                                        </div>
                                                        <i className="fas fa-check-circle" style={{ color: DK_GREEN, fontSize: 18 }}></i>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div style={{ textAlign: 'center', padding: '24px 0' }}>
                                            <i className="fas fa-inbox fa-2x mb-2" style={{ color: '#cbd5e1' }}></i>
                                            <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>No courses found in your enrollment history.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* ══════════ RIGHT COLUMN ══════════ */}
                        <div className="col-lg-4">

                            {/* Profile Card */}
                            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8f0ea', overflow: 'hidden', marginBottom: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                                <div style={{ background: '#f8fafb', borderBottom: '1px solid #e8f0ea', padding: '14px 24px' }}>
                                    <h6 style={{ margin: 0, fontWeight: 700, color: DK_GREEN, fontSize: 13, letterSpacing: 0.5 }}>
                                        <i className="fas fa-user-tag me-2"></i> CANDIDATE PROFILE
                                    </h6>
                                </div>
                                <div style={{ padding: 24 }}>
                                    {[
                                        { label: 'FULL NAME', value: userData.fullName },
                                        { label: 'FATHER NAME', value: userData.fatherName || 'N/A' },
                                        { label: 'CNIC NUMBER', value: userData.cnic },
                                        { label: 'MOBILE NUMBER', value: userData.mobile },
                                    ].map((row, i) => (
                                        <div key={i} style={{ marginBottom: i < 3 ? 18 : 0 }}>
                                            <div style={{ fontSize: 10, fontWeight: 800, color: '#94a3b8', letterSpacing: 1, marginBottom: 3 }}>{row.label}</div>
                                            <div style={{ fontWeight: 700, color: '#1e293b', fontSize: 15 }}>{row.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Scholarship Card */}
                            <div style={{ background: `linear-gradient(135deg, ${DK_GREEN}, #15803d)`, borderRadius: 16, padding: '24px 20px', textAlign: 'center', marginBottom: 20, boxShadow: '0 4px 16px rgba(11,93,59,0.25)' }}>
                                <i className="fas fa-id-card fa-2x mb-3" style={{ color: 'rgba(255,255,255,0.85)' }}></i>
                                <h6 style={{ color: '#fff', fontWeight: 800, marginBottom: 8, letterSpacing: 0.5 }}>SCHOLARSHIP STATUS</h6>
                                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, marginBottom: 16 }}>
                                    Activate your scholarship card to unlock laptop and finance schemes.
                                </p>
                                <Link to="/apply-scholarshipcard" style={{ background: '#fff', color: DK_GREEN, fontWeight: 700, fontSize: 13, padding: '10px 20px', borderRadius: 9, textDecoration: 'none', display: 'block' }}>
                                    APPLY FOR CARD <i className="fas fa-id-badge ms-1"></i>
                                </Link>
                            </div>

                            {/* Support */}
                            <div style={{ background: '#fff', border: '1px solid #e8f0ea', borderRadius: 14, padding: '18px 20px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                                <i className="fas fa-headset mb-2" style={{ color: DK_GREEN, fontSize: 22 }}></i>
                                <h6 style={{ fontWeight: 700, color: '#1e293b', marginBottom: 6, fontSize: 14 }}>Student Support Helpdesk</h6>
                                <p style={{ color: '#64748b', marginBottom: 0, fontWeight: 700 }}>+92 300 1234567</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CandidateDashboard;
