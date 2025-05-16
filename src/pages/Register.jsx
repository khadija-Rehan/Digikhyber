import React from "react";
import Logo from "../assets/logo-white.png";

const Register = () => {
    return (
        <div className="register">
            <div className="container">
                <div className="row pt-4 pb-4">
                    <div className="col-lg-4 px-0">
                        <div className="stepers">
                            <div className="d-flex align-items-center gap-3">
                                <i className="fas fa-user icon fs-3"></i>
                                <div>
                                    <h2 className="fs-5 fw-bold">Step:1</h2>
                                    <p className="mb-0">Student Signup</p>
                                </div>
                            </div>
                            <i className="fas fa-clock icon  fs-2"></i>
                        </div>
                    </div>{" "}
                    <div className="col-lg-4 px-0">
                        <div className="stepers">
                            <div className="d-flex align-items-center gap-3">
                                <i className="fas fa-book icon fs-3"></i>
                                <div>
                                    <h2 className="fs-5 fw-bold">Step:2</h2>
                                    <p className="mb-0">Admission Test</p>
                                </div>
                            </div>
                            {/* <span className='fas fa-clock icon  fs-2'></span> */}
                        </div>
                    </div>{" "}
                    <div className="col-lg-4 px-0">
                        <div className="stepers">
                            <div className="d-flex align-items-center gap-3">
                                <i className="fas fa-file-alt icon fs-2"></i>
                                <div>
                                    <h2 className="fs-5 fw-bold">Step:3</h2>
                                    <p className="mb-0">Enrollment Confirmation</p>
                                </div>
                            </div>
                            {/* <span className='fas fa-clock icon  fs-2'></span> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="register-inner">
                <div className="text-center">
                    <img style={{ width: "200px" }} src={Logo} alt="" />
                </div>
                <h1 className="fs-5 fw-bold text-black text-center pt-4">
                    SSDP Admission Form
                </h1>
                <center>
                    <button className="btn btn-success fw-bold hbtn text-white p-3 rounded-cus">
                        Personal Information
                    </button>
                    <hr className="hbtnhr" />
                </center>
                <div className="mb-3">
                    <label className="mb-2" htmlFor="">
                        Full Name{" "}
                    </label>
                    <input
                        className="form-control p-3"
                        type="text"
                        placeholder="Enter your full name as per your CNIC/B-Form."
                    />
                </div>
                <div className="mb-3">
                    <label className="mb-2" htmlFor="">
                        Father's Name
                    </label>
                    <input
                        className="form-control p-3"
                        type="text"
                        placeholder="Provide your father's name as per your CNIC."
                    />
                </div>{" "}
                <div className="mb-3">
                    <label className="mb-2" htmlFor="">
                        CNIC/B-Form Number
                    </label>
                    <input
                        className="form-control p-3"
                        type="number"
                        placeholder="
Enter your 13 digits CNIC or B-Form number without hyphenation
"
                    />
                </div>{" "}
                <div className="mb-3">
                    <label className="mb-2" htmlFor="">
                        Email Address
                    </label>
                    <input
                        className="form-control p-3"
                        type="email"
                        placeholder="

Provide your active email address.

"
                    />
                </div>
                <div className="mb-3">
                    <label className="mb-2" htmlFor="">
                        Mobile Number
                    </label>
                    <input
                        className="form-control p-3"
                        type="text"
                        placeholder="


Enter your mobile number in the format e.g. 03001234567


"
                    />
                </div>
                <div className="mb-3">
                    <label className="mb-2" htmlFor="">
                        Date of Birth
                    </label>
                    <input
                        className="form-control p-3"
                        type="date"
                        placeholder="
 
"
                    />
                </div>{" "}
                <div className="mb-3">
                    <label className="mb-2" htmlFor="">
                        Marital Status
                    </label>
                    <select
                        className="form-select p-3"
                        placeholder="
 
"
                    >
                        <option value="">Select</option>
                        <option value="">Single</option>
                        <option value="">Married</option>
                    </select>
                </div>{" "}
                <div className="mb-3">
                    <label className="mb-2" htmlFor="">
                        Gender
                    </label>
                    <select
                        className="form-select p-3"
                        placeholder="
 
"
                    >
                        <option value="">Select your gender</option>
                        <option value="">Male</option>
                        <option value="">Female</option>
                        <option value="">Other</option>
                    </select>
                </div>
                <center>
                    <button className="btn btn-success fw-bold hbtn text-white p-3 rounded-cus">
                        Educational Background
                    </button>
                    <hr className="hbtnhr" />
                </center>
                <div className="mb-3">
                    <label className="mb-2" htmlFor="">
                        Highest Qualification Attained
                    </label>
                    <select
                        className="form-select p-3"
                        placeholder="
 
"
                    >
                        <option value="">
                            Select your highest educational qualification
                        </option>
                        <option value="">Matric</option>
                        <option value="">Intermediate</option>
                        <option value="">Bachelor's</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="mb-2" htmlFor="">
                        Institute/University Name
                    </label>
                    <input
                        className="form-control p-3"
                        type="email"
                        placeholder="


Enter the name of your institute or university.

"
                    />
                </div>{" "}
                <div className="mb-3">
                    <label className="mb-2" htmlFor="">
                        Field of Study
                    </label>
                    <input
                        className="form-control p-3"
                        type="email"
                        placeholder="
Enter your field of study.
"
                    />
                </div>{" "}
                <div className="mb-3">
                    <label className="mb-2" htmlFor="">
                        Year of Completion
                    </label>
                    <input
                        className="form-control p-3"
                        type="email"
                        placeholder="

Enter the year of completion.
"
                    />
                </div>
                <div className="mb-3">
                    <label className="mb-2" htmlFor="">
                        Upload Last Degree Document
                    </label>
                    <div
                        class="drop_box"
                        onClick={() => document.getElementById("fileID").click()}
                        style={{ cursor: "pointer" }}
                    >
                        <i className="fas fa-cloud-upload-alt fa-3x mb-3 text-muted"></i>
                        <header>
                            <h4>Click to choose or drop your file here</h4>
                        </header>
                        <p className="text-center">
                            Accepted formats: jpg, jpeg, png, gif, bmp, tiff, webp, heic,
                            heif, pdf, doc, docx, txt, xls, xlsx, ppt, pptx, csv, odt, ods,
                            odp, zip
                        </p>
                        <input type="file" hidden accept=".doc,.docx,.pdf" id="fileID" />
                    </div>
                </div>
                <center>
                    <button className="btn btn-success fw-bold hbtn text-white p-3 rounded-cus">
                        Course Enrollment
                    </button>
                    <hr className="hbtnhr" />
                </center>
                <div className="mb-3">
                    <label className="mb-2" htmlFor="">
                        First Course * (Choose your course carefully! Once submitted, you
                        would not be able to edit)
                    </label>
                    <select
                        className="form-select p-3"
                        placeholder="
 
"
                    >
                        <option value="">Select</option>
                        <option value="">AI</option>
                        <option value="">AI</option>
                        <option value="">AI</option>
                    </select>
                </div>{" "}
                <div className="mb-3">
                    <label className="mb-2" htmlFor="">
                        Second Course
                        <br />
                        (Student can enroll in a maximum of three programs at the same time.
                        If you don't want to join the second program, kindly leave this
                        field empty.)
                    </label>
                    <select
                        className="form-select p-3"
                        placeholder="
 
"
                    >
                        <option value="">Select</option>
                        <option value="">AI</option>
                        <option value="">AI</option>
                        <option value="">AI</option>
                    </select>
                </div>{" "}
                <div className="mb-3">
                    <label className="mb-2" htmlFor="">
                        Third Course
                        <br />
                        (You can select up to three courses. Leave this field empty if you
                        don't want to enroll in a third course.)
                    </label>
                    <select
                        className="form-select p-3"
                        placeholder="
 
"
                    >
                        <option value="">Select</option>
                        <option value="">AI</option>
                        <option value="">AI</option>
                        <option value="">AI</option>
                    </select>
                </div>
                <center>
                    <button className="btn btn-success fw-bold hbtn text-white p-3 rounded-cus">
                        Internet Availability
                    </button>
                    <hr className="hbtnhr" />
                </center>
                <div className="mb-3">
                    <label className="mb-2" htmlFor="">
                        Do you have access to a reliable internet connection?*
                    </label>
                    <select
                        className="form-select p-3"
                        placeholder="
 
"
                    >
                        <option value="">Select</option>
                        <option value="">Yes</option>
                        <option value="">No</option>
                    </select>
                </div>
                <center>
                    <button className="btn btn-success fw-bold hbtn text-white p-3 rounded-cus">
                        Address Details
                    </button>
                    <hr className="hbtnhr" />
                </center>
                <div className="mb-3">
                    <label className="mb-2" htmlFor="">
                        Permanent Address
                    </label>
                    <input
                        className="form-control p-3"
                        type="email"
                        placeholder="
Enter your permanent address.
"
                    />
                </div>{" "}
                <div className="mb-3">
                    <label className="mb-2" htmlFor="">
                        Current Address
                    </label>
                    <input
                        className="form-control p-3"
                        type="email"
                        placeholder="

Enter your current address.

"
                    />
                </div>
                <div className="mb-3">
                    <label className="mb-2" htmlFor="">
                        City
                    </label>
                    <input
                        className="form-control p-3"
                        type="email"
                        placeholder="
Enter your city of residence.
"
                    />
                </div>
                <center>
                    <button className="btn btn-success fw-bold hbtn text-white p-3 rounded-cus">
                        Additional Information
                    </button>
                    <hr className="hbtnhr" />
                </center>
                <div className="mb-3">
                    <label className="mb-2" htmlFor="">
                        Are you currently employed?*
                    </label>
                    <select
                        className="form-select p-3"
                        placeholder="
 
"
                    >
                        <option value="">Select</option>
                        <option value="">Yes</option>
                        <option value="">No</option>
                    </select>
                </div>
                <center>
                    <button className="btn btn-success fw-bold hbtn text-white p-3 rounded-cus">
                        Residency Information (Pakistan Only)
                    </button>
                    <hr className="hbtnhr" />
                </center>
                <label htmlFor="">Residential Status
                </label>
                <div className="alert alert-warning">
                    <p>To verify your residency in Pakistan, please upload any one of the following documents:

                    </p>
                    <ul>
                        <li>Utility Bill (not older than 3 months)</li>
                        <li>Domicile Certificate</li>
                        <li>Matriculation/Intermediate Certificate showing your board affiliation</li>
                        <li>CNIC or Form-B</li>
                        <li>Passport showing place of birth</li>
                        <li>Rent Agreement or Ownership Documents</li>
                        <li>
                            Alternatively, you can provide any other document that proves your residence in Pakistan.
                        </li>
                    </ul>
                    <p>This nationwide accessibility ensures everyone can benefit from this initiative and enhance their skills for a brighter future.</p>
                </div>
                <div className="mb-3">

                    <div
                        class="drop_box"
                        onClick={() => document.getElementById("fileID").click()}
                        style={{ cursor: "pointer" }}
                    >
                        <i className="fas fa-cloud-upload-alt fa-3x mb-3 text-muted"></i>
                        <header>
                            <h4>Click to choose or drop your file here</h4>
                        </header>
                        <p className="text-center">
                            Accepted formats: jpg, jpeg, png, gif, bmp, tiff, webp, heic,
                            heif, pdf, doc, docx, txt, xls, xlsx, ppt, pptx, csv, odt, ods,
                            odp, zip
                        </p>
                        <input type="file" hidden accept=".doc,.docx,.pdf" id="fileID" />
                    </div>
                </div>
                <center>
                    <button className="btn btn-success fw-bold hbtn text-white p-3 rounded-cus">
                        Address Details
                    </button>
                    <hr className="hbtnhr" />
                </center>
                <label htmlFor="" className="fw-bold">Agreement</label>

                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label class="form-check-label" for="flexCheckDefault">
                        I declare that all the information provided is correct to the best of my knowledge, and I agree to the terms and conditions of the SSDP program.
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Register;
