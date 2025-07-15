import React from "react";

const ContactUs = () => {
    return (
        <>

          <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13600.770207340945!2d74.32716715000001!3d31.5203698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e6f6f6e5%3A0x5f2e76481666e2a9!2sLahore%2C%20Punjab!5e0!3m2!1sen!2s!4v1719390726463!5m2!1sen!2s"
  className="w-100"
  height="450"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>

            <div>
                <div className="contact  ">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <h2 className="text-white">Need Assistance? Our Team is Just a Message Away!
                                </h2>
                                <a
                                    href="tel:03111133053"
                                    className="btn-green bg-transparent border-white text-white register-btn btn btn-success w-100 mt-3 rounded-2"
                                >
                                    <i className="fas fa-phone me-1"></i>
                                    Helpline: 03-111-133-053 
                                    {/* | Whatsapp: 03-111-133-053 */}
                                </a>

                                <a
                                    // href="mailto:admissions@hunarmandpunjab.pk"
                                    href="mailto:contact@hunarmandpunjab.pk"
                                    className="btn-green register-btn btn btn-success w-100 mt-3 rounded-2"
                                >
                                    <i className="fas fa-envelope me-1"></i>
                                    {/* admissions@hunarmandpunjab.pk */}
                                    contact@hunarmandpunjab.pk
                                </a>


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

                                        <button className='btn-green register-btn btn btn-success   mt-3 rounded-2'>Submit</button>
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
