import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { signUp } from "../api/auth";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    cnic: "",
    email: "",
    mobile: "",
    dateOfBirth: "",
    maritalStatus: "",
    gender: "",
    password: "",
    qualification: "",
    institute: "",
    fieldOfStudy: "",
    yearOfCompletion: "",
    firstCourse: "",
    secondCourse: "",
    thirdCourse: "",
    internetAccess: "",
    permanentAddress: "",
    currentAddress: "",
    city: "",
    employmentStatus: "",
    agreement: false,
  });

  const [documents, setDocuments] = useState({
    degreeDocument: null,
    residencyDocument: null,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.fatherName.trim()) {
      newErrors.fatherName = "Father's name is required";
    }
    if (!formData.cnic.trim()) {
      newErrors.cnic = "CNIC/B-Form number is required";
    } else if (!/^\d{13}$/.test(formData.cnic)) {
      newErrors.cnic = "CNIC/B-Form must be 13 digits";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^03\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must start with 03 and be 11 digits";
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }
    if (!formData.maritalStatus) {
      newErrors.maritalStatus = "Marital status is required";
    }
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    if (!formData.qualification) {
      newErrors.qualification = "Qualification is required";
    }
    if (!formData.institute.trim()) {
      newErrors.institute = "Institute/University name is required";
    }
    if (!formData.fieldOfStudy.trim()) {
      newErrors.fieldOfStudy = "Field of study is required";
    }
    if (!formData.yearOfCompletion.trim()) {
      newErrors.yearOfCompletion = "Year of completion is required";
    }
    if (!formData.firstCourse) {
      newErrors.firstCourse = "First course selection is required";
    }
    if (!formData.internetAccess) {
      newErrors.internetAccess = "Internet access information is required";
    }
    if (!formData.permanentAddress.trim()) {
      newErrors.permanentAddress = "Permanent address is required";
    }
    if (!formData.currentAddress.trim()) {
      newErrors.currentAddress = "Current address is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.employmentStatus) {
      newErrors.employmentStatus = "Employment status is required";
    }
    if (!formData.agreement) {
      newErrors.agreement = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    setDocuments((prev) => ({
      ...prev,
      [type]: file,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let processedValue = value;

    if (name === "internetAccess" || name === "employmentStatus") {
      processedValue = value === "yes" ? true : false;
    } else {
      processedValue = type === "checkbox" ? checked : value;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const selectedCourses = [
        formData.firstCourse,
        formData.secondCourse,
        formData.thirdCourse,
      ].filter((course) => course !== "");

      const formDataToSubmit = new FormData();

      // Append each form field individually
      Object.entries(formData).forEach(([key, value]) => {
        if (
          key !== "firstCourse" &&
          key !== "secondCourse" &&
          key !== "thirdCourse"
        ) {
          formDataToSubmit.append(key, value);
        }
      });

      // Append courses array
      formDataToSubmit.append("courses", JSON.stringify(selectedCourses));
      console.log("Appending courses:", selectedCourses);

      // Append documents
      if (documents.degreeDocument) {
        formDataToSubmit.append("degreeDocument", documents.degreeDocument);
      }
      if (documents.residencyDocument) {
        formDataToSubmit.append(
          "residencyDocument",
          documents.residencyDocument
        );
      }

      // Log the final FormData object
      for (let pair of formDataToSubmit.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      try {
        const { data } = await signUp(formDataToSubmit);
        console.log("Registration successful:", data);
      } catch (error) {
        console.error("Registration failed:", error);
      }
    }
  };

  return (
    <div className="register mb-5">
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
              <i className="fas fa-clock icon fs-2"></i>
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
        <form onSubmit={handleSubmit} className=" ">
          <div className="text-center">
            <img style={{ width: "200px" }} src={Logo} alt="" />
          </div>
          <h1 className="fs-5 fw-bold text-black text-center pt-4">
            Hunarmand Admission Form
          </h1>

          <div className="mb-3">
            <label className="mb-2" htmlFor="fullName">
              Full Name <span className="text-danger">*</span>
            </label>
            <input
              className={`form-control p-3 ${errors.fullName ? "is-invalid" : ""
                }`}
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name as per your CNIC/B-Form."
            />
            {errors.fullName && (
              <div className="invalid-feedback">{errors.fullName}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="mb-2" htmlFor="fatherName">
              Father's Name <span className="text-danger">*</span>
            </label>
            <input
              className={`form-control p-3 ${errors.fatherName ? "is-invalid" : ""
                }`}
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              placeholder="Provide your father's name as per your CNIC."
            />
            {errors.fatherName && (
              <div className="invalid-feedback">{errors.fatherName}</div>
            )}
          </div>{" "}
          <div className="mb-3">
            <label className="mb-2" htmlFor="cnic">
              CNIC/B-Form Number <span className="text-danger">*</span>
            </label>
            <input
              className={`form-control p-3 ${errors.cnic ? "is-invalid" : ""}`}
              type="text"
              name="cnic"
              value={formData.cnic}
              onChange={handleChange}
              placeholder="Enter your 13 digits CNIC or B-Form number without hyphenation"
            />
            {errors.cnic && <div className="invalid-feedback">{errors.cnic}</div>}
          </div>{" "}
          <div className="mb-3">
            <label className="mb-2" htmlFor="email">
              Email Address <span className="text-danger">*</span>
            </label>
            <input
              className={`form-control p-3 ${errors.email ? "is-invalid" : ""}`}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Provide your active email address."
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="mb-2" htmlFor="mobile">
              Mobile Number <span className="text-danger">*</span>
            </label>
            <input
              className={`form-control p-3 ${errors.mobile ? "is-invalid" : ""}`}
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile number in the format e.g. 03001234567"
            />
            {errors.mobile && (
              <div className="invalid-feedback">{errors.mobile}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="mb-2" htmlFor="dateOfBirth">
              Date of Birth <span className="text-danger">*</span>
            </label>
            <input
              className={`form-control p-3 ${errors.dateOfBirth ? "is-invalid" : ""
                }`}
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
            {errors.dateOfBirth && (
              <div className="invalid-feedback">{errors.dateOfBirth}</div>
            )}
          </div>{" "}
          <div className="mb-3">
            <label className="mb-2" htmlFor="maritalStatus">
              Marital Status <span className="text-danger">*</span>
            </label>
            <select
              className={`form-select p-3 ${errors.maritalStatus ? "is-invalid" : ""
                }`}
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
            {errors.maritalStatus && (
              <div className="invalid-feedback">{errors.maritalStatus}</div>
            )}
          </div>{" "}
          <div className="mb-3">
            <label className="mb-2" htmlFor="gender">
              Gender <span className="text-danger">*</span>
            </label>
            <select
              className={`form-select p-3 ${errors.gender ? "is-invalid" : ""}`}
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <div className="invalid-feedback">{errors.gender}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="mb-2" htmlFor="mobile">
              Password <span className="text-danger">*</span>
            </label>
            <input
              className={`form-control p-3 ${errors.password ? "is-invalid" : ""
                }`}
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
            {errors.mobile && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="mb-2" htmlFor="qualification">
              Highest Qualification Attained{" "}
              <span className="text-danger">*</span>
            </label>
            <select
              className={`form-select p-3 ${errors.qualification ? "is-invalid" : ""
                }`}
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
            >
              <option value="">
                Select your highest educational qualification
              </option>
              <option value="matric">Matric</option>
              <option value="intermediate">Intermediate</option>
              <option value="bachelor">Bachelor's</option>
            </select>
            {errors.qualification && (
              <div className="invalid-feedback">{errors.qualification}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="mb-2" htmlFor="institute">
              Institute/University Name <span className="text-danger">*</span>
            </label>
            <input
              className={`form-control p-3 ${errors.institute ? "is-invalid" : ""
                }`}
              type="text"
              name="institute"
              value={formData.institute}
              onChange={handleChange}
              placeholder="Enter the name of your institute or university."
            />
            {errors.institute && (
              <div className="invalid-feedback">{errors.institute}</div>
            )}
          </div>{" "}
          <div className="mb-3">
            <label className="mb-2" htmlFor="fieldOfStudy">
              Field of Study <span className="text-danger">*</span>
            </label>
            <input
              className={`form-control p-3 ${errors.fieldOfStudy ? "is-invalid" : ""
                }`}
              type="text"
              name="fieldOfStudy"
              value={formData.fieldOfStudy}
              onChange={handleChange}
              placeholder="Enter your field of study."
            />
            {errors.fieldOfStudy && (
              <div className="invalid-feedback">{errors.fieldOfStudy}</div>
            )}
          </div>{" "}
          <div className="mb-3">
            <label className="mb-2" htmlFor="yearOfCompletion">
              Year of Completion <span className="text-danger">*</span>
            </label>
            <input
              className={`form-control p-3 ${errors.yearOfCompletion ? "is-invalid" : ""
                }`}
              type="text"
              name="yearOfCompletion"
              value={formData.yearOfCompletion}
              onChange={handleChange}
              placeholder="Enter the year of completion."
            />
            {errors.yearOfCompletion && (
              <div className="invalid-feedback">{errors.yearOfCompletion}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="mb-2" htmlFor="">
              Upload Last Degree Document
            </label>
            <div
              class="drop_box"
              onChange={(e) => handleFileChange(e, "degreeDocument")}
              onClick={() => document.getElementById("degreeFileID").click()}
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
              <input
                type="file"
                hidden
                accept=".doc,.docx,.pdf"
                id="degreeFileID"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="mb-2" htmlFor="firstCourse">
              First Course * (Choose your course carefully! Once submitted, you
              would not be able to edit)
            </label>
            <select
              className={`form-select p-3 ${errors.firstCourse ? "is-invalid" : ""
                }`}
              name="firstCourse"
              value={formData.firstCourse}
              onChange={handleChange}
            >
              <option value="" disabled selected>Choose your field</option>
              <option>Advanced Amazon Virtual Assistant</option>
              <option>Full Stack Digital Marketing & AI</option>
              <option>Advanced Shopify & Daraz</option>
              <option>Full Stack Graphic Designing & AI</option>
              <option>Advanced UIUX Designing with AI for Web & APP</option>
              <option>WordPress Website Development</option>
              <option>Full Stack Web Development with React & Node JS</option>
              <option>MERN Stack Web Development</option>
              <option>Advanced PHP Laravel Web Development</option>
              <option>Python Programming for Everyone</option>
              <option>Web Development with Python Django</option>
              <option>Search Engine Optimization - SEO</option>
              <option>Advanced Google Ads</option>
              <option>National Cyber Security</option>
              <option>Penetration Testing Web Hacking</option>
              <option>Video Editing & Animation</option>
              <option>Artificial Intelligence</option>
              <option>Machine Learning & Data Science</option>
              <option>Forex Trading</option>
              <option>BlockChain Development</option>
              <option>Cross platform Flutter App Development</option>
              <option>CGI Ads</option>
              <option>Architectural Visualization with Blender 3D</option>
              <option>Digital Embroidery</option>
              <option>Textile Designing</option>
              <option>Ielts</option>
              <option>Freelancing Program</option>
            </select>
            {errors.firstCourse && (
              <div className="invalid-feedback">{errors.firstCourse}</div>
            )}
          </div>{" "}
          <div className="mb-3">
            <label className="mb-2" htmlFor="secondCourse">
              Second Course
              <br />
              (Student can enroll in a maximum of three programs at the same time.
              If you don't want to join the second program, kindly leave this
              field empty.)
            </label>
            <select
              className={`form-select p-3 ${errors.secondCourse ? "is-invalid" : ""
                }`}
              name="secondCourse"
              value={formData.secondCourse}
              onChange={handleChange}
            >
              <option value="" disabled selected>Choose your field</option>
              <option>Advanced Amazon Virtual Assistant</option>
              <option>Full Stack Digital Marketing & AI</option>
              <option>Advanced Shopify & Daraz</option>
              <option>Full Stack Graphic Designing & AI</option>
              <option>Advanced UIUX Designing with AI for Web & APP</option>
              <option>WordPress Website Development</option>
              <option>Full Stack Web Development with React & Node JS</option>
              <option>MERN Stack Web Development</option>
              <option>Advanced PHP Laravel Web Development</option>
              <option>Python Programming for Everyone</option>
              <option>Web Development with Python Django</option>
              <option>Search Engine Optimization - SEO</option>
              <option>Advanced Google Ads</option>
              <option>National Cyber Security</option>
              <option>Penetration Testing Web Hacking</option>
              <option>Video Editing & Animation</option>
              <option>Artificial Intelligence</option>
              <option>Machine Learning & Data Science</option>
              <option>Forex Trading</option>
              <option>BlockChain Development</option>
              <option>Cross platform Flutter App Development</option>
              <option>CGI Ads</option>
              <option>Architectural Visualization with Blender 3D</option>
              <option>Digital Embroidery</option>
              <option>Textile Designing</option>
              <option>Ielts</option>
              <option>Freelancing Program</option>
            </select>
            {errors.secondCourse && (
              <div className="invalid-feedback">{errors.secondCourse}</div>
            )}
          </div>{" "}
          <div className="mb-3">
            <label className="mb-2" htmlFor="thirdCourse">
              Third Course
              <br />
              (You can select up to three courses. Leave this field empty if you
              don't want to enroll in a third course.)
            </label>
            <select
              className={`form-select p-3 ${errors.thirdCourse ? "is-invalid" : ""
                }`}
              name="thirdCourse"
              value={formData.thirdCourse}
              onChange={handleChange}
            >
              <option value="" disabled selected>Choose your field</option>
              <option>Advanced Amazon Virtual Assistant</option>
              <option>Full Stack Digital Marketing & AI</option>
              <option>Advanced Shopify & Daraz</option>
              <option>Full Stack Graphic Designing & AI</option>
              <option>Advanced UIUX Designing with AI for Web & APP</option>
              <option>WordPress Website Development</option>
              <option>Full Stack Web Development with React & Node JS</option>
              <option>MERN Stack Web Development</option>
              <option>Advanced PHP Laravel Web Development</option>
              <option>Python Programming for Everyone</option>
              <option>Web Development with Python Django</option>
              <option>Search Engine Optimization - SEO</option>
              <option>Advanced Google Ads</option>
              <option>National Cyber Security</option>
              <option>Penetration Testing Web Hacking</option>
              <option>Video Editing & Animation</option>
              <option>Artificial Intelligence</option>
              <option>Machine Learning & Data Science</option>
              <option>Forex Trading</option>
              <option>BlockChain Development</option>
              <option>Cross platform Flutter App Development</option>
              <option>CGI Ads</option>
              <option>Architectural Visualization with Blender 3D</option>
              <option>Digital Embroidery</option>
              <option>Textile Designing</option>
              <option>Ielts</option>
              <option>Freelancing Program</option>
            </select>
            {errors.thirdCourse && (
              <div className="invalid-feedback">{errors.thirdCourse}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="mb-2" htmlFor="internetAccess">
              Do you have access to a reliable internet connection?*
            </label>
            <select
              className={`form-select p-3 ${errors.internetAccess ? "is-invalid" : ""
                }`}
              name="internetAccess"
              value={formData.internetAccess}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.internetAccess && (
              <div className="invalid-feedback">{errors.internetAccess}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="mb-2" htmlFor="permanentAddress">
              Permanent Address <span className="text-danger">*</span>
            </label>
            <input
              className={`form-control p-3 ${errors.permanentAddress ? "is-invalid" : ""
                }`}
              type="text"
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              placeholder="Enter your permanent address."
            />
            {errors.permanentAddress && (
              <div className="invalid-feedback">{errors.permanentAddress}</div>
            )}
          </div>{" "}
          <div className="mb-3">
            <label className="mb-2" htmlFor="currentAddress">
              Current Address <span className="text-danger">*</span>
            </label>
            <input
              className={`form-control p-3 ${errors.currentAddress ? "is-invalid" : ""
                }`}
              type="text"
              name="currentAddress"
              value={formData.currentAddress}
              onChange={handleChange}
              placeholder="Enter your current address."
            />
            {errors.currentAddress && (
              <div className="invalid-feedback">{errors.currentAddress}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="mb-2" htmlFor="city">
              City <span className="text-danger">*</span>
            </label>
            <input
              className={`form-control p-3 ${errors.city ? "is-invalid" : ""}`}
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city of residence."
            />
            {errors.city && <div className="invalid-feedback">{errors.city}</div>}
          </div>

          <div className="mb-3">
            <label className="mb-2" htmlFor="employmentStatus">
              Are you currently employed?*
            </label>
            <select
              className={`form-select p-3 ${errors.employmentStatus ? "is-invalid" : ""
                }`}
              name="employmentStatus"
              value={formData.employmentStatus}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            {errors.employmentStatus && (
              <div className="invalid-feedback">{errors.employmentStatus}</div>
            )}
          </div>

          {/* <label htmlFor="">Residential Status</label>
          <div className="alert alert-warning">
            <p>
              To verify your residency in Pakistan, please upload any one of the
              following documents:
            </p>
            <ul>
              <li>Utility Bill (not older than 3 months)</li>
              <li>Domicile Certificate</li>
              <li>
                Matriculation/Intermediate Certificate showing your board
                affiliation
              </li>
              <li>CNIC or Form-B</li>
              <li>Passport showing place of birth</li>
              <li>Rent Agreement or Ownership Documents</li>
              <li>
                Alternatively, you can provide any other document that proves your
                residence in Pakistan.
              </li>
            </ul>
            <p>
              This nationwide accessibility ensures everyone can benefit from this
              initiative and enhance their skills for a brighter future.
            </p>
          </div>
          <div className="mb-3">
            <div
              class="drop_box"
              onChange={(e) => handleFileChange(e, "residencyDocument")}
              onClick={() => document.getElementById("residencyFileID").click()}
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
              <input
                type="file"
                hidden
                accept=".doc,.docx,.pdf"
                id="residencyFileID"
              />
            </div>
          </div> */}

          <div className="mb-3">
            <div className="form-check">
              <input
                className={`form-check-input ${errors.agreement ? "is-invalid" : ""
                  }`}
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={handleChange}
                id="agreement"
              />
              <label className="form-check-label" htmlFor="agreement">
                I declare that all the information provided is correct to the best
                of my knowledge, and I agree to the terms and conditions of the
                Hunarmand program. <span className="text-danger">*</span>
              </label>
              {errors.agreement && (
                <div className="invalid-feedback">{errors.agreement}</div>
              )}
            </div>
          </div>
          <div className="text-center mt-4">
            <button
              type="submit"
              className="btn btn-success fw-bold hbtn text-white p-3   w-100"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default Register;
