import React from "react";
import Logo from "../assets/logo-white.png";
import {
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaYoutube,
  FaChevronRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="position-relative bottom-0">
      {/* Gold top border strip */}
      <div style={{ height: '4px', background: 'linear-gradient(90deg, #C9A227, #0B5D3B, #C9A227)' }}></div>

      <div style={{ background: '#0B5D3B' }}>
        <div className="container py-5">
          <div className="row gy-4">

            {/* Column 1 - Logo & About */}
            <div className="col-lg-4 col-md-12">
              {/* Logo Section */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <img
                  src={Logo}
                  alt="Digikhyber"
                  style={{
                    height: '70px',
                    width: 'auto',
                    objectFit: 'contain',
                    flexShrink: 0
                  }}
                />
                <div>
                  <div style={{
                    color: '#ffffff',
                    fontFamily: "'Raleway', sans-serif",
                    fontWeight: '800',
                    fontSize: '1.4rem',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    lineHeight: '1'
                  }}>Digikhyber</div>
                </div>
              </div>
              <div className="footer-desc">
                Providing quality IT training to 500,000 students across Punjab, empowering them to become professional earners.
              </div>
              {/* Social Icons */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <a
                  href="https://www.facebook.com/digikhyber.pk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn fb"
                  title="Facebook"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://www.instagram.com/digikhyber.pk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn insta"
                  title="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.youtube.com/@digikhyber"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-btn yt"
                  title="YouTube"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>

            {/* Column 2 - Quick Links */}
            <div className="col-lg-2 col-sm-6">
              <h6 className="footer-heading">Quick Links</h6>
              <ul className="footer-links-list">
                <li><Link to="/"><FaChevronRight className="footer-arrow" />Home</Link></li>
                <li><Link to="/courses"><FaChevronRight className="footer-arrow" />Courses</Link></li>
                <li><Link to="/scholarship-card"><FaChevronRight className="footer-arrow" />Scholarship Card</Link></li>
                <li><Link to="/free-laptops"><FaChevronRight className="footer-arrow" />Laptop Scheme</Link></li>
                <li><Link to="/free-solarpanels"><FaChevronRight className="footer-arrow" />Solar Scheme</Link></li>
                <li><Link to="/apply-now"><FaChevronRight className="footer-arrow" />Apply Now</Link></li>
              </ul>
            </div>

            {/* Column 3 - Help */}
            <div className="col-lg-2 col-sm-6">
              <h6 className="footer-heading">Help</h6>
              <ul className="footer-links-list">
                <li><Link to="/about-us"><FaChevronRight className="footer-arrow" />About Us</Link></li>
                <li><Link to="/faqs"><FaChevronRight className="footer-arrow" />FAQs</Link></li>
                <li><Link to="/howitswork"><FaChevronRight className="footer-arrow" />How to Apply</Link></li>
                <li><Link to="/contact-us"><FaChevronRight className="footer-arrow" />Contact Us</Link></li>
                <li><Link to="/terms&policy"><FaChevronRight className="footer-arrow" />Terms & Policy</Link></li>
                <li><Link to="/privacy-policy"><FaChevronRight className="footer-arrow" />Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Column 4 - Contact */}
            <div className="col-lg-4 col-md-12">
              <h6 className="footer-heading">Contact Us</h6>
              <ul className="footer-links-list contact-list">
                <li>
                  <a href="#" style={{ alignItems: 'flex-start' }}>
                    <span className="contact-icon"><FaMapMarkerAlt /></span>
                    <span>Test Venue: Punjab University, Lahore</span>
                  </a>
                </li>
                <li>
                  <a href="tel:03111133053">
                    <span className="contact-icon"><FaPhoneAlt /></span>
                    <span>03-111-133-053</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:support@digikhyber.org.pk">
                    <span className="contact-icon"><FaEnvelope /></span>
                    <span>support@digikhyber.org.pk</span>
                  </a>
                </li>
              </ul>

              {/* Apply CTA */}
              <div className="footer-cta-container">
                <Link
                  to="/apply-now"
                  style={{
                    display: 'inline-block',
                    marginTop: '20px',
                    background: '#C9A227',
                    color: 'white',
                    padding: '10px 28px',
                    borderRadius: '50px',
                    fontWeight: '700',
                    fontSize: '12px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(201, 162, 39, 0.3)',
                  }}
                  onMouseEnter={e => { e.target.style.background = '#fff'; e.target.style.color = '#0B5D3B'; }}
                  onMouseLeave={e => { e.target.style.background = '#C9A227'; e.target.style.color = '#fff'; }}
                >
                  Apply Now →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Back to Top Arrow */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '50px',
          height: '50px',
          background: '#C9A227',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          cursor: 'pointer',
          boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
          zIndex: '999',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.background = '#0B5D3B'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = '#C9A227'; }}
      >
        <i className="fa-solid fa-chevron-up"></i>
      </button>

      {/* Bottom Bar */}
      <div style={{ background: '#083d28', borderTop: '1px solid rgba(201,162,39,0.3)' }}>
        <div className="container">
          <div className="row align-items-center py-3">
            <div className="col-md-12 text-center">
              <p className="footer-copy-text">
                © {new Date().getFullYear()} <span style={{ color: '#C9A227', fontWeight: '600' }}>Digikhyber</span>. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .footer-desc {
          color: #ffffff !important;
          font-size: 16px !important;
          font-weight: 400 !important;
          line-height: 1.8 !important;
          margin-bottom: 24px !important;
          max-width: 300px;
        }

        .footer-copy-text {
          margin: 0 !important;
          color: #ffffff !important;
          font-size: 14.5px !important;
          font-weight: 400 !important;
          letter-spacing: 0.3px;
        }

        .footer-heading {
          color: #C9A227;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 20px;
          position: relative;
          padding-bottom: 10px;
        }
        .footer-heading::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 30px;
          height: 2px;
          background: #C9A227;
        }

        .footer-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footer-links-list li {
          margin-bottom: 10px;
        }
        .footer-links-list li a {
          color: #ffffff;
          font-weight: 400;
          text-decoration: none;
          font-size: 14.5px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
        }
        .footer-links-list li a:hover {
          color: #C9A227;
          padding-left: 4px;
        }
        .footer-arrow {
          font-size: 9px;
          color: #C9A227;
          flex-shrink: 0;
        }

        .contact-list li a {
          align-items: flex-start !important;
        }
        .contact-icon {
          color: #C9A227;
          font-size: 14px;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .footer-social-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(201,162,39,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 14px;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .footer-social-btn:hover {
          background: #C9A227;
          border-color: #C9A227;
          color: white;
          transform: translateY(-3px);
        }
        .footer-social-btn.fb:hover { background: #1877F2; border-color: #1877F2; }
        .footer-social-btn.insta:hover { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); border-color: transparent; }
        .footer-social-btn.yt:hover { background: #FF0000; border-color: #FF0000; }

        @media (max-width: 767px) {
          .footer-cta-container {
            text-align: left;
            margin-bottom: 30px; /* Space below button on mobile */
          }
          .footer-cta-container a {
            padding: 10px 20px !important;
            font-size: 11px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Footer;
