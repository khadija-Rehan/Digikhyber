import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import FS from "../assets/Solar-Panel.webp";
import GS from "../assets/Solar-Penal.webp";
import Team from "../assets/team.png";
import ParticleBackground from "../components/ParticleBackground";
import StatCounter from "../components/StatsCounter";
import { Link } from "react-router-dom";

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

    return (
        <>
            <div className="banner">
                <ParticleBackground />

                <div className="banner-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-12">
                                <h1 className="font-48">Hunarmand Solar Scheme</h1>
                                <p className="font-18 light-grey l-h-1 weight-400">
                                    In a world where digital learning is the future, uninterrupted
                                    power is a necessity, not a luxury. Hunarmand Punjab Solar
                                    Scheme, Hunarmand Punjab provides solar energy systems to
                                    eligible students who meet our criteria as per policy of
                                    Hunarmand Punjab — so your learning never stops, no matter the
                                    power cuts.
                                </p>
                            </div>
                            <div className="col-lg-4 col-md-12">
                                <img src="/images/Solar Scheme.jpg" alt="Course" className="w-100 banner-image" />
                                <div className="cube"> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container pt-5">
                <div className="row pt-5 pb-5  ">
                    <div className="col-lg-6">
                        <img className="w-100" src="/images/Solar Scheme Page Image (2).jpeg" alt="" />
                    </div>
                    <div className="col-lg-6">
                        <h2 className="fw-semibold">
                            Powering Your Dreams — Even When the Lights Go Out!
                        </h2>
                        <p>
                            In a world where digital learning is the future, uninterrupted
                            power is a necessity, not a luxury. Hunarmand Punjab Solar Scheme,
                            Hunarmand Punjab provides solar energy systems to eligible
                            students who meet our criteria as per policy of Hunarmand Punjab —
                            so your learning never stops, no matter the power cuts.
                        </p>
                        <p>
                            This initiative removes a major barrier for students across
                            underserved areas, ensuring reliable electricity to support online
                            classes, skill development, and a brighter academic future —
                            literally and figuratively.
                        </p>
                        <div className="mt-4">
                            <p className="fw-semibold ">
                                ⚡ Key Benefits of the Solar Scheme:
                            </p>
                            <ul className="  mt-2">
                                <li> Free Solar panels </li>
                                <li> Uninterrupted Power for Devices & Learning</li>
                                <li> No More Load-Shedding Interruptions</li>
                                <li>Eco-Friendly, Sustainable Energy Solution</li>
                                <li> Perfect for Online Learning, Freelancing & IT Training</li>
                            </ul>
                        </div>
                        <p className="fw-bold">Light Up Your Learning — Apply Now!</p>
                        <p>
                            Don’t let power cuts hold you back. With the Solar Scheme, your
                            future stays fully charged — no matter where you live.
                        </p>
                        <div className="mt-4  ">
                            <Link
                                to="/apply-scholarshipcard"
                                className="btn-green register-btn btn btn-success"
                            >
                                Apply Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <StatCounter />
        </>
    );
};

export default FreeSolarPanel;
