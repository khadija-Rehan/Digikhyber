import React from 'react'
import Logo from "../assets/logo-white.png";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
const Footer = () => {
    return (
        <div className='footer white' >
                < div className='container'>
                <div className='row'>


                    <div className='col-md-12 col-lg-5  px-2' data-aos='fade' data-aos-duration="800">
                        <img src={Logo} alt="logo" className='logo-white' />
                        <p className='font-16 weight-400 w-75'>Provide training to 500,000 students and make them professional earners.</p>
                        <div className='social'>
                            <button className='social-button'>
                                <a href="#"><FaFacebookF /></a>
                            </button>
                            <button className='social-button'>
                                <a href="#"><FaTwitter /></a>
                            </button>
                            <button className='social-button'>
                                <a href="#"><FaInstagram /></a>
                            </button>
                            <button className='social-button'>
                                <a href="#"><FaLinkedinIn /></a>
                            </button>
                            <button className='social-button'>
                                <a href="#"><FaWhatsapp /></a>
                            </button>
                        </div>
                        <br />
                    </div>
                    <div className='col-md-12 col-lg-7 ' data-aos='fade' data-aos-duration="500">
                        <div className='row '>
                            <div className='col-lg-3 col-sm-6  '>
                                <h2 className='font-18 weight-700'>Links</h2>
                                <p className='links' ><a href="#">Home</a></p>
                                <p className='links'> <a href="#">Courses</a></p>
                                <p className='links'> <a href="#">Scholarship Cards</a></p>
                                <p className='links'> <a href="#">Instructors</a></p>
                                <p className='links'> <a href="#">Apply Now</a></p>
                                <br />
                            </div>
                            <div className='col-lg-3 col-sm-6  '>
                                <h2 className='font-18 weight-700'>About</h2>
                                <p className='links'> <a href="#">About Us</a></p>
                                <p className='links'>   <a href="#">Contact Us</a></p>
                                <p className='links'> <a href="#">Terms & Conditions</a></p>
                                <p className='links'><a href="#">FAQs</a></p>
                                <br />
                            </div>
                            <div className='col-lg-6 col-sm-12   contact-f'>
                                <h2 className='font-18 weight-700'>Contact us</h2>
                                <p className='links'><a href="#"><FaMapMarkerAlt /> &nbsp; &nbsp; E-Library, Lahore</a></p>
                                <p className='links'><a href="#"><FaPhoneAlt /> &nbsp; &nbsp; 03-111-133-073</a></p>
                                <p className='links'><a href="#"><FaEnvelope /> &nbsp; &nbsp; support@hunarmandpunjab.pk</a></p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer