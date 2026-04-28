import React from "react";
import CountUp from "react-countup";

const StatItem = ({ end, label, suffix, icon, delay }) => {
    return (
        <div 
            className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0 float-reveal"
            style={{ animationDelay: `${delay}s`, opacity: 1 }}
        >
            <div className="compact-stat-card shadow-sm">
                <div className="stat-icon-circle">
                    <i className={icon}></i>
                </div>
                <div className="stat-info">
                    <h2 className="stat-number">
                        <CountUp end={end} duration={2} separator="," suffix={suffix} />
                    </h2>
                    <p className="stat-label-text">{label}</p>
                </div>
            </div>
        </div>
    );
};

const StatCounter = () => {
    const statsData = [
        { end: 500000, label: "Students Trained", suffix: "+", icon: "fas fa-user-graduate" },
        { end: 30, label: "Expert Trainers", suffix: "+", icon: "fas fa-chalkboard-teacher" },
        { end: 50000, label: "Scholarship Cards", suffix: "", icon: "fas fa-id-card" },
        { end: 25, label: "Job Oriented Courses", suffix: "+", icon: "fas fa-laptop-code" },
    ];

    return (
        <section 
            className="highlighted-stats-section" 
        >
            {/* Subtle Highlighted Background */}
            <div className="subtle-highlights">
                <div className="highlight-blur highlight-green"></div>
                <div className="highlight-blur highlight-gold"></div>
            </div>

            <div className="container position-relative z-index-2 py-5">
                <div className="text-center mb-5">
                    <h2 className="stats-title fade-up" style={{ opacity: 1 }}>
                        Why Choose <span className="text-brand-green">Digikhyber</span>
                    </h2>
                    <div className="underline-accent"></div>
                </div>
                
                <div className="row justify-content-center">
                    {statsData.map((stat, index) => (
                        <StatItem
                            key={index}
                            end={stat.end}
                            label={stat.label}
                            suffix={stat.suffix}
                            icon={stat.icon}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </div>

            <style>{`
                .highlighted-stats-section {
                    background-color: #ffffff;
                    padding: 80px 0;
                    position: relative;
                    overflow: hidden;
                }

                /* Background Highlights - Slightly more visible */
                .subtle-highlights {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    z-index: 1;
                }

                .highlight-blur {
                    position: absolute;
                    width: 500px;
                    height: 500px;
                    border-radius: 50%;
                    filter: blur(140px);
                    opacity: 0.15; /* Increased for visibility */
                    animation: highlightPulse 12s infinite alternate ease-in-out;
                }
                .highlight-green { background: #0B5D3B; top: -50px; left: -100px; }
                .highlight-gold { background: #C9A227; bottom: -50px; right: -100px; animation-delay: -6s; }

                @keyframes highlightPulse {
                    0% { transform: scale(1) translate(0, 0); }
                    100% { transform: scale(1.1) translate(30px, 20px); }
                }

                .stats-title {
                    font-size: 32px;
                    font-weight: 500;
                    color: #1a1a1a;
                    margin-bottom: 12px;
                    letter-spacing: -0.5px;
                }
                .text-brand-green { color: #0B5D3B; font-weight: 700; }
                .underline-accent { width: 45px; height: 3px; background: #C9A227; margin: 0 auto; border-radius: 2px; }

                .compact-stat-card {
                    background: #ffffff;
                    border: 1px solid rgba(11, 93, 59, 0.06);
                    border-radius: 12px;
                    padding: 22px 10px;
                    text-align: center;
                    transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
                    height: 100%;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.02);
                }
                .compact-stat-card:hover { 
                    transform: translateY(-5px); 
                    border-color: #0B5D3B;
                    box-shadow: 0 10px 25px rgba(11, 93, 59, 0.06) !important;
                }

                .stat-icon-circle {
                    font-size: 26px;
                    color: #C9A227;
                    margin-bottom: 12px;
                }

                .stat-number {
                    font-size: 26px;
                    font-weight: 700;
                    color: #0B5D3B;
                    margin-bottom: 4px;
                    line-height: 1;
                }

                .stat-label-text {
                    font-size: 10px;
                    color: #777;
                    text-transform: uppercase;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                    margin: 0;
                }

                .opacity-0 { opacity: 0; }
                .fade-up { animation: statFadeUp 0.3s ease forwards; }
                .float-reveal { animation: statFloatUp 0.3s cubic-bezier(0.19, 1, 0.22, 1) forwards; }

                @keyframes statFadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes statFloatUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

                /* RESPONSIVE PADDING */
                @media (max-width: 991px) {
                    .highlighted-stats-section { padding: 40px 0; overflow-x: hidden; }
                    .stats-title { font-size: 24px; }
                    .stat-number { font-size: 22px; }
                    .compact-stat-card { padding: 20px 10px; }
                }
            `}</style>
        </section>
    );
};

export default StatCounter;
