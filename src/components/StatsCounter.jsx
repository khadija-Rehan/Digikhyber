// components/StatCounter.jsx
import Aos from "aos";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import AOS from "aos";
import "aos/dist/aos.css";
const StatCounter = ( ) => {
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

    const statsData = [
        { end: 1000000, label: "Million Students", suffix: "" },
        { end: 30, label: "Certified Experts", suffix: "+" },
        { end: 200000, label: "Scholarships", suffix: "" },
        { end: 25, label: "Courses", suffix: "+" },
    ];

    const StatCounter = ({ end, label, suffix }) => {
        const { ref, inView } = useInView({ triggerOnce: true });
        return (
            <div className="stat col-lg-3 col-md-12" ref={ref}>
                <p className="font-48 m-0">
                    {inView && (
                        <CountUp end={end} duration={2} separator="," suffix={suffix} />
                    )}
                </p>
                <p className="font-16 weight-400">{label}</p>
            </div>
        );
    };

  return (
      <div className="platform white">
                <h1 className="font-40">Why choose our platform</h1>
                <div className="stats row">
                    {statsData.map((stat, index) => (
                        <StatCounter
                            key={index}
                            end={stat.end}
                            label={stat.label}
                            suffix={stat.suffix}
                        />
                    ))}
                </div>
            </div>
  );
};

export default StatCounter;
