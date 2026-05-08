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
            // Safely extract user data based on known context
            const data = user?.user?.data?.user || user?.user || user;
            setUserData(data);
        }
    }, [user]);

    if (!userData) return <div className="loading-screen">Loading Profile...</div>;

    const rollNumber = userData.rollNumber || `DK-${userData._id?.substring(0, 6).toUpperCase()}`;
    const testPassed = userData.testPassed;
    const testScore = userData.testScore || 0;
    const totalMcqs = 20; 
    const correctAnswers = Math.round((testScore / 100) * totalMcqs);
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
        <div className="compact-dashboard">
            {/* Minimal Header */}
            <header className="dashboard-header-simple">
                <div className="header-brand">
                    <img src={Logo} alt="Logo" className="mini-logo" />
                    <div className="brand-info">
                        <h1>CANDIDATE PORTAL</h1>
                        <p>Institutional Dashboard</p>
                    </div>
                </div>
                <div className="header-actions">
                    <div className="user-pill">
                        <i className="fas fa-user-circle"></i>
                        <span>{userData.fullName}</span>
                    </div>
                    <button onClick={logout} className="logout-minimal">
                        <i className="fas fa-sign-out-alt"></i>
                    </button>
                </div>
            </header>

            <main className="dashboard-content-simple">
                <div className="dashboard-grid-unified">
                    
                    {/* LEFT COLUMN: RESULT & ENROLLMENT */}
                    <div className="main-column">
                        {testPassed ? (
                            <div className="unified-achievement-card animate-in">
                                <div className="achievement-flex">
                                    <div className="gif-area">
                                        <img src={GIF} alt="Success" className="success-gif-mini" />
                                    </div>
                                    <div className="achievement-text">
                                        <span className="status-badge-elite">OFFICIAL STATUS: QUALIFIED</span>
                                        <h2>Congratulations, You've Passed!</h2>
                                        <p>
                                            You have successfully cleared the admission test with a score of <strong>{percentage}</strong>. 
                                            Your seat is officially reserved.
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="enrollment-status-box">
                                    <h3><i className="fas fa-graduation-cap me-2"></i> Academic Enrollment</h3>
                                    {hasCourses ? (
                                        <div className="enrolled-courses-list">
                                            {allCourses.map((course, idx) => (
                                                <div className="enrolled-program-pill" key={idx}>
                                                    <div className="program-icon">
                                                        <i className={course.type === 'Physical' ? 'fas fa-school' : 'fas fa-laptop-code'}></i>
                                                    </div>
                                                    <div className="program-details">
                                                        <h4>{course.name}</h4>
                                                        <p>Session: {course.session} &nbsp;|&nbsp; ID: {rollNumber} &nbsp;|&nbsp; <span style={{color: '#c9a227', fontWeight: 700}}>{course.type}</span></p>
                                                    </div>
                                                    <span className="badge-confirmed">CONFIRMED</span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="no-courses-notice">
                                            <i className="fas fa-info-circle"></i>
                                            <span>No courses enrolled yet. Please complete registration to see your enrolled courses.</span>
                                        </div>
                                    )}
                                </div>

                                <div className="next-steps-compact">
                                    <div className="info-tip-simple">
                                        <i className="fas fa-info-circle"></i>
                                        <span>Please visit the Scholarship Portal to fulfill the processing fee and lock your seat.</span>
                                    </div>
                                    <Link to="/apply-scholarshipcard" className="btn-action-primary">
                                        Go to Scholarship Portal <i className="fas fa-arrow-right ms-2"></i>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="unified-pending-card">
                                <div className="pending-icon"><i className="fas fa-lock"></i></div>
                                <h2>Evaluation Required</h2>
                                <p>Complete your admission test to unlock your results and course enrollments.</p>
                                <Link to="/admission-test" className="btn-action-dark">
                                    Start Admission Test <i className="fas fa-pen-nib ms-2"></i>
                                </Link>
                            </div>
                        )}

                        {/* RESULT TRANSCRIPT (COMPACT) */}
                        {testPassed && (
                            <div className="compact-transcript-card mt-3">
                                <div className="card-header-simple">
                                    <h3><i className="fas fa-file-invoice me-2"></i> Official Transcript</h3>
                                </div>
                                <div className="transcript-mini-grid">
                                    <div className="t-row"><span>Roll Number:</span> <strong>{rollNumber}</strong></div>
                                    <div className="t-row"><span>Test Score:</span> <strong>{percentage}</strong></div>
                                    <div className="t-row"><span>Correct MCQs:</span> <strong>{correctAnswers}/{totalMcqs}</strong></div>
                                    <div className="t-row"><span>Result Date:</span> <strong>{new Date().toLocaleDateString()}</strong></div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: PROFILE INFO */}
                    <div className="side-column">
                        <div className="compact-profile-card">
                            <div className="card-header-simple">
                                <h3><i className="fas fa-id-card me-2"></i> Candidate Profile</h3>
                            </div>
                            <div className="profile-data-list">
                                <div className="data-item">
                                    <label>Full Name</label>
                                    <span>{userData.fullName}</span>
                                </div>
                                <div className="data-item">
                                    <label>Father Name</label>
                                    <span>{userData.fatherName || 'N/A'}</span>
                                </div>
                                <div className="data-item">
                                    <label>CNIC Number</label>
                                    <span>{userData.cnic}</span>
                                </div>
                                <div className="data-item">
                                    <label>Mobile Number</label>
                                    <span>{userData.mobile}</span>
                                </div>
                                <div className="data-item">
                                    <label>Selection Status</label>
                                    <span className={testPassed ? 'status-qualified' : 'text-muted'}>
                                        {testPassed ? 'OFFICIALLY QUALIFIED' : 'PENDING EVALUATION'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="help-card-mini mt-3">
                            <i className="fas fa-headset"></i>
                            <p>Need assistance? Contact our helpline.</p>
                            <small>+92 300 1234567</small>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default CandidateDashboard;
