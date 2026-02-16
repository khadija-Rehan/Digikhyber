import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import FS from "../assets/scholar.webp";
import ParticleBackground from "../components/ParticleBackground";
import { Link } from "react-router-dom";
import StatCounter from "../components/StatsCounter";

const ScholarshipCard = () => {
  const [cardsPerRow, setCardsPerRow] = useState(3);

  const updateCardsPerRow = () => {
    const width = window.innerWidth;
    if (width <= 600) {
      setCardsPerRow(1);
    } else if (width <= 992) {
      setCardsPerRow(2);
    } else {
      setCardsPerRow(3);
    }
  };

  useEffect(() => {
    updateCardsPerRow();
    window.addEventListener("resize", updateCardsPerRow);

    AOS.init({
      duration: 800,
      offset: 300,
      once: false,
    });

    return () => {
      window.removeEventListener("resize", updateCardsPerRow);
    };
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [cardsPerRow]);

  return (
    <>
      <div className="banner">
        <ParticleBackground />

        <div className="banner-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-12">
                <h1 className="font-48">Scholarship Cards</h1>
                <p className="font-18 light-grey l-h-1 weight-400">
                  The Scholarship Card is your all-in-one pass to unlock a world
                  of digital learning and career-building opportunities.
                  Hunarmand Punjab is the biggest E-Learning Platform launched
                  by Minister of School & Higher Education Rana Sikandar Hayat,
                  this initiative is designed to empower youth with access to
                  high-quality training programs, hands-on practical learning,
                  and an internationally recognized curriculum.
                </p>
              </div>
              <div className="col-lg-4 col-md-12">
                <img
                  src="/images/Scholarship Card.jpg"
                  alt="Course"
                  className="w-100 banner-image"
                />
                <div className="cube"> </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container pt-5">
        <div className="row pt-5 pb-5  ">
          <div className="col-lg-6" data-aos="fade-left">
            <h2 className="fw-semibold">
              Unlock Your Future with Our Scholarship Cards
            </h2>
            <p>
              The <b> Scholarship Card </b> is your all-in-one pass to unlock a
              world of digital learning and career-building opportunities.{" "}
              <b> Hunarmand Punjab </b> is the biggest E-Learning Platform
              launched by{" "}
              <b> Minister of School & Higher Education Rana Sikandar Hayat </b>
              , this initiative is designed to empower youth with access to
              high-quality training programs, hands-on practical learning, and
              an internationally recognized curriculum.
            </p>
            <p>
              Whether you're looking to build IT skills, receive a free laptop,
              or benefit from educational financing and solar support, your
              Scholarship Card is the key to it all.
            </p>
            <div className="mt-4">
              <p className="fw-semibold" style={{ color: "#079560" }}>
                Benefits of the Scholarship Card:
              </p>
              <ul className="  mt-2 list-unstyled">
                <li> Advanced IT Training with real-world skills</li>
                <li> Laptop, Solar & Education Finance Support</li>
                <li> Hands-On Learning with Global Curriculum</li>
                <li>Eco-Friendly, Sustainable Energy Solution</li>
                <li> Career Guidance & Freelancing Support</li>
              </ul>
            </div>
            <p className="fw-bold">
              Apply today and take the first step toward a skilled, self-reliant
              future.
            </p>
            <div className="d-flex align-items-center gap-3 flex-wrap flex-md-nowrap d-none d-lg-block">
              <Link to={"/apply-scholarshipcard"}>
                <button
                  className="btn-green register-btn  btn btn-success "
                  style={{ fontFamily: "Poppins" }}
                >
                  {" "}
                  Apply Now{" "}
                </button>
              </Link>
            </div>
          </div>
          <div className="col-lg-6" data-aos="fade-right">
            <img
              className="w-100 rounded-4"
              src="/images/scholarship card.jpg"
              alt=""
            />
            <div className="d-flex align-items-center gap-3 flex-wrap flex-md-nowrap mt-4 d-block d-lg-none">
              <Link to={"/apply-scholarshipcard"}>
                <button
                  className="btn-green register-btn  btn btn-success "
                  style={{ fontFamily: "Poppins" }}
                >
                  {" "}
                  Apply Now{" "}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-3">
        <div className="  p-4">
          <h2 className="card-title text-success mb-4 text-center">
            Hunarmand Punjab – Scholarship Card Initiative
          </h2>

          <div className="mb-4">
            <h4>Overview</h4>
            <p>
              The Hunarmand Punjab Scholarship Card is a revolutionary
              initiative launched under the Hunarmand Punjab Program with the
              appreciation of our Honourable Minister of Education, Punjab Rana
              Sikandar Hayat, aimed at providing IT-Skills to youth enrolled in
              the training program. This card enables eligible trainees to
              access training-related LMS, laptop scheme, solar scheme, taleem
              finance, taleem abroad & more in a transparent, secure, and
              efficient manner & ensure that every learner receives skill-based
              training.
            </p>
          </div>

          {/* Key Features */}
          <div className="mb-4">
            <h4>Key Features</h4>
            <ul className="   ">
              <li className=" ">Scholarship Value: Eligible for</li>
              <li className=" ">Laptop Scheme</li>
              <li className=" ">Solar Scheme</li>
              <li className=" ">Taleem Finance</li>
              <li className=" ">Taleem Abroad</li>
              <li className=" ">E-Bikes</li>
              <li className=" ">
                Coverage: Includes access to advanced courses, learning
                materials, discount vouchers, and other opportunities.
              </li>
              <li className=" ">
                Card Type: E-Card and Physical Card powered by Hunarmand Punjab.
              </li>
              <li className=" ">
                Usage Limitations: Designed for training-related usage only.
              </li>
              <li className=" ">
                Validity: Valid for the duration of the course (up to 6 months
                per phase).
              </li>
            </ul>
          </div>

          {/* Eligibility Criteria */}
          <div className="mb-4">
            <h4>Eligibility Criteria</h4>
            <ul className=" ">
              <li className=" ">Be a resident of Pakistan</li>
              <li className=" ">Be aged between 15 to 40 years</li>
              <li className=" ">Hold a valid CNIC/B-Form</li>
              <li className=" ">
                Be enrolled in a registered course under Hunarmand Punjab
              </li>
              <li className=" ">
                Have no previous record of Hunarmand scholarship card
              </li>
            </ul>
          </div>

          {/* How to Apply */}
          <div className="mb-4">
            <h4>How to Apply for Scholarship Card?</h4>
            <ol className="   " style={{ fontFamily: "Poppins" }}>
              <li className=" ">
                <strong>Online Registration:</strong> Visit{" "}
                <a
                  href="https://www.hunarmandpunjab.org.pk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  hunarmandpunjab.org.pk
                </a>
                <br />
                Click on "Scholarship Card Menu – then click on the bottom Apply
                button"
              </li>
              <li className=" ">
                <strong>Application Form:</strong> Fill the application form
                carefully, provide correct information & upload the paid challan
                slip.
              </li>
              <li className=" ">
                <strong>Verification & Approval:</strong>
                <br />
                • Application verification conducted by Hunarmand Team.
                <br />• Upon approval, the Scholarship Card is issued and
                activated.
              </li>
            </ol>
          </div>

          {/* Charges */}
          <div className="mb-4">
            <h4>Charges / Fees</h4>
            <ul className=" ">
              <li className=" ">
                Card Issuance Fee: <strong>Free of cost</strong>
              </li>
              <li className=" ">
                SMS/Email Alerts: <strong>Free real-time alerts</strong> on
                disbursement & promotions
              </li>
            </ul>
          </div>

          {/* Key Conditions */}
          <div className="mb-4">
            <h4>Key Conditions</h4>
            <ul className=" ">
              <li className=" ">Access Advance IT Courses</li>
              <li className=" ">Eligible for Laptop Scheme</li>
              <li className=" ">Eligible for Solar Scheme</li>
              <li className=" ">Eligible for Taleem Finance</li>
              <li className=" ">Eligible for Taleem Abroad</li>
              <li className=" ">
                Eligible for National & International Internship Opportunities
              </li>
              <li className=" ">
                Misuse (e.g. selling the card or using it for illegal
                activities) may lead to termination and blacklisting.
              </li>
              <li className=" ">
                Students must achieve above 85% marks in the evaluation test and
                pass periodic assessments to remain eligible.
              </li>
              <li className=" ">Terms & Conditions apply</li>
            </ul>
          </div>

          {/* Terms and Conditions Section */}
          <div className="mb-4">
            <h4>Hunarmand Punjab Scholarship Card – Terms & Conditions</h4>

            {/* Eligibility Criteria */}
            <div className="mb-3">
              <h5>1. Eligibility Criteria</h5>
              <ul className=" ">
                <li className=" ">
                  Only students enrolled in IT training courses under the
                  Hunarmand Punjab program are eligible to apply for the
                  Scholarship Card.
                </li>
                <li className=" ">
                  Students must successfully complete their course and obtain a
                  minimum of 85% marks in their final evaluation to qualify.
                </li>
              </ul>
            </div>

            {/* Merit-Based Selection */}
            <div className="mb-3">
              <h5>2. Merit-Based Selection</h5>
              <ul className=" ">
                <li className=" ">
                  Scholarship Cards and associated rewards (laptops, solar
                  panels, e-bikes, etc.) will be awarded strictly on a merit
                  basis.
                </li>
                <li className=" ">
                  Meeting the minimum criteria does not guarantee selection;
                  final recipients will be chosen based on top performance
                  rankings.
                </li>
              </ul>
            </div>

            {/* Course Completion */}
            <div className="mb-3">
              <h5>3. Course Completion</h5>
              <ul className=" ">
                <li className=" ">
                  Students must attend all required classes and fulfill the
                  attendance and assignment criteria set by the training
                  provider.
                </li>
                <li className=" ">
                  Any incomplete coursework or failure to appear in the final
                  assessment will result in disqualification from scholarship
                  eligibility.
                </li>
              </ul>
            </div>

            {/* Verification Process */}
            <div className="mb-3">
              <h5>4. Verification Process</h5>
              <ul className=" ">
                <li className=" ">
                  All academic records, attendance, and marks will be verified
                  by the program management before awarding the Scholarship
                  Card.
                </li>
                <li className=" ">
                  Misrepresentation of information or cheating during
                  assessments will lead to immediate disqualification.
                </li>
              </ul>
            </div>

            {/* Distribution of Rewards */}
            <div className="mb-3">
              <h5>5. Distribution of Rewards</h5>
              <ul className=" ">
                <li className=" ">
                  Rewards under this program (e.g., laptops, solar panels,
                  e-bikes) are subject to availability and will be distributed
                  in phases.
                </li>
                <li className=" ">
                  The program reserves the right to change, replace, or cancel
                  any reward without prior notice.
                </li>
              </ul>
            </div>

            {/* Non-Transferable */}
            <div className="mb-3">
              <h5>6. Non-Transferable</h5>
              <ul className=" ">
                <li className=" ">
                  The Scholarship Card and associated rewards are
                  non-transferable and may only be used by the selected student.
                </li>
              </ul>
            </div>

            {/* Right to Amend */}
            <div className="mb-3">
              <h5>7. Right to Amend</h5>
              <ul className=" ">
                <li className=" ">
                  Hunarmand Punjab reserves the right to amend or update these
                  terms and conditions at any time without prior notice.
                </li>
              </ul>
            </div>

            {/* Final Decision */}
            <div className="mb-3">
              <h5>8. Final Decision</h5>
              <ul className=" ">
                <li className=" ">
                  All decisions made by the Hunarmand Punjab management
                  regarding eligibility, merit ranking, and reward distribution
                  shall be considered final and binding.
                </li>
              </ul>
            </div>
          </div>

          {/* Terms and Conditions Acceptance */}

          {/* Contact Info */}
          <div>
            <h4>Helpline & Contact</h4>
            <p>
              Email:{" "}
              <a href="mailto:scholarshipcard@hunarmandpunjab.org.pk">
                scholarshipcard@hunarmandpunjab.org.pk
              </a>
            </p>
            <p>
              Helpline: <strong>03-111-133-053</strong> (Monday–Friday, 9 AM to
              5 PM)
            </p>
            <p>
              Website:{" "}
              <a
                href="https://www.hunarmandpunjab.org.pk"
                target="_blank"
                rel="noopener noreferrer"
              >
                hunarmandpunjab.org.pk
              </a>
            </p>
          </div>
        </div>
      </div>
      <StatCounter />
    </>
  );
};

export default ScholarshipCard;
