import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const AOSWrapper = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        AOS.init({ 
            duration: 400, 
            once: true,
            offset: 0,
            easing: 'ease-out'
        });
    }, []);

    useEffect(() => {
        AOS.refresh();
    }, [location]);

    return <>{children}</>;
};

export default AOSWrapper;
