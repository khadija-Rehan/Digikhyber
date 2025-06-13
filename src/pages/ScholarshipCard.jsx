import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import FS from "../assets/scholar.webp";
import ParticleBackground from "../components/ParticleBackground";
import { Link } from "react-router-dom";

const ScholarshipCard = () => {
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
                                <h1 className="font-48">Scholarship Cards</h1>
                                <p className="font-18 light-grey l-h-1 weight-400">
                                    Apply now for exclusive tech scholarships by the Punjab
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
                <div className="row pt-5 pb-5  ">
                   
                    <div className="col-lg-6" data-aos="fade-left">
                        <h2 className="fw-semibold">Unlock Your Future with Our Scholarship Cards</h2>
                        <p>
                            We believe every passionate learner deserves a chance to grow —
                            regardless of financial background. That’s why we’ve introduced
                            Scholarship Cards, your gateway to free, high-quality IT training.
                            These cards are designed to remove financial barriers and open
                            doors to the world of digital skills and modern technology. With a
                            Scholarship Card, you can enroll in industry-relevant training
                            programs and gain hands-on experience in fields that are shaping
                            the future — from coding to cybersecurity and beyond. We’re here
                            to support your journey every step of the way, offering access to
                            expert mentors, learning labs, and career opportunities. This
                            initiative is about more than just education — it’s about creating
                            lasting change, empowering individuals to become job-ready, and
                            contributing to the digital transformation of our society.
                            Thousands have already taken the first step toward successful tech
                            careers — now it’s your turn. Let us help you build the future
                            you’ve dreamed of. Apply today for your Scholarship Card and
                            become part of the next generation of skilled digital
                            professionals.
                        </p>
                        <div className="d-flex align-items-center gap-3 flex-wrap flex-md-nowrap">

                             
                            <Link to={"/apply-scholarshipcard"}>
                                <button className="btn-green register-btn  btn btn-success " style={{ fontFamily: "Poppins" }}> Apply Now  </button>

                            </Link>
                        </div>
                    </div>
                     <div className="col-lg-6" data-aos="fade-right">
                        <img className="w-100 rounded-4" src="/scholarship card.jpg" alt="" />
                    </div>
                </div>
            </div>
            <div className="container my-3">
                <div className="  p-4">
                    <h2 className="card-title text-success mb-4 text-center">Hunarmand Punjab – Scholarship Card Initiative</h2>

                    <div className="mb-4">
                        <h4   >Overview</h4>
                        <p>
                            The Hunarmand Punjab Scholarship Card is a revolutionary initiative launched under the Hunarmand Punjab Program
                            with the appreciation of our Honourable Minister of Education, Punjab Rana Sikandar Hayat, aimed at providing
                            IT-Skills to youth enrolled in the training program. This card enables eligible trainees to access training-related
                            LMS, laptop scheme, solar scheme, taleem finance, taleem abroad & more in a transparent, secure, and efficient
                            manner & ensure that every learner receives skill-based training.
                        </p>
                    </div>

                    {/* Key Features */}
                    <div className="mb-4">
                        <h4  >Key Features</h4>
                        <ul className="   ">
                            <li className=" ">Scholarship Value: Eligible for</li>
                            <li className=" ">Laptop Scheme</li>
                            <li className=" ">Solar Scheme</li>
                            <li className=" ">Taleem Finance</li>
                            <li className=" ">Taleem Abroad</li>
                            <li className=" ">E-Bikes</li>
                            <li className=" ">Coverage: Includes access to advanced courses, learning materials, discount vouchers, and other opportunities.</li>
                            <li className=" ">Card Type: E-Card and Physical Card powered by Hunarmand Punjab.</li>
                            <li className=" ">Usage Limitations: Designed for training-related usage only.</li>
                            <li className=" ">Validity: Valid for the duration of the course (up to 6 months per phase).</li>
                        </ul>
                    </div>

                    {/* Eligibility Criteria */}
                    <div className="mb-4">
                        <h4  >Eligibility Criteria</h4>
                        <ul className=" ">
                            <li className=" ">Be a resident of Pakistan</li>
                            <li className=" ">Be aged between 15 to 40 years</li>
                            <li className=" ">Hold a valid CNIC/B-Form</li>
                            <li className=" ">Be enrolled in a registered course under Hunarmand Punjab</li>
                            <li className=" ">Have no previous record of Hunarmand scholarship card</li>
                        </ul>
                    </div>

                    {/* How to Apply */}
                    <div className="mb-4">
                        <h4  >How to Apply for Scholarship Card?</h4>
                        <ol className="   " style={{fontFamily:"Poppins"}}>
                            <li className=" ">
                                <strong>Online Registration:</strong> Visit <a href="https://www.hunarmandpunjab.pk" target="_blank" rel="noopener noreferrer">www.hunarmandpunjab.pk</a><br />
                                Click on "Scholarship Card Menu – then click on the bottom Apply button"
                            </li>
                            <li className=" ">
                                <strong>Application Form:</strong> Fill the application form carefully, provide correct information & upload the paid challan slip.
                            </li>
                            <li className=" ">
                                <strong>Verification & Approval:</strong><br />
                                • Application verification conducted by Hunarmand Team.<br />
                                • Upon approval, the Scholarship Card is issued and activated.
                            </li>
                        </ol>
                    </div>

                    {/* Charges */}
                    <div className="mb-4">
                        <h4  >Charges / Fees</h4>
                        <ul className=" ">
                            <li className=" ">Card Issuance Fee: <strong>Free of cost</strong></li>
                            <li className=" ">SMS/Email Alerts: <strong>Free real-time alerts</strong> on disbursement & promotions</li>
                        </ul>
                    </div>

                    {/* Key Conditions */}
                    <div className="mb-4">
                        <h4 className=" ">Key Conditions</h4>
                        <ul className=" ">
                            <li className=" ">Access Advance IT Courses</li>
                            <li className=" ">Eligible for Laptop Scheme</li>
                            <li className=" ">Eligible for Solar Scheme</li>
                            <li className=" ">Eligible for Taleem Finance</li>
                            <li className=" ">Eligible for Taleem Abroad</li>
                            <li className=" ">Eligible for National & International Internship Opportunities</li>
                            <li className=" ">Misuse (e.g. selling the card or using it for illegal activities) may lead to termination and blacklisting.</li>
                            <li className=" ">Students must achieve above 85% marks in the evaluation test and pass periodic assessments to remain eligible.</li>
                            <li className=" ">Terms & Conditions apply</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4  >Helpline & Contact</h4>
                        <p>Email: <a href="mailto:scholarshipcard@hunarmandpunjab.pk">scholarshipcard@hunarmandpunjab.pk</a></p>
                        <p>Helpline: <strong>03-111-133-053</strong> (Monday–Friday, 9 AM to 5 PM)</p>
                        <p>Website: <a href="https://www.hunarmandpunjab.pk" target="_blank" rel="noopener noreferrer">www.hunarmandpunjab.pk</a></p>
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

export default ScholarshipCard;
