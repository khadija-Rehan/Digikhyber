import React from "react";
import icon from "../assets/ico-4.png";
import icon2 from "../assets/ico-3.png";
import icon3 from "../assets/ico-11.png";
import icon4 from "../assets/ico-14.png";
import icon5 from "../assets/ico-16.png";
import icon6 from "../assets/ico-17.png";
import icon7 from "../assets/ico-18.png";

const CoursesCategory = () => {
    return (
        <div className="courses-cat pt-5 pb-5">
            <div className="container">

                <p className="white font-14 d-p">Courses Category</p>
                <h2 className="font-32">Courses Category</h2>
                <div className="row mt-3  mb-3">
                    <div className="col-lg-3 mb-3">
                        <div className="course-cat d-flex">
                            <button className="course-icon-btn">
                                <img src={icon} alt="" />
                            </button>
                            <div className="left">
                                <h6 className="fw-semi-bold">Digital Marketing</h6>
                                <p className="fs-6 mb-0">View Course</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 mb-3">
                        <div className="course-cat d-flex">
                            <button className="course-icon-btn">
                                <img src={icon5} alt="" />
                            </button>
                            <div className="left">
                                <h6 className="fw-semi-bold">App Development</h6>
                                <p className="fs-6 mb-0">View Course</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 mb-3">
                        <div className="course-cat d-flex">
                            <button className="course-icon-btn">
                                <img src={icon3} alt="" />
                            </button>
                            <div className="left">
                                <h6 className="fw-semi-bold">Software Development</h6>
                                <p className="fs-6 mb-0">View Course</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 mb-3">
                        <div className="course-cat d-flex">
                            <button className="course-icon-btn">
                                <img src={icon6} alt="" />
                            </button>
                            <div className="left">
                                <h6 className="fw-semi-bold">UI/UX Design</h6>
                                <p className="fs-6 mb-0">View Course</p>
                            </div>
                        </div>
                    </div>



                    <div className="col-lg-4 mb-3">
                        <div className="course-cat d-flex">
                            <button className="course-icon-btn">
                                <img src={icon7} alt="" />
                            </button>
                            <div className="left">
                                <h6 className="fw-semi-bold">Freelancing Masterclass</h6>
                                <p className="fs-6 mb-0">View Course</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-3">
                        <div className="course-cat d-flex">
                            <button className="course-icon-btn">
                                <img src={icon2} alt="" />
                            </button>
                            <div className="left">
                                <h6 className="fw-semi-bold">E-Commerce (Shopify Expert)</h6>
                                <p className="fs-6 mb-0">View Course</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-3">
                        <div className="course-cat d-flex">
                            <button className="course-icon-btn">
                                <img src={icon4} alt="" />
                            </button>
                            <div className="left">
                                <h6 className="fw-semi-bold">SEO and Blogging</h6>
                                <p className="fs-6 mb-0">View Course</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default CoursesCategory;
