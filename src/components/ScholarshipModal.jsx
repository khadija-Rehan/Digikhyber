import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import Education from "../assets/higher-education.png";
import Header from "../assets/modal-banner.png";
import { useNavigate } from "react-router-dom";

const ScholarshipModal = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
      const modal = new window.bootstrap.Modal(
        document.getElementById("scholarshipModal")
      );
      modal.show();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
    const modal = window.bootstrap.Modal.getInstance(
      document.getElementById("scholarshipModal")
    );
    modal.hide();
  };

  const handleApplyNow = (e) => {
    e.preventDefault();
    handleClose();
    setTimeout(() => {
      navigate("/apply-now");
    }, 300); // Give modal time to close
  };

  return (
    <>
      <div
        className="modal fade"
        id="scholarshipModal"
        tabIndex="-1"
        aria-labelledby="scholarshipModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            {/* Close Button */}
            <button
              type="button"
              className="btn-close position-absolute top-0 end-0 m-2"
              aria-label="Close"
              onClick={handleClose}
            ></button>

            {/* Modal Header Image */}
            <img
              src={Header}
              alt="Header"
              className="img-fluid w-100"
              style={{ maxHeight: "120px", objectFit: "cover" }}
            />

            {/* Modal Body */}
            <div className="modal-body" style={{ padding: "15px" }}>
              {/* Scholarship Information */}
              <div
                className="d-flex align-items-start mb-3"
                style={{
                  fontSize: "14px",
                  background: "#ffe6e6",
                  borderRadius: "6px",
                  border: "1px solid #ffcccc",
                  overflow: "hidden",
                }}
              >
                <div
                  className="d-flex align-items-start p-3"
                  style={{ gap: "12px" }}
                >
                  <i
                    className="fas fa-graduation-cap text-danger"
                    style={{ fontSize: "16px", marginTop: "2px" }}
                  ></i>
                  <div>
                    <div
                      className="fw-bold text-danger mb-1"
                      style={{ fontSize: "15px" }}
                    >
                      50,000 SCHOLARSHIP CARDS
                    </div>
                    <div
                      className="text-danger urdu-font"
                      style={{
                        fontSize: "10px",
                        direction: "rtl",
                        textAlign: "right",
                      }}
                    >
                      جدید ترین IT Trainings میں Enroll ہونے والے پہلے 50,000
                      سٹوڈنٹس کو سکالرشپ کارڈز فراہم کیے جائیں گے۔ اس کے بعد
                      موصول ہونے والی درخواستوں کو اگلے بیچ میں شامل کیا جائے
                      گا۔
                    </div>
                  </div>
                </div>
              </div>

              {/* Scholarship Card */}
              <div className="scholarship-card mb-3 w-80">
                <img
                  className="w-100 rounded-3 shadow"
                  src="/scholarship card.jpg"
                  alt=""
                  style={{ objectFit: "cover" }}
                />
              </div>

              <p className="text-center text-cont" style={{ fontSize: "14px" }}>
                <strong>25,000 </strong> Scholarship cards reserved for{" "}
                <strong>Punjab</strong> and <strong>25,000</strong> Scholarship
                cards reserved for{" "}
                <strong>KPK, Sindh, Balochistan & AJK</strong>
              </p>

              {/* Information Desk */}
              <div
                style={{
                  background: "#f8f9fa",
                  borderRadius: "6px",
                  padding: "10px",
                  marginBottom: "15px",
                  border: "1px solid #dee2e6",
                }}
              >
                <h6
                  className="text-uppercase fw-bold mb-2"
                  style={{ fontSize: "12px", color: "#079560" }}
                >
                  Helpline Center
                </h6>
                <div className="row g-1">
                  <div className="col-12">
                    <div className="d-flex align-items-center mb-1">
                      <i
                        className="fas fa-phone text-success me-2"
                        style={{ fontSize: "11px", width: "12px" }}
                      ></i>
                      <span style={{ fontSize: "11px" }}>
                        UAN: 03-111-133-053
                      </span>
                    </div>
                    <div className="d-flex align-items-center mb-1">
                      <i
                        className="fas fa-envelope text-success me-2"
                        style={{ fontSize: "11px", width: "12px" }}
                      ></i>
                      <span
                        style={{ fontSize: "11px", wordBreak: "break-all" }}
                      >
                        support@hunarmandpunjab.pk
                      </span>
                    </div>
                    <div className="d-flex align-items-center mb-1">
                      <i
                        className="fas fa-globe text-success me-2"
                        style={{ fontSize: "11px", width: "12px" }}
                      ></i>
                      <span
                        style={{ fontSize: "11px", wordBreak: "break-all" }}
                      >
                        www.hunarmandpunjab.pk
                      </span>
                    </div>
                    <small className="text-muted" style={{ fontSize: "10px" }}>
                      Monday to Friday, 9:00am to 5:00pm
                    </small>
                  </div>
                </div>
              </div>

              {/* Application Instructions */}
              <p
                dir="rtl"
                lang="ur"
                className="text-end fw-bold urdu-font text-danger"
                style={{ fontSize: "10px" }}
              >
                نامکمل یا غلط اندراج کی گئی درخواستیں مسترد کر دی جائیں گی۔
              </p>

              <div className="text-start mt-2">
                <button
                  onClick={handleApplyNow}
                  // style={{
                  //   background: "none",
                  //   border: "none",
                  //   padding: 0,
                  //   font: "inherit",
                  //   cursor: "pointer",
                  //   textDecoration: "underline"
                  // }}
                  // className="text-danger text-decoration-none"
                  className="btn-green modal-btn"
                >
                  Apply Now?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScholarshipModal;
