import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import FS from "../assets/laptops.webp";
import GS from "../assets/occupation.webp";
import Team from "../assets/team.png";
import ParticleBackground from "../components/ParticleBackground";

const FreeLaptops = () => {
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
                <ParticleBackground />

                <div className="banner-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-12">
                                <h1 className="font-48">Free Laptop For Students</h1>
                                <p className="font-18 light-grey l-h-1 weight-400">
                                    Apply now for free laptop scheme by the Punjab Government.
                                    Your skills, your success — all you need is a start.
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
            <div className="container">
                <div className="row pt-5 align-items-center">
                    <div className="col-lg-6">
                        <img className="w-100" src={GS} alt="" />
                    </div>
                    <div className="col-lg-6">
                        <h2 className="fw-semibold">
                            Your Digital Future Starts Here – Free Laptops for Eligible
                            Students
                        </h2>
                        <p>
                            We believe that every student deserves access to the tools they
                            need to succeed in the digital age — regardless of their financial
                            background. That’s why we’ve launched the Free Laptop Scheme for
                            Students: an initiative designed to empower passionate learners
                            with the technology they need to thrive. Through this scheme,
                            eligible students can receive a brand-new laptop — completely free
                            of cost — helping them unlock new opportunities in education,
                            digital learning, and career development. Whether you're attending
                            online classes, exploring IT skills, or preparing for your future
                            profession, this laptop is your key to staying connected and
                            competitive. But this is more than just a device — it’s a gateway
                            to a brighter future. Alongside the laptop, students will gain
                            access to curated digital resources, virtual learning
                            environments, and opportunities to build skills in high-demand
                            fields like programming, data science, and more. We’re committed
                            to bridging the digital divide and ensuring that no student is
                            left behind in today’s tech-driven world. Thousands are already
                            benefiting from this initiative — now it’s your turn. Take the
                            first step toward your digital future. Apply today for your Free
                            Student Laptop and join the next generation of innovators.
                        </p>
                    </div>
                    <h2 className="text-center mb-4 mt-5">How to Avail the Laptop Scheme</h2>
                    <div className="col-lg-6">
                        <section className="container laptop-scheme-section py-5">
                            <ol className="laptop-scheme-steps mb-4" style={{ fontFamily: "poppins" }}>
                                <li>
                                    Register for any Hunarmand Punjab course  to become eligible for
                                    the Scholarship Card. <br />
                               
                                </li>
                                <li>
                                     Gain benefits under the Scholarship Card: Laptop Scheme, Solar Scheme,
                                    Taleem Finance, Taleem Abroad, and access to Advanced IT Courses.
                                </li>
                                <li>
                                  Submit your laptop application  via the portal and receive a confirmation.
                                </li>
                                <li>
                                 Appear for the Final Evaluation Test  and complete the final assessment. Shortlisted
                                    candidates will qualify for the Laptop Scheme or other benefits under the Hunarmand Scholarship Card.
                                </li>
                               
                            </ol>
 <p className=" font-16 mt-2">
                                    Register today and take the first step toward a successful digital career with Hunarmand Punjab!
                                </p>
                        </section>
                    </div>
                    <div className="col-lg-6">
                        <img className="w-100" src="https://pftpedu.org/assets/img/map.png" alt="" />
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

export default FreeLaptops;
