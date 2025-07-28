import React from "react";
import Clip from "../assets/mortarboard-svgrepo-com.svg";

const Notificationbar = () => {
  return (
    <div className="marquee-section style-header">
      <div className="mycustom-marque header-marque theme-blue-bg">
        <div className="scrolling-wrap">
          <div className="comm">
            <div></div>
            <div className="cmn-textslide">
              <img
                className="white-icon"
                width="30"
                height="30"
                src="https://img.icons8.com/windows/32/admission.png"
                alt="admission"
              />
              {/* Admissions Are Closing Soon */}
              Applications Are Closing Soon
            </div>
            <div className="cmn-textslide">
              <img
                className="white-icon"
                width="30"
                height="30"
                src="https://img.icons8.com/ios/50/parliament.png"
                alt="parliament"
              />
              Endorsed By Government
            </div>
            <div className="cmn-textslide">
              <img
                className="white-icon"
                width="30"
                height="30"
                src="https://img.icons8.com/ios-glyphs/30/laptop.png"
                alt="laptop"
              />
              Laptop Opportunities
            </div>
            <div className="cmn-textslide">
              <img
                className="white-icon"
                width="30"
                height="30"
                src="https://img.icons8.com/windows/32/solar-panel.png"
                alt="solar-panel"
              />
              Solar Panel Opportunities
            </div>
            <div className="cmn-textslide">
              <img
                className="white-icon"
                width="30"
                height="30"
                src="https://img.icons8.com/ios-glyphs/30/scholarship.png"
                alt="scholarship"
              />
              Scholarship Card Opportunities
            </div>
            <div className="cmn-textslide">
              <img
                className="white-icon"
                width="30"
                height="30"
                src="https://img.icons8.com/ios/50/add-dollar.png"
                alt="add-dollar"
              />
              Taleem Finance Opportunities
            </div>
            <div className="cmn-textslide">
              <img
                className="white-icon"
                width="30"
                height="30"
                src="https://img.icons8.com/external-filled-color-icons-papa-vector/78/external-Study-Abroad-expats-filled-color-icons-papa-vector.png"
                alt="external-Study-Abroad-expats-filled-color-icons-papa-vector"
              />
              {/* Study Abroad Opportunities */}
              Study Abroad Consultancy Opportunities
            </div>
            <div className="cmn-textslide">
              <img
                className="white-icon"
                width="30"
                height="30"
                src="https://img.icons8.com/ios-glyphs/30/internship.png"
                alt="internship"
              />
              National & Global Internship Opportunities
            </div>
            <div className="cmn-textslide">
              <img
                className="white-icon"
                width="30"
                height="30"
                src="https://img.icons8.com/external-others-phat-plus/64/external-courses-online-courses-outline-others-phat-plus-30.png"
                alt="external-courses-online-courses-outline-others-phat-plus-30"
              />
              25+ Hands on Practical Courses
            </div>
            <div className="cmn-textslide">
              <img
                className="white-icon"
                width="30"
                height="30"
                src="https://img.icons8.com/windows/32/admission.png"
                alt="admission"
              />
              {/* Admissions Are Closing Soon */}
              Applications Are Closing Soon
            </div>
            <div className="cmn-textslide">
              <img
                className="white-icon"
                width="30"
                height="30"
                src="https://img.icons8.com/ios/50/parliament.png"
                alt="parliament"
              />
              {/* Endorsed By Government */}
              Endorsed By Ministry of School & Higher Education Government of Punjab
            </div>
            <div className="cmn-textslide">
              <img
                className="white-icon"
                width="30"
                height="30"
                src="https://img.icons8.com/ios-glyphs/30/laptop.png"
                alt="laptop"
              />
              Laptop Opportunities
            </div>
            <div className="cmn-textslide">
              <img
                className="white-icon"
                width="30"
                height="30"
                src="https://img.icons8.com/windows/32/solar-panel.png"
                alt="solar-panel"
              />
              Solar Panel Opportunities
            </div>
            <div className="cmn-textslide">
              <img
                className="white-icon"
                width="30"
                height="30"
                src="https://img.icons8.com/ios-glyphs/30/scholarship.png"
                alt="scholarship"
              />
              Scholarship Card Opportunities
            </div>
            <div className="cmn-textslide">
              <img
                className="white-icon"
                width="30"
                height="30"
                src="https://img.icons8.com/ios/50/add-dollar.png"
                alt="add-dollar"
              />
              Taleem Finance Opportunities
            </div>
            <div className="cmn-textslide">
              <img
                className="white-icon"
                width="30"
                height="30"
                src="https://img.icons8.com/external-filled-color-icons-papa-vector/78/external-Study-Abroad-expats-filled-color-icons-papa-vector.png"
                alt="external-Study-Abroad-expats-filled-color-icons-papa-vector"
              />
              Taleem Abroad Opportunities
            </div>
            <div className="cmn-textslide">
              <img
                className="white-icon"
                width="30"
                height="30"
                src="https://img.icons8.com/ios-glyphs/30/internship.png"
                alt="internship"
              />
              National & Global Internship Opportunities
            </div>
            <div className="cmn-textslide">
              <img
                className="white-icon"
                width="30"
                height="30"
                src="https://img.icons8.com/external-others-phat-plus/64/external-courses-online-courses-outline-others-phat-plus-30.png"
                alt="external-courses-online-courses-outline-others-phat-plus-30"
              />
              25+ Hands on Practical Courses
            </div>
          
        </div>
      </div>

      {/* Add CSS for white icons */}
      <style jsx>{`
        .white-icon {
          filter: brightness(0) invert(1);
          vertical-align: middle;
          margin-right: 8px;
        }
        .cmn-textslide {
          display: flex;
          align-items: center;
        }
      `}</style>
    </div>
    </div>
  );
};

export default Notificationbar;
