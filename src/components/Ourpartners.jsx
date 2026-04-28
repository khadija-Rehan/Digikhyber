import React, { useEffect, useState, useRef } from "react";
import TextReveal from "./TextReveal";

const partners = [
  { name: "Bank of Punjab", logo: "https://youthparliament.pk/wp-content/uploads/2022/07/bop111.png" },
  { name: "Lenovo", logo: "https://crystalpng.com/wp-content/uploads/2025/05/lenovo-logo.png" },
  { name: "Taleem Finance", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL0TQwO2v6lvKYL3d7qvmHD6yKA8gUn14-Uw&s" },
  { name: "EC-Council", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNdTeSH02aH9-eUut6MYCnwtGlI6kCnNDarQ&s" },
  { name: "Udemy", logo: "https://logowik.com/content/uploads/images/udemy-new-20212512.jpg" },
  { name: "Coursera", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo3pl_zOXCdfxx2ksowu1H39fbyBpFMdo7Dw&s" },
  { name: "Meta", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMtdzKPDmF4BYfI0WCuTY416jnhZiJeAK-rg&s" },
  { name: "Microsoft", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0LnDYBaUFCBj2hvQqKZkCwjCZZFXalvd3OA&s" },
];

const OurPartners = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const allLogos = [...partners, ...partners, ...partners];

  return (
    <section 
      ref={sectionRef}
      className={`partners-section-reveal ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="partners-section position-relative overflow-hidden py-5">
        
        {/* Unified Technical Grid Background */}
        <div className="partners-tech-grid"></div>

        <div className="container position-relative z-1 text-center pt-4">
          
          {/* Themed Badge - Matching CoursesCategory */}
          <div className="mb-3">
              <span className="partners-category-badge">
                  <span className="dot gold-dot-partner"></span>
                  Global Partnerships
              </span>
          </div>

          <h2 className="partners-heading-v2 mb-4">
            <TextReveal text="Our Trusted Partners & Endorsements" />
          </h2>
          
          <div className="mx-auto mb-5" style={{ width: '40px', height: '3px', background: '#C9A227', borderRadius: '5px' }}></div>
        </div>

        {/* Smooth Auto scroll track */}
        <div className="partners-track-wrapper pb-5">
          <div className="partners-fade-overlay left-fade"></div>
          <div className="partners-fade-overlay right-fade"></div>

          <div className="partners-track-scroll">
            {allLogos.map((partner, index) => (
              <div key={index} className="partners-pill-card bg-white shadow-sm">
                <div className="logo-img-container">
                  <img
                      src={partner.logo}
                      alt={partner.name}
                      className="partners-logo-img-v2"
                  />
                </div>
                <span className="partners-logo-name-txt">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .partners-section-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 1.2s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .partners-section-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .partners-section {
          background-color: #f8fcf9;
          font-family: inherit;
        }

        /* Technical Grid Background Layer */
        .partners-tech-grid {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background-image: 
                linear-gradient(rgba(11, 93, 59, 0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(11, 93, 59, 0.04) 1px, transparent 1px);
            background-size: 50px 50px;
            z-index: 0;
            pointer-events: none;
        }

        /* Refined Badge Style */
        .partners-category-badge {
            background: #0B5D3B;
            color: white;
            padding: 5px 15px;
            border-radius: 50px;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 1px;
            text-transform: uppercase;
            border: 2px solid #C9A227;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 10px rgba(11, 93, 59, 0.15);
        }

        .gold-dot-partner {
            width: 6px; height: 6px;
            background: #C9A227;
            border-radius: 50%;
            animation: pulseGoldPartner 2s infinite;
        }

        @keyframes pulseGoldPartner {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.4); opacity: 0.6; }
            100% { transform: scale(1); opacity: 1; }
        }

        /* Heading Style - Lighter Weight */
        .partners-heading-v2 {
            font-size: 28px;
            font-weight: 500;
            color: #1a2b25;
            letter-spacing: -0.5px;
        }

        /* Track wrapper & Fades */
        .partners-track-wrapper {
          position: relative;
          overflow: hidden;
          padding: 20px 0;
        }
        .partners-fade-overlay {
          position: absolute;
          top: 0; bottom: 0; width: 15%; z-index: 2; pointer-events: none;
        }
        .left-fade { left: 0; background: linear-gradient(to right, #f8fcf9 0%, transparent 100%); }
        .right-fade { right: 0; background: linear-gradient(to left, #f8fcf9 0%, transparent 100%); }

        /* Animation */
        .partners-track-scroll {
          display: flex;
          align-items: center;
          gap: 25px;
          width: max-content;
          animation: partners-scroll-v2 40s linear infinite;
        }
        .partners-track-scroll:hover {
          animation-play-state: paused;
        }
        @keyframes partners-scroll-v2 {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }

        /* Pill Logo Card - Modern Style */
        .partners-pill-card {
          flex-shrink: 0;
          width: 180px;
          height: 100px;
          border-radius: 20px;
          border: 1px solid rgba(11, 93, 59, 0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 15px;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .partners-pill-card:hover {
          border-color: #C9A227;
          box-shadow: 0 12px 25px rgba(11, 93, 59, 0.1) !important;
          transform: translateY(-5px);
          background-color: #fafff8 !important;
        }

        .logo-img-container {
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .partners-logo-img-v2 {
          max-height: 100%;
          max-width: 130px;
          object-fit: contain;
          transition: transform 0.4s ease;
        }

        .partners-logo-name-txt {
          font-size: 10px;
          font-weight: 500;
          color: #0B5D3B;
          margin-top: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          opacity: 0.6;
          transition: opacity 0.3s ease;
        }
        .partners-pill-card:hover .partners-logo-name-txt {
            opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default OurPartners;
