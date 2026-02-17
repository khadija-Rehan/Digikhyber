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
              className="btn-close position-absolute top-0 end-0 m-2 z-2"
              aria-label="Close"
              onClick={handleClose}
            ></button>

            {/* Modal Header Image */}
            {/* <img
              src={Header}
              alt="Header"
              className="img-fluid w-100"
              style={{ maxHeight: "120px", objectFit: "cover" }}
            /> */}
            <div className="mb-2 green-bar-bg position-relative">
              <div className="green-bar-inner position-absolute"></div>
              <div className="p-2 position-relative z-1">
                <img
                  className="w-100 rounded-3"
                  // src="/images/Hunarmand Punjab hero banner 1.jpeg"
                  src="/images/Hunarmand Punjab hero banner 1-02.jpeg"
                  alt=""
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            {/* Modal Body */}
            <div className="modal-body" style={{ padding: "15px" }}>
              {/* Scholarship Information */}
              <div
                className="d-flex align-items-start mb-2"
                style={{
                  fontSize: "14px",
                  background: "#fbededff",
                  borderRadius: "6px",
                  borderLeft: "2px solid #a60505ff",
                  overflow: "hidden",
                }}
              >
                <div
                  className="d-flex align-items-start p-3 pt-1"
                  style={{ gap: "12px" }}
                >
                  {/* <i
                    className="fas fa-graduation-cap text-danger"
                    style={{ fontSize: "16px", marginTop: "2px" }}
                  ></i> */}
                  <div>
                    <div
                      className="fw-semibold mb-1"
                      style={{
                        fontSize: "15px",
                        fontFamily: "auto",
                        color: "#a50303",
                      }}
                    >
                      {/* 50,000 SCHOLARSHIP CARDS */}
                      APPLICATIONS FOR NEW BATCH OPEN
                    </div>
                    <div
                      className="text-black urdu-font"
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
              <div className="scholarship-card mb-2 w-80">
                <img
                  className="w-100 rounded-3 shadow"
                  src="/images/scholarship-card.jpg"
                  alt=""
                  style={{ objectFit: "cover" }}
                />
              </div>

              <p
                className="text-center text-black"
                style={{ fontSize: "12px" }}
              >
                <strong>25,000 </strong> Scholarship cards reserved for{" "}
                <strong>Punjab</strong> and <strong>25,000</strong> Scholarship
                cards reserved for{" "}
                <strong>KPK, Sindh, Balochistan & AJK.</strong>
              </p>

              {/* Information Desk */}
              <div
                style={{
                  background: "#e5f9f2ff",
                  borderRadius: "6px",
                  padding: "10px",
                  marginBottom: "15px",
                  border: "2px solid #6fcfacff",
                }}
              >
                <div className="d-flex justify-content-between align-items-start">
                  <h6
                    className="text-uppercase fw-semibold mb-2"
                    style={{
                      fontSize: "12px",
                      color: "black",
                      fontFamily: "Poppins,sans-serif",
                    }}
                  >
                    {/* Helpline Center */}
                    Information Desk
                  </h6>
                  <small
                    style={{
                      fontSize: "12px",
                      color: "#079560",
                      fontFamily: "Poppins,sans-serif",
                    }}
                  >
                    Monday to Friday, 9:00am to 5:00pm
                  </small>
                </div>

                <div className="row g-1">
                  <div className="col-12">
                    <div className="d-flex gap-2 justify-content-between">
                      <div className="d-flex align-items-center mb-1">
                        <i
                          className="fas fa-phone text-success me-2"
                          style={{ fontSize: "12px", width: "12px" }}
                        ></i>
                        <span style={{ fontSize: "12px" }}>
                          UAN: 03-111-130-053
                        </span>
                      </div>
                      <div className="d-flex align-items-center mb-1">
                        <i
                          className="fas fa-envelope text-success me-2"
                          style={{ fontSize: "12px", width: "12px" }}
                        ></i>
                        <span
                          style={{ fontSize: "12px", wordBreak: "break-all" }}
                        >
                          support@hunarmandpunjab.org.pk
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <i
                        className="fas fa-globe text-success me-2"
                        style={{ fontSize: "12px", width: "12px" }}
                      ></i>
                      <span
                        style={{ fontSize: "12px", wordBreak: "break-all" }}
                      >
                        www.hunarmandpunjab.org.pk
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Instructions */}
              <p
                dir="rtl"
                lang="ur"
                className="text-end fw-bold urdu-font mb-2 text-red"
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
