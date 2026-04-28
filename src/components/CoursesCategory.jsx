import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAmazon,
  faShopify,
  faReact,
  faPython,
} from "@fortawesome/free-brands-svg-icons";
import { faBullhorn, faRobot, faLock, faLaptopCode, faChevronDown, faChevronUp, faArrowRight, faTimes } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import TextReveal from "./TextReveal";
import { AVAILABLE_COURSES } from "../utils/courses";

const categories = [
  { id: "ai", name: "Artificial Intelligence", icon: faRobot },
  { id: "cyber", name: "Cyber Security", icon: faLock },
  { id: "amazon", name: "Amazon VA", icon: faAmazon },
  { id: "marketing", name: "Digital Marketing & AI", icon: faBullhorn },
  { id: "shopify", name: "Shopify & Daraz", icon: faShopify },
  { id: "web", name: "React & Node JS Web Development", icon: faReact },
  { id: "python", name: "Python Programming", icon: faPython },
  { id: "mern", name: "MERN Stack Development", icon: faLaptopCode },
];

const categoryMapping = {
    "ai": ["Artificial Intelligence (AI)", "Machine Learning & Data Science", "Python Programming for Everyone"],
    "cyber": ["National Cyber Security", "Penetration Testing Web Hacking", "BlockChain Development"],
    "amazon": ["Amazon Virtual Assistant", "Freelancing Program"],
    "marketing": ["Full Stack Digital Marketing & AI", "Advanced Google Ads", "Search Engine Optimization - SEO", "YouTube Monetization"],
    "shopify": ["Shopify & Daraz Business", "Freelancing Program"],
    "web": ["React & Node.js Full Stack Development", "WordPress Website Development", "PHP Laravel Web Development"],
    "python": ["Python Programming for Everyone"],
    "mern": ["MERN Stack Web Development", "UI/UX Designing for Web & App"]
};

