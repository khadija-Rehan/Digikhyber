import React, { useEffect, useRef } from "react";
import Logo from "../assets/logo.png";

const AuthBanner = ({ children, title, description, isRegister = false, isLogin = false, isHorizontal = false }) => {
  const vantaRef = useRef(null);

  useEffect(() => {
    let vantaEffect = null;
    let tries = 0;

    const initVanta = () => {
      if (vantaRef.current && window.VANTA && window.VANTA.TOPOLOGY && window.p5) {
        try {
          vantaEffect = window.VANTA.TOPOLOGY({
            el: vantaRef.current,
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
      } else if (tries < 30) {
        tries++;
        setTimeout(initVanta, 100);
      }
    };

    initVanta();

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <div className="auth-page-wrapper">
      {/* Vanta Background Layer */}
      <div className="auth-vanta-bg" ref={vantaRef}></div>

      <div className="auth-content-container">
        <div className={`auth-card ${isLogin ? 'compact-card' : ''} ${isHorizontal ? 'horizontal-card' : ''}`}>
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
