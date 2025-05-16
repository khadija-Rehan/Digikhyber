import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const AOSWrapper = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        AOS.init({ duration: 800, once: false });
    }, []);

    useEffect(() => {
        AOS.refresh();
    }, [location]);

    return <>{children}</>;
};

export default AOSWrapper;
