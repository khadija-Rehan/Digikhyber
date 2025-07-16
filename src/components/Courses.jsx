import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import StarRating from "./StarRating";
import { Link } from "react-router-dom";
import TextReveal from "./TextReveal";
import { AVAILABLE_COURSES } from "../utils/courses";

const Courses = () => {
  const [cardsPerRow, setCardsPerRow] = useState(3);

  const updateCardsPerRow = () => {
    const width = window.innerWidth;
    if (width <= 600) {
      setCardsPerRow(1);
    } else if (width <= 992) {
      setCardsPerRow(2);
    } else {
      setCardsPerRow(3);
    }
  };

  useEffect(() => {
    updateCardsPerRow();
    window.addEventListener("resize", updateCardsPerRow);

    AOS.init({
      duration: 800,
      offset: 300,
      once: false,
    });
    return () => {
      window.removeEventListener("resize", updateCardsPerRow);
    };
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [cardsPerRow]);


    // Only show 6 courses
    const courses = AVAILABLE_COURSES.slice(0, 6).map((course) => ({
        image: course.image,
        title: course.name,
    }));

  return (
    <div className="all-courses container">
      <p className="white font-14 d-p-2">Our Courses</p>
      <div className="row pt-5 pb-5">
        <div className="col-lg-6 col-md-12">
          <h2 className="font-32">
            <TextReveal text="Learn, grow, succeed" />
          </h2>
          <p className="font-15 l-h-1">
            Hunarmand Punjab equips youth with in-demand digital skills through
            hands-on practical training based on an internationally recognized
            curriculum — empowering them to secure online job opportunities and
            thrive in the global digital economy.
          </p>
        </div>
        <div className="col-lg-6 col-md-12">
          <Link to="/courses">
            <button className="btn-green view-all">View All Courses</button>
          </Link>
        </div>
      </div>
      <div className="courses-wrapper">
        {courses.map((course, index) => {
          const delay = Math.floor(index / cardsPerRow) * 200;
          return (
            <div
              className="course"
              data-aos="fade-up"
              data-aos-delay={delay}
              data-aos-duration="800"
              key={index}
            >
              <img className="w-100" src={course.image} alt={course.title} />
              <div className="course-card-details d-flex flex-column justify-content-between h-100">
                <p className="font-20">{course.title}</p>
                <p className="font-12 green">By Hunarmand Punjab</p>
                <p className="font-14 green ratings">
                  <StarRating />
                  <span className="rate"> 4.9</span>
                </p>
                <Link
                  to={`/course-detail?course=${encodeURIComponent(
                    course.title
                  )}`}
                >
                  <button className="btn-green-sq">View Details</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
