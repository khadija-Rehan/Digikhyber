import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import StatCounter from "../components/StatsCounter";

const Certificate = () => {
  useEffect(() => {
    AOS.init({
      duration: 300,
      offset: 0,
      once: true,
      easing: 'ease-out'
    });
  }, []);

  return (
    <>
      <div className="elite-certificate-page">
        {/* Ambient Decorative Blurs */}
        <div className="ambient-blur blur-1"></div>
        <div className="ambient-blur blur-2"></div>
        
        <div className="container py-5 d-flex align-items-center justify-content-center min-vh-100">
          <div className="modern-glass-card p-4 p-md-5 elite-instant-reveal">
            <div className="text-center mb-5">
              <div className="d-inline-flex align-items-center justify-content-center mb-3">
                <div className="accent-line"></div>
                <i className="fa-solid fa-award mx-3 fs-3 text-success"></i>
                <div className="accent-line"></div>
              </div>
              <h2 className="digikhyber-heading-elite mb-2">Official Certification</h2>
              <p className="text-secondary opacity-75">Request your industry-recognized completion certificate</p>
            </div>

            <form className="row g-4">
              <div className="col-md-6">
                <div className="elite-input-field">
                  <label><i className="fa-solid fa-user-tag me-2"></i>Full Name</label>
                  <input type="text" placeholder="As per official records" required />
                </div>
              </div>
              <div className="col-md-6">
                <div className="elite-input-field">
                  <label><i className="fa-solid fa-envelope-open me-2"></i>Email Address</label>
                  <input type="email" placeholder="example@email.com" required />
                </div>
              </div>
              <div className="col-md-6">
                <div className="elite-input-field">
                  <label><i className="fa-solid fa-id-card-clip me-2"></i>CNIC Number</label>
                  <input type="text" placeholder="35201-0000000-0" required />
                </div>
              </div>
              <div className="col-md-6">
                <div className="elite-input-field">
                  <label><i className="fa-solid fa-graduation-cap me-2"></i>Course Track</label>
                  <select required>
                    <option value="" disabled selected>Select your course</option>
                    <option>Advanced Amazon Virtual Assistant</option>
                    <option>Full Stack Digital Marketing & AI</option>
                    <option>Advanced Shopify & Daraz</option>
                    <option>Full Stack Graphic Designing & AI</option>
                    <option>Advanced UIUX Designing with AI for Web & APP</option>
                    <option>WordPress Website Development</option>
                    <option>Full Stack Web Development with React & Node JS</option>
                    <option>MERN Stack Web Development</option>
                    <option>Advanced PHP Laravel Web Development</option>
                    <option>Python Programming for Everyone</option>
                    <option>Web Development with Python Django</option>
                    <option>Search Engine Optimization - SEO</option>
                    <option>Advanced Google Ads</option>
                    <option>National Cyber Security</option>
                    <option>Penetration Testing Web Hacking</option>
                    <option>Video Editing & Animation</option>
                    <option>Artificial Intelligence</option>
                    <option>Machine Learning & Data Science</option>
                    <option>Forex Trading</option>
                    <option>BlockChain Development</option>
                    <option>Cross platform Flutter App Development</option>
                    <option>CGI Ads</option>
                    <option>Architectural Visualization with Blender 3D</option>
                    <option>Digital Embroidery</option>
                    <option>Textile Designing</option>
                    <option>Ielts</option>
                    <option>Freelancing Program</option>
                  </select>
                </div>
              </div>

              <div className="col-12 mt-5">
                <button type="submit" className="elite-submit-btn">
                  <span>Apply for Certificate</span>
                  <i className="fa-solid fa-arrow-right-long ms-2"></i>
                </button>
              </div>
            </form>

            <div className="mt-5 text-center x-small text-secondary fw-medium">
              <i className="fa-solid fa-shield-check text-success me-2"></i>
              Your request will be verified by our academic board within 3-5 working days.
            </div>
          </div>
        </div>

        <style>{`
          .elite-certificate-page {
            background-color: #fcfdfd;
            min-height: 100vh;
            position: relative;
            overflow: hidden;
            font-family: 'Jost', sans-serif;
            /* Moderate space from top and bottom */
            padding-top: 60px;
            padding-bottom: 60px;
          }

          /* Soft Ambient Background */
          .ambient-blur {
            position: absolute;
            width: 600px;
            height: 600px;
            border-radius: 50%;
            filter: blur(140px);
            z-index: 0;
            opacity: 0.12;
            animation: moveBlur 15s infinite alternate ease-in-out;
          }
          .blur-1 { background: #0b5d3b; top: -150px; left: -150px; }
          .blur-2 { background: #C9A227; bottom: -150px; right: -150px; animation-delay: -7s; }

          @keyframes moveBlur {
            from { transform: translate(0,0) scale(1); }
            to { transform: translate(60px, 40px) scale(1.1); }
          }

          .modern-glass-card {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(30px);
            border-radius: 40px;
            border: 1px solid rgba(255, 255, 255, 0.8);
            box-shadow: 0 30px 70px rgba(0,0,0,0.06);
            max-width: 950px; 
            width: 100%;
            z-index: 1;
            margin: 20px auto; /* Reduced margin */
          }

          .accent-line {
            width: 40px;
            height: 2px;
            background: linear-gradient(90deg, transparent, #0b5d3b, transparent);
          }

          .digikhyber-heading-elite {
            font-family: 'Raleway', sans-serif;
            font-weight: 800;
            color: #1e293b;
            font-size: 2.2rem;
            letter-spacing: -1px;
          }

          .elite-input-field label {
            display: block;
            font-family: 'Raleway', sans-serif;
            font-weight: 700;
            font-size: 0.85rem;
            color: #64748b;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .elite-input-field label i {
            color: #0b5d3b;
          }

          .elite-input-field input, 
          .elite-input-field select {
            width: 100%;
            padding: 14px 20px;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 15px;
            font-size: 0.95rem;
            color: #1e293b;
            transition: all 0.3s ease;
            outline: none;
          }

          .elite-input-field input:focus, 
          .elite-input-field select:focus {
            border-color: #0b5d3b;
            box-shadow: 0 10px 25px rgba(11, 93, 59, 0.06);
            transform: translateY(-2px);
          }

          .elite-submit-btn {
            background: #0b5d3b;
            color: white;
            width: 100%;
            border: none;
            padding: 18px;
            border-radius: 15px;
            font-weight: 700;
            font-family: 'Raleway', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 12px 30px rgba(11, 93, 59, 0.15);
          }

          .elite-submit-btn:hover {
            background: #08432a;
            transform: translateY(-4px) scale(1.01);
            box-shadow: 0 20px 45px rgba(11, 93, 59, 0.25);
          }

          .x-small { font-size: 0.75rem; }

          .elite-instant-reveal {
            animation: eliteReveal 0.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
          }

          @keyframes eliteReveal {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @media (max-width: 768px) {
            .elite-certificate-page {
               padding-top: 50px;
               padding-bottom: 50px;
            }
            .modern-glass-card { padding: 30px 20px !important; border-radius: 30px; margin: 10px auto; }
            .digikhyber-heading-elite { font-size: 1.8rem; }
          }
        `}</style>
      </div>

      <StatCounter />
    </>
  );
};

export default Certificate;
