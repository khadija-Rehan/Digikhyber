import React, { createContext, useContext, useState } from "react";
import { COURSE_PRICE, AVAILABLE_COURSES } from "../utils/courses";
import { submitSecondEnrolledCourses } from "../api/user";

const CoursesContext = createContext();

export const useCourses = () => useContext(CoursesContext);


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

  const submitSecondEnrolmentCourses = async (courses) => {

    
    try {
      const { data } = await submitSecondEnrolledCourses(courses);
    
      return data;
    } catch (error) {
      console.error("Error submitting second enrolment courses:", error);
      throw error;
    }
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
        submitSecondEnrolmentCourses,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};
