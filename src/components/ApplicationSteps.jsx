import React from "react";
import icon3 from "../assets/ico-11.png";
import icon4 from "../assets/ico-14.png";
import TextReveal from "./TextReveal";
const ApplicationSteps = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="steps">
            <h2 className="font-32">
              <TextReveal text="How to Get Started with Hunarmand Punjab" />
            </h2>
            <p className="font-15 l-h-1">
              It's easy to become a part of Hunarmand Punjab and start learning
              new skills. Here's what you need to do:
            </p>
            <p className="font-14 green">
              Your Steps During The Application Process
            </p>

            <div className="steps-cards">
              <div className="step-card text-center">
                <p className="num">01</p>
                <i class="fa-solid fa-user-plus green fs-2 mb-4"></i>

                <p className="font-16 mb-1 fw-bold green">Create Account</p>
                <p className="font-14 fw-medium">
                  Register your free Hunarmand Punjab account in seconds
                </p>
              </div>
              <div className="step-card text-center">
                <p className="num">02</p>
                {/* <i class="fa-regular fa-envelope green fs-2 mb-4"></i> */}
                <i className="fa-solid fa-lock green fs-2 mb-4"></i>
                <p className="font-16 mb-1 fw-bold green">
                  {/* Verify Email */}
                  Login Candidate Portal
                </p>
                <p className="font-14 fw-medium">
                  {/* Confirm your email to activate your account */}
                  Login Your Candidate Portal with Registered Email & Password
                </p>
              </div>
              <div className="step-card text-center">
                <p className="num">03</p>
                <i class="fa-regular fa-file green fs-2 mb-4"></i>

                <p className="font-16 mb-1 fw-bold green">Submit Application</p>
                <p className="font-14  fw-medium">
                  Complete and submit your application form
                </p>
              </div>
              <div className="step-card text-center">
                <p className="num">04</p>
                <i class="fa-regular fa-pen-to-square  fs-2 mb-4 green"></i>

                <p className="font-16 mb-1 fw-bold green ">
                  Attempt Entry Test
                </p>
                <p className="font-14  fw-medium">
                  take the online assessment test{" "}
                </p>
              </div>
              <div className="step-card text-center">
                <p className="num">05</p>
                <i class="fa-regular fa-circle-check green fs-2 mb-4"></i>

                <p className="font-16 mb-1 fw-bold green">Confirm Admission</p>
                <p className="font-14 fw-medium">
                  Receive confirmation and start learning{" "}
                </p>
              </div>
              <div className="step-card text-center">
                <p className="num">06</p>
                <i class="fa-regular fa-circle-check green fs-2 mb-4"></i>

                <p className="font-16 mb-1 fw-bold green">Scholarship Card</p>
                <p className="font-14 fw-medium">
                  {/* Receive confirmation and get scholarship card{" "} */}
                  Receive Confirmation & Get Scholarship Card on Merit Based
                </p>
              </div>
              <style jsx>{`
                .white-icon {
                  filter: brightness(0) invert(1);
                  vertical-align: middle;
                  margin-right: 8px;
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationSteps;
