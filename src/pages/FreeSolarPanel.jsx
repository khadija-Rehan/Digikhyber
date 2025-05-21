import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import FS from "../assets/Solar-Panel.webp";
import GS from "../assets/Solar-Penal.webp";
import Team from "../assets/team.png";
import ParticleBackground from "../components/ParticleBackground";

const FreeSolarPanel = () => {
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
        <>
            <div className="banner">
                    <ParticleBackground/>

                <div className="banner-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-12">
                                <h1 className="font-48">Free Solar Panels for Students</h1>
                                <p className="font-18 light-grey l-h-1 weight-400">
                                    Apply now for free solar panels scheme by the Punjab
                                    Government. Your skills, your success — all you need is a
                                    start.
                                </p>
                            </div>
                            <div className="col-lg-4 col-md-12">
                                <img src={FS} alt="Course" className="w-100 banner-image" />
                                <div className="cube"> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container pt-5">
                <div className="row pt-5 pb-5 align-items-center">
                    <div className="col-lg-6">
                        <img className="w-100" src={GS} alt="" />
                    </div>
                    <div className="col-lg-6">
                        <h2 className="fw-semibold">
                            Brighten Your Tomorrow with Free Solar Panels for Students
                        </h2>
                        <p>
                            We believe that every passionate student deserves the right
                            environment to learn, grow, and thrive — regardless of financial
                            challenges or power limitations. That’s why we’ve launched the
                            Free Solar Panels for Students initiative — a mission to empower
                            young minds through reliable, sustainable energy.
                        </p> <p>
                            This program is designed to remove energy barriers that disrupt learning by providing eligible students with free solar panel systems for their homes or study spaces. By harnessing the power of the sun, we’re helping you stay connected to your education — uninterrupted, eco-friendly, and cost-effective.


                        </p>
                        <p>With access to consistent electricity, you can focus on your studies, attend online classes, and develop the skills needed to shape the future — from science and engineering to digital innovation and beyond. We’re committed to supporting your journey every step of the way, while also encouraging green living and energy independence.

                        </p>
                        <p>This initiative is more than just about solar panels — it’s about empowering the next generation, bridging educational gaps, and building a brighter, more sustainable future for all. Many students have already taken this step toward cleaner energy and uninterrupted learning — now it’s your turn.

                        </p>
                        <p className="fw-bold">Apply today for your free solar panel system and take charge of your tomorrow — with light, learning, and limitless potential.

                        </p>
                    </div>
                </div>
            </div>

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
        </>
    );
};

export default FreeSolarPanel;
