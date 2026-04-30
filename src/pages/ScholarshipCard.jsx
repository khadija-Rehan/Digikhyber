import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import FS from "../assets/scholar.webp";
import PageBanner from "../components/PageBanner";
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
      duration: 350,
      offset: 0,
      once: true,
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
      <PageBanner 
        title="Scholarship Cards"
        description="The Scholarship Card is your all-in-one pass to unlock a world of digital learning and career-building opportunities. Digikhyber is the biggest E-Learning Platform launched by Minister of School & Higher Education Rana Sikandar Hayat, this initiative is designed to empower youth with access to high-quality training programs, hands-on practical learning, and an internationally recognized curriculum."
      />
      
      <div className="scholarship-main-section">
        <div className="container py-5 position-relative z-1">
          {/* Redesigned Floating Hero Card */}
          <div className="row align-items-center mb-5 elite-instant-reveal">
            <div className="col-lg-6 p-4">
              <div className="hero-content-wrapper">
                <h2 className="digikhyber-heading mb-4">
                  Unlock Your Future with <br/>
                  <span className="accent-text">Our Scholarship Cards</span>
                </h2>
                <div className="digikhyber-body-text mb-4">
                  <p className="text-secondary" style={{ lineHeight: '1.9', fontSize: '1.1rem' }}>
                    The <b>Scholarship Card</b> is your all-in-one pass to unlock a world of digital learning and career-building opportunities. 
                    <b> Digikhyber</b> is the biggest E-Learning Platform launched by 
                    <b> Minister of School & Higher Education Rana Sikandar Hayat</b>, this initiative is designed to empower youth with 
                    access to high-quality training programs, hands-on practical learning, and an internationally recognized curriculum.
                  </p>
                </div>

                <div className="benefits-grid-modern mb-5">
                  {[
                    { icon: 'fa-laptop-code', text: 'Advanced IT Training' },
                    { icon: 'fa-solar-panel', text: 'Laptop & Solar Support' },
                    { icon: 'fa-graduation-cap', text: 'Global Curriculum' },
                    { icon: 'fa-briefcase', text: 'Career Guidance' }
                  ].map((benefit, i) => (
                    <div key={i} className="modern-benefit-pill">
                      <i className={`fa-solid ${benefit.icon} me-3`}></i>
                      <span>{benefit.text}</span>
                    </div>
                  ))}
                </div>

                <div className="d-flex flex-wrap gap-3">
                  <Link to="/apply-scholarshipcard" className="btn-golden-premium">
                    Apply Now <i className="fa-solid fa-arrow-right-long ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 p-4 text-center">
              <img 
                src="/images/scholarship-card-main.png" 
                alt="Digikhyber Scholarship Card" 
                className="img-fluid premium-image-card" 
                style={{ width: "100%", maxWidth: "750px", display: "block", margin: "0 auto" }} 
              />
            </div>
          </div>

          <div className="row g-4 mb-5">
            <div className="col-12">
              <div className="digikhyber-info-card text-center p-4 p-md-5">
                <h3 className="digikhyber-heading-sub mb-4">Digikhyber – Scholarship Card Initiative</h3>
                <div className="row justify-content-center">
                  <div className="col-lg-10">
                    <h5 className="fw-bold text-dark mb-3">Overview</h5>
                    <p className="text-secondary mb-0" style={{ lineHeight: '1.8', fontSize: '0.95rem' }}>
                      The Digikhyber Scholarship Card is a revolutionary initiative launched under the Digikhyber Program 
                      with the appreciation of our Honourable Minister of Education, Punjab Rana Sikandar Hayat, aimed at providing IT-Skills 
                      to youth enrolled in the training program. This card enables eligible trainees to access training-related LMS, 
                      laptop scheme, solar scheme, taleem finance, taleem abroad & more in a transparent, secure, and efficient manner & 
                      ensure that every learner receives skill-based training.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4 mb-5">
            {/* Key Features Card */}
            <div className="col-lg-4" style={{ animationDelay: '0.1s' }}>
              <div className="digikhyber-info-card h-100 p-4 border-top border-4 border-warning">
                <h5 className="digikhyber-card-title mb-4">
                  <i className="fa-solid fa-list-check text-warning me-2"></i> Key Features
                </h5>
                <ul className="digikhyber-list small list-unstyled">
                  {[
                    'Scholarship Value: Eligible for',
                    'Laptop Scheme',
                    'Solar Scheme',
                    'Taleem Finance',
                    'Taleem Abroad',
                    'E-Bikes',
                    'Coverage: Includes access to advanced courses, materials, discount vouchers.',
                    'Card Type: E-Card and Physical Card powered by HP.',
                    'Usage Limitations: Training-related usage only.',
                    'Validity: Duration of the course (up to 6 months).'
                  ].map((item, i) => (
                    <li key={i} className="mb-2 d-flex align-items-start gap-2">
                      <i className="fa-solid fa-circle-chevron-right text-warning mt-1" style={{ fontSize: '0.8rem' }}></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Eligibility & Application Card */}
            <div className="col-lg-4" style={{ animationDelay: '0.2s' }}>
              <div className="digikhyber-info-card h-100 p-4 border-top border-4 border-success">
                <h5 className="digikhyber-card-title mb-4">
                  <i className="fa-solid fa-user-check text-success me-2"></i> Eligibility & Application
                </h5>
                <div className="mb-4">
                  <p className="fw-bold small mb-2 text-dark">Criteria:</p>
                  <ul className="list-unstyled small mb-0">
                    {[
                      'Resident of Pakistan',
                      'Age between 15 to 40 years',
                      'Valid CNIC/B-Form',
                      'Enrolled in HP courses',
                      'No previous scholarship card'
                    ].map((item, i) => (
                      <li key={i} className="mb-2 d-flex align-items-center gap-2">
                        <i className="fa-solid fa-check text-success"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <hr className="opacity-10 my-4" />
                <p className="fw-bold small mb-2 text-dark">Application Flow:</p>
                <div className="mini-steps small">
                  <div className="m-step"><span>1</span> Register at digikhyber.org.pk</div>
                  <div className="m-step"><span>2</span> Fill form & upload challan slip</div>
                  <div className="m-step"><span>3</span> Verification by HP Team & Issuance</div>
                </div>
              </div>
            </div>

            {/* Charges & Conditions Card */}
            <div className="col-lg-4" style={{ animationDelay: '0.3s' }}>
              <div className="digikhyber-info-card h-100 p-4 border-top border-4 border-warning">
                <h5 className="digikhyber-card-title mb-4">
                  <i className="fa-solid fa-money-bill-wave text-warning me-2"></i> Fees & Conditions
                </h5>
                <div className="charges-box mb-4 bg-white p-3 rounded-3 border border-light shadow-sm">
                  <div className="d-flex justify-content-between mb-2 small">
                    <span>Card Issuance:</span> <span className="fw-bold text-success">FREE</span>
                  </div>
                  <div className="d-flex justify-content-between small">
                    <span>SMS Alerts:</span> <span className="fw-bold text-success">FREE</span>
                  </div>
                </div>
                <hr className="opacity-10 my-4" />
                <p className="fw-bold small mb-2 text-dark">Key Conditions:</p>
                <ul className="list-unstyled small mb-0">
                  {[
                    'Access Advance IT Courses',
                    'Eligibility for Reward Schemes',
                    'Internship Opportunities',
                    'Misuse leads to blacklisting',
                    '85% marks required in test'
                  ].map((item, i) => (
                    <li key={i} className="mb-2 d-flex align-items-start gap-2">
                      <i className="fa-solid fa-info-circle text-secondary mt-1"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="row mt-5" style={{ animationDelay: '0.4s' }}>
            <div className="col-12">
              <div className="digikhyber-info-card p-4 p-md-5">
                <h4 className="digikhyber-card-title text-center mb-5">Terms & Conditions</h4>
                <div className="row g-4">
                  {[
                    { h: '1. Eligibility', p: 'Only enrolled HP students are eligible. 85% marks required.' },
                    { h: '2. Merit Basis', p: 'Rewards awarded strictly on merit. Ranking determines selection.' },
                    { h: '3. Completion', p: 'Mandatory attendance and assignment completion required.' },
                    { h: '4. Verification', p: 'Academic records & marks verified by management team.' },
                    { h: '5. Rewards', p: 'Subject to availability and phase cycles. Changes may occur.' },
                    { h: '6. Ownership', p: 'Non-transferable. Only for the selected student use.' },
                    { h: '7. Amendments', p: 'HP reserves right to update terms at any time.' },
                    { h: '8. Finality', p: 'Management decisions are final and binding for all.' }
                  ].map((term, i) => (
                    <div key={i} className="col-md-3">
                      <div className="p-3 border rounded-3 h-100 hover-lift bg-white">
                        <h6 className="fw-bold text-success mb-2 small">{term.h}</h6>
                        <p className="x-small text-secondary mb-0">{term.p}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Institutional Footer */}
          <div className="mt-5 text-center" style={{ animationDelay: '0.5s' }}>
            <div className="d-inline-flex flex-wrap justify-content-center gap-4 bg-white p-3 px-md-5 rounded-pill shadow-sm border border-light">
              <a href="mailto:scholarshipcard@digikhyber.org.pk" className="small text-dark text-decoration-none fw-semibold">
                <i className="fa-solid fa-envelope text-success me-2"></i> scholarshipcard@digikhyber.org.pk
              </a>
              <span className="small text-dark fw-semibold border-start ps-4 border-light d-none d-md-block">
                <i className="fa-solid fa-phone text-success me-2"></i> 03-111-133-053
              </span>
            </div>
          </div>
        </div>

        <style>{`
          .scholarship-main-section {
            background: linear-gradient(-45deg, #f8fafc, #f1f5f9, #ffffff, #f8fafc);
            background-size: 400% 400%;
            animation: gradientFlow 15s ease infinite;
            position: relative;
            overflow: hidden;
            font-family: 'Jost', sans-serif;
          }

          .scholarship-main-section::before {
            content: '';
            position: absolute;
            inset: 0;
            background-image: radial-gradient(#cbd5e1 1.5px, transparent 1.5px);
            background-size: 26px 26px;
            animation: dotsFlow 15s linear infinite;
            pointer-events: none;
            z-index: 0;
            opacity: 0.8;
          }

          @keyframes gradientFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes dotsFlow {
            from { background-position: 0px 0px; }
            to { background-position: 26px 26px; }
          }

          .digikhyber-heading {
            font-family: 'Raleway', sans-serif;
            font-weight: 800;
            color: #0b5d3b;
            font-size: 2.5rem;
            line-height: 1.1;
            letter-spacing: -1px;
          }

          .accent-text { color: #C9A227; }

          .digikhyber-heading-sub {
            font-family: 'Raleway', sans-serif;
            font-weight: 700;
            color: #0b5d3b;
          }

          .digikhyber-elite-card {
            background: #ffffff;
            border-radius: 24px;
            border: 1px solid #f1f5f9;
            box-shadow: 0 10px 30px rgba(0,0,0,0.04);
            overflow: hidden;
          }

          .digikhyber-info-card {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border-radius: 24px;
            border: 1px solid #f1f5f9;
            box-shadow: 0 4px 20px rgba(0,0,0,0.03);
            transition: all 0.3s ease;
          }

          .digikhyber-info-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0,0,0,0.07);
          }

          .digikhyber-card-title {
            font-family: 'Raleway', sans-serif;
            font-weight: 700;
            color: #1e293b;
            font-size: 1.25rem;
          }

          .digikhyber-list li {
            margin-bottom: 10px;
            padding-left: 0;
            position: relative;
          }

          .benefit-item-elite {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 0.9rem;
            margin-bottom: 10px;
            color: #475569;
          }

          .benefits-grid-modern {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
          }

          .modern-benefit-pill {
            background: #f8fafc;
            padding: 10px 20px;
            border-radius: 50px;
            border: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            font-size: 0.95rem;
            font-weight: 500;
            color: #475569;
            transition: all 0.3s ease;
          }

          .modern-benefit-pill i {
            color: #0b5d3b;
            font-size: 1.1rem;
          }

          .modern-benefit-pill:hover {
            background: #ffffff;
            border-color: #0b5d3b;
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(11, 93, 59, 0.1);
            color: #0b5d3b;
          }

          .btn-golden-premium {
            background: linear-gradient(135deg, #C9A227 0%, #a6841b 100%);
            color: #ffffff !important;
            padding: 10px 24px;
            border-radius: 50px;
            font-weight: 700;
            font-size: 0.95rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            box-shadow: 0 6px 15px rgba(201, 162, 39, 0.3);
            border: none;
            text-decoration: none;
          }
          
          .btn-golden-premium:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 30px rgba(201, 162, 39, 0.6);
            color: #ffffff !important;
            background: linear-gradient(135deg, #dfb42c 0%, #b89320 100%);
          }

          .m-step {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 12px;
            color: #475569;
          }

          .m-step span {
            width: 22px;
            height: 22px;
            background: #0b5d3b;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 0.75rem;
          }

          .digikhyber-btn-primary {
            background: #0b5d3b;
            transition: all 0.3s ease;
            border: none;
          }

          .digikhyber-btn-primary:hover {
            background: #08432a;
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(11, 93, 59, 0.2) !important;
          }

          .hover-lift:hover { transform: translateY(-5px); }
          .x-small { font-size: 0.75rem; }
          .elite-instant-reveal {
            animation: eliteReveal 0.3s cubic-bezier(0.19, 1, 0.22, 1) forwards;
          }

          @keyframes eliteReveal {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @media (max-width: 768px) {
            .digikhyber-heading { font-size: 1.8rem; }
          }
        `}</style>
      </div>
      <StatCounter />
    </>
  );
};

export default ScholarshipCard;
