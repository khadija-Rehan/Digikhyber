import React from "react";

const Notificationbar = () => {
    return (
        <div className="marquee-section style-header">
            <div className="mycustom-marque header-marque" style={{ background: '#0B5D3B', borderBottom: '2px solid #C9A227' }}>
                <div className="scrolling-wrap">
                    <div className="comm">
                        <div></div>
                        <div className="cmn-textslide">
                            <img className="white-icon" width="18" height="18" src="https://img.icons8.com/windows/32/admission.png" alt="admission" />
                            <span className="marquee-text highlight">Applications Are Closing Soon</span>
                        </div>
                        <div className="cmn-textslide">
                            <img className="white-icon" width="18" height="18" src="https://img.icons8.com/ios/50/parliament.png" alt="parliament" />
                            <span className="marquee-text">Elite E-Learning Portal</span>
                        </div>
                        <div className="cmn-textslide">
                            <img className="white-icon" width="18" height="18" src="https://img.icons8.com/ios-glyphs/30/laptop.png" alt="laptop" />
                            <span className="marquee-text">Laptop Opportunities</span>
                        </div>
                        <div className="cmn-textslide">
                            <img className="white-icon" width="18" height="18" src="https://img.icons8.com/windows/32/solar-panel.png" alt="solar-panel" />
                            <span className="marquee-text highlight">Solar Panel Opportunities</span>
                        </div>
                        <div className="cmn-textslide">
                            <img className="white-icon" width="18" height="18" src="https://img.icons8.com/ios-glyphs/30/scholarship.png" alt="scholarship" />
                            <span className="marquee-text">Scholarship Card Opportunities</span>
                        </div>
                        <div className="cmn-textslide">
                            <img className="white-icon" width="18" height="18" src="https://img.icons8.com/ios/50/add-dollar.png" alt="add-dollar" />
                            <span className="marquee-text">Taleem Finance Opportunities</span>
                        </div>
                        <div className="cmn-textslide">
                            <img className="white-icon" width="18" height="18" src="https://img.icons8.com/external-filled-color-icons-papa-vector/78/external-Study-Abroad-expats-filled-color-icons-papa-vector.png" alt="abroad" />
                            <span className="marquee-text highlight">Study Abroad Consultancy Opportunities</span>
                        </div>
                        <div className="cmn-textslide">
                            <img className="white-icon" width="18" height="18" src="https://img.icons8.com/ios-glyphs/30/internship.png" alt="internship" />
                            <span className="marquee-text">National & Global Internship Opportunities</span>
                        </div>
                        <div className="cmn-textslide">
                            <img className="white-icon" width="18" height="18" src="https://img.icons8.com/external-others-phat-plus/64/external-courses-online-courses-outline-others-phat-plus-30.png" alt="courses" />
                            <span className="marquee-text">25+ Hands on Practical Courses</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Add CSS for white icons */}
            <style jsx>{`
                .marquee-section {
                    position: relative;
                    z-index: 100;
                }
                .mycustom-marque {
                    padding: 4px 0;
                    display: flex;
                    align-items: center;
                }
                .white-icon {
                    filter: brightness(0) invert(1);
                    opacity: 0.9;
                    margin-right: 8px;
                }
                .cmn-textslide {
                    display: flex;
                    align-items: center;
                    padding-right: 35px;
                }
                .marquee-text {
                    color: white;
                    font-family: 'Jost', sans-serif;
                    font-size: 11.5px;
                    font-weight: 500;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                }
                .highlight {
                    color: #C9A227;
                    font-weight: 600;
                }
            `}</style>
        </div>
    );
};

export default Notificationbar;