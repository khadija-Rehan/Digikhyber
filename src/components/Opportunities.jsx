import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const opportunities = [
  {
    id: 1,
    title: "Scholarship Card",
    icon: "fas fa-id-card",
    description: "Get free IT training under the Government of Punjab's Scholarship Card initiative for deserving youth.",
    link: "/scholarship-card",
    tag: "Most Popular",
  },
  {
    id: 2,
    title: "Laptop Scheme",
    icon: "fas fa-laptop",
    description: "Eligible students receive a free laptop to accelerate their digital learning journey under Punjab's scheme.",
    link: "/free-laptops",
    tag: "Limited Seats",
  },
  {
    id: 3,
    title: "Solar Scheme",
    icon: "fas fa-solar-panel",
    description: "Avail free solar panels for your home under the Punjab Government's green energy initiative.",
    link: "/free-solarpanels",
    tag: "Green Energy",
  },
  {
    id: 4,
    title: "Taleem Finance",
    icon: "fas fa-coins",
    description: "Access interest-free education financing to continue your learning without financial burden.",
    link: "/taleem-finance",
    tag: "Interest Free",
  },
];

const Opportunities = () => {
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

  return (
    <section 
        ref={sectionRef}
        className={`opp-wrap-reveal ${isVisible ? 'is-visible' : ''}`}
    >
      <section className="opp-wrap">
        {/* Dot pattern overlay */}
        <div className="opp-pattern"></div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>

          {/* Section Header — Centered */}
          <div className="text-center mb-5">
            <span className="opp-label">GOVERNMENT INITIATIVES</span>
            <h2 className="opp-heading mt-3">
              Scholarship Card <span className="opp-gold-text">Benefits</span>
            </h2>
            <div className="opp-center-line mx-auto mt-3"></div>
            <p className="opp-sub-text mt-3">
              Unlock premium government schemes — Scholarship Card, Laptop Scheme, Solar Scheme and Taleem Finance.
            </p>
          </div>

          {/* Cards */}
          <div className="row g-4">
            {opportunities.map((opp) => (
              <div key={opp.id} className="col-12 col-sm-6 col-lg-3">
                <div className="opp-flip">
                  <div className="opp-flip-inner">

                    {/* FRONT */}
                    <div className="opp-face opp-front">
                      <div className="opp-icon-circle">
                        <i className={opp.icon}></i>
                      </div>
                      <h5 className="opp-card-title">{opp.title}</h5>
                      <div className="opp-card-line"></div>
                    </div>

                    {/* BACK */}
                    <div className="opp-face opp-back">
                      <div className="opp-back-icon-wrap">
                        <i className={opp.icon}></i>
                      </div>
                      <h5 className="opp-back-heading">{opp.title}</h5>
                      <p className="opp-back-para">{opp.description}</p>
                      <Link to={opp.link} className="opp-cta-btn">
                        Apply Now <i className="fas fa-arrow-right ms-2"></i>
                      </Link>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .opp-wrap-reveal {
            opacity: 0;
            transform: translateY(40px);
            transition: all 1.2s cubic-bezier(0.19, 1, 0.22, 1);
          }
          .opp-wrap-reveal.is-visible {
            opacity: 1;
            transform: translateY(0);
          }
          /* ======= SECTION ======= */
          .opp-wrap {
            background: #ffffff;
            padding: 80px 0 90px;
            font-family: 'Jost', sans-serif;
            position: relative;
            overflow: hidden;
          }


          /* Dot pattern */
          .opp-pattern {
            position: absolute;
            inset: 0;
            background-image: radial-gradient(rgba(11,93,59,0.07) 1.5px, transparent 1.5px);
            background-size: 26px 26px;
            pointer-events: none;
            z-index: 1;
          }

          /* Decorative circle */
          .opp-wrap::after {
            content: '';
            position: absolute;
            width: 500px; height: 500px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(201,162,39,0.05) 0%, transparent 70%);
            bottom: -150px; right: -100px;
            pointer-events: none;
          }

          /* ======= HEADER ======= */
          .opp-label {
            display: inline-block;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 3px;
            color: #0B5D3B;
            text-transform: uppercase;
            background: rgba(11,93,59,0.08);
            border: 1px solid rgba(11,93,59,0.18);
            padding: 5px 16px;
            border-radius: 50px;
          }

          .opp-heading {
            font-size: 30px;
            font-weight: 400;
            color: #111;
            line-height: 1.3;
            margin: 0;
            font-family: 'Jost', sans-serif;
          }

          .opp-gold-text {
            color: #0B5D3B;
            font-weight: 700;
          }

          .opp-center-line {
            width: 55px;
            height: 3px;
            background: linear-gradient(90deg, #0B5D3B, #C9A227);
            border-radius: 2px;
          }

          .opp-sub-text {
            font-size: 16.5px;
            color: #5a6b60;
            font-weight: 500;
            line-height: 1.7;
            max-width: 580px;
            margin: 0 auto;
            text-align: center;
          }

          /* ======= FLIP CARD ======= */
          .opp-flip {
            height: 290px;
            perspective: 1000px;
          }

          .opp-flip-inner {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1);
          }

          .opp-flip:hover .opp-flip-inner {
            transform: rotateY(180deg);
          }

          .opp-face {
            position: absolute;
            inset: 0;
            border-radius: 18px;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 28px 22px;
          }

          /* ======= FRONT ======= */
          .opp-front {
            background: #ffffff;
            border: 1px solid #dde8e2;
            box-shadow: 0 6px 28px rgba(11,93,59,0.09);
            transition: box-shadow 0.3s ease, transform 0.3s ease;
          }

          .opp-flip:hover .opp-front {
            box-shadow: 0 14px 40px rgba(11,93,59,0.14);
          }

          .opp-number {
            font-size: 52px;
            font-weight: 800;
            color: rgba(11,93,59,0.07);
            position: absolute;
            top: 8px; right: 16px;
            line-height: 1;
          }

          .opp-icon-circle {
            width: 70px; height: 70px;
            border-radius: 50%;
            background: #0B5D3B;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 26px;
            color: #ffffff;
            margin-bottom: 18px;
            box-shadow: 0 8px 22px rgba(11,93,59,0.3);
            transition: transform 0.35s ease;
          }

          .opp-flip:hover .opp-icon-circle {
            transform: scale(1.08);
          }

          .opp-card-title {
            font-size: 18px !important;
            font-weight: 600 !important;
            color: #111 !important;
            text-align: center;
            margin-bottom: 12px !important;
            font-family: 'Jost', sans-serif !important;
          }

          .opp-card-line {
            width: 40px;
            height: 2px;
            background: linear-gradient(90deg, #0B5D3B, #C9A227);
            border-radius: 2px;
            margin-bottom: 12px;
          }

          .opp-card-tag {
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: #C9A227;
            background: rgba(201,162,39,0.1);
            border: 1px solid rgba(201,162,39,0.3);
            padding: 3px 12px;
            border-radius: 50px;
          }

          /* ======= BACK ======= */
          .opp-back {
            background: #0B5D3B;
            transform: rotateY(180deg);
            box-shadow: 0 10px 35px rgba(11,93,59,0.25);
          }

          .opp-back-icon-wrap {
            width: 50px; height: 50px;
            border-radius: 12px;
            background: rgba(201,162,39,0.2);
            border: 1.5px solid rgba(201,162,39,0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            color: #C9A227;
            margin-bottom: 14px;
          }

          .opp-back-heading {
            font-size: 17px !important;
            font-weight: 600 !important;
            color: #ffffff !important;
            margin-bottom: 10px !important;
            text-align: center;
            font-family: 'Jost', sans-serif !important;
          }

          .opp-back-para {
            font-size: 12.5px !important;
            font-weight: 400 !important;
            color: rgba(255,255,255,0.88) !important;
            text-align: center;
            line-height: 1.65;
            margin-bottom: 18px !important;
          }

          .opp-cta-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: #C9A227;
            color: #fff !important;
            text-decoration: none !important;
            font-family: 'Jost', sans-serif;
            padding: 9px 22px;
            border-radius: 50px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            transition: all 0.3s ease;
            box-shadow: 0 4px 14px rgba(201,162,39,0.35);
          }

          .opp-cta-btn:hover {
            background: #ffffff;
            color: #0B5D3B !important;
            transform: translateY(-2px);
          }

          @media (max-width: 768px) {
            .opp-header-row { flex-direction: column; }
            .opp-sub-text { text-align: left; max-width: 100%; }
          }
        `}</style>
      </section>
    </section>
  );
};

export default Opportunities;
