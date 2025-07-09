import React from "react";
import ParticleBackground from "../components/ParticleBackground";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const HowItsWork = () => {
  return (
    <div style={{ overflow: "hidden", marginBottom: "50px" }}>
      <div className="breadcrums">
        <ParticleBackground />

        <h2>How It Works: Hunarmand Admission Process</h2>
      </div>
      <div className="container">
        <div className="row justify-content-center pt-5 pb-5">
          <div className="col-lg-8">
            <div
              className="video-container"
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/vumLjmUN7P8"
                title="YouTube video player"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <h3 className="text-center pt-4">
              How To Apply - Hunarmand Video Tutorial
            </h3>
            <p className="text-center">
              Learn how to easily apply using our step-by-step video guide.
            </p>
          </div>
        </div>
      </div>
      <div className="cus-container">
        <div class="row mb-4">
          <div class="col-lg-5">
            <div
              class="process-box process-box-desktop process-left aos-init aos-animate"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <div class="row">
                <div class="col-lg-5">
                  <div class="process-step">
                    <p class="m-0 p-0">Step</p>
                    <h2 class="m-0 p-0">01</h2>
                  </div>
                </div>
                <div class="col-lg-7">
                  <h5>Step 1: Go to the Apply Section</h5>
                  <p>
                    To apply for Hunarmand courses, navigate to the Apply
                    section on our website.
                  </p>
                </div>
              </div>
              <div class="process-line-l"></div>
            </div>
          </div>
          <div class="col-lg-2"></div>
          <div class="col-lg-5  position-relative">
            <div class="process-point-right"></div>
          </div>
        </div>
        <div class="row mb-4">
          <div class="col-lg-5 position-relative">
            <div class="process-point-left"></div>
          </div>
          <div class="col-lg-2"></div>
          <div class="col-lg-5">
            <div
              class="process-box process-box-desktop process-right aos-init aos-animate"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              <div class="row">
                <div class="col-lg-5">
                  <div class="process-step">
                    <p class="m-0 p-0">Step</p>
                    <h2 class="m-0 p-0">02</h2>
                  </div>
                </div>
                <div class="col-lg-7">
                  <h5>
                    Step 2: Click New Registration &amp; Submit Admission Form
                  </h5>
                  <p>
                    Fill out the admission form by clicking on New Registration
                    and provide all necessary details.
                  </p>
                </div>
              </div>
              <div class="process-line-r"></div>
            </div>
          </div>
        </div>{" "}
        <div class="row mb-4">
          <div class="col-lg-5">
            <div
              class="process-box process-box-desktop process-left aos-init aos-animate"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <div class="row">
                <div class="col-lg-5">
                  <div class="process-step">
                    <p class="m-0 p-0">Step</p>
                    <h2 class="m-0 p-0">03</h2>
                  </div>
                </div>
                <div class="col-lg-7">
                  <h5>Step 3: Verify Your Admission Application</h5>
                  <p>
                    To verify your Pakistan residency, documents latest Degree
                    Certificate etc.
                  </p>
                </div>
              </div>
              <div class="process-line-l"></div>
            </div>
          </div>
          <div class="col-lg-2"></div>
          <div class="col-lg-5  position-relative">
            <div class="process-point-right"></div>
          </div>
        </div>
        <div class="row mb-4">
          <div class="col-lg-5 position-relative">
            <div class="process-point-left"></div>
          </div>
          <div class="col-lg-2"></div>
          <div class="col-lg-5">
            <div
              class="process-box process-box-desktop process-right aos-init aos-animate"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              <div class="row">
                <div class="col-lg-5">
                  <div class="process-step">
                    <p class="m-0 p-0">Step</p>
                    <h2 class="m-0 p-0">04</h2>
                  </div>
                </div>
                <div class="col-lg-7">
                  <h5>
                    Step 4: Application Login Credentials Sent To Your Email
                  </h5>
                  <p>
                    Check your email for the login credentials needed to access
                    your application.
                  </p>
                </div>
              </div>
              <div class="process-line-r"></div>
            </div>
          </div>
        </div>{" "}
        <div class="row mb-4">
          <div class="col-lg-5">
            <div
              class="process-box process-box-desktop process-left aos-init aos-animate"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <div class="row">
                <div class="col-lg-5">
                  <div class="process-step">
                    <p class="m-0 p-0">Step</p>
                    <h2 class="m-0 p-0">05</h2>
                  </div>
                </div>
                <div class="col-lg-7">
                  <h5>Step 5: Visit Back & Login Using Given Credentials </h5>
                  <p>
                    Log in to your account using the provided credentials, and
                    start your Online Admission Test.
                  </p>
                </div>
              </div>
              <div class="process-line-l"></div>
            </div>
          </div>
          <div class="col-lg-2"></div>
          <div class="col-lg-5  position-relative">
            <div class="process-point-right"></div>
          </div>
        </div>
        <div class="row mb-4">
          <div class="col-lg-5 position-relative">
            <div class="process-point-left "></div>
          </div>
          <div class="col-lg-2"></div>
          <div class="col-lg-5">
            <div
              class="process-box process-box-desktop process-right aos-init aos-animate"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              <div class="row">
                <div class="col-lg-5">
                  <div class="process-step">
                    <p class="m-0 p-0">Step</p>
                    <h2 class="m-0 p-0">06</h2>
                  </div>
                </div>
                <div class="col-lg-7">
                  <h5>Step 6: Admission Test Result</h5>
                  <p>
                    If you qualify, you will proceed to the next steps. If not,
                    you can try again in the next batch after 3 months.
                  </p>
                </div>
              </div>
              <div class="process-line-r"></div>
            </div>
          </div>
        </div>{" "}
        <div class="row mb-4">
          <div class="col-lg-5">
            <div
              class="process-box process-box-desktop process-left aos-init aos-animate"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <div class="row">
                <div class="col-lg-5">
                  <div class="process-step">
                    <p class="m-0 p-0">Step</p>
                    <h2 class="m-0 p-0">07</h2>
                  </div>
                </div>
                <div class="col-lg-7">
                  <h5>Step 7: Application Processing & Confirm Your Seat </h5>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top-admission-fee">
                        If you pass the admission test, you will be prompted to
                        pay a minor application processing fee to submit your
                        application and confirm your seat in the current batch.
                      </Tooltip>
                    }
                  >
                    <p>
                      If you pass the admission test, you will be prompted to
                      pay a minor ...
                    </p>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="process-line-l"></div>
            </div>
          </div>
          <div class="col-lg-2"></div>
          <div class="col-lg-5  position-relative">
            <div class="process-point-right"></div>
          </div>
        </div>
        <div class="row mb-4">
          <div class="col-lg-5 position-relative">
            <div class="process-point-left"></div>
          </div>
          <div class="col-lg-2"></div>
          <div class="col-lg-5">
            <div
              class="process-box process-box-desktop process-right aos-init aos-animate"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              <div class="row">
                <div class="col-lg-5">
                  <div class="process-step">
                    <p class="m-0 p-0">Step</p>
                    <h2 class="m-0 p-0">08</h2>
                  </div>
                </div>
                <div class="col-lg-7">
                  <h5>Step 8: Application Review</h5>
                  <p>
                    Your application will be reviewed by our team to ensure all
                    details and documents are in order.
                  </p>
                </div>
              </div>
              <div class="process-line-r"></div>
            </div>
          </div>
        </div>
        <div class="row mb-4">
          <div class="col-lg-5">
            <div
              class="process-box process-box-desktop process-left aos-init aos-animate"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <div class="row">
                <div class="col-lg-5">
                  <div class="process-step">
                    <p class="m-0 p-0">Step</p>
                    <h2 class="m-0 p-0">09</h2>
                  </div>
                </div>
                <div class="col-lg-7">
                  <h5>Step 9: LMS Access </h5>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top-admission-fee">
                        Final verification by our team will ensure all details
                        and documents are correct Upon approval you'll gain LMS
                        access; if not, your application processing charges will
                        be refunded back to your account.{" "}
                      </Tooltip>
                    }
                  >
                    <p>
                      Final verification by our team will ensure all details and
                      documents are correct....{" "}
                    </p>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="process-line-l"></div>
            </div>
          </div>
          <div class="col-lg-2"></div>
          <div class="col-lg-5  position-relative">
            <div class="process-point-right"></div>
          </div>
        </div>
        <div class="row  mb-4">
          <div class="col-lg-5 position-relative">
            <div class="process-point-left last-point"></div>
          </div>
          <div class="col-lg-2"></div>
          <div class="col-lg-5">
            <div
              class="process-box process-box-desktop process-right aos-init aos-animate"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              <div class="row">
                <div class="col-lg-5">
                  <div class="process-step">
                    <p class="m-0 p-0">Step</p>
                    <h2 class="m-0 p-0">10</h2>
                  </div>
                </div>
                <div class="col-lg-7">
                  <h5>Step 10: Scholarship Card</h5>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top-admission-fee">
                        If you're eligible for financial assistance, you will
                        receive a Scholarship Card. This card confirms your
                        scholarship status and can be used to avail various
                        course-related benefits. Please ensure you meet the
                        scholarship criteria and have submitted all required
                        documentation.
                      </Tooltip>
                    }
                  >
                    <p>
                      If you're eligible for financial assistance, you will
                      receive a Scholarship Card. This card confirms your
                      scholarship ...
                    </p>
                  </OverlayTrigger>
                </div>
              </div>
              <div class="process-line-r"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItsWork;
