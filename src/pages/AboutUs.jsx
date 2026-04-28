import React, { useEffect } from "react";
import PageBanner from "../components/PageBanner";
import StatCounter from "../components/StatsCounter";
import OurPartners from "../components/Ourpartners";
import Instructors from "../components/Instructors";

const AboutUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <PageBanner 
                title="About Us"
                description="Empowering the youth of Punjab with world-class digital skills. Our mission is to bridge the gap between education and industry excellence through the Digikhyber initiative."
                image="/images/About Us.jpg"
            />

            <Instructors />

            <StatCounter />

            <OurPartners />
        </>
    );
};

export default AboutUs;
