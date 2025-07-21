import React from "react";
import { Link } from "react-router-dom";
import TextReveal from "./TextReveal";

const Opportunities = () => {
    return (
        <div className="container pb-5 pt-5">
            <div className="row pb-5">
                <h2 className="text-center font-32">
                    <TextReveal text="Scholarship Card Benefits" />
                </h2>
                <p className="text-center mb-3">Unlock free access to premium Scholarship Card, Laptop Scheme, Solar Scheme and Taleem Finance under the scholarship card.</p>
                <div className="col-lg-3 mb-3">
                    <div class="offer-2-squar2 s hover-shadow-lg hover-translate-y-n3"  data-aos="fade-up">
                        <div class="p1">
                            <i class="fas fa-location-arrow i"></i>
                            <h4 class="text-center text-white">Scholarship Card</h4>
                            {/* <p class="p text-white" >eHunar provide best opourtunity to get the student internship after completing any course</p> */}
                        </div>
                        <div class="p2">
                            <h4 class="text-center text-white " data-aos="fade-up">Scholarship Card</h4>
                            <Link to={"/scholarship-card"}>
                                <button>Apply Now</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 mb-3">
                    <div class="offer-2-squar2 s hover-shadow-lg hover-translate-y-n3"  data-aos="fade-up">
                        <div class="p1">
                            <i class="fas fa-laptop text-white fw-bolder fs-1 mb-2"></i>
                            <h4 class="text-center text-white ">Laptop Scheme</h4>
                            {/* <p class="p text-white"   >Enroll yourself with eHunar to avail scholorships from more than 10 leading countries</p> */}
                        </div>
                        <div class="p2">
                            <h4 class="text-center text-white">Laptop Scheme</h4>
                            <Link to={"/free-laptops"}>
                                <button>Apply Now</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 mb-3">
                    {" "}
                    <div class="offer-2-squar2 s hover-shadow-lg hover-translate-y-n3"  data-aos="fade-up">
                        <div class="p1">
                            <i class="fas fa-solar-panel text-white fw-bolder fs-1 mb-2"></i>
                            <h4 class="text-center text-white">Solar Scheme</h4>
                            {/* <p class="p text-white"   >We enables students to learn skills through practical projects & experiences</p> */}
                        </div>
                        <div class="p2">
                            <h4 class="text-center text-white">Solar Scheme</h4>
                            <Link to={"/free-solarpanels"}>
                                <button>Apply Now</button>
                            </Link>
                        </div>
                    </div>
                </div>{" "}
                <div className="col-lg-3 mb-3">
                    {" "}
                    <div class="offer-2-squar2 s hover-shadow-lg hover-translate-y-n3"  data-aos="fade-up">
                        <div class="p1">
                            <i class="fas fa-coins text-white fw-bolder fs-1 mb-2"></i>
                            <h4 class="text-center text-white">Taleem Finance</h4>
                            {/* <p class="p text-white"   >We enables students to learn skills through practical projects & experiences</p> */}
                        </div>
                        <div class="p2">
                            <h4 class="text-center text-white">Taleem Finance</h4>
                            <Link to={"/taleem-finance"}>
                                <button>Apply Now</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Opportunities;
