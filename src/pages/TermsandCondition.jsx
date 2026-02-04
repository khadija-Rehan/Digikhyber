import React, { useState } from "react";

const TermsandCondition = () => {
  const [showDisclaimerModal, setShowDisclaimerModal] = useState(false);

  const openDisclaimerModal = () => {
    setShowDisclaimerModal(true);
  };

  const closeDisclaimerModal = () => {
    setShowDisclaimerModal(false);
  };

  return (
    <>
      <div className="container terms my-5">
        <h1 className="mb-4 text-black text-center">Terms and Conditions</h1>
        <p>
          Welcome to <strong>www.hunarmandpunjab.org.pk</strong>, the official
          website for Hunarmand Punjab. These Terms and Conditions govern your
          access to and use of this website. By accessing or using this website,
          you agree to be bound by these Terms.
        </p>

        <h5 className="mt-4 text-black">1. Program Overview</h5>
        <p>
          Hunarmand Punjab empowers youth with skills, training opportunities,
          job assistance, and other services.
        </p>

        <h5 className="mt-4 text-black">2. Eligibility and Registration</h5>
        <p>
          Users must meet eligibility criteria. Registration is required for
          some services. You're responsible for keeping your account info
          secure.
        </p>

        <h5 className="mt-4 text-black">3. Changes to Terms</h5>
        <p>
          Terms may be updated without notice. Continued use implies acceptance
          of changes.
        </p>

        <h5 className="mt-4 text-black">4. Services and Content</h5>
        <p>
          Content is protected. No copying or reproduction allowed without
          permission.
        </p>

        <h5 className="mt-4 text-black">5. Payment and Fees</h5>
        <p>
          Some services may require a fee. Details and refund policies will be
          listed with the respective programs.
        </p>

        <h5 className="mt-4 text-black">6. User Conduct</h5>
        <ul>
          <li>No malware distribution</li>
          <li>No fraudulent activity</li>
          <li>No harassment or discrimination</li>
        </ul>

        <h5 className="mt-4 text-black">7. Privacy and Data Protection</h5>
        <p>Your data is protected under our Privacy Policy.</p>

        <h5 className="mt-4 text-black">8. Third-Party Links</h5>
        <p>
          We are not responsible for external websites linked from our site.
        </p>

        <h5 className="mt-4 text-black">9. Disclaimers</h5>
        <p>
          We strive for accuracy but do not guarantee website functionality or
          content reliability. For more information, please read our{" "}
          <button
            onClick={openDisclaimerModal}
            className="text-primary fw-bold text-decoration-underline text-black border-0 bg-transparent"
            style={{ cursor: "pointer" }}
          >
            disclaimer
          </button>{" "}
          section below.
        </p>

        <h5 className="mt-4 text-black">10. Limitation of Liability</h5>
        <p>
          Hunarmand Punjab is not liable for any indirect or consequential
          damages.
        </p>

        <h5 className="mt-4 text-black">11. Intellectual Property</h5>
        <p>
          All logos, content, and materials are property of Hunarmand Punjab.
        </p>

        <h5 className="mt-4 text-black">12. Termination</h5>
        <p>We may suspend or terminate access for violations of these terms.</p>

        <h5 className="mt-4 text-black">13. Governing Law</h5>
        <p>These terms are governed by the laws of Pakistan.</p>

        <h5 className="mt-4 text-black">14. Contact Information</h5>
        <ul>
          <li>Email: support@hunarmandpunjab.org.pk</li>
          <li>UAN: 03-111-133-053 </li>
          {/* <li>Address: E-Library, Lahore</li> */}
          <li>
            {/* Head Office: Sabzazar, Lahore
            <br /> 
            Test Venue: E-Library, Lahore */}
            Test Venue: Punjab University, Lahore
          </li>
        </ul>

        <h1 className="mb-4 text-black">Privacy Policy</h1>

        <p>
          This Privacy Policy explains how Hunarmand Punjab collects, uses, and
          protects your data.
        </p>

        <h5 className="mt-4 text-black">1. Information We Collect</h5>
        <p>
          <strong>A. Personal Info:</strong> Name, email, phone, address, etc.
          <br />
          <strong>B. Non-Personal Info:</strong> IP, browser, device info, etc.
        </p>

        <h5 className="mt-4 text-black">2. How We Use Your Information</h5>
        <p>
          To provide services, communicate updates, process applications, and
          improve experiences.
        </p>

        <h5 className="mt-4 text-black">3. How We Protect Your Information</h5>
        <p>We use encryption and security practices to protect your data.</p>

        <h5 className="mt-4 text-black">4. Sharing Your Information</h5>
        <p>
          We do not sell your data. We may share it with trusted service
          providers or under legal obligations.
        </p>

        <h5 className="mt-4 text-black">5. Cookies and Tracking</h5>
        <p>
          We use cookies for performance and personalization. You can disable
          them in your browser.
        </p>

        <h5 className="mt-4 text-black">6. Third-Party Links</h5>
        <p>
          We are not responsible for the privacy practices of external websites.
        </p>

        <h5 className="mt-4 text-black">7. Your Rights and Choices</h5>
        <ul>
          <li>Update your info</li>
          <li>Opt-out of communications</li>
          <li>Request deletion of your data</li>
        </ul>

        <h5 className="mt-4 text-black">8. Data Retention</h5>
        <p>
          We retain data only as long as necessary for program and legal
          purposes.
        </p>

        <h5 className="mt-4 text-black">9. Children's Privacy</h5>
        <p>
          We do not knowingly collect data from individuals under 18 years old.
        </p>

        <h5 className="mt-4 text-black">10. Changes to This Policy</h5>
        <p>
          We may update this policy periodically. Continued use implies
          acceptance.
        </p>

        <h5 className="mt-4 text-black">11. Contact Us</h5>
        <ul>
          <li>Email: support@</li>
          <li>UAN: 03-111-133-053 </li>
          {/* <li>Address: E-Library, Lahore</li> */}
          <li>
            {/* Head Office: Sabzazar, Lahore
            <br />
            Test Venue: E-Library, Lahore */}
            Test Venue: Punjab University, Lahore
          </li>
        </ul>

        <p className="mt-4">
          <strong>
            By using this website, you agree to our Terms and Privacy Policy.
          </strong>
        </p>
      </div>

      {/* Disclaimer Modal */}
      {showDisclaimerModal && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10000,
            padding: "20px",
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "white",
              borderRadius: "15px",
              maxWidth: "700px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
              animation: "modalSlideIn 0.3s ease-out",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                background: "#079560",
                color: "white",
                padding: "20px 25px",
                borderRadius: "15px 15px 0 0",
                position: "relative",
              }}
            >
              <div>
                <h3
                  style={{
                    margin: "0",
                    fontSize: "1.3rem",
                    fontWeight: "600",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Official Disclaimer & Endorsement Note
                </h3>
                <p
                  style={{
                    margin: "5px 0 0 0",
                    opacity: "0.9",
                    fontSize: "0.9rem",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Hunarmand Punjab Program
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={closeDisclaimerModal}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "25px",
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  color: "white",
                  fontSize: "18px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.3)";
                  e.target.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.2)";
                  e.target.style.transform = "scale(1)";
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div
              style={{
                padding: "25px",
                fontFamily: "Poppins, sans-serif",
                lineHeight: "1.6",
              }}
            >
              <p
                style={{
                  marginBottom: "15px",
                  fontSize: "14px",
                  color: "#1a1e1d",
                }}
              >
                Hunarmand Punjab is a private initiative launched to empower
                students through high-quality IT training and career-oriented
                skill development. While it is not a government-run program, it
                has received full moral and advisory support from the Ministry
                of School Education and Higher Education, under the guidance of
                Mr. Rana Sikandar Hayat (Minister for School and Higher
                Education, Punjab).
              </p>

              <p
                style={{
                  marginBottom: "15px",
                  fontSize: "14px",
                  color: "#1a1e1d",
                }}
              >
                All training programs, course structures, and the concept of the
                Merit-Based Scholarship Card have been reviewed, acknowledged,
                and encouraged by the Minister himself. The Scholarship Card,
                along with associated merit-based rewards such as laptops, solar
                panels, and e-bikes, has also been formally approved by the
                Minister in principle.
              </p>

              <p
                style={{
                  marginBottom: "10px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#1a1e1d",
                }}
              >
                However, it is important to clarify that:
              </p>

              <ul style={{ marginBottom: "15px", paddingLeft: "20px" }}>
                <li
                  style={{
                    marginBottom: "8px",
                    fontSize: "14px",
                    color: "#1a1e1d",
                  }}
                >
                  Hunarmand Punjab is not directly managed, funded, or operated
                  by any government body or department.
                </li>
                <li
                  style={{
                    marginBottom: "8px",
                    fontSize: "14px",
                    color: "#1a1e1d",
                  }}
                >
                  It operates independently as a public-benefit private
                  initiative, with the goal of uplifting youth through digital
                  skills and modern education tools.
                </li>
              </ul>

              <p
                style={{
                  marginBottom: "15px",
                  fontSize: "14px",
                  color: "#1a1e1d",
                }}
              >
                The inclusion of government figures in the advisory process does
                not imply a formal or financial affiliation with the Government
                of Punjab. The program's branding, content, and execution are
                managed entirely by the private team behind Hunarmand Punjab.
              </p>

              <p
                style={{
                  marginBottom: "0",
                  fontSize: "14px",
                  color: "#1a1e1d",
                }}
              >
                By participating in this program, students and stakeholders
                acknowledge the above and agree that no claims of government
                employment, quota benefits, or state-issued certifications
                should be associated with this initiative. This clear
                distinction is made to ensure transparency, public trust, and
                protection of all parties involved from misinformation or legal
                misunderstanding.
              </p>
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: "20px 25px",
                borderTop: "1px solid #e9ecef",
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
              }}
            >
              <button
                onClick={closeDisclaimerModal}
                className="btn-green"
                style={{
                  padding: "10px 20px",
                  fontSize: "14px",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default TermsandCondition;
