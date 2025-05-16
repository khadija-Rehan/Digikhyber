import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

import ML from "../assets/ML.jpg";
import UI from "../assets/UI.jpg";
import DM from "../assets/DM.jpg";
import FS from "../assets/f-s-js.png";
import AD from "../assets/android.jpg";
import WP from "../assets/wordpress.jpg";
import StarRating from '../components/StarRating';

const AllCourses = () => {
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
        window.addEventListener('resize', updateCardsPerRow);

        AOS.init({
            duration: 800,
            offset: 300,
            once: false,
        });

        return () => {
            window.removeEventListener('resize', updateCardsPerRow);
        };
    }, []);

    useEffect(() => {
        AOS.refresh();
    }, [cardsPerRow]);

    const courses = [
        { image: FS, title: 'Full-Stack Web Development with JavaScript' },
        { image: AD, title: 'Native Android Application Development' },
        { image: ML, title: 'Machine Learning, AI, and Data Science' },
        { image: WP, title: 'WordPress Website Design & Deployment' },
        { image: UI, title: 'User Interface (UI) and User Experience (UX) Design' },
        { image: DM, title: 'Full Stack Digital Marketing' },
    ];

    const statsData = [
        { end: 1000000, label: 'Million Students', suffix: '' },
        { end: 30, label: 'Certified Experts', suffix: '+' },
        { end: 200000, label: 'Scholarships', suffix: '' },
        { end: 25, label: 'Courses', suffix: '+' },
    ];

    const StatCounter = ({ end, label, suffix }) => {
        const { ref, inView } = useInView({ triggerOnce: true });
        return (
            <div className='stat col-lg-3 col-md-12' ref={ref}>
                <p className='font-48 m-0'>
                    {inView && <CountUp end={end} duration={2} separator=',' suffix={suffix} />}
                </p>
                <p className='font-16 weight-400'>{label}</p>
            </div>
        );
    };

    return (
        <>
            <div className='banner'>
                <div className='banner-content'>
                    <div className="container">


                    <div className='row'>
                        <div className='col-lg-8 col-md-12'>
                            <h1 className='font-48'>Courses</h1>
                            <p className='font-18 light-grey l-h-1 weight-400'>
                                Discover a wide range of skill-building programs designed to boost your career prospects. Find the perfect course to help you shine!
                            </p>
                        </div>
                        <div className='col-lg-4 col-md-12'>
                            <img src={FS} alt="Course" className='w-100 banner-image' />
                            <div className='cube'>{" "}</div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <div className='all-courses'>
                <div className="container">

                    <div className='courses-wrapper'>
                        {courses.map((course, index) => {
                            const delay = Math.floor(index / cardsPerRow) * 200;
                            return (
                                <div
                                    className='course'
                                    data-aos='fade-up'
                                    data-aos-delay={delay}
                                    data-aos-duration="800"
                                    key={index}
                                >
                                    <img className='w-100' src={course.image} alt={course.title} />
                                    <div className='course-card-details'>
                                        <p className='font-20'>{course.title}</p>
                                        <p className='font-12 green'>By Digital Punjab</p>
                                        <p className='font-14 green ratings'>
                                            <StarRating />
                                            <span className='rate'> 4.9</span>
                                        </p>
                                        <button className='btn-green-sq'>View Details</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>

            <div className='platform white'>
                <h1 className='font-40'>Why choose our platform</h1>
                <div className='stats row'>
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

export default AllCourses;
