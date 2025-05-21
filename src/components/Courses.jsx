import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import ML from "../assets/ML.jpg";
import UI from "../assets/UI.jpg";
import DM from "../assets/DM.jpg";
import FS from "../assets/f-s-js.png";
import AD from "../assets/android.jpg";
import WP from "../assets/wordpress.jpg";
import StarRating from './StarRating';
import { Link } from 'react-router-dom';

const Courses = () => {
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

    return (
        <div className='all-courses container'>
            <p className='white font-14 d-p-2'>Our Courses</p>
            <div className='row pt-5 pb-5'>
                <div className='col-lg-6 col-md-12'>
                    <h2 className='font-32'>Learn, grow, succeed</h2>
                    <p className='font-15 l-h-1'>
                        Working with the Government of Pakistan, this program teaches young people
                        valuable digital skills for free, helping them find jobs online.
                    </p>
                </div>
                <div className='col-lg-6 col-md-12'>
                    <Link to="/courses">

                    <button className='btn-green view-all'>View All Courses</button>
                    </Link>
                </div>
            </div>
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
                                <p className='font-14 green ratings'><StarRating />
                                    <span className='rate'> 4.9</span></p>
                                <button className='btn-green-sq'>View Details</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Courses;
