import React, { useEffect, useRef } from "react";
import p5 from "p5";
import TOPOLOGY from "vanta/dist/vanta.topology.min";
import Logo from "../assets/logo.png";

if (!window.p5) window.p5 = p5;

const AuthBanner = ({ children, title, description, isRegister = false }) => {
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef(null);

  useEffect(() => {
    const initVanta = () => {
      if (vantaRef.current && !vantaEffectRef.current) {
        try {
          vantaEffectRef.current = TOPOLOGY({
            el: vantaRef.current,
            p5: p5,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0xc9a227,
            backgroundColor: 0x0b5d3b,
          });
        } catch (err) {
          console.error("Vanta initialization failed:", err);
        }
      }
    };

    // Slight delay to ensure DOM is fully ready and stable
    const timer = setTimeout(initVanta, 150);

    return () => {
      clearTimeout(timer);
      if (vantaEffectRef.current) {
        try {
          vantaEffectRef.current.destroy();
        } catch (e) {
          console.warn("Vanta destroy error:", e);
        }
        vantaEffectRef.current = null;
      }
    };
  }, []);

  return (
    <div className="auth-page-wrapper">
      {/* Vanta Background Layer */}
      <div className="auth-vanta-bg" ref={vantaRef}></div>

      <div className="auth-content-container">
        <div className="auth-card">
          <div className="auth-card-left">
            <div className="auth-card-left-overlay"></div>
            <img src={Logo} alt="Digikhyber" className="auth-card-logo" />
            <h2>{title}</h2>
            <p>{description}</p>
            <div className="auth-card-curve">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 0 C 50 0, 50 100, 100 100 L 100 0 Z" fill="white" />
              </svg>
            </div>
          </div>

          <div className={`auth-card-right ${isRegister ? 'scrollable' : ''}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthBanner;
