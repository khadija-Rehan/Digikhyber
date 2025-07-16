import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAmazon,
  faShopify,
  faReact,
  faPython,
} from "@fortawesome/free-brands-svg-icons";
import { faBullhorn, faRobot, faLock } from "@fortawesome/free-solid-svg-icons";
import { faLaptopCode } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import TextReveal from "./TextReveal";

const courses = [
  {
    name: "Artificial Intelligence",
    icon: faRobot,
    category: "High Tech",
  },
  {
    name: "Cyber Security",
    icon: faLock,
    category: "High Tech",
  },
  {
    name: "Amazon VA",
    icon: faAmazon,
    category: "E-Commerce",
  },
  {
    name: "Digital Marketing & AI",
    icon: faBullhorn,
    category: "Marketing",
  },
  {
    name: "Shopify & Daraz",
    icon: faShopify,
    category: "E-Commerce",
  },
  {
    name: "React & Node JS Web Development",
    icon: faReact,
    category: "Development",
  },
  {
    name: "Python Programming",
    icon: faPython,
    category: "Programming",
  },
  {
    name: "MERN Stack Development",
    icon: faLaptopCode,
    category: "Development",
  },
];

const CoursesCategory = () => {
  return (
    <div className="courses-cat pt-5 pb-5">
      <div className="container">
        <p className="white font-14 d-p">Courses Category</p>
        <h2 className="font-32">
          <TextReveal text="Courses Category" />
        </h2>
        <div className="row mt-3 mb-3">
          {courses.map((course, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="h-100">
                <Link to="/courses">
                  <div className="course-cat d-flex align-items-center gap-3 h-100">
                    <button className="course-icon-btn text-white">
                      <FontAwesomeIcon icon={course.icon} size="1x" />
                    </button>
                    <div className="left">
                      <h6 className="fw-semi-bold mb-1">{course.name}</h6>
                      <p className="fs-6 mb-0">View Course</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesCategory;
