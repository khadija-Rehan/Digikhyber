import React from "react";

const ContactUs = () => {
    return (
        <>

            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462118.02491053584!2d67.15546194999999!3d25.193202399999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bbf%3A0x9cf92f44555a0c23!2sKarachi%2C%20Karachi%20City%2C%20Sindh!5e0!3m2!1sen!2s!4v1738407873267!5m2!1sen!2s"
                class="w-100"
                height="450"
                style={{ border: 0 }}
                allowfullscreen=""
                loading="lazy"
            ></iframe>

            <div>
                <div className="contact  ">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <h2 className="text-black">Any Question? We would love to help you
                                </h2>
                                <button className='btn-green bg-transparent border-white text-white register-btn btn btn-success w-100  mt-3 rounded-2'> <i className="fas fa-phone me-1"></i>  Helpline: 0304-xxx xxxx | Whatsapp: +92 326 xxxxxxx</button>
                                <button className='btn-green register-btn btn btn-success w-100  mt-3 rounded-2'> <i className="fas fa-envelope me-1"></i> admissions@Hunarmand.pk</button>

                            </div>
                            <div className="col-lg-6">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label className="mb-2" htmlFor="">
                                                Name <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                className="form-control p-3"
                                                type="text"
                                                placeholder="Name"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        {" "}
                                        <div className="mb-3">
                                            <label className="mb-2" htmlFor="">
                                                Email <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                className="form-control p-3"
                                                type="text"
                                                placeholder="Email"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        {" "}
                                        <div className="mb-3">
                                            <label className="mb-2" htmlFor="">
                                                Phone <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                className="form-control p-3"
                                                type="text"
                                                placeholder="Phone"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        {" "}
                                        <div className="mb-3">
                                            <label className="mb-2" htmlFor="">
                                                Subject <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                className="form-control p-3"
                                                type="text"
                                                placeholder="Subject"
                                            />
                                        </div>
                                    </div>{" "}
                                    <div className="col-lg-12">
                                        {" "}
                                        <div className="mb-3">
                                            <label className="mb-2" htmlFor="">
                                                Message
                                            </label>
                                            <textarea
                                                className="form-control p-3"
                                                type="text"
                                                placeholder="Your Message"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">

                                        <button className='btn-green register-btn btn btn-success   mt-3 rounded-2'>Login</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactUs;
