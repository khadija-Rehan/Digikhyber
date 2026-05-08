const fs = require('fs');
const path = 'd:/Desktop/digikhyber/src/pages/ApplyScholarShipCard.jsx';
let content = fs.readFileSync(path, 'utf8');

const returnIndex = content.indexOf('  return (');
const exportIndex = content.lastIndexOf('};');

if (returnIndex === -1 || exportIndex === -1) {
  console.log("Could not find return block or export statement");
  process.exit(1);
}

const topPart = content.substring(0, returnIndex);
const bottomPart = '\n' + content.substring(exportIndex);

const newReturn = `  return (
    <div className="scholarship-page-wrapper py-5" style={{ backgroundColor: "#f8faf9", minHeight: "100vh", fontFamily: "'Inter', 'Poppins', sans-serif" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-9">
            
            {/* Official Government Look Card */}
            <div className="card shadow border-0 overflow-hidden" style={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              
              {/* Header Banner */}
              <div className="card-header border-0 text-center text-white py-4 position-relative" style={{ backgroundColor: "#0B5D3B", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "4px", backgroundColor: "#C9A227" }}></div>
                <img src={Logo} alt="Government Logo" style={{ width: "140px", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" }} className="mb-3 mt-2" />
                <h1 className="h4 fw-bold mb-1" style={{ letterSpacing: "1px", textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>SCHOLARSHIP CARD APPLICATION FORM</h1>
                <p className="mb-0" style={{ opacity: 0.9, fontWeight: "500", fontSize: "0.95rem" }}>Digikhyber Initiative - Government of Punjab</p>
              </div>

              <div className="card-body p-4 p-md-5 bg-white">
                
                {/* Official Notice */}
                <div className="alert border-start border-4 mb-4" style={{ backgroundColor: "#f0f8f4", borderLeftColor: "#0B5D3B !important", border: "1px solid #e0ede6" }}>
                  <div className="d-flex align-items-start">
                    <div className="me-3 mt-1">
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#0B5D3B", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                        <i className="fas fa-info" style={{ fontSize: "0.9rem" }}></i>
                      </div>
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1" style={{ color: "#0B5D3B" }}>Official Policy Guidelines</h6>
                      <p className="mb-0" style={{ fontSize: "0.9rem", color: "#3c4852", lineHeight: "1.6" }}>
                        To become eligible for the scholarship card (Free Laptop, Solar Scheme, Taleem Finance, Taleem Abroad, Advance Courses), you must be enrolled in one or more programs under Digikhyber. Only students who successfully complete their IT training courses and achieve a minimum of <strong>85% marks</strong> will be eligible for high-value merit-based rewards.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-5 pb-4 border-bottom">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-bold text-uppercase text-muted" style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>Application Progress</span>
                    <span className="fw-bold" style={{ color: "#0B5D3B", fontSize: "0.85rem" }}>{getFormProgress()}% Complete</span>
                  </div>
                  <div className="progress" style={{ height: "6px", borderRadius: "10px", backgroundColor: "#edf2f0" }}>
                    <div 
                      className="progress-bar" 
                      role="progressbar" 
                      style={{ width: \`\${getFormProgress()}%\`, backgroundColor: "#0B5D3B", borderRadius: "10px", transition: "width 0.4s ease" }}
                      aria-valuenow={getFormProgress()}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="needs-validation">
                  
                  {/* Section 1: Personal Details */}
                  <h5 className="fw-bold mb-4" style={{ color: "#1a1e1d", fontSize: "1.1rem" }}>
                    <span className="me-2" style={{ color: "#0B5D3B" }}>01.</span> Personal Information
                  </h5>
                  
                  <div className="row gx-4 mb-2">
                    <div className="col-md-12 mb-4">
                      <label htmlFor="fullName" className="form-label fw-bold text-dark" style={{ fontSize: "0.9rem" }}>Full Name <span className="text-danger">*</span></label>
                      <input
                        className={\`form-control p-3 \${errors.fullName ? "is-invalid" : formData.fullName.trim() && !errors.fullName ? "is-valid" : ""}\`}
                        style={{ backgroundColor: "#f8faf9", border: "1px solid #d1d9d6" }}
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter full name exactly as per CNIC/B-Form"
                        maxLength={100}
                        required
                      />
                      {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                    </div>

                    <div className="col-md-6 mb-4">
                      <label htmlFor="cnic" className="form-label fw-bold text-dark" style={{ fontSize: "0.9rem" }}>CNIC / B-Form No <span className="text-danger">*</span></label>
                      <input
                        className={\`form-control p-3 \${errors.cnic ? "is-invalid" : formData.cnic.trim() && validateCNIC(formData.cnic) ? "is-valid" : ""}\`}
                        style={{ backgroundColor: "#f8faf9", border: "1px solid #d1d9d6" }}
                        type="text"
                        name="cnic"
                        value={formData.cnic}
                        onChange={handleChange}
                        placeholder="e.g. 3550112345671"
                        maxLength={13}
                        required
                      />
                      {errors.cnic && <div className="invalid-feedback">{errors.cnic}</div>}
                    </div>

                    <div className="col-md-6 mb-4">
                      <label htmlFor="rollNumber" className="form-label fw-bold text-dark" style={{ fontSize: "0.9rem" }}>Roll Number</label>
                      <input
                        className="form-control p-3"
                        style={{ backgroundColor: "#f8faf9", border: "1px solid #d1d9d6" }}
                        type="text"
                        name="rollNumber"
                        value={formData.rollNumber}
                        onChange={handleChange}
                        placeholder="Enter your roll number"
                        maxLength={20}
                      />
                    </div>
                  </div>

                  {/* Section 2: Contact Details */}
                  <h5 className="fw-bold mb-4 mt-2" style={{ color: "#1a1e1d", fontSize: "1.1rem" }}>
                    <span className="me-2" style={{ color: "#0B5D3B" }}>02.</span> Contact Details
                  </h5>

                  <div className="row gx-4 mb-2">
                    <div className="col-md-6 mb-4">
                      <label htmlFor="email" className="form-label fw-bold text-dark" style={{ fontSize: "0.9rem" }}>Email Address <span className="text-danger">*</span></label>
                      <input
                        className={\`form-control p-3 \${errors.email ? "is-invalid" : formData.email.trim() && validateEmail(formData.email) ? "is-valid" : ""}\`}
                        style={{ backgroundColor: "#f8faf9", border: "1px solid #d1d9d6" }}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter active email address"
                        maxLength={254}
                        required
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    <div className="col-md-6 mb-4">
                      <label htmlFor="mobileNumber" className="form-label fw-bold text-dark" style={{ fontSize: "0.9rem" }}>Mobile Number <span className="text-danger">*</span></label>
                      <input
                        className={\`form-control p-3 \${errors.mobileNumber ? "is-invalid" : formData.mobileNumber.trim() && validateMobile(formData.mobileNumber) ? "is-valid" : ""}\`}
                        style={{ backgroundColor: "#f8faf9", border: "1px solid #d1d9d6" }}
                        type="text"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        placeholder="e.g. 03001234567"
                        maxLength={12}
                        required
                      />
                      {errors.mobileNumber && <div className="invalid-feedback">{errors.mobileNumber}</div>}
                    </div>
                  </div>

                  {/* Section 3: Course Details */}
                  <h5 className="fw-bold mb-4 mt-2" style={{ color: "#1a1e1d", fontSize: "1.1rem" }}>
                    <span className="me-2" style={{ color: "#0B5D3B" }}>03.</span> Enrollment Details
                  </h5>

                  <div className="row gx-4 mb-2">
                    <div className="col-md-6 mb-4">
                      <label htmlFor="firstCourse" className="form-label fw-bold text-dark" style={{ fontSize: "0.9rem" }}>Primary Course <span className="text-danger">*</span></label>
                      <select
                        className={\`form-select p-3 \${errors.firstCourse ? "is-invalid" : formData.firstCourse.trim() && !errors.firstCourse ? "is-valid" : ""}\`}
                        style={{ backgroundColor: "#f8faf9", border: "1px solid #d1d9d6", cursor: "pointer" }}
                        name="firstCourse"
                        value={formData.firstCourse}
                        onChange={handleChange}
                        required
                      >
                        <option value="">-- Select Course --</option>
                        {availableCourses.map((course, index) => (
                          <option key={index} value={course.name}>{course.name}</option>
                        ))}
                      </select>
                      {errors.firstCourse && <div className="invalid-feedback">{errors.firstCourse}</div>}
                    </div>

                    <div className="col-md-6 mb-4">
                      <label htmlFor="secondCourse" className="form-label fw-bold text-dark" style={{ fontSize: "0.9rem" }}>Secondary Course <span className="fw-normal text-muted">(Optional)</span></label>
                      <select
                        className={\`form-select p-3 \${errors.secondCourse ? "is-invalid" : formData.secondCourse.trim() && !errors.secondCourse ? "is-valid" : ""}\`}
                        style={{ backgroundColor: "#f8faf9", border: "1px solid #d1d9d6", cursor: "pointer" }}
                        name="secondCourse"
                        value={formData.secondCourse}
                        onChange={handleChange}
                      >
                        <option value="">-- Select Course (Optional) --</option>
                        {availableCourses.map((course, index) => (
                          <option key={index} value={course.name}>{course.name}</option>
                        ))}
                      </select>
                      {errors.secondCourse && <div className="invalid-feedback">{errors.secondCourse}</div>}
                    </div>
                  </div>

                  {/* Section 4: Payment Verification */}
                  <h5 className="fw-bold mb-4 mt-2" style={{ color: "#1a1e1d", fontSize: "1.1rem" }}>
                    <span className="me-2" style={{ color: "#0B5D3B" }}>04.</span> Payment Verification
                  </h5>

                  <div className="row gx-4 mb-2">
                    <div className="col-md-6 mb-4">
                      <label htmlFor="challanNumber" className="form-label fw-bold text-dark" style={{ fontSize: "0.9rem" }}>Paid Bank Challan No <span className="text-danger">*</span></label>
                      <input
                        className={\`form-control p-3 \${errors.challanNumber ? "is-invalid" : formData.challanNumber.trim() && formData.challanNumber.trim().length >= 3 ? "is-valid" : ""}\`}
                        style={{ backgroundColor: "#f8faf9", border: "1px solid #d1d9d6" }}
                        type="text"
                        name="challanNumber"
                        value={formData.challanNumber}
                        onChange={handleChange}
                        placeholder="Enter challan number"
                        maxLength={50}
                        required
                      />
                      {errors.challanNumber && <div className="invalid-feedback">{errors.challanNumber}</div>}
                    </div>

                    <div className="col-md-6 mb-4">
                      <label htmlFor="image" className="form-label fw-bold text-dark" style={{ fontSize: "0.9rem" }}>Upload Paid Challan <span className="text-danger">*</span></label>
                      <input
                        className={\`form-control p-3 \${errors.image ? "is-invalid" : formData.image && !errors.image ? "is-valid" : ""}\`}
                        style={{ backgroundColor: "#f8faf9", border: "1px solid #d1d9d6" }}
                        type="file"
                        name="image"
                        onChange={handleChange}
                        accept=".jpg,.jpeg,.png,.pdf"
                        required
                      />
                      {errors.image && <div className="invalid-feedback">{errors.image}</div>}
                      <div className="form-text mt-2"><i className="fas fa-info-circle me-1"></i>Accepted formats: JPG, PNG, PDF (Max: 20MB)</div>
                    </div>
                  </div>

                  {/* Declaration & Submission */}
                  <div className="mt-4 p-4 rounded" style={{ backgroundColor: "#f9fafb", border: "1px solid #e2e8f0" }}>
                    <div className="form-check mb-4">
                      <input
                        className={\`form-check-input \${errors.termsAccepted ? "is-invalid" : formData.termsAccepted ? "is-valid" : ""}\`}
                        style={{ width: "1.2rem", height: "1.2rem", marginTop: "0.15rem", cursor: "pointer" }}
                        type="checkbox"
                        id="termsAccepted"
                        name="termsAccepted"
                        checked={formData.termsAccepted || false}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-check-label ms-2" htmlFor="termsAccepted" style={{ fontSize: "0.9rem", color: "#3c4852", lineHeight: "1.6" }}>
                        I solemnly declare that the information provided is correct to the best of my knowledge. I have read and agree to the <span className="fw-bold" style={{ color: "#0B5D3B" }}>Terms & Conditions</span> of the Digikhyber Scholarship Card program. <span className="text-danger">*</span>
                      </label>
                      {errors.termsAccepted && <div className="invalid-feedback d-block mt-2">You must accept the terms and conditions to proceed.</div>}
                    </div>

                    <div className="row g-3">
                      <div className="col-md-8">
                        <button
                          type="submit"
                          className="btn w-100 fw-bold text-white py-3 shadow-sm"
                          style={{ backgroundColor: "#0B5D3B", border: "none", borderRadius: "8px", letterSpacing: "1px", textTransform: "uppercase", fontSize: "0.95rem" }}
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Processing...
                            </>
                          ) : (
                            <><i className="fas fa-paper-plane me-2"></i> Submit Application</>
                          )}
                        </button>
                      </div>
                      <div className="col-md-4">
                        <button
                          type="button"
                          className="btn w-100 fw-bold py-3 text-uppercase"
                          style={{ backgroundColor: "transparent", border: "2px solid #e2e8f0", borderRadius: "8px", color: "#64748b", letterSpacing: "0.5px", fontSize: "0.95rem" }}
                          onClick={resetForm}
                          disabled={loading}
                        >
                          Reset Form
                        </button>
                      </div>
                    </div>
                  </div>

                </form>
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
console.log("Success");
