import React, { useState } from "react";
import { submitContactForm } from "../api/user";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const { data } = await submitContactForm(formData);
            setSuccess("Your message has been sent successfully! We'll get back to you soon.");
            setLoading(false);
            // Reset form after successful submission
            setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            });
        } catch (error) {
            setError(
                error.response?.data?.message || "Failed to send message. Please try again."
            );
            setLoading(false);
        }
    };

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
                <div className="contact">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <h2 className="text-white">
                                    Need Assistance? Our Team is Just a Message Away!
                                </h2>
                                <a
                                    href="tel:03111133053"
                                    className="btn-green bg-transparent border-white text-white register-btn btn btn-success w-100 mt-3 rounded-2"
                                >
                                    <i className="fas fa-phone me-1"></i>
                                    Helpline: 03-111-133-053 | Whatsapp: 03-111-133-053
                                </a>

                                <a
                                    href="mailto:admissions@hunarmandpunjab.pk"
                                    className="btn-green register-btn btn btn-success w-100 mt-3 rounded-2"
                                >
                                    <i className="fas fa-envelope me-1"></i>
                                    admissions@hunarmandpunjab.pk
                                </a>
                            </div>
                            <div className="col-lg-6">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="mb-3">
                                                <label className="mb-2" htmlFor="name">
                                                    Name <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    className="form-control p-3"
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="Name"
                                                    required
                                                    disabled={loading}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="mb-3">
                                                <label className="mb-2" htmlFor="email">
                                                    Email <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    className="form-control p-3"
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="Email"
                                                    required
                                                    disabled={loading}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="mb-3">
                                                <label className="mb-2" htmlFor="phone">
                                                    Phone <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    className="form-control p-3"
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="Phone"
                                                    required
                                                    disabled={loading}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="mb-3">
                                                <label className="mb-2" htmlFor="subject">
                                                    Subject <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    className="form-control p-3"
                                                    type="text"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    placeholder="Subject"
                                                    required
                                                    disabled={loading}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label className="mb-2" htmlFor="message">
                                                    Message
                                                </label>
                                                <textarea
                                                    className="form-control p-3"
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    placeholder="Your Message"
                                                    rows="4"
                                                    disabled={loading}
                                                />
                                            </div>
                                        </div>
                                        {error && (
                                            <div className="col-lg-12">
                                                <div className="alert alert-danger">{error}</div>
                                            </div>
                                        )}
                                        {success && (
                                            <div className="col-lg-12">
                                                <div className="alert alert-success">{success}</div>
                                            </div>
                                        )}
                                        <div className="col-lg-12">
                                            <button
                                                type="submit"
                                                className="btn-green register-btn btn btn-success w-100 mt-3 rounded-2"
                                                disabled={loading}
                                            >
                                                {loading ? (
                                                    <>
                                                        <span
                                                            className="spinner-border spinner-border-sm me-2"
                                                            role="status"
                                                            aria-hidden="true"
                                                        ></span>
                                                        Sending...
                                                    </>
                                                ) : (
                                                    "Submit"
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactUs;
