import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './CandidateDashboard.css';
import Logo from '../assets/logo.png';
import GIF from '../assets/approved.gif';

const CandidateDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (user) {
            const data = user?.user?.data?.user || user?.user || user;
            setUserData(data);
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

    const enrolledCourses = userData.courses || [];
    const secondCourses = userData.secondEnrolledCourses || [];
    const physicalCourses = userData.physicalCourses || [];
    const allCourses = [
        ...enrolledCourses.map(c => ({ name: c, type: 'Online', session: 'Spring 2026' })),
        ...secondCourses.map(c => ({ name: c, type: 'Online (2nd)', session: 'Spring 2026' })),
        ...physicalCourses.map(c => ({ name: c, type: 'Physical', session: 'Spring 2026' })),
    ];
    const hasCourses = allCourses.length > 0;

    return (
        <div className="professional-dashboard-page">
            
            {/* 1. Professional Header */}
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
                
                {/* 2. Light Success Banner (Hunarmand Style) */}
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
                    {/* LEFT COLUMN: Academic & Admission */}
                    <div className="col-lg-8">
                        
                        {/* Admission Progress Card */}
                        <div className="portal-card mb-4 shadow-sm">
                            <div className="card-header-bar">
                                <h6 className="mb-0 fw-bold"><i className="fas fa-graduation-cap me-2 text-success"></i> ADMISSION EVALUATION STATUS</h6>
                            </div>
                            <div className="p-4">
                                {testPassed ? (
                                    <div className="d-flex flex-column flex-md-row align-items-center gap-4">
                                        <div className="status-img">
                                            <img src={GIF} alt="Passed" width="70" />
                                        </div>
                                        <div className="text-center text-md-start">
                                            <span className="badge-qualified mb-2">OFFICIALLY QUALIFIED</span>
                                            <h5 className="fw-bold mb-1">Congratulations! You have passed the test.</h5>
                                            <p className="text-muted small mb-3">You scored <strong>{percentage}</strong> in the admission test. Your provisional enrollment is confirmed.</p>
                                            <Link to="/admission-result" className="btn-portal-primary">
                                                VIEW DETAILED RESULT <i className="fas fa-external-link-alt ms-2"></i>
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-3">
                                        <i className="fas fa-lock fa-3x text-muted mb-3"></i>
                                        <h5 className="fw-bold">Test Evaluation Pending</h5>
                                        <p className="text-muted small">Complete your test to unlock your result card.</p>
                                        <Link to="/admission-test" className="btn-portal-dark">Take Test Now</Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Enrolled Courses Card */}
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
                                    <div className="empty-state text-center py-3">
                                        <i className="fas fa-inbox fa-2x text-muted mb-2"></i>
                                        <p className="text-muted small">No courses found in your enrollment history.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Profile & Scholarship */}
                    <div className="col-lg-4">
                        
                        {/* Profile Summary Card */}
                        <div className="portal-card mb-4 shadow-sm">
                            <div className="card-header-bar">
                                <h6 className="mb-0 fw-bold"><i className="fas fa-user-tag me-2 text-success"></i> CANDIDATE PROFILE</h6>
                            </div>
                            <div className="p-4">
                                <div className="profile-row-lite mb-3">
                                    <label>FULL NAME</label>
                                    <span>{userData.fullName}</span>
                                </div>
                                <div className="profile-row-lite mb-3">
                                    <label>FATHER NAME</label>
                                    <span>{userData.fatherName || 'N/A'}</span>
                                </div>
                                <div className="profile-row-lite mb-3">
                                    <label>CNIC NUMBER</label>
                                    <span>{userData.cnic}</span>
                                </div>
                                <div className="profile-row-lite">
                                    <label>MOBILE NUMBER</label>
                                    <span>{userData.mobile}</span>
                                </div>
                            </div>
                        </div>

                        {/* Scholarship Promo Card */}
                        <div className="scholarship-lite-card p-4 rounded-4 shadow-sm text-center mb-4">
                            <h6 className="fw-bold text-white mb-2">SCHOLARSHIP STATUS</h6>
                            <p className="text-white opacity-90 small mb-3">Activate your scholarship card to unlock laptop and finance schemes.</p>
                            <Link to="/apply-scholarshipcard" className="btn btn-light btn-sm w-100 fw-bold py-2" style={{ borderRadius: '8px', color: '#0B5D3B' }}>
                                APPLY FOR CARD <i className="fas fa-id-badge ms-1"></i>
                            </Link>
                        </div>

                        {/* Support Card */}
                        <div className="support-box-lite p-3 border rounded-4 bg-white text-center">
                            <h6 className="fw-bold mb-1 small text-success">Student Support Helpdesk</h6>
                            <p className="text-muted mb-0 fw-bold" style={{ fontSize: '0.9rem' }}>+92 300 1234567</p>
                        </div>
                    </div>
                </div>
            </main>

            <style>{`
                .professional-dashboard-page { background-color: #fcfdfe; min-height: 100vh; font-family: 'Outfit', sans-serif; }
                
                /* Header */
                .portal-top-header { background: #fff; height: 75px; border-bottom: 1px solid #f1f5f9; box-shadow: 0 2px 10px rgba(0,0,0,0.02); }
                .portal-logo { height: 45px; }
                .portal-brand h5 { font-size: 1.05rem; color: #0B5D3B; letter-spacing: 0.5px; }
                .portal-brand p { font-size: 0.65rem; color: #94a3b8; font-weight: 700; }
                .portal-user-pill { background: #f8fafc; padding: 6px 15px; border-radius: 100px; border: 1px solid #e2e8f0; font-size: 0.85rem; font-weight: 700; color: #475569; }
                .portal-logout-btn { background: none; border: none; color: #94a3b8; font-weight: 700; font-size: 0.85rem; transition: all 0.2s; }
                .portal-logout-btn:hover { color: #ef4444; }
                
                /* Alert Banner */
                .portal-status-alert { background: #ecfdf5; border: 1px solid #d1fae5; border-radius: 16px; }
                .portal-roll-box { background: #fff; padding: 12px 20px; border-radius: 12px; border: 1px solid #d1fae5; text-align: center; }
                .portal-roll-box small { display: block; font-size: 0.6rem; color: #94a3b8; font-weight: 800; letter-spacing: 1px; }
                .portal-roll-box strong { font-size: 1.2rem; color: #0B5D3B; }
                
                /* Cards */
                .portal-card { background: #fff; border-radius: 16px; overflow: hidden; border: 1px solid #f1f5f9; }
                .card-header-bar { background: #fcfdfe; padding: 15px 25px; border-bottom: 1px solid #f1f5f9; }
                .card-header-bar h6 { font-size: 0.85rem; color: #0B5D3B; letter-spacing: 0.5px; }
                
                .badge-qualified { background: #0B5D3B; color: #fff; font-size: 0.65rem; font-weight: 800; padding: 4px 12px; border-radius: 100px; display: inline-block; }
                .btn-portal-primary { background: #0B5D3B; color: #fff !important; padding: 10px 20px; border-radius: 8px; font-weight: 700; font-size: 0.85rem; text-decoration: none; display: inline-block; transition: all 0.2s; }
                .btn-portal-primary:hover { background: #084a2f; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(11,93,59,0.2); }
                
                .course-item-lite { background: #fcfdfe; border: 1px solid #f1f5f9; transition: all 0.2s; }
                .course-item-lite:hover { border-color: #0B5D3B; background: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
                
                .profile-row-lite label { display: block; font-size: 0.65rem; color: #94a3b8; font-weight: 800; letter-spacing: 0.5px; margin-bottom: 2px; }
                .profile-row-lite span { font-weight: 700; color: #1e293b; font-size: 1rem; }
                
                .scholarship-lite-card { background: linear-gradient(135deg, #0B5D3B, #15803d); }
                .support-box-lite { border: 1px solid #f1f5f9 !important; }
                
                .animate-in { animation: fadeInUp 0.5s ease-out both; }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .loading-screen-professional { height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #fff; color: #0B5D3B; font-weight: 700; }
            `}</style>
        </div>
    );
};

export default CandidateDashboard;
