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
import StatCounter from "../components/StatsCounter";
import ScholarshipModal from "../components/ScholarshipModal";

const Home = () => {
    return (
        <>
            <ScholarshipModal />
            <Hero />
            <DigitalPunjab />
            <Opportunities />
            <Awairness />
            <CoursesCategory />
            <Courses />
            <Instructors />
            <ApplicationSteps />
            <Testimonials />
            <StatCounter />
            <Ourpartner />
        </>
    );
};

export default Home;
