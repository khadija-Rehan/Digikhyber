import React from "react";
import Awairness from "../components/Awairness";
import DigitalPunjab from "../components/DigitalPunjab";
import Hero from "../components/Hero";
import CoursesCategory from "../components/CoursesCategory";
import Courses from "../components/Courses";
import Instructors from "../components/Instructors";
import ApplicationSteps from "../components/ApplicationSteps";
import Testimonials from "../components/Testimonials";
import Opportunities from "../components/Opportunities";
import Ourpartner from "../components/Ourpartners";

const Home = () => {
    return (
        <>
            <Hero />
            <Ourpartner/>
            <Awairness />
            <DigitalPunjab />
            <CoursesCategory />
            <Courses />
            <Instructors />
            <Opportunities/>
            <ApplicationSteps />
            <Testimonials />

        </>
    );
};

export default Home;
