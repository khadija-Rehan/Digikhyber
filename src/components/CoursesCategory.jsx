import React from 'react'
import icon from "../assets/ico-4.png";
import icon2 from "../assets/ico-3.png";
import icon3 from "../assets/ico-11.png";
import icon4 from "../assets/ico-14.png";
import icon5 from "../assets/ico-16.png";
import icon6 from "../assets/ico-17.png";
import icon7 from "../assets/ico-18.png";
const CoursesCategory = () => {
    return (
        <>
            <div className='courses-cat'>
                <div className='container'>
                    <div className='row pt-5 pb-5'>
                        <p className='white font-14 d-p'>Courses Category</p>
                        <h2 className='font-32'>Courses Category</h2>

                        <div className='row d-flex gap-2 mb-3'>
                            <div className='course-cat d-flex'>
                                <button className='course-icon-btn'>
                                    <img src={icon} alt="" />
                                </button>
                                <div className='left'>
                                    Digital Marketing <br /><span>View Course</span>
                                </div>

                            </div>
                            <div className='course-cat d-flex'>
                                <button className='course-icon-btn'>
                                    <img src={icon5} alt="" />
                                </button>
                                <div className='left'>
                                    App Development <br /><span>View Course</span>
                                </div>

                            </div>
                            <div className='course-cat d-flex'>
                                <button className='course-icon-btn'>
                                    <img src={icon3} alt="" />
                                </button>
                                <div className='left'>
                                    Software Development <br /><span>View Course</span>
                                </div>

                            </div>
                            <div className='course-cat d-flex'>
                                <button className='course-icon-btn'>
                                    <img src={icon6} alt="" />
                                </button>
                                <div className='left'>
                                    UI/UX Design <br /><span>View Course</span>
                                </div>

                            </div>

                        </div>
                        <div className='row d-flex gap-2'>
                            <div className='course-cat d-flex'>
                                <button className='course-icon-btn'>
                                    <img src={icon7} alt="" />
                                </button>
                                <div className='left'>
                                    Freelancing Masterclass <br /><span>View Course</span>
                                </div>

                            </div>
                            <div className='course-cat d-flex'>
                                <button className='course-icon-btn'>
                                    <img src={icon2} alt="" />
                                </button>
                                <div className='left'>
                                    E-Commerce (Shopify Expert) <br /><span>View Course</span>
                                </div>

                            </div>
                            <div className='course-cat d-flex'>
                                <button className='course-icon-btn'>
                                    <img src={icon4} alt="" />
                                </button>
                                <div className='left'>
                                    SEO and Blogging <br /><span>View Course</span>
                                </div>

                            </div>


                        </div>   <br /><br />
                    </div>

                </div>
            </div>
        </>
    )
}

export default CoursesCategory