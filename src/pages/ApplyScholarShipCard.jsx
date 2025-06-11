import React, { useState } from "react";
import Logo from "../assets/logo.png";

const ApplyScholarShipCard = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        cnic: "",
        rollNo: "",
        email: "",
        mobile: "",
        firstCourse: "",
        secondCourse: "",
        challanNo: "",
        challanFile: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "challanFile") {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform validations here if needed
        console.log(formData);
    };

    return (
        <div className="container register">

            <form onSubmit={handleSubmit} className="pb-5 pt-5">
                <div className="text-center">
                    <img style={{ width: "200px" }} src={Logo} alt="Logo" />
                </div>
                <h1 className="fs-5 fw-bold text-black text-center pt-4">
                    Hunarmand Scholarship Card Form
                </h1>

                <div className="mb-3">
                    <label htmlFor="fullName" className="mb-2">
                        Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                        className="form-control p-3"
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name as per your CNIC/B-Form."
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="cnic" className="mb-2">
                        CNIC/B-Form No <span className="text-danger">*</span>
                    </label>
                    <input
                        className="form-control p-3"
                        type="text"
                        name="cnic"
                        value={formData.cnic}
                        onChange={handleChange}
                        placeholder="e.g. 12345-1234567-1"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="rollNo" className="mb-2">
                        Roll No <span className="text-danger">*</span>
                    </label>
                    <input
                        className="form-control p-3"
                        type="text"
                        name="rollNo"
                        placeholder="Enter roll no"
                        value={formData.rollNo}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="mb-2">
                        Email <span className="text-danger">*</span>
                    </label>
                    <input
                        className="form-control p-3"
                        type="email"
                        name="email"
                        placeholder="Enter email"

                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="mobile" className="mb-2">
                        Mobile No <span className="text-danger">*</span>
                    </label>
                    <input
                        className="form-control p-3"
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="03XX-XXXXXXX"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="firstCourse" className="mb-2">
                        Select First Course <span className="text-danger">*</span>
                    </label>
                    <select
                        className="form-control p-3"
                        name="firstCourse"
                        value={formData.firstCourse}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Course</option>
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="secondCourse" className="mb-2">
                        Select Second Course <small>(Optional)</small>
                    </label>
                    <select
                        className="form-control p-3"
                        name="secondCourse"
                        value={formData.secondCourse}
                        onChange={handleChange}
                    >
                        <option value="">Select Course</option>
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="challanNo" className="mb-2">
                        Paid Bank Challan No <span className="text-danger">*</span>
                    </label>
                    <input
                        className="form-control p-3"
                        type="text"
                        placeholder="e.g. 12345-1234567-1"
                        name="challanNo"
                        value={formData.challanNo}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="challanFile" className="mb-2">
                        Upload Paid Challan <span className="text-danger">*</span>
                    </label>
                    <input
                        className="form-control p-3"
                        type="file"
                        name="challanFile"
                        onChange={handleChange}
                        accept="image/*,application/pdf"
                        required
                    />
                </div>

                <div className="text-center mt-4">
                    <button
                        type="submit"
                        className="btn btn-success fw-bold hbtn text-white p-3 w-100"
                    >
                        Submit Application
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ApplyScholarShipCard;
