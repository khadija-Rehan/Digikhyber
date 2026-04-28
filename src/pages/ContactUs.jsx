import React, { useState, useEffect } from "react";
import { submitContactForm } from "../api/user";
import PageBanner from "../components/PageBanner";
import "./ContactUs.css";

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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
            await submitContactForm(formData);
            setSuccess("Your message has been sent successfully! We'll get back to you soon.");
            setLoading(false);
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
        <div className="contact-page">
            <PageBanner 
                title="Connect With Us"
                description="Have questions about Digikhyber? Our team is here to provide the support and guidance you need to start your journey."
            />

            <div className="container">
                {/* Contact Info Cards */}
                <div className="row contact-info-grid">
                    <div className="col-lg-4 mb-4 contact-reveal">
                        <div className="contact-info-card">
                            <div className="contact-icon-wrapper">
                                <i className="fas fa-phone-alt"></i>
                            </div>
                            <h4>Call Us</h4>
                            <p>Our support team is available Monday to Friday, 9:00 AM to 5:00 PM.</p>
                            <a href="tel:03111133053" className="contact-link">03-111-133-053</a>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-4 contact-reveal" style={{ animationDelay: '0.1s' }}>
                        <div className="contact-info-card">
                            <div className="contact-icon-wrapper">
                                <i className="fas fa-envelope-open-text"></i>
                            </div>
                            <h4>Email Support</h4>
                            <p>For admissions, technical help, or general inquiries, drop us a line.</p>
                            <a href="mailto:support@digikhyber.org.pk" className="contact-link">support@digikhyber.org.pk</a>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-4 contact-reveal" style={{ animationDelay: '0.2s' }}>
                        <div className="contact-info-card">
                            <div className="contact-icon-wrapper">
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                            <h4>Visit Our Venue</h4>
                            <p>Experience our environment firsthand. Join us for orientations and tests.</p>
                            <span className="contact-link">Punjab University, Lahore</span>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="contact-form-wrapper contact-reveal" style={{ animationDelay: '0.3s' }}>
                    <div className="row g-0">
                        <div className="col-lg-5 contact-form-left d-flex flex-column justify-content-center">
                            <h2>Send Us a Message</h2>
                            <p>Fill out the form and our representative will get back to you within 24 hours.</p>
                            <div className="mt-5">
                                <div className="d-flex align-items-center mb-3">
                                    <i className="fas fa-check-circle me-3 text-warning"></i>
                                    <span>Instant Response Tracking</span>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <i className="fas fa-check-circle me-3 text-warning"></i>
                                    <span>Direct Management Support</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <i className="fas fa-check-circle me-3 text-warning"></i>
                                    <span>24/7 Portal Ticketing</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7 contact-form-right">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-floating-custom">
                                            <label>Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                placeholder="Enter your name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating-custom">
                                            <label>Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="Enter your email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating-custom">
                                            <label>Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                className="form-control"
                                                placeholder="Enter phone number"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating-custom">
                                            <label>Subject</label>
                                            <input
                                                type="text"
                                                name="subject"
                                                className="form-control"
                                                placeholder="What is this about?"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating-custom">
                                            <label>Your Message</label>
                                            <textarea
                                                name="message"
                                                className="form-control"
                                                placeholder="How can we help you?"
                                                rows="4"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                            ></textarea>
                                        </div>
                                    </div>
                                    
                                    {error && <div className="col-12 mb-3"><div className="alert alert-danger">{error}</div></div>}
                                    {success && <div className="col-12 mb-3"><div className="alert alert-success">{success}</div></div>}

                                    <div className="col-12">
                                        <button 
                                            type="submit" 
                                            className="submit-btn-elite"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <><span className="spinner-border spinner-border-sm me-2"></span> SENDING...</>
                                            ) : (
                                                <>SEND MESSAGE <i className="fas fa-paper-plane ms-2"></i></>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="map-container contact-reveal" style={{ animationDelay: '0.4s' }}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13600.770207340945!2d74.32716715000001!3d31.5203698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e6f6f6e5%3A0x5f2e76481666e2a9!2sLahore%2C%20Punjab!5e0!3m2!1sen!2s!4v1719390726463!5m2!1sen!2s"
                        className="w-100"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