const CoursesCategory = () => {
  const [selectedCatId, setSelectedCatId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const explorerRef = useRef(null);
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

  const handleCategoryClick = (id) => {
    if (selectedCatId === id) {
      setSelectedCatId(null);
    } else {
      setSelectedCatId(id);
      // Smooth scroll to the explorer section
      setTimeout(() => {
        explorerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  };

  const getRelatedCourses = () => {
    if (!selectedCatId) return [];
    const names = categoryMapping[selectedCatId] || [];
    return AVAILABLE_COURSES.filter(c => names.includes(c.name));
  };

  const activeCourses = getRelatedCourses();
  const activeCatName = categories.find(c => c.id === selectedCatId)?.name;

  return (
    <div 
        ref={sectionRef}
        className="courses-cat position-relative overflow-hidden pt-5 pb-5 custom-courses-bg-unique"
    >
      
      {/* Unique Hexagonal Tech Background Layer */}
      <div className="hex-tech-bg"></div>
      <div className="shimmer-overlay"></div>

      <div className="container position-relative z-1">
        
        {/* Category Batch */}
        <div className="category-badge-wrapper mb-4">
            <span className="category-badge">
                <span className="dot gold-dot"></span>
                Course Categories
            </span>
        </div>

        <h2 className="font-32 text-dark mb-5">
          <TextReveal text="Select a Category to Explore" />
        </h2>
        
        <div className="row mt-3 mb-3 g-4">
          {categories.map((cat, index) => (
            <div key={cat.id} className="col-lg-3 col-md-6 col-sm-12">
                <div 
                  className={`premium-category-pill d-flex align-items-center h-100 position-relative ${isVisible ? 'course-fade-in' : 'opacity-0'} ${selectedCatId === cat.id ? 'active-pill' : 'bg-white shadow-sm'}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  
                  <div className="pill-icon-circle position-absolute d-flex justify-content-center align-items-center" style={{ left: '8px', top: '50%', transform: 'translateY(-50%)' }}>
                    <FontAwesomeIcon icon={cat.icon} className="pill-icon" />
                  </div>

                  <div className="pill-content w-100 text-center d-flex flex-column justify-content-center" style={{ paddingLeft: '65px', paddingRight: '35px' }}>
                    <h6 className="mb-0 text-dark" style={{ fontSize: '0.9rem', lineHeight: '1.2', fontWeight: '500' }}>{cat.name}</h6>
                  </div>

                  <div className="position-absolute end-0 me-3" style={{ opacity: 0.4 }}>
                    <FontAwesomeIcon icon={selectedCatId === cat.id ? faChevronUp : faChevronDown} style={{ fontSize: '12px' }} />
                  </div>
                  
                </div>
            </div>
          ))}
        </div>

        {/* EXPANDABLE SUBJECTS BOX */}
        <div 
            ref={explorerRef}
            className={`explorer-box-container mt-5 ${selectedCatId ? 'expanded' : ''}`}
        >
            {selectedCatId && (
                <div className="explorer-content p-4 p-lg-5 rounded-4 shadow-lg">
                    <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
                        <div>
                            <h4 className="fw-medium text-dark mb-1">Related Subjects: {activeCatName}</h4>
                            <p className="text-muted small mb-0">Explore specialized training modules.</p>
                        </div>
                        <button className="btn-close-cat" onClick={() => setSelectedCatId(null)}>
                             <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>

                    <div className="row g-4 justify-content-start">
                        {activeCourses.map((item, idx) => (
                            <div key={idx} className="col-lg-4 col-md-6 col-sm-12 subject-slide-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                                <Link to={`/course-detail?course=${encodeURIComponent(item.name)}`} className="text-decoration-none">
                                    <div className="subject-card h-100 bg-white border border-light shadow-sm overflow-hidden d-flex flex-column">
                                        <div className="subject-img-wrap">
                                            <img src={item.image} alt={item.name} className="w-100 h-100 object-fit-cover" />
                                            <div className="subject-overlay">
                                                <span className="badge-enroll">View Course</span>
                                            </div>
                                        </div>
                                        <div className="p-3 flex-grow-1 d-flex align-items-center justify-content-start text-start">
                                            <h6 className="mb-0 text-dark" style={{ fontSize: '0.92rem', fontWeight: '500', lineHeight: '1.4' }}>{item.name}</h6>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                        {activeCourses.length === 0 && (
                            <div className="text-center py-5 w-100">
                                <p className="text-muted">Stay tuned! Detailed subjects for this category are being updated.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
      </div>

      <style>{`
        .custom-courses-bg-unique {
            background-color: #f8fcfa;
        }

        .tech-bg-grid {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background-image: 
                linear-gradient(rgba(11, 93, 59, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(11, 93, 59, 0.05) 1px, transparent 1px);
            background-size: 40px 40px;
            z-index: 0;
            animation: moveGrid 20s linear infinite;
        }

        .shimmer-overlay {
            position: absolute;
            top: 0; left: -100%; width: 200%; height: 100%;
            background: linear-gradient(120deg, transparent, rgba(201, 162, 39, 0.03), rgba(201, 162, 39, 0.06), rgba(201, 162, 39, 0.03), transparent);
            z-index: 1;
            animation: shimmerEffect 10s infinite ease-in-out;
            pointer-events: none;
        }

        @keyframes moveGrid { 0% { transform: translateY(0); } 100% { transform: translateY(40px); } }
        @keyframes shimmerEffect { 0% { transform: translateX(-20%) skewX(-15deg); } 100% { transform: translateX(40%) skewX(-15deg); } }

        /* Category Pill Styling */
        .premium-category-pill {
            border-radius: 50px; 
            min-height: 65px;
            padding: 8px 0;
            border: 1px solid rgba(11, 93, 59, 0.1); 
            transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
            cursor: pointer;
            background: white;
            user-select: none;
        }
        
        .premium-category-pill:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(11, 93, 59, 0.1) !important;
            border-color: #0B5D3B;
        }

        .active-pill {
            background-color: #0B5D3B !important;
            border-color: #C9A227 !important;
            color: white !important;
            box-shadow: 0 8px 15px rgba(11, 93, 59, 0.2);
            transform: translateY(-2px);
        }

        .active-pill h6 { color: white !important; }
        .active-pill .pill-icon-circle { background-color: #C9A227 !important; }
        .active-pill .pill-icon { color: white !important; }
        .active-pill .end-0 { opacity: 1 !important; color: #C9A227; }

        .pill-icon-circle {
            width: 48px; height: 48px;
            border-radius: 50%;
            background-color: #f0f7f3;
            transition: all 0.3s ease;
            border: 1px solid rgba(11, 93, 59, 0.05);
        }
        
        .pill-icon { font-size: 1.2rem; color: #0B5D3B; transition: all 0.4s ease; }

        /* EXPLORER BOX */
        .explorer-box-container {
            max-height: 0;
            opacity: 0;
            overflow: hidden;
            transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .explorer-box-container.expanded {
            max-height: 2000px;
            opacity: 1;
            margin-bottom: 50px;
        }

        .explorer-content {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(11, 93, 59, 0.15);
            position: relative;
        }

        .btn-close-cat {
            color: #0B5D3B;
            background: #f0f7f3;
            border: 1.5px solid #0B5D3B;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            transition: all 0.3s ease;
        }
        .btn-close-cat:hover {
            background: #0B5D3B;
            border-color: #C9A227;
            color: white;
            box-shadow: 0 4px 12px rgba(11, 93, 59, 0.2);
            transform: rotate(90deg);
        }

        /* Subject Cards */
        .subject-card {
            border-radius: 12px;
            transition: all 0.4s ease;
        }
        .subject-card:hover {
            transform: scale(1.03);
            border-color: #C9A227 !important;
            box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important;
            background-color: #fafff8 !important;
        }

        .subject-img-wrap {
            height: 140px;
            position: relative;
            overflow: hidden;
        }
        .subject-overlay {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(11, 93, 59, 0.4);
            display: flex; align-items: center; justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .subject-card:hover .subject-overlay { opacity: 1; }
        .badge-enroll {
            background: white; color: #0B5D3B; padding: 6px 15px; border-radius: 50px;
            font-size: 12px; font-weight: 600;
        }

        .subject-slide-in {
            opacity: 0;
            animation: subjectEntrance 0.6s ease forwards;
        }
        @keyframes subjectEntrance {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Category Badge */
        .category-badge {
            background: #0B5D3B; color: white; padding: 6px 16px; border-radius: 50px;
            font-size: 13px; font-weight: 600; border: 2px solid #C9A227;
            display: inline-flex; align-items: center; gap: 8px;
            box-shadow: 0 4px 10px rgba(11, 93, 59, 0.2);
        }
        .gold-dot { width: 8px; height: 8px; background: #C9A227; border-radius: 50%; animation: pulseGold 2s infinite; }
        @keyframes pulseGold { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }

        .course-fade-in { opacity: 0; animation: safeSlideUp 0.8s ease forwards; }
        @keyframes safeSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default CoursesCategory;
