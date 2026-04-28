import React from "react";

const LoginAlertModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
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
        className="modal-content login-alert-modal"
        style={{
          backgroundColor: "white",
          borderRadius: "15px",
          padding: "0",
          maxWidth: "600px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          animation: "modalSlideIn 0.3s ease-out",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#0B5D3B",
            color: "white",
            padding: "15px 20px",
            borderRadius: "15px 15px 0 0",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                fontSize: "1.8rem",
                animation: "pulse 2s infinite",
              }}
            >
              📢
            </div>
            <div>
              <h3
                style={{
                  margin: "0",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                Important Alert for Enrolled Students!
              </h3>
              <p
                style={{
                  margin: "3px 0 0 0",
                  opacity: "0.9",
                  fontSize: "0.8rem",
                }}
              >
                Digikhyber Program
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "15px",
              right: "20px",
              background: "rgba(255, 255, 255, 0.2)",
              border: "none",
              borderRadius: "50%",
              width: "28px",
              height: "28px",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.3)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.2)";
            }}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div
          style={{
            padding: "20px",
            lineHeight: "1.5",
          }}
        >
          <div
            style={{
              background: "#fff3cd",
              border: "1px solid #ffeaa7",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              borderLeft: "4px solid #f39c12",
            }}
          >
            <p
              style={{
                margin: "0",
                fontSize: "0.95rem",
                color: "#856404",
                fontWeight: "500",
              }}
            >
              All students enrolled in the Digikhyber Program will receive
              their LMS credentials after <strong>20th August 2025</strong>.
            </p>
          </div>


          <div
            style={{
              background: "#e3f2fd",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              borderLeft: "4px solid #2196f3",
            }}
          >
            <h5
              style={{
                color: "#1565c0",
                marginBottom: "10px",
                fontSize: "0.9rem",
              }}
            >
              Note
            </h5>
            <p
              style={{
                margin: "0",
                color: "#1976d2",
                fontSize: "0.85rem",
              }}
            >Scholarship Card & Benefits Under It are fully based on Merit. Student Must Achieve Atleast 85% Marks in Final Evaluation Test in their Enrolled Course.
            </p>
          </div>
          <div
            style={{
              background: "#f8f9fa",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <h5
              style={{
                color: "#495057",
                marginBottom: "10px",
                fontSize: "0.9rem",
              }}
            >
              Stay Connected
            </h5>
            <p
              style={{
                margin: "0",
                color: "#6c757d",
                fontSize: "0.85rem",
              }}
            >
              Please stay connected and regularly check your email and portal
              for updates.
            </p>
          </div>

          <div
            style={{
              background: "#e3f2fd",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              borderLeft: "4px solid #2196f3",
            }}
          >
            <h5
              style={{
                color: "#1565c0",
                marginBottom: "10px",
                fontSize: "0.9rem",
              }}
            >
              Course Access
            </h5>
            <p
              style={{
                margin: "0",
                color: "#1976d2",
                fontSize: "0.85rem",
              }}
            >
              Access to course content will begin after you receive your LMS
              login details.
            </p>
          </div>


          <div
            style={{
              background: "#fff8e1",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              borderLeft: "4px solid #ffc107",
            }}
          >
            <h5
              style={{
                color: "#f57c00",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.9rem",
              }}
            >
              Need Help?
            </h5>
            <p
              style={{
                margin: "0",
                color: "#ef6c00",
                fontSize: "0.85rem",
              }}
            >
              For support, contact our helpdesk.
            </p>
          </div>

          <div
            style={{
              background: "#e8f5e8",
              borderRadius: "8px",
              padding: "15px",
              borderLeft: "4px solid #4caf50",
            }}
          >
            <h5
              style={{
                color: "#2e7d32",
                marginBottom: "10px",
                fontSize: "0.9rem",
              }}
            >
              Important Note
            </h5>
            <p
              style={{
                margin: "0",
                color: "#388e3c",
                fontSize: "0.85rem",
                fontWeight: "500",
              }}
            >
              As you have paid your Fee. Read the above content Carefully!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "15px 20px 20px",
            textAlign: "center",
            borderTop: "1px solid #e9ecef",
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: "#0B5D3B",
              color: "white",
              border: "none",
              borderRadius: "20px",
              padding: "10px 25px",
              fontSize: "0.9rem",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            I Understand & Continue
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default LoginAlertModal;
