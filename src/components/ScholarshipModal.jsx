import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import Education from "../assets/higher-education.png";
import Header from "../assets/modal-banner.png";
import { Link } from "react-router-dom";

const ScholarshipModal = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
      const modal = new window.bootstrap.Modal(document.getElementById("scholarshipModal"));
      modal.show();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
    const modal = window.bootstrap.Modal.getInstance(document.getElementById("scholarshipModal"));
    modal.hide();
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
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            {/* Close Button */}
            <button
              type="button"
              className="btn-close position-absolute top-0 end-0 m-3"
              aria-label="Close"
              onClick={handleClose}
            ></button>

            {/* Modal Header Image */}
            <img src={Header} alt="Header" className="img-fluid w-100" />

            {/* Modal Body */}
            <div className="modal-body">
              <div
                className="text-center m-4 p-5"
                style={{
                  backgroundColor: "rgb(247 226 223)",
                  borderRadius: "10px",
                }}
              >
                <h1
                  className="text-start mb-3"
                  style={{
                    color: "#dc3545",
                    fontWeight: "bold",
                    fontSize: "36px",
                  }}
                >
                  50,000 SCHOLARSHIP CARDS
                </h1>
                <p
                  dir="rtl"
                  lang="ur"
                  className="urdu-font"
                  style={{
                    fontSize: "16px",
                    textAlign: "right",
                    lineHeight: "1.6",
                    color: "#333",
                    marginBottom: "10px",
                  }}
                >
                  جدید ترین IT TRAININGSیں ENROLL ہونے والے پہلے 50,000 سٹوڈنٹس
                  کو سکالر شپ کارڈز فراہم کیے جائیں گے ۔ اس کے بعد موصول ہونے
                  والی درخواستوں کو اگلے بیچ میں شامل کیا جائے گا۔
                </p>
              </div>

              {/* Scholarship Card */}
              <div className="scholarship-card mb-4">
                <img
                  className="w-100 rounded-4 shadow-lg"
                  src="/scholarship card.jpg"
                  alt=""
                />
              </div>

              <p className="text-center">
                <strong>25,000 </strong> Scholarship cards reserved for{" "}
                <strong>Punjab</strong> and <strong>25,000</strong> Scholarship
                cards reserved for{" "}
                <strong>KPK, Sindh, Balochistan & AJK</strong>
              </p>

              {/* Information Desk */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #e8f5e8 0%, #d4edda 100%)",
                  borderRadius: "10px",
                  padding: "25px",
                  marginBottom: "30px",
                  border: "2px solid #079560",
                }}
              >
                <h4 className="text-uppercase fw-bold mb-4">
                  Information Desk
                </h4>
                <div className="row">
                  <div className="col-md-12">
                    <div className="d-flex align-items-center mb-3">
                      <i className="fas fa-phone text-success me-2"></i>
                      <p className="mb-0">UAN: 03-111-130-053</p>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <i className="fas fa-envelope text-success me-2"></i>
                      <p className="mb-0">support@hunarmandpunjab.pk</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-3">
                      <i className="fas fa-globe text-success me-2"></i>
                      <p className="mb-0">www.hunarmandpunjab.pk</p>
                    </div>
                    <p className="mb-0 text-success">
                      Monday to Friday, 9:00am to 5:00pm
                    </p>
                  </div>
                </div>
              </div>

              {/* Application Instructions */}
              <p
                dir="rtl"
                lang="ur"
                className="text-end fw-bold urdu-font text-danger"
                style={{ fontSize: "18px" }}
              >
                نامکمل یا غلط اندراج کی گئی درخواستیں مسترد کر دی جائیں گی۔
              </p>

              <div className="text-start mt-3">
                <Link
                  to="/apply-scholarshipcard"
                  style={{
                    color: "orange",
                  }}
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScholarshipModal;