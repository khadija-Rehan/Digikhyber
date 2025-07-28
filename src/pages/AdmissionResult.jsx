import React, { useState, useEffect, useRef } from "react";
import { Accordion } from "react-bootstrap";
import GIF from "../assets/approved.gif";
import { generatePdf } from "../api/user";
import { useCourses } from "../context/CoursesContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { getUserProfile } from "../api/user";

const getOrCreateFormNumber = () => {
  let formNumber = localStorage.getItem("formNumber");
  if (!formNumber) {
    formNumber = Math.floor(10000 + Math.random() * 90000).toString();
    localStorage.setItem("formNumber", formNumber);
  }
  return formNumber;
};

const AdmissionResult = () => {
  const { userCourses, availableCourses, setUserCourses, getTotalPrice } =
    useCourses();

  const { user, login } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [editCourses, setEditCourses] = useState([...userCourses]);
  const [error, setError] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [challanCreatedAt, setChallanCreatedAt] = useState(null);

  const [formNumber, setFormNumber] = useState(() => getOrCreateFormNumber());

  const testScore =
    user?.user?.data?.user?.testScore !== undefined &&
    user?.user?.data?.user?.testScore !== null
      ? Number(user.user.data.user.testScore)
      : null;

  const totalMcqs = 20;
  const correctAnswers =
    testScore !== null && !isNaN(testScore)
      ? Math.round((testScore / 100) * totalMcqs)
      : "-";
  const incorrectAnswers =
    testScore !== null && !isNaN(testScore)
      ? totalMcqs - Math.round((testScore / 100) * totalMcqs)
      : "-";
  const marksObtained = correctAnswers;
  const percentage =
    testScore !== null && !isNaN(testScore) ? `${testScore}%` : "-";

  const isPassed = testScore !== null && !isNaN(testScore) && testScore >= 50;

  // --- FIX: Prevent profile API call loop ---
  // We'll only fetch the profile once on mount, and on tab focus, but not on every user/login change.
  // We'll use a ref to prevent multiple fetches on mount.
  const hasFetchedProfile = useRef(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileResponse = await getUserProfile();
        const profileData = profileResponse.data;

        const updatedUserData = {
          user: {
            ...user.user,
            ...profileData,
          },
          token: user.token,
        };

        login(updatedUserData);

        console.log("User profile updated:", updatedUserData);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    // Only fetch once on mount if user and token exist
    if (
      user &&
      user.token &&
      !hasFetchedProfile.current
    ) {
      hasFetchedProfile.current = true;
      fetchUserProfile();
    }

    // Listen for when the user comes back to this page (tab focus)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && user && user.token) {
        fetchUserProfile();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
    // Only run on mount and when user/token changes, not on every login change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (!user || !user.user || !user.user.data || !user.user.data.user) return;

    // user.user.data.user.courses is expected to be a JSON string or an array
    let selectedCourses = user.user.data.user.courses;

    let parsedCourses = [];
    if (selectedCourses) {
      try {
        // If it's a string, try to parse it as JSON
        if (typeof selectedCourses === "string") {
          parsedCourses = JSON.parse(selectedCourses);
        } else if (Array.isArray(selectedCourses)) {
          // If it's already an array, use it directly
          parsedCourses = selectedCourses;
        }
      } catch (error) {
        // If parsing fails, fallback to empty array
        console.error("Error parsing selectedCourses:", error);
        parsedCourses = [];
      }
    }

    if (Array.isArray(parsedCourses) && parsedCourses.length > 0) {
      // Only add courses that are not already in userCourses
      const existingCourses = new Set(userCourses);
      const newCourses = parsedCourses.filter(
        (course) => !existingCourses.has(course)
      );
      if (newCourses.length > 0) {
        setUserCourses([...userCourses, ...newCourses]);
      }
    }

    let price = getTotalPrice();
    setTotalPrice(price);
  }, [userCourses, setUserCourses, user]);

  const handleEditClick = () => {
    setEditCourses([...userCourses]);
    setShowModal(true);
    setError("");
  };

  const handleCourseChange = (index, selectedName) => {
    const updated = [...editCourses];
    updated[index] = selectedName;
    setEditCourses(updated);
  };

  const handleAddCourse = () => {
    setEditCourses([...editCourses, ""]);
  };

  const handleDeleteCourse = (index) => {
    const updated = [...editCourses];
    updated.splice(index, 1);
    setEditCourses(updated);
  };

  const handleSave = () => {
    // Remove empty and duplicate courses
    const filtered = editCourses.filter(Boolean);
    const unique = Array.from(new Set(filtered));
    if (unique.length > 3) {
      setError("You can enroll in up to 3 courses only.");
      return;
    }
    setUserCourses(unique);
    setShowModal(false);
  };

  // Add loading state for challan generation
  const [isGeneratingChallan, setIsGeneratingChallan] = useState(false);

  const handleGeneratePdf = async () => {
    try {
      if (totalPrice === 0) {
        toast.error("Please add some coruses!");
        return;
      }
      setIsGeneratingChallan(true);
      const { data } = await generatePdf(totalPrice, userCourses);
      const fileName = data.data.fileName;
      if (!fileName) {
        console.error("No file path returned");
        setIsGeneratingChallan(false);
        return;
        return;
      }
      // const fileUrl = `http://localhost:3001/uploads/${fileName}`;
      const fileUrl = `https://backend.hunarmandpunjab.pk/uploads/${fileName}`;
      const a = document.createElement("a");
      a.href = fileUrl;
      a.download = fileName;
      a.click();
      localStorage.removeItem("selectedCourses");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGeneratingChallan(false);
    }
  };

  const [hasChallan, setHasChallan] = useState(false);
  const [firstChallan, setFirstChallan] = useState(null);
  const [challanStatus, setChallanStatus] = useState(null);

  useEffect(() => {
    // Check if user has a challan
    const challanTotal = user?.user?.data?.challans?.total;
    setHasChallan(challanTotal !== 0);

    // Get first challan and its paid status
    const challanObj = user?.user?.data?.challans?.challans[0];
    setFirstChallan(challanObj);

    // Only show challan status if there is a challan object
    if (challanObj && typeof challanObj.paid !== "undefined") {
      setChallanStatus(challanObj.paid ? "Paid" : "Pending");
    } else {
      setChallanStatus(null);
    }

    // Get createdAt date from challanObj if available
    if (challanObj && challanObj.createdAt) {
      setChallanCreatedAt(challanObj.createdAt);
    }

    // For debugging
    console.log(challanObj);
  }, [user]);

  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 70, 19, 0.25)",
    zIndex: 1050,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const modalContentStyle = {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 8px 32px 0 rgba(0,70,19,0.18)",
    border: "2px solid #079560",
    minWidth: 420,
    maxWidth: 600,
    width: "100%",
    fontFamily: "Poppins, sans-serif",
    color: "#222",
  };

  const modalHeaderStyle = {
    background: "#079560",
    color: "#fff",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    padding: "18px 24px",
    borderBottom: "1px solid #e9ecef",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const modalTitleStyle = {
    fontWeight: 700,
    fontSize: "1.2rem",
    margin: 0,
    letterSpacing: "0.5px",
  };

  const closeBtnStyle = {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "1.5rem",
    lineHeight: 1,
    cursor: "pointer",
    padding: 0,
  };

  const modalBodyStyle = {
    padding: "22px 24px 10px 24px",
    background: "#f8f9fa",
  };

  const selectStyle = {
    border: "1.5px solid #079560",
    borderRadius: "6px",
    fontFamily: "Poppins, sans-serif",
    fontSize: "1rem",
    color: "#004613",
    background: "#fff",
  };

  const deleteBtnStyle = {
    background: "#D32F2F",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "0.95rem",
    padding: "6px 14px",
    fontWeight: 500,
    transition: "background 0.2s",
    marginLeft: 6,
  };

  const addBtnStyle = {
    background: "#DDA30B",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    padding: "7px 18px",
    fontWeight: 600,
    marginTop: 10,
    marginBottom: 5,
    transition: "background 0.2s",
  };

  const modalFooterStyle = {
    background: "#f8f9fa",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    borderTop: "1px solid #e9ecef",
    padding: "16px 24px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  };

  const cancelBtnStyle = {
    background: "#e0e0e0",
    color: "#004613",
    border: "none",
    borderRadius: "4px",
    fontWeight: 600,
    padding: "7px 18px",
    fontSize: "1rem",
  };

  const saveBtnStyle = {
    background: "#079560",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontWeight: 600,
    padding: "7px 18px",
    fontSize: "1rem",
  };

  return (
    <>
      <div className="container">
        <center className="pt-5">
          <img style={{ width: "100px" }} src={GIF} alt={GIF} />
        </center>
        <div className="row  pb-5">
          <h2 className="text-center">
            Congratulations! You’ve Successfully Passed the Admission Test
          </h2>
          <div
            className="alert alert-success mt-4"
            style={{ color: "green", fontFamily: "Poppins" }}
            role="alert"
          >
            <strong>
              <i className="fas fa-check-circle" style={{ color: "green" }}></i>{" "}
              Congratulations! You’ve Successfully Passed the Admission Test
            </strong>{" "}
            We are thrilled to inform you that you have successfully cleared the
            Hunarmand Punjab Admission Test. Now you are eligible for a
            Scholarship Card. To confirm your seat & proceed with your enrolled
            course. All the courses under the Hunarmand scholarship card are
            100% free, but the application processing fee is necessary to
            complete your application. Your processing fee will be reimbursed if
            you achieve above 85% Marks in the final evaluation test under the
            policy of Hunarmand Punjab. <br />
            You’re just one step away from receiving your Scholarship Card!
            <div className="mt-4">
              <p className="fw-semibold ">
                ⚡ Benefits of the Scholarship Card:
              </p>
              <ul className="  mt-2">
                <li> Access to Advanced IT Courses</li>
                <li> Laptop Scheme</li>
                <li> Solar Scheme</li>
                <li>Access to Taleem Finance</li>
                <li> Access to Study Abroad Free Consultancy</li>
                <li> Hands-On Learning with Global Curriculum</li>
                <li> Career Guidance & Freelancing Support</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          {/* <div className="col-lg-12">
            <div className="shadow-box d-flex align-items-center justify-content-between gap-2 flex-wrap flex-md-nowrap mb-3  p-3">
              <div>
                <h3>Final Step: Video Guide</h3>
                <p className="mb-0">
                  Watch this video for detailed instructions on completing the
                  final <br />
                  step of your enrollment after passing the admission test.
                </p>
              </div>
              <button className="btn-green btn btn-success rounded-1">
                {" "}
                <i className="fas fa-video"></i> Watch Video
              </button>
            </div>
          </div> */}
        </div>

        <div
          style={{
            boxShadow: "0 0 20px 0 rgb(62 28 131 / 10%)",
            border: "1px solid #e9ecef",
            borderRadius: "4px",
          }}
        >
          <table className="table rwd-table">
            <thead
              className="thead-light"
              style={{ backgroundColor: "#079560", color: "#fff" }}
            >
              <tr>
                <th
                  className="p-3"
                  colSpan="2"
                  style={{
                    textAlign: "center",
                    color: "white",
                    backgroundColor: "#079560",
                    fontWeight: "bold",
                  }}
                >
                  Student Result Card
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="first-td">
                <td data-th="Field">Field</td>
                <td data-th="Details">Details</td>
              </tr>
              <tr>
                <td data-th="Field">Student Name</td>
                <td data-th="Details">{user?.user?.fullName || ""}</td>
              </tr>
              <tr>
                <td data-th="Field">Test ID</td>
                <td data-th="Details">{formNumber}</td>
              </tr>
              <tr>
                <td data-th="Field">Total MCQs</td>
                <td data-th="Details">{totalMcqs}</td>
              </tr>
              {/* <tr>
                <td data-th="Field">Correct Answers</td>

                <td data-th="Details">18</td>
              </tr> */}
              {/* <tr>
                <td data-th="Field">Incorrect Answers</td>
                <td data-th="Details">7</td>
              </tr> */}

              <tr>
                <td data-th="Field">Total Marks</td>
                <td data-th="Details">{totalMcqs * 1}</td>
              </tr>
              <tr>
                <td data-th="Field">Marks Obtained</td>
                <td data-th="Details">{correctAnswers}</td>
              </tr>
              <tr>
                <td data-th="Field">Percentage</td>
                <td data-th="Details">{percentage}</td>
              </tr>
              <tr>
                {/* <td data-th="Field">Pass/Fail Status</td> */}
                <td data-th="Field">Result Status</td>
                <td data-th="Details">
                  <span
                    className="btn-green p-1 px-2"
                    style={{ fontSize: "12px" }}
                  >
                    Pass
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="row pt-4">
          <div className="d-flex align-items-center text-black gap-2 mb-2 ">
            <i className="fas fa-check-square"></i>
            <h5 className="fw-bold mb-0">Selected Study Programs</h5>
          </div>
          <p>
            {/* To edit your courses, click 'Edit.' To skip a course, select 'None'
            in the optional courses. To add a course, choose from the available
            options. */}
            You can enroll in up to 2 courses at once. All courses are
            completely free, but a one-time application processing fee of PKR
            2850 is required, regardless of the number of courses you select.
          </p>
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th style={{ backgroundColor: "#dee2e6" }} scope="col">
                    Form #
                  </th>
                  <th style={{ backgroundColor: "#dee2e6" }} scope="col">
                    Applied Courses
                  </th>
                  {/* <th className="d-none" style={{ backgroundColor: "#dee2e6" }} scope="col">
                    Edit Courses
                  </th> */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>48079</td>
                  <td>
                    <ul>
                      {user?.user?.data?.user?.courses.length === 0 ? (
                        <li>No courses selected</li>
                      ) : (
                        user?.user?.data?.user?.courses.map((course, idx) => (
                          <li key={idx}>{course}</li>
                        ))
                      )}
                    </ul>
                  </td>
                  {/* <td>
                    <button
                      className="btn btn-success btn-green rounded-2 d-none"
                      onClick={handleEditClick}
                    >
                      <i className="fas fa-edit"></i> Edit
                    </button>
                  </td> */}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="d-flex align-items-center gap-1 alert alert-warning text-black">
          <h4 className="fw-bold mb-0 text-black">
            Last Date to pay Application Processing Fee:
          </h4>
          <p className="mb-0 text-black" style={{ marginRight: 12 }}>
            {(() => {
              const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
              };
              if (challanCreatedAt) {
                // Show challan created at date + 7 days
                const challanDate = new Date(challanCreatedAt);
                challanDate.setDate(challanDate.getDate() + 3);
                return challanDate.toLocaleDateString("en-US", options);
              } else {
                // Show today + 7 days
                const today = new Date();
                today.setDate(today.getDate() + 7);
                return today.toLocaleDateString("en-US", options);
              }
            })()}
          </p>
          {challanStatus && (
            <span
              className={`badge px-3 py-2 ms-2 fw-bold ${
                challanStatus === "Paid"
                  ? "bg-success text-white"
                  : "bg-warning text-dark"
              }`}
              style={{
                fontSize: "1rem",
                borderRadius: "6px",
                letterSpacing: "0.5px",
                // minWidth: 80,
                textAlign: "center",
              }}
            >
              {challanStatus}
            </span>
          )}
        </div>
      </div>
      <div
        style={{
          // backgroundColor: "#DDA30B",
          // backgroundColor: "orange",
          color: "#000",
          padding: "50px 0 80px",
        }}
      >
        <div className="container">
          <div className="payment">
            <h2 className="text-center">Pay Application Processing Fee!</h2>
            <p>
              {/* Now, you're just one step away from confirming your admission
              seat. Please follow the instructions below to submit the
              application fee through the given payment methods. */}
              Now, you're just one step away from confirming your Scholarship
              Card . Please follow the instructions below to submit the
              processing fee through the given payment methods.
            </p>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="text-center p-2 payment-header">
                Payment Options
              </div>
            </div>
          </div>
          <div className="row payment-options">
            <div className="col-md-12">
              <div className="bg-white p-3 payment-options-container shadow-sm">
                <div
                  className="row nav nav-pills mb-3"
                  id="pills-tab"
                  role="tablist"
                >
                  {/* <div
                    className="nav-item col-md-6 mb-3 mb-lg-0"
                    role="present ation"
                  >
                    <button
                      className="nav-link active w-100 h-100 p-3"
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      <div className="d-flex align-items-start gap-2">
                        <div className="icon">
                          <i className="fa-solid fa-wallet"></i>
                        </div>
                        <div className="ms-3 text-start">
                          <h4>Consumer Number / PSID</h4>
                          <p>
                            Pay using Online Mobile Banking or mobile wallet
                            using 1 Biller
                          </p>
                        </div>
                      </div>
                    </button>
                  </div> */}
                  <div className="nav-item col-md-6" role="presentation">
                    <button
                      className="nav-link w-100 h-100 p-3"
                      id="pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected="false"
                    >
                      <div className="d-flex align-items-start gap-2">
                        <div className="icon">
                          <i className="fa-solid fa-building-columns"></i>
                        </div>
                        <div className="ms-3 text-start">
                          {/* <h4>Bank Challan</h4> */}
                          <h4>CLICK HERE FOR BANK CHALLAN </h4>
                          <p>
                            Pay at any BOP Branch Using Hunarmand Punjab Challan
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div
                      className="tab-content bg-white p-3 rounded-2 shadow-sm"
                      id="pills-tabContent"
                    >
                      {/* <div
                        className="tab-pane fade show active"
                        id="pills-home"
                        role="tabpanel"
                        aria-labelledby="pills-home-tab"
                        tabindex="0"
                      >
                        <h5>
                          Follow these steps to complete your payment using
                          PSID:
                        </h5>
                        <ol>
                          <li>
                            <span className="fw-bold">
                              Click on "Generate PSID"
                            </span>{" "}
                            to generate your unique PSID number.
                          </li>
                          <li>
                            <span className="fw-bold">
                              Once the PSID is generated, copy the PSID
                            </span>{" "}
                            by clicking the copy icon.
                          </li>
                          <li>
                            <span className="fw-bold">
                              Click on any bank option
                            </span>{" "}
                            below to view detailed instructions on how to pay
                            your registration charges.
                          </li>
                        </ol>
                        <button
                          className="btn-green btn-success btn rounded-2"
                          disabled={true}
                        >
                          PSID Coming Soon
                        </button>
                      </div> */}
                      <div
                        className="tab-pane fade "
                        id="pills-profile"
                        role="tabpanel"
                        aria-labelledby="pills-profile-tab"
                        tabindex="0"
                      >
                        <h5>Follow these steps to complete your payment:</h5>
                        <h5>For Bank Challan Payment:</h5>
                        <ol>
                          <li>
                            <span className="fw-bold">
                              Click on "Generate Challan"
                            </span>{" "}
                            to generate your unique Bank Challan.
                          </li>
                          <li>
                            <span className="fw-bold">
                              Download the generated challan
                            </span>{" "}
                            by clicking the download button.
                          </li>
                          <li>
                            <span className="fw-bold">
                              Pay the challan at any nearest BOP Bank Branch
                            </span>{" "}
                            to complete your payment, confirm your Enrollment &
                            Get a chance to avail Scholarship Card.
                          </li>
                        </ol>
                        <button
                          className="btn-green btn-success btn rounded-2"
                          onClick={handleGeneratePdf}
                          disabled={hasChallan || isGeneratingChallan}
                        >
                          {isGeneratingChallan ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Generating...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-download"></i>{" "}
                              {hasChallan
                                ? "Challan Already Submitted"
                                : "Generate Challan"}
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Accordion defaultActiveKey="0" className="d-none">
            {/* ...omitted for brevity... */}
            <Accordion.Item eventKey="0">
              {/* <Accordion.Header>Get Bank Challan</Accordion.Header> */}
              <Accordion.Header>Payment Options</Accordion.Header>
              <Accordion.Body>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="d-flex align-items-start gap-2 p-4 rounded-2 border h-100">
                      <div>
                        <i className="fa-solid fa-wallet"></i>
                      </div>
                      <div className="ms-3">
                        <h4>Consumer Number / PSID</h4>
                        <p>
                          Pay using Online Mobile Banking or mobile wallet using
                          1 Biller
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-start gap-2 p-4 rounded-2 border h-100">
                      <div>
                        <i className="fa-solid fa-building-columns"></i>
                      </div>
                      <div className="ms-3">
                        <h4>Bank Challan</h4>
                        <p>
                          Pay at any bank using Kamyaab Freelancer Program bank
                          challan
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="fw-bold">Instructions:</p>
                <p>
                  Hunarmand also provides the option to deposit your application
                  processing fee conveniently via Bank Challan. This method is
                  simple and accessible for all applicants across Pakistan.
                  Follow the steps below to deposit your application processing
                  fee using a Bank Challan:
                </p>
                <ul>
                  <li>
                    <strong>Download & Print the Challan Form:</strong> Download
                    the challan form provided below and take a printed copy with
                    you.
                  </li>
                  <li>
                    <strong>Visit Any Branch from the Listed Banks:</strong>{" "}
                    Take the printed challan to any branch of the following
                    banks:
                    <ul>
                      <li>Meezan Bank</li>
                      <li>Askari Bank</li>
                      <li>MCB</li>
                      <li>Bank Alfalah</li>
                      <li>Standard Chartered</li>
                      <li>Silk Bank</li>
                      <li>UBL</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Deposit the Challan:</strong> Submit the challan at
                    the bank counter and deposit your application processing
                    fee.
                  </li>
                  <li>
                    <strong>Notification of Payment:</strong> Once your
                    application processing fee is deposited, you will receive an
                    instant notification confirming the application processing
                    fee from Hunarmand Initiative.
                  </li>
                  <li>
                    <strong>Application Status:</strong>
                    <ul>
                      <li>
                        <strong>Within 24 Hours:</strong> Your Learning Portal
                        credentials and class details will be shared with you if
                        your application is approved.
                      </li>
                    </ul>
                  </li>
                </ul>
                <button
                  className="btn-green btn-success btn rounded-2"
                  onClick={handleGeneratePdf}
                  disabled={hasChallan || isGeneratingChallan}
                >
                  {isGeneratingChallan ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Generating...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-download"></i>{" "}
                      {hasChallan
                        ? "Challan Already Submitted"
                        : "Download Bank Challan"}
                    </>
                  )}
                </button>

                <div className="alert alert-success mt-4 border">
                  <b> Note: </b>After paying your Hunarmand application
                  processing fee, you don't need to do anything further. Please
                  allow up to 30 minutes for processing. Within this period, you
                  should receive a confirmation email. If you do not receive the
                  confirmation within 30 minutes , click on the below Check
                  Status button to resolve the issue. If the confirmation is
                  still not available, contact our support team at
                  admissions@Hunarmand.pk for any kind of assistance.
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
      {/* Modal for editing courses */}
      {showModal && (
        <div style={modalOverlayStyle} tabIndex="-1" role="dialog">
          <div style={{ width: "100%", maxWidth: 600 /* was 440 */ }}>
            <div style={modalContentStyle}>
              <div style={modalHeaderStyle}>
                <h5 style={modalTitleStyle}>Edit Courses</h5>
                <button
                  type="button"
                  style={closeBtnStyle}
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div style={modalBodyStyle}>
                {editCourses.map((course, idx) => (
                  <div
                    key={idx}
                    className="d-flex align-items-center mb-2 gap-2"
                  >
                    <select
                      className="form-select"
                      style={selectStyle}
                      value={course}
                      onChange={(e) => handleCourseChange(idx, e.target.value)}
                    >
                      <option value="">Select Course</option>
                      {availableCourses.map((c, i) => (
                        <option
                          key={i}
                          value={c.name}
                          disabled={
                            editCourses.includes(c.name) && c.name !== course
                          }
                        >
                          {c.name}
                        </option>
                      ))}
                    </select>
                    <button
                      style={deleteBtnStyle}
                      onClick={() => handleDeleteCourse(idx)}
                      disabled={editCourses.length === 1}
                    >
                      Delete
                    </button>
                  </div>
                ))}
                {editCourses.length < 3 && (
                  <button style={addBtnStyle} onClick={handleAddCourse}>
                    Add Course
                  </button>
                )}
                {error && (
                  <div className="text-danger mt-2" style={{ fontWeight: 500 }}>
                    {error}
                  </div>
                )}
              </div>
              <div style={modalFooterStyle}>
                <button
                  type="button"
                  style={cancelBtnStyle}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="button" style={saveBtnStyle} onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdmissionResult;
