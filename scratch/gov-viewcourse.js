const fs = require('fs');
const path = 'd:/Desktop/digikhyber/src/pages/ViewCourse.jsx';
let content = fs.readFileSync(path, 'utf8');

// Ensure Logo is imported
if (!content.includes('import Logo from "../assets/logo-white.png";')) {
  content = content.replace(
    'import image from "../assets/ML.jpg";',
    'import image from "../assets/ML.jpg";\nimport Logo from "../assets/logo-white.png";'
  );
}

// Find return block
const returnIndex = content.indexOf('  return (');
const exportIndex = content.lastIndexOf('};');

const topPart = content.substring(0, returnIndex);
const bottomPart = '\n' + content.substring(exportIndex);

const newReturn = `  return (
    <div style={{ backgroundColor: "#f8faf9", minHeight: "100vh", paddingBottom: "80px", paddingTop: "40px", fontFamily: "'Inter', 'Poppins', sans-serif" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-11 col-xl-10">
            
            {/* Official Government Look Card */}
            <div className="card shadow border-0 overflow-hidden" style={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              
              {/* Header Banner */}
              <div className="card-header border-0 text-center py-4 position-relative" style={{ backgroundColor: "#0B5D3B", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "4px", backgroundColor: "#C9A227" }}></div>
                <img src={Logo} alt="Government Logo" style={{ width: "140px", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" }} className="mb-3 mt-2" />
                <h1 className="h4 fw-bold mb-1 text-white" style={{ letterSpacing: "1px", textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>{courseName.toUpperCase()}</h1>
                <p className="mb-0 text-white" style={{ fontWeight: "normal", fontSize: "0.95rem" }}>Digikhyber Initiative - Government of Punjab</p>
              </div>

              <div className="card-body p-4 p-md-5 bg-white">
                
                {/* Official Quick Stats */}
                <div className="alert border-start border-4 mb-5" style={{ backgroundColor: "#f0f8f4", borderLeftColor: "#0B5D3B !important", border: "1px solid #e0ede6" }}>
                  <div className="row text-center text-md-start">
                    <div className="col-md-4 mb-2 mb-md-0 border-md-end border-success">
                      <p className="mb-0 text-muted small fw-bold text-uppercase">Class Format</p>
                      <p className="mb-0 fw-bold" style={{ color: "#0B5D3B" }}><i className="fas fa-laptop me-2"></i>Recorded Lectures</p>
                    </div>
                    <div className="col-md-4 mb-2 mb-md-0 border-md-end border-success">
                      <p className="mb-0 text-muted small fw-bold text-uppercase">Course Duration</p>
                      <p className="mb-0 fw-bold" style={{ color: "#0B5D3B" }}><i className="fas fa-clock me-2"></i>3 Months</p>
                    </div>
                    <div className="col-md-4">
                      <p className="mb-0 text-muted small fw-bold text-uppercase">Skill Level</p>
                      <p className="mb-0 fw-bold" style={{ color: "#0B5D3B" }}><i className="fas fa-graduation-cap me-2"></i>Beginner to Advanced</p>
                    </div>
                  </div>
                </div>

                <div className="row g-5">
                  {/* Left Column: Course Details */}
                  <div className="col-lg-7 border-end-lg">
                    <div className="mb-4">
                      <h5 className="fw-bold mb-3 border-bottom pb-2" style={{ color: "#1a1e1d", borderColor: "#e2e8f0 !important" }}>
                        <span style={{ color: "#0B5D3B" }}>01.</span> Course Description
                      </h5>
                      <p style={{ lineHeight: "1.8", color: "#3c4852", fontSize: "0.95rem", textAlign: "justify" }}>
                        {courseContent.aboutCourse}
                      </p>
                    </div>

                    <div className="mb-4">
                      <h5 className="fw-bold mb-3 border-bottom pb-2" style={{ color: "#1a1e1d", borderColor: "#e2e8f0 !important" }}>
                        <span style={{ color: "#0B5D3B" }}>02.</span> Eligibility Criteria
                      </h5>
                      <ul className="list-unstyled" style={{ fontSize: "0.95rem", color: "#3c4852" }}>
                        {courseContent.whoCanJoin.map((item, index) => (
                          <li key={index} className="mb-2 d-flex">
                            <i className="fas fa-check-circle mt-1 me-2" style={{ color: "#0B5D3B" }}></i>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="p-3 mt-3 rounded" style={{ backgroundColor: "#f9fafb", border: "1px solid #e2e8f0", borderLeft: "3px solid #C9A227" }}>
                        <p className="mb-0 small text-dark"><i className="fas fa-info-circle me-1" style={{ color: "#C9A227" }}></i> <strong>No previous experience is required.</strong> This course takes you from beginner level to advanced level, step by step.</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h5 className="fw-bold mb-3 border-bottom pb-2" style={{ color: "#1a1e1d", borderColor: "#e2e8f0 !important" }}>
                        <span style={{ color: "#0B5D3B" }}>03.</span> Learning Outcomes
                      </h5>
                      <div className="row">
                        {courseContent.whatWillYouLearn.map((item, index) => (
                          <div className="col-sm-6 mb-3" key={index}>
                            <div className="d-flex p-3 h-100 rounded" style={{ backgroundColor: "#f8faf9", border: "1px solid #e2e8f0" }}>
                              <div className="me-2 fw-bold" style={{ color: "#0B5D3B" }}>{(index + 1).toString().padStart(2, '0')}.</div>
                              <span style={{ fontSize: "0.9rem", color: "#3c4852" }}>{item}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <h5 className="fw-bold mb-3 border-bottom pb-2" style={{ color: "#1a1e1d", borderColor: "#e2e8f0 !important" }}>
                          <span style={{ color: "#0B5D3B" }}>04.</span> Requirements
                        </h5>
                        <ul className="list-unstyled mb-0" style={{ fontSize: "0.9rem", color: "#3c4852" }}>
                          {courseContent.requirements.map((item, index) => (
                            <li key={index} className="mb-2 d-flex align-items-start">
                              <i className="fas fa-caret-right mt-1 me-2" style={{ color: "#C9A227" }}></i>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-md-6 mb-4">
                        <h5 className="fw-bold mb-3 border-bottom pb-2" style={{ color: "#1a1e1d", borderColor: "#e2e8f0 !important" }}>
                          <span style={{ color: "#0B5D3B" }}>05.</span> Material Includes
                        </h5>
                        <ul className="list-unstyled mb-0" style={{ fontSize: "0.9rem", color: "#3c4852" }}>
                          {courseContent.materialIncludes.map((item, index) => (
                            <li key={index} className="mb-2 d-flex align-items-start">
                              <i className="fas fa-caret-right mt-1 me-2" style={{ color: "#C9A227" }}></i>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Registration & Official Info */}
                  <div className="col-lg-5">
                    
                    {/* Course Image & Register Button */}
                    <div className="card border-0 mb-4 bg-transparent">
                      <div className="position-relative mb-4">
                        <img
                          className="w-100 rounded shadow-sm border"
                          src={courseContent.image}
                          alt={courseName}
                          style={{ borderColor: "#e2e8f0" }}
                        />
                      </div>
                      
                      <button 
                        onClick={handleRegisterClick}
                        className="btn w-100 fw-bold text-white py-3 shadow-sm mb-3 text-uppercase"
                        disabled={isButtonDisabled()}
                        style={{ 
                          backgroundColor: getButtonText() === "Login to Register" ? "#C9A227" : (userCourses.includes(courseName) ? "#10b981" : "#0B5D3B"),
                          border: "none", 
                          borderRadius: "8px", 
                          letterSpacing: "1px", 
                          fontSize: "0.95rem",
                          transition: "all 0.3s ease"
                        }}
                        onMouseOver={(e) => {
                          if (!isButtonDisabled()) {
                            e.currentTarget.style.backgroundColor = getButtonText() === "Login to Register" ? "#b59123" : "#094a2f";
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow = "0 6px 12px rgba(11, 93, 59, 0.2)";
                          }
                        }}
                        onMouseOut={(e) => {
                          if (!isButtonDisabled()) {
                            e.currentTarget.style.backgroundColor = getButtonText() === "Login to Register" ? "#C9A227" : "#0B5D3B";
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 .125rem .25rem rgba(0,0,0,.075)";
                          }
                        }}
                      >
                        <i className={getButtonText() === "Login to Register" ? "fas fa-sign-in-alt me-2" : "fas fa-check-circle me-2"}></i> 
                        {getButtonText()}
                      </button>

                      {isButtonDisabled() && isAuthenticated() && userCourses.length >= 2 && !userCourses.includes(courseName) && (
                        <div className="alert alert-danger py-2 text-center small fw-bold mb-0">
                          Maximum 2 courses limit reached.
                        </div>
                      )}
                    </div>

                    {/* Official Benefits Table */}
                    <h6 className="fw-bold mb-3 text-uppercase" style={{ color: "#64748b", letterSpacing: "1px", fontSize: "0.85rem" }}>Official Course Benefits</h6>
                    <div className="border rounded" style={{ borderColor: "#e2e8f0" }}>
                      <table className="table table-borderless mb-0" style={{ fontSize: "0.9rem" }}>
                        <tbody>
                          <tr className="border-bottom" style={{ borderColor: "#e2e8f0" }}>
                            <td className="py-3 px-3 text-muted"><i className="fas fa-certificate me-2" style={{ color: "#0B5D3B" }}></i> Completion Certificate</td>
                            <td className="py-3 px-3 fw-bold text-end text-dark">Included</td>
                          </tr>
                          <tr className="border-bottom" style={{ borderColor: "#e2e8f0" }}>
                            <td className="py-3 px-3 text-muted"><i className="fas fa-chart-line me-2" style={{ color: "#0B5D3B" }}></i> Training Evaluation</td>
                            <td className="py-3 px-3 fw-bold text-end text-dark">Included</td>
                          </tr>
                          <tr className="border-bottom" style={{ borderColor: "#e2e8f0" }}>
                            <td className="py-3 px-3 text-muted"><i className="fas fa-language me-2" style={{ color: "#0B5D3B" }}></i> Medium of Instruction</td>
                            <td className="py-3 px-3 fw-bold text-end text-dark">Urdu / English</td>
                          </tr>
                          <tr className="border-bottom" style={{ borderColor: "#e2e8f0" }}>
                            <td className="py-3 px-3 text-muted"><i className="fas fa-wallet me-2" style={{ color: "#0B5D3B" }}></i> Course Fee</td>
                            <td className="py-3 px-3 fw-bold text-end" style={{ color: "#0B5D3B" }}>Free of Cost</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-3 text-muted"><i className="fas fa-id-card me-2" style={{ color: "#0B5D3B" }}></i> Scholarship Card Eligible</td>
                            <td className="py-3 px-3 fw-bold text-end text-success">Yes</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              </div>

              {/* Footer Banner */}
              <div className="card-footer text-center py-3 border-0" style={{ backgroundColor: "#f8faf9" }}>
                <p className="mb-0 small text-muted"><i className="fas fa-shield-alt me-1 text-success"></i> Secure Official Portal &copy; {new Date().getFullYear()} Digikhyber</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );`;

fs.writeFileSync(path, topPart + newReturn + bottomPart);
console.log('Success');
