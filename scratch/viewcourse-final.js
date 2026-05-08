const fs = require('fs');
const path = 'd:/Desktop/digikhyber/src/pages/ViewCourse.jsx';
let content = fs.readFileSync(path, 'utf8');

const returnIndex = content.indexOf('  return (');
const exportIndex = content.lastIndexOf('};');

const topPart = content.substring(0, returnIndex);
const bottomPart = '\n' + content.substring(exportIndex);

const newReturn = `  return (
    <>
      <PageBanner 
        title={courseName}
        description={courseContent.description}
      >
        <div
          className="bg-white text-black d-flex gap-4 p-2 px-4 w-fitcontent rounded-5"
          style={{ width: "fit-content" }}
        >
          <div>Classes: Recorded</div>
          <div>Duration: 3 Months</div>
          <div>Level: Beginner to Advanced</div>
        </div>
      </PageBanner>

      <div className="container py-5" style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
        <div className="row g-5">
          
          {/* Left Column: Course Details */}
          <div className="col-lg-8">
            <div className="pe-lg-4">
              
              <div className="mb-5">
                <h3 className="fw-bold mb-3 d-flex align-items-center" style={{ color: "#0B5D3B", borderBottom: "2px solid #f1f5f9", paddingBottom: "10px" }}>
                  <FaInfoCircle className="me-2 text-warning" /> Course Details
                </h3>
                <p style={{ lineHeight: "1.8", color: "#475569", fontSize: "1.05rem", textAlign: "justify" }}>
                  {courseContent.aboutCourse}
                </p>
              </div>

              <div className="mb-5">
                <h3 className="fw-bold mb-3 d-flex align-items-center" style={{ color: "#0B5D3B", borderBottom: "2px solid #f1f5f9", paddingBottom: "10px" }}>
                  <FaUsers className="me-2 text-warning" /> Who Can Join This Course?
                </h3>
                <p className="fw-semibold text-dark mb-3">This course is ideal for:</p>
                <div className="row g-3">
                  {courseContent.whoCanJoin.map((item, index) => (
                    <div className="col-md-6" key={index}>
                      <div className="d-flex p-3 rounded" style={{ backgroundColor: "#f8faf9", border: "1px solid #e2e8f0" }}>
                        <FaCheckCircle className="mt-1 me-2 flex-shrink-0" style={{ color: "#0B5D3B" }} />
                        <span style={{ color: "#475569", fontSize: "0.95rem" }}>{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 rounded alert-success border-start border-4 border-success d-flex align-items-center">
                  <p className="mb-0 text-dark">
                    <strong>No previous experience is required.</strong> This course takes you from beginner level to advanced level, step by step.
                  </p>
                </div>
              </div>

              <div className="mb-5">
                <h3 className="fw-bold mb-3 d-flex align-items-center" style={{ color: "#0B5D3B", borderBottom: "2px solid #f1f5f9", paddingBottom: "10px" }}>
                  <FaBookOpen className="me-2 text-warning" /> What Will You Learn?
                </h3>
                <div className="d-flex flex-column gap-2">
                  {courseContent.whatWillYouLearn.map((item, index) => (
                    <div className="d-flex align-items-center p-3 rounded" style={{ backgroundColor: "#ffffff", borderLeft: "3px solid #C9A227", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }} key={index}>
                      <span className="badge rounded-circle p-2 me-3" style={{ backgroundColor: "rgba(11, 93, 59, 0.1)", color: "#0B5D3B" }}>
                        {index + 1}
                      </span>
                      <span className="fw-semibold text-dark">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="row g-4">
                <div className="col-md-6">
                  <div className="p-4 rounded h-100" style={{ backgroundColor: "#f8faf9", border: "1px solid #e2e8f0" }}>
                    <h4 className="fw-bold mb-3 d-flex align-items-center" style={{ color: "#0B5D3B" }}>
                      <FaClipboardList className="me-2 text-warning" /> Requirements
                    </h4>
                    <ul className="list-unstyled mb-0">
                      {courseContent.requirements.map((item, index) => (
                        <li key={index} className="d-flex align-items-start mb-2">
                          <FaCheckCircle className="mt-1 me-2 flex-shrink-0" style={{ color: "#0B5D3B" }} />
                          <span style={{ color: "#475569", fontSize: "0.95rem" }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-4 rounded h-100" style={{ backgroundColor: "#f8faf9", border: "1px solid #e2e8f0" }}>
                    <h4 className="fw-bold mb-3 d-flex align-items-center" style={{ color: "#0B5D3B" }}>
                      <FaBoxOpen className="me-2 text-warning" /> Material Includes
                    </h4>
                    <ul className="list-unstyled mb-0">
                      {courseContent.materialIncludes.map((item, index) => (
                        <li key={index} className="d-flex align-items-start mb-2">
                          <FaCheckCircle className="mt-1 me-2 flex-shrink-0" style={{ color: "#0B5D3B" }} />
                          <span style={{ color: "#475569", fontSize: "0.95rem" }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Registration Card */}
          <div className="col-lg-4">
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden" style={{ border: "1px solid #e2e8f0" }}>
              
              <div className="position-relative">
                <img
                  className="w-100 object-fit-cover"
                  src={courseContent.image}
                  alt={courseName}
                  style={{ height: "240px", borderBottom: "3px solid #C9A227" }}
                />
              </div>

              <div className="card-body p-4">
                <div className="mb-4">
                  <button 
                    onClick={handleRegisterClick}
                    className="btn w-100 fw-bold text-white py-3 shadow-sm text-uppercase"
                    disabled={isButtonDisabled()}
                    style={{ 
                      letterSpacing: "1px", 
                      borderRadius: "8px",
                      transition: "all 0.3s ease",
                      backgroundColor: getButtonText() === "Login to Register" ? "#C9A227" : (userCourses.includes(courseName) ? "#10b981" : "#0B5D3B"),
                      border: "none",
                    }}
                  >
                    <i className={getButtonText() === "Login to Register" ? "fas fa-sign-in-alt me-2" : "fas fa-check-circle me-2"}></i>
                    {getButtonText()}
                  </button>
                  {isButtonDisabled() && isAuthenticated() && userCourses.length >= 2 && !userCourses.includes(courseName) && (
                    <div className="text-center text-danger small mt-2 fw-bold">
                      Maximum 2 courses limit reached.
                    </div>
                  )}
                </div>

                <h5 className="fw-bold mb-3 border-bottom pb-2" style={{ color: "#0B5D3B" }}>Course Benefits</h5>
                
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex justify-content-between align-items-center p-2 rounded" style={{ backgroundColor: "#f8faf9" }}>
                    <div className="d-flex align-items-center text-muted small">
                      <FaCheckCircle className="me-2" style={{ color: "#0B5D3B" }} />
                      <span className="fw-semibold">Certificate</span>
                    </div>
                    <span className="fw-bold text-dark small">Included</span>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center p-2 rounded" style={{ backgroundColor: "#ffffff", border: "1px solid #f1f5f9" }}>
                    <div className="d-flex align-items-center text-muted small">
                      <FaLaptop className="me-2" style={{ color: "#0B5D3B" }} />
                      <span className="fw-semibold">Evaluation</span>
                    </div>
                    <span className="fw-bold text-dark small">Included</span>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center p-2 rounded" style={{ backgroundColor: "#f8faf9" }}>
                    <div className="d-flex align-items-center text-muted small">
                      <FaGlobe className="me-2" style={{ color: "#0B5D3B" }} />
                      <span className="fw-semibold">Language</span>
                    </div>
                    <span className="fw-bold text-dark small">Urdu / English</span>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center p-2 rounded" style={{ backgroundColor: "#ffffff", border: "1px solid #f1f5f9" }}>
                    <div className="d-flex align-items-center text-muted small">
                      <FaConnectdevelop className="me-2" style={{ color: "#0B5D3B" }} />
                      <span className="fw-semibold">Eligibility</span>
                    </div>
                    <span className="fw-bold text-dark small">Everyone</span>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center p-2 rounded" style={{ backgroundColor: "#f8faf9" }}>
                    <div className="d-flex align-items-center text-muted small">
                      <FaCoins className="me-2" style={{ color: "#0B5D3B" }} />
                      <span className="fw-semibold">Fee</span>
                    </div>
                    <span className="badge rounded-pill bg-success">Free</span>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center p-2 rounded" style={{ backgroundColor: "#ffffff", border: "1px solid #f1f5f9" }}>
                    <div className="d-flex align-items-center text-muted small">
                      <IoCardOutline className="me-2" style={{ color: "#0B5D3B" }} />
                      <span className="fw-semibold">Scholarship</span>
                    </div>
                    <span className="fw-bold text-success small">Yes</span>
                  </div>
                </div>

              </div>
            </div>
            
            <div className="card shadow-sm border-0 rounded-4 mt-4" style={{ backgroundColor: "#f0f8f4" }}>
              <div className="card-body p-4 text-center">
                <div className="mb-2" style={{ color: "#0B5D3B" }}>
                  <FaPhoneAlt size={20} />
                </div>
                <h6 className="fw-bold mb-1" style={{ color: "#0B5D3B" }}>Need Help?</h6>
                <p className="text-muted small mb-3" style={{ fontSize: "0.8rem" }}>Contact our support team for course inquiries.</p>
                <a href="mailto:support@digikhyber.com" className="btn btn-sm rounded-pill fw-bold w-100" style={{ border: "1px solid #0B5D3B", color: "#0B5D3B" }}>
                  Contact Us
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );`;

fs.writeFileSync(path, topPart + newReturn + bottomPart);
console.log('Success');
