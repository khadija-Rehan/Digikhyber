import React from 'react'
import { Link } from 'react-router-dom'

const Opportunities = () => {
    return (
        <div className='container pb-5 pt-5'>
            <div className="row pb-5">
                <div className="col-lg-4">
                    <div class="offer-2-squar2 s">
                        <div class="p1"><i class="fas fa-location-arrow i"></i>
                            <h4 class="text-center text-white">Internship</h4>
                            <p class="p text-white"   >eHunar provide best opourtunity to get the student internship after completing any course</p>
                        </div>
                        <div class="p2">
                            <h4 class="text-center text-white">Internship</h4>
                            <Link to={"/apply-now"}>
                                <button  >Apply Now</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div class="offer-2-squar2 s">
                        <div class="p1"><i class="fa fa-graduation-cap i"></i>
                            <h4 class="text-center text-white">Scholarship</h4>
                            <p class="p text-white"   >Enroll yourself with eHunar to avail scholorships from more than 10 leading countries</p>
                        </div>
                        <div class="p2">
                            <h4 class="text-center text-white">Scholarship</h4>
                            <Link to={"/apply-now"}>
                                <button  >Apply Now</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4"> <div class="offer-2-squar2 s">
                    <div class="p1"><i class="fa-solid fa-screwdriver-wrench i"></i>
                        <h4 class="text-center text-white">Project Based Learning</h4>
                        <p class="p text-white"   >We enables students to learn skills through practical projects & experiences</p>
                    </div>
                    <div class="p2">
                        <h4 class="text-center text-white">Project Based Learning</h4>
                        <Link to={"/apply-now"}>
                            <button  >Apply Now</button>
                        </Link>
                    </div>
                </div></div>
            </div>
        </div>
    )
}

export default Opportunities