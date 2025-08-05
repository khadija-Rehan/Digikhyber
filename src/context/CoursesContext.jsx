import React, { createContext, useContext, useState } from "react";
import { COURSE_PRICE, AVAILABLE_COURSES } from "../utils/courses";

const CoursesContext = createContext();

export const useCourses = () => useContext(CoursesContext);

// const COURSE_PRICE = 1000;
// export const AVAILABLE_COURSES = [
//   { name: "Advanced Amazon Virtual Assistant", price: COURSE_PRICE },
//   { name: "Full Stack Digital Marketing & AI", price: COURSE_PRICE },
//   { name: "Advanced Shopify & Daraz", price: COURSE_PRICE },
//   { name: "Full Stack Graphic Designing & AI", price: COURSE_PRICE },
//   { name: "Advanced UIUX Designing with AI for Web & APP", price: COURSE_PRICE },
//   { name: "WordPress Website Development", price: COURSE_PRICE },
//   { name: "Full Stack Web Development with React & Node JS", price: COURSE_PRICE },
//   { name: "MERN Stack Web Development", price: COURSE_PRICE },
//   { name: "Advanced PHP Laravel Web Development", price: COURSE_PRICE },
//   { name: "Python Programming for Everyone", price: COURSE_PRICE },
//   { name: "Web Development with Python Django", price: COURSE_PRICE },
//   { name: "Search Engine Optimization - SEO", price: COURSE_PRICE },
//   { name: "Advanced Google Ads", price: COURSE_PRICE },
//   { name: "National Cyber Security", price: COURSE_PRICE },
//   { name: "Penetration Testing Web Hacking", price: COURSE_PRICE },
//   { name: "Video Editing & Animation", price: COURSE_PRICE },
//   { name: "Artificial Intelligence", price: COURSE_PRICE },
//   { name: "Machine Learning & Data Science", price: COURSE_PRICE },
//   { name: "Forex Trading", price: COURSE_PRICE },
//   { name: "BlockChain Development", price: COURSE_PRICE },
//   { name: "Cross platform Flutter App Development", price: COURSE_PRICE },
//   { name: "CGI Ads", price: COURSE_PRICE },
//   { name: "Architectural Visualization with Blender 3D", price: COURSE_PRICE },
//   { name: "Digital Embroidery", price: COURSE_PRICE },
//   { name: "Textile Designing", price: COURSE_PRICE },
//   { name: "Ielts", price: COURSE_PRICE },
//   { name: "Freelancing Program", price: COURSE_PRICE }
// ];

export const CoursesProvider = ({ children }) => {
  const [userCourses, setUserCourses] = useState([]);

  const addCourse = (courseName) => {
    if (
      userCourses.length < 3 &&
      !userCourses.includes(courseName)
    ) {
      setUserCourses([...userCourses, courseName]);
    }
  };

  const editCourse = (index, newCourseName) => {
    if (!userCourses.includes(newCourseName)) {
      const updated = [...userCourses];
      updated[index] = newCourseName;
      setUserCourses(updated);
    }
  };

  const deleteCourse = (index) => {
    const updated = userCourses.filter((_, i) => i !== index);
    setUserCourses(updated);
  };

  const updateCoursesAPI = async (courses) => {
    setUserCourses(courses);
  };

  const clearUserCourses = () => {
    setUserCourses([]);
  };

  const getCoursePrice = (courseName) => {
    const course = AVAILABLE_COURSES.find(c => c.name === courseName);
    return course ? course.price : 0;
  };

  const getTotalPrice = () => {
    let total = 0;
    userCourses.forEach(courseName => {
      const course = AVAILABLE_COURSES.find(c => c.name === courseName);
      if (course) {
        total += course.price;
      }
    });
    return total;
  };

  return (
    <CoursesContext.Provider
      value={{
        availableCourses: AVAILABLE_COURSES,
        userCourses,
        addCourse,
        editCourse,
        deleteCourse,
        updateCoursesAPI,
        setUserCourses,
        clearUserCourses,
        getCoursePrice,
        getTotalPrice,
        coursePrice: COURSE_PRICE,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};