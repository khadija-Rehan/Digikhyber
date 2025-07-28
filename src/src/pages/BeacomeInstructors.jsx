import React from 'react';

const BeacomeInstructors = () => {
    return (
        <div className=" register container mt-5 mb-5">
            <h2 className="mb-4">Become Instructors</h2>
            <form id="applicationForm" encType="multipart/form-data">
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="fullName" className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control p-3"
                            id="fullName"
                            name="fullName"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control p-3"
                            id="email"
                            name="email"
                            placeholder="Enter your email address"
                            required
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="cnic" className="form-label">CNIC</label>
                        <input
                            type="text"
                            className="form-control p-3"
                            id="cnic"
                            name="cnic"
                            placeholder="Enter your CNIC number"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="phone" className="form-label">Phone No</label>
                        <input
                            type="tel"
                            className="form-control p-3"
                            id="phone"
                            name="phone"
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="city" className="form-label">City</label>
                        <input
                            type="text"
                            className="form-control p-3"
                            id="city"
                            name="city"
                            placeholder="Enter your city"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="education" className="form-label">Education</label>
                        <input
                            type="text"
                            className="form-control p-3"
                            id="education"
                            name="education"
                            placeholder="Enter your highest qualification"
                            required
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="experience" className="form-label">Years of Experience</label>
                        <input
                            type="number"
                            className="form-control p-3"
                            id="experience"
                            name="experience"
                            placeholder="Enter years of experience"
                            min="0"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="field" className="form-label">Select Field</label>
                        <select
                            className="form-select p-3"
                            id="field"
                            name="field"
                            required
                        >
                            <option value="" disabled selected>Choose your Course</option>
                            <option>Digital Marketing</option>
                            <option>Graphic Designing</option>
                            <option>Video Editing</option>
                            <option>Cyber Security</option>
                            <option>Artificial Intelligence</option>
                            <option>Machine Learning</option>
                            <option>Python Django</option>
                            <option>MERN Stack</option>
                        </select>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="degree" className="form-label">Upload Latest Degree Document</label>
                    <input
                        type="file"
                        className="form-control p-3"
                        id="degree"
                        name="degree"
                        accept=".pdf,.jpg,.jpeg,.png"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="cv" className="form-label">Upload CV</label>
                    <input
                        type="file"
                        className="form-control p-3"
                        id="cv"
                        name="cv"
                        accept=".pdf,.doc,.docx"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-success fw-bold hbtn text-white p-3 w-100"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default BeacomeInstructors;
