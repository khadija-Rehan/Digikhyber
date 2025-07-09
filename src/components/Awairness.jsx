import React from 'react'
import DM from "../assets/DM.jpg";
import icon from "../assets/ico-4.png";
import { Link } from 'react-router-dom';
import TextReveal from './TextReveal';
const Awairness = () => {
    return (
        <>
            <div className='container'>
                <div className='row align-items-center pt-4 pb-5 '>
                    <div className='col-lg-6 col-md-12'>
                        <div className='build'>
                            <h2 className='build-b-i d-flex align-items-center'>
                                <button className='build-icon-btn'>
                                    <img src={icon} alt="" />
                                </button>
                                 Earn 1000$ to 5000 $ <br />Through Freelancing
                            </h2>
                            <h1>
                                <TextReveal text="Build Your Future with Hunarmand Punjab" />
                            </h1>
                            <p className='font-18'>Hunarmand Punjab provides the Digital Skills Training and Support Program aims to empower youth by providing free digital skills education, creating online employment opportunities for a brighter future.</p>
                            <div className='d-flex gap-4 buttons'>
                                <Link to='/courses'>
                                <button className='btn-green'>
                                    Explore Courses
                                </button>
                                </Link>
                                <Link to='/apply-now'>

                                <button className='btn-black'>Enroll Now</button>
                                </Link>
                            </div>

                        </div>

                    </div>
                    <div className='col-lg-6 col-md-12'>
                        <img className='build-img-big' src="/3.webp" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Awairness