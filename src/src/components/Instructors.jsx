import React from 'react'
import icon3 from "../assets/ico-11.png";
import icon4 from "../assets/ico-14.png";
import ML from "../assets/ML.jpg";
import TextReveal from './TextReveal';
const Instructors = () => {
    return (
        <>
            <div className='container'>

                <div className='row pt-5 pb-5'>
                    <div className='col-lg-6 col-md-12 mb-3 mb-lg-0'>
                        <img src="/Abstract-Profile-Photo-Instagram-Post-1.webp" alt="mission" className='w-100' />
                    </div>
                    <div className='col-lg-6 col-md-12 '>
                        <p className='white font-14 d-p-2'>Who We Are</p>
                        <h2 className='font-32'>
                            <TextReveal text="Grow Your Skills and Career with Hunarmand Punjab" />
                        </h2>
                        <p className='font-15 l-h-1'>Welcome to Hunarmand Punjab! We're here to help the young people of Punjab get the digital skills they need to find good jobs. Our goal is to train 500,000 students and help them become professional earners. We want to lower unemployment and make Punjab's economy stronger by teaching skills that are in demand.</p>
                        <p className='font-20'>Our Mission</p>
                        <p className='font-14 weight-400'>To provide training to 500,000 students and make them professional earners.</p>
                        <div className='row'>
                            <div className='col-lg-6 col-md-12'>
                                <p className='img-round'><img src={icon3} alt="" /></p>
                                <p className='font-20'>Professional Instructors</p>
                                <p className='font-14 weight-400'>Learn from dedicated industry experts and grow you digital skills

                                </p>

                            </div>
                            <div className='col-lg-6 col-md-12'>
                                <p className='img-round'><img src={icon4} alt="" /></p>
                                <p className='font-20'>25+ Courses</p>
                                <p className='font-14 weight-400'>You'll find a-lot of different courses to help you learn new skills!

                                </p>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>

    )
}

export default Instructors