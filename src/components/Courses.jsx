import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import TextReveal from "./TextReveal";
import { AVAILABLE_COURSES } from "../utils/courses";

const StarRatingInline = () => (
  <span style={{ color: '#C9A227', fontSize: '13px', letterSpacing: '2px' }}>
    ★★★★★
  </span>
);

const Courses = () => {
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

  const coursesShow = AVAILABLE_COURSES.slice(0, 6);

  return (
    <section 
      ref={sectionRef}
      className={`courses-section-premium position-relative overflow-hidden py-5 ${isVisible ? 'is-visible' : ''}`}
    >
      
      {/* Subtle Technical Mesh Background */}
      <div className="courses-tech-mesh"></div>

      <div className="container position-relative z-1 py-lg-4">

        {/* Section Header */}
        <div className={`row mb-5 align-items-end ${isVisible ? 'catalog-fade-in' : 'hide-initially'}`}>
          <div className="col-lg-8">
            <div className="mb-3">
                <span className="training-catalog-badge">
                    <span className="catalog-pulse"></span>
                    Official Training Catalog
                </span>
            </div>
            <h2 className="catalog-heading mb-4">
              <TextReveal text="Learn, Grow, & Succeed" />
            </h2>
            <p className="catalog-subtext">
              Digikhyber equips youth with in-demand digital skills through
              hands-on practical training — empowering them to thrive in the global digital economy.
            </p>
          </div>
          <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
            <Link to="/courses">
              <button className="btn-catalog-outline">
                View All Courses
              </button>
            </Link>
          </div>
        </div>

        {/* Staggered Course Grid */}
        <div className="row g-4 justify-content-center">
          {coursesShow.map((course, index) => (
            <div
              className={`col-lg-4 col-md-6 col-12 ${isVisible ? 'catalog-card-reveal' : 'hide-initially'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              key={index}
            >
              <div className="premium-course-card bg-white shadow-sm h-100 d-flex flex-column">
                
                {/* Image Section with Zoom */}
                <div className="card-img-wrapper position-relative overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.name}
                    className="card-img-top course-img-zoom"
                  />
                  <div className="card-badge-overlay">
                    <span className="badge-tech-tag">Featured</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="card-body-content p-3 d-flex flex-column flex-grow-1">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="card-meta-text">DigiKhyber Skills</span>
                    <StarRatingInline />
                  </div>

                  <h3 className="course-card-title mb-3 flex-grow-1">
                    {course.name}
                  </h3>

                  <div className="card-footer-action pt-3 mt-auto border-top-light">
                    <div className="d-flex align-items-center justify-content-between w-100">
                        <div className="provider-info">
                            <span className="provider-label">Provider</span>
                            <span className="provider-name">DigiKhyber</span>
                        </div>
                        <Link
                            to={`/course-detail?course=${encodeURIComponent(course.name)}`}
                            className="btn-card-details"
                        >
                            Details &rarr;
                        </Link>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .courses-section-premium {
          background-color: #f8fbf9;
        }

        .hide-initially {
            opacity: 0;
            transform: translateY(20px);
        }

        /* Tech Mesh Pattern */
        .courses-tech-mesh {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background-image: radial-gradient(rgba(11, 93, 59, 0.04) 1.5px, transparent 1.5px);
            background-size: 30px 30px;
            z-index: 0;
            pointer-events: none;
        }

        /* Catalog Badge */
        .training-catalog-badge {
            background: #0B5D3B;
            color: white;
            padding: 5px 16px;
            border-radius: 50px;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 1px;
            text-transform: uppercase;
            border: 2px solid #C9A227;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 12px rgba(11, 93, 59, 0.1);
        }

        .catalog-pulse {
            width: 7px; height: 7px;
            background: #C9A227;
            border-radius: 50%;
            animation: catalogPulse 2s infinite;
        }
        @keyframes catalogPulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.5); opacity: 0.5; }
            100% { transform: scale(1); opacity: 1; }
        }

        .catalog-heading {
            font-size: 2rem;
            font-weight: 600;
            color: #1a2b25;
            letter-spacing: -1px;
        }

        .catalog-subtext {
            font-size: 15px;
            color: #526066;
            line-height: 1.7;
            max-width: 650px;
        }

        .btn-catalog-outline {
            background: transparent;
            color: #0B5D3B;
            border: 1.5px solid #0B5D3B;
            padding: 8px 22px;
            border-radius: 50px;
            font-size: 13px;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        .btn-catalog-outline:hover {
            background: #0B5D3B;
            color: white;
            box-shadow: 0 4px 15px rgba(11, 93, 59, 0.2);
        }

        /* Premium Cards */
        .premium-course-card {
            border-radius: 16px;
            border: 1px solid rgba(11, 93, 59, 0.06);
            transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
            overflow: hidden;
        }
        .premium-course-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 35px rgba(11, 93, 59, 0.1) !important;
            border-color: #C9A227;
        }

        .card-img-wrapper {
            height: 170px;
        }
        .course-img-zoom {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s ease;
        }
        .premium-course-card:hover .course-img-zoom {
            transform: scale(1.08);
        }

        .card-badge-overlay {
            position: absolute;
            top: 12px; right: 12px;
        }
        .badge-tech-tag {
            background: rgba(11, 93, 59, 0.9);
            color: white;
            font-size: 9px;
            text-transform: uppercase;
            padding: 3px 10px;
            border-radius: 4px;
            letter-spacing: 1px;
            backdrop-filter: blur(4px);
        }

        .card-meta-text {
            font-size: 9px;
            font-weight: 600;
            color: #C9A227;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .course-card-title {
            font-size: 1.05rem;
            font-weight: 600;
            color: #1a2b25;
            line-height: 1.4;
            min-height: 2.8em; /* Adjusted for compactness */
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .border-top-light {
            border-top: 1px solid #f0f4f2;
        }

        .provider-label {
            display: block;
            font-size: 8px;
            color: #999;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .provider-name {
            display: block;
            font-size: 11px;
            font-weight: 600;
            color: #0B5D3B;
        }

        .btn-card-details {
            background: #0B5D3B;
            color: white;
            text-decoration: none;
            font-size: 11px;
            font-weight: 500;
            padding: 6px 15px;
            border-radius: 6px;
            transition: all 0.3s ease;
        }
        .btn-card-details:hover {
            background: #1a2b25;
            color: white;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        /* Entrance Animations - Triggered by isVisible */
        .catalog-fade-in {
            animation: catFadeIn 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }
        .catalog-card-reveal {
            animation: catReveal 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }
        
        @keyframes catFadeIn {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes catReveal {
            from { 
                opacity: 0; 
                transform: translateY(80px);
            }
            to { 
                opacity: 1; 
                transform: translateY(0);
            }
        }
      `}</style>
    </section>
  );
};

export default Courses;

