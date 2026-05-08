import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import GIF from "../assets/approved.gif";
import { generatePdf } from "../api/user";
import { useCourses } from "../context/CoursesContext";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";
import { getUserProfile } from "../api/user";
import LoginAlertWrapper from "../components/LoginAlertWrapper";
import { faTruckField } from "@fortawesome/free-solid-svg-icons";
import { AVAILABLE_COURSES } from "../utils/courses";

const getOrCreateFormNumber = () => {
  let formNumber = localStorage.getItem("formNumber");
  if (!formNumber) {
    formNumber = Math.floor(10000 + Math.random() * 90000).toString();
    localStorage.setItem("formNumber", formNumber);
  }
  return formNumber;
};

const AdmissionResult = () => {
  const {
    userCourses,
    availableCourses,
    setUserCourses,
    getTotalPrice,
    submitSecondEnrolmentCourses,
  } = useCourses();

  const { user, login, setPaidUser } = useAuth();
  const { showError } = useModal();
  const [showModal, setShowModal] = useState(true);
  const [editCourses, setEditCourses] = useState([...userCourses]);
  const [error, setError] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [challanCreatedAt, setChallanCreatedAt] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("psid");
  const [psid, setPsid] = useState("");
  // Add loading state for challan generation
  const [isGeneratingChallan, setIsGeneratingChallan] = useState(false);
  const [hasChallan, setHasChallan] = useState(false);
  const [firstChallan, setFirstChallan] = useState(null);
  const [challanStatus, setChallanStatus] = useState(null);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  // Separate challans for online admission and 2nd enrolment
  const [onlineChallan, setOnlineChallan] = useState(null);
  const [onlineChallanStatus, setOnlineChallanStatus] = useState(null);
  const [onlinePsid, setOnlinePsid] = useState("");
  const [hasOnlineChallan, setHasOnlineChallan] = useState(false);

  const [secondEnrolmentChallan, setSecondEnrolmentChallan] = useState(null);
  const [secondEnrolmentChallanStatus, setSecondEnrolmentChallanStatus] =
    useState(null);
  const [secondEnrolmentPsid, setSecondEnrolmentPsid] = useState("");
  const [hasSecondEnroll, setHasSecondEnroll] = useState(false);
  const [hasSecondEnrolmentChallan, setHasSecondEnrolmentChallan] =
    useState(false);

  // Track if PSID was just generated (for showing in UI) - REMOVED as we fetch directly
  // const [psidJustGenerated, setPsidJustGenerated] = useState(false);

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
  const percentage =
    testScore !== null && !isNaN(testScore) ? `${testScore}%` : "-";

  const hasFetchedProfile = useRef(false);

  const [activeTab, setActiveTab] = useState("online");

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
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // Get admission types from user profile
  const admissionTypes = user?.user?.data?.user?.admissionType || [];
  const hasPhysical = admissionTypes.includes("physical");
  const hasOnline = admissionTypes.includes("online");

  // Check if 2nd enrolment challan is paid for 2nd enrolment tab
  const isChallanPaid = secondEnrolmentChallanStatus === "Paid";

  // Show tabs if we have online admission or if 2nd enrolment challan is paid
  const showTabs = hasOnline || isChallanPaid;

  // Effect removed as we call fetchUserProfile directly in handleGeneratePdf
  // useEffect(() => {
  //   if (psidJustGenerated) {
  //     fetchUserProfile();
  //   }
  // }, [psidJustGenerated]);

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
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    // Only fetch once on mount if user and token exist
    if (user && user.token && !hasFetchedProfile.current) {
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

  const handleGeneratePdf = async () => {
    try {
      if (totalPrice === 0) {
        showError("Please add some courses!");
        return;
      }
      setIsGeneratingChallan(true);

      // Check if we're in the 2nd enrolment tab
      const isSecondEnrolment = activeTab === "2nd-enrolment";
      const { data } = await generatePdf(
        totalPrice,
        userCourses,
        isSecondEnrolment
      );
      const fileName = data.data.fileName;

      if (paymentMethod === "psid") {
        // Remove "challan-" from the filename and use it in setPsid
        let psidValue = fileName.replace(/^challan-/, "").replace(/\.pdf$/, "");
        const psidString = `267200309${psidValue}`;

        // Update the correct PSID state based on which tab we're in
        if (isSecondEnrolment) {
          setSecondEnrolmentPsid(psidString);
          // Optimistically update status to prevent race condition
          setHasSecondEnrolmentChallan(true);
        } else {
          setOnlinePsid(psidString);
          setPsid(psidString); // Legacy support
          // Optimistically update status to prevent race condition
          setHasOnlineChallan(true);
        }
        // setPsidJustGenerated(true); // Removed
        localStorage.removeItem("selectedCourses");
        setPaymentMethod("challan");

        // Immediately fetch updated profile to persist state
        await fetchUserProfile();
        setIsGeneratingChallan(false);
        return;
      }

      if (!fileName) {
        console.error("No file path returned");
        setIsGeneratingChallan(false);
        return;
      }

      // Handle Download (Bank Challan) case
      // Optimistically update status to prevent multiple downloads
      if (isSecondEnrolment) {
        setHasSecondEnrolmentChallan(true);
      } else {
        setHasOnlineChallan(true);
      }

      // const fileUrl = `http://localhost:3001/uploads/${fileName}`;
      const fileUrl = `https://backend.digikhyber.org.pk/uploads/${fileName}`;
      const a = document.createElement("a");
      a.href = fileUrl;
      a.download = fileName;
      a.target = "_blank";
      a.click();
      localStorage.removeItem("selectedCourses");

      // Fetch profile to update state from backend
      await fetchUserProfile();
    } catch (error) {
      console.error("Error generating PDF:", error);
      // Revert optimistic updates if needed, though simpler to just let error show
    } finally {
      setIsGeneratingChallan(false);
    }
  };

  useEffect(() => {
    // Get all challans from user data
    const allChallans = user?.user?.data?.challans?.challans || [];
    const challanTotal = user?.user?.data?.challans?.total || 0;
    const secondEnroll = user?.user?.data?.user?.secondEnrolledCourses || 0;

    const hasSecondEnroll = secondEnroll.length === 0;

    console.log("hasSecondEnroll", hasSecondEnroll);

    // console.log("secondEnroll", secondEnroll);

    if (hasSecondEnroll) {
      setHasSecondEnroll(true);
    }

    // Separate challans based on secondEnrollChallan field
    const onlineChallanObj = allChallans.find(
      (challan) => challan.secondEnrollChallan === false
    );
    const secondEnrolmentChallanObj = allChallans.find(
      (challan) => challan.secondEnrollChallan === true
    );

    // console.log("onlineChallanObj", onlineChallanObj);
    // console.log("secondEnrolmentChallanObj", secondEnrolmentChallanObj);

    // Online Admission Challan
    if (onlineChallanObj) {
      setOnlineChallan(onlineChallanObj);
      setHasOnlineChallan(true);
      if (onlineChallanObj.challanId) {
        setOnlinePsid(`267200309${onlineChallanObj.challanId}`);
      }
      if (typeof onlineChallanObj.paid !== "undefined") {
        setOnlineChallanStatus(onlineChallanObj.paid ? "Paid" : "Pending");
      } else {
        setOnlineChallanStatus(null);
      }
    } else {
      setOnlineChallan(null);
      setHasOnlineChallan(false);
      setOnlinePsid("");
      setOnlineChallanStatus(null);
    }

    // 2nd Enrolment Challan
    if (secondEnrolmentChallanObj) {
      setSecondEnrolmentChallan(secondEnrolmentChallanObj);
      setHasSecondEnrolmentChallan(true);
      if (secondEnrolmentChallanObj.challanId) {
        setSecondEnrolmentPsid(
          `267200309${secondEnrolmentChallanObj.challanId}`
        );
      }
      if (typeof secondEnrolmentChallanObj.paid !== "undefined") {
        setSecondEnrolmentChallanStatus(
          secondEnrolmentChallanObj.paid ? "Paid" : "Pending"
        );
      } else {
        setSecondEnrolmentChallanStatus(null);
      }
    } else {
      setSecondEnrolmentChallan(null);
      setHasSecondEnrolmentChallan(false);
      setSecondEnrolmentPsid("");
      setSecondEnrolmentChallanStatus(null);
    }

    // Legacy support - use first challan (online) for backward compatibility
    const challanObj = allChallans[0];
    setFirstChallan(challanObj);
    setHasChallan(challanTotal !== 0);

    const challanNumber = challanObj?.challanId || null;
    if (challanNumber && challanNumber !== null) {
      setPsid(`267200309${challanNumber}`);
    }

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
  }, [user]);

  // Show login alert modal when online challan is paid
  useEffect(() => {
    if (hasOnlineChallan && onlineChallanStatus === "Paid") {
      setShowLoginAlert(true);
      setPaidUser(true);
    }
  }, [hasOnlineChallan, onlineChallanStatus]);

  // Reset psidJustGenerated removed
  // useEffect(() => {
  //   setPsidJustGenerated(false);
  // }, []);

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
    border: "2px solid #0B5D3B",
    // minWidth: 420,
    maxWidth: 600,
    width: "100%",
    fontFamily: "Poppins, sans-serif",
    color: "#222",
  };

  const modalHeaderStyle = {
    background: "#0B5D3B",
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
    border: "1.5px solid #0B5D3B",
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
    // borderTop: "1px solid #e9ecef",
    padding: "10px 24px",
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
    background: "#0B5D3B",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontWeight: 600,
    padding: "7px 18px",
    fontSize: "1rem",
  };

  // Copy PSID to clipboard
  const handleCopyPsid = () => {
    if (psid) {
      navigator.clipboard.writeText(psid);
    }
  };

  // Physical admission PDF download
  const [isDownloadingPhysical, setIsDownloadingPhysical] = useState(false);
  const handleDownloadPhysicalPdf = async () => {
    try {
      setIsDownloadingPhysical(true);
      const physicalCourses = user?.user?.data?.user?.physicalCourses || [];
      const coursesForPdf =
        Array.isArray(physicalCourses) && physicalCourses.length > 0
          ? physicalCourses
          : user?.user?.data?.user?.courses || [];
      const amount = 0; // No fee for physical admission card download
      await generatePdf(amount, coursesForPdf);
    } catch (e) {
      console.error("Failed to generate physical admission PDF", e);
    } finally {
      setIsDownloadingPhysical(false);
    }
  };

  // 2nd Enrolment course selection
  const [secondEnrolmentCourses, setSecondEnrolmentCourses] = useState([
    "",
    "",
  ]);
  const [isSubmittingSecondEnrolment, setIsSubmittingSecondEnrolment] =
    useState(false);
  const [isGeneratingSecondEnrolmentPdf, setIsGeneratingSecondEnrolmentPdf] =
    useState(false);

  // Get user's existing courses to exclude
  const existingCourses = user?.user?.data?.user?.courses || [];
  let existingCoursesArray = [];

  if (Array.isArray(existingCourses)) {
    existingCoursesArray = existingCourses;
  } else if (typeof existingCourses === "string") {
    try {
      existingCoursesArray = JSON.parse(existingCourses || "[]");
    } catch (e) {
      // If parsing fails, treat as single course name
      existingCoursesArray = existingCourses ? [existingCourses] : [];
    }
  }

  // Normalize course names for comparison (trim and case-insensitive)
  const normalizedExistingCourses = existingCoursesArray
    .map((course) => (typeof course === "string" ? course.trim() : course))
    .filter(Boolean);

  // Filter available courses to exclude already enrolled courses
  const availableCoursesFor2ndEnrolment = AVAILABLE_COURSES.filter((course) => {
    const courseName = course.name.trim();
    return !normalizedExistingCourses.some((existingCourse) => {
      const existingName =
        typeof existingCourse === "string"
          ? existingCourse.trim()
          : existingCourse;
      // Case-insensitive comparison
      return courseName.toLowerCase() === existingName.toLowerCase();
    });
  });

  const handleSecondEnrolmentCourseChange = (index, courseName) => {
    const newCourses = [...secondEnrolmentCourses];
    newCourses[index] = courseName;
    setSecondEnrolmentCourses(newCourses);
  };

  const handleSubmitSecondEnrolment = async () => {
    // Filter out empty strings and validate
    const selectedCourses = secondEnrolmentCourses.filter(
      (course) => course && course.trim() !== ""
    );

    if (selectedCourses.length === 0) {
      showError("Please select at least one course for 2nd enrolment.");
      return;
    }

    setIsSubmittingSecondEnrolment(true);

    try {
      await submitSecondEnrolmentCourses(selectedCourses);
      // showSuccess("Second enrolment courses submitted successfully!");
      // Optionally refresh user profile to get updated courses
      await fetchUserProfile();
      // Clear the form
      setSecondEnrolmentCourses(["", ""]);
    } catch (error) {
      console.error("Error submitting second enrolment courses:", error);
      let errorMessage =
        "Failed to submit second enrolment courses. Please try again.";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }

      showError(errorMessage);
    } finally {
      setIsSubmittingSecondEnrolment(false);
    }
  };

  const handleGenerateSecondEnrolmentPdf = async () => {
    try {
      // Get courses from user data if they exist, otherwise use selected courses
      const secondEnrolledCourses =
        user?.user?.data?.user?.secondEnrolledCourses || [];
      const coursesForPdf =
        Array.isArray(secondEnrolledCourses) && secondEnrolledCourses.length > 0
          ? secondEnrolledCourses
          : secondEnrolmentCourses.filter(
            (course) => course && course.trim() !== ""
          );

      if (coursesForPdf.length === 0) {
        showError("No courses available to generate PDF.");
        return;
      }

      setIsGeneratingSecondEnrolmentPdf(true);
      const amount = 0; // No fee for 2nd enrolment PDF
      const { data } = await generatePdf(amount, coursesForPdf, true);
      const fileName = data.data.fileName;

      if (!fileName) {
        console.error("No file path returned");
        setIsGeneratingSecondEnrolmentPdf(false);
        return;
      }

      const fileUrl = `https://backend.digikhyber.org.pk/uploads/${fileName}`;
      const a = document.createElement("a");
      a.href = fileUrl;
      a.download = fileName;
      a.target = "_blank";
      a.click();
    } catch (error) {
      console.error("Error generating 2nd enrolment PDF:", error);
      showError("Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingSecondEnrolmentPdf(false);
    }
  };

  return (
    <>
      {/* {showTabs && ( */}
      <div className="container pt-5">
        <div className="row">
          <div className="col-12">
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === "online" ? "active" : ""
                    }`}
                  onClick={() => setActiveTab("online")}
                  type="button"
                  role="tab"
                >
                  Online Admission
                </button>
              </li>
              {/* Physical Admission Tab - Commented out for now */}
              {/* <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      activeTab === "physical" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("physical")}
                    type="button"
                    role="tab"
                  >
                    Physical Admission
                  </button>
                </li> */}
              {/* 2nd Enrolment Tab - Only show if challan is paid */}
              {onlineChallan && onlineChallan.paid === true && (
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === "2nd-enrolment" ? "active" : ""
                      }`}
                    onClick={() => setActiveTab("2nd-enrolment")}
                    type="button"
                    role="tab"
                  >
                    ENROLL IN BATCH 2
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      {/* )} */}

      <div
        className={`container ${!showTabs || activeTab === "online" ? "d-block" : "d-none"
          }`}
      >
        <center className="pt-5">
          <img style={{ width: "100px" }} src={GIF} alt={GIF} />
        </center>

        {/* Online Admission Content */}
        <div
          className={`row pb-5 ${!showTabs || activeTab === "online" ? "d-block" : "d-none"
            }`}
        >
          <h2 className="text-center">
            Congratulations! You've Successfully Passed the Admission Test
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
            Digikhyber Admission Test. Now you are eligible for a
            Scholarship Card. To confirm your seat & proceed with your enrolled
            course. All the courses under the digikhyber scholarship card are
            100% free, but the application processing fee is necessary to
            complete your application. Your processing fee will be reimbursed if
            you achieve above 85% Marks in the final evaluation test under the
            policy of Digikhyber. <br />
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
            <div className="mt-4 mb-2">
              <Link 
                to="/dashboard" 
                className="btn btn-success p-3 fw-bold w-100 text-decoration-none" 
                style={{ background: '#0B5D3B', border: 'none', borderRadius: '8px', fontSize: '1.1rem', display: 'block', textAlign: 'center' }}
              >
                <i className="fas fa-th-large me-2"></i> OPEN YOUR PROFESSIONAL CANDIDATE DASHBOARD
              </Link>
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
              style={{ backgroundColor: "#0B5D3B", color: "#fff" }}
            >
              <tr>
                <th
                  className="p-3"
                  colSpan="2"
                  style={{
                    textAlign: "center",
                    color: "white",
                    backgroundColor: "#0B5D3B",
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
            3250 is required, regardless of the number of courses you select.
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
              const onlineChallanCreatedAt = onlineChallan?.createdAt;
              if (onlineChallanCreatedAt) {
                // Show challan created at date + 3 days
                const challanDate = new Date(onlineChallanCreatedAt);
                challanDate.setDate(challanDate.getDate() + 3);
                return challanDate.toLocaleDateString("en-US", options);
              } else {
                // Show today + 3 days
                const today = new Date();
                today.setDate(today.getDate() + 3);
                return today.toLocaleDateString("en-US", options);
              }
            })()}
          </p>
          {onlineChallanStatus && (
            <span
              className={`badge px-3 py-2 ms-2 fw-bold ${onlineChallanStatus === "Paid"
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
              {onlineChallanStatus}
            </span>
          )}
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
                    <div
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
                        onClick={() => {
                          setPaymentMethod("psid");
                        }}
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
                    </div>
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
                        onClick={() => {
                          setPaymentMethod("challan");
                        }}
                      >
                        <div className="d-flex align-items-start gap-2">
                          <div className="icon">
                            <i className="fa-solid fa-building-columns"></i>
                          </div>
                          <div className="ms-3 text-start">
                            {/* <h4>Bank Challan</h4> */}
                            <h4>CLICK HERE FOR BANK CHALLAN </h4>
                            <p>
                              Pay at any BOP Branch Using Digikhyber
                              Challan
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
                        <div
                          className="tab-pane fade show active"
                          id="pills-home"
                          role="tabpanel"
                          aria-labelledby="pills-home-tab"
                          tabIndex="0"
                        >
                          {/* <h5>
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
                        </ol> */}
                          <h5>Instructions How to Pay:</h5>
                          {/* Payment Method Tabs */}
                          <div className="mt-4">
                            <ul
                              className="nav nav-tabs border-0"
                              id="paymentTabs"
                              role="tablist"
                              style={{ borderBottom: "1px solid #dee2e6" }}
                            >
                              <li className="nav-item" role="presentation">
                                <button
                                  className="nav-link active border-0"
                                  id="banking-tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#banking"
                                  type="button"
                                  role="tab"
                                  aria-controls="banking"
                                  aria-selected="true"
                                  style={{ borderBottom: "2px solid #007bff" }}
                                >
                                  <i className="fas fa-university me-2"></i>
                                  Banking App
                                </button>
                              </li>
                              <li className="nav-item" role="presentation">
                                <button
                                  className="nav-link border-0 d-flex align-items-center"
                                  id="jazzcash-tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#jazzcash"
                                  type="button"
                                  role="tab"
                                  aria-controls="jazzcash"
                                  aria-selected="false"
                                >
                                  <img
                                    src="/images/jazzcash.png"
                                    alt="JazzCash"
                                    style={{
                                      width: "24px",
                                      height: "24px",
                                      marginRight: "8px",
                                      objectFit: "contain",
                                    }}
                                  />
                                  JazzCash
                                </button>
                              </li>
                              <li className="nav-item" role="presentation">
                                <button
                                  className="nav-link border-0 d-flex align-items-center"
                                  id="easypaisa-tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#easypaisa"
                                  type="button"
                                  role="tab"
                                  aria-controls="easypaisa"
                                  aria-selected="false"
                                >
                                  <img
                                    src="/images/Easypaisa.png"
                                    alt="Easypaisa"
                                    style={{
                                      width: "24px",
                                      height: "24px",
                                      marginRight: "8px",
                                      objectFit: "contain",
                                    }}
                                  />
                                  Easypaisa
                                </button>
                              </li>
                            </ul>

                            <div
                              className="tab-content my-3"
                              id="paymentTabContent"
                            >
                              {/* Banking App Tab */}
                              <div
                                className="tab-pane fade show active"
                                id="banking"
                                role="tabpanel"
                                aria-labelledby="banking-tab"
                              >
                                <div className="card border-0">
                                  <div className="card-header bg-light border-0">
                                    <h6 className="mb-0">
                                      <i className="fas fa-university me-2"></i>
                                      Banking App Payment
                                    </h6>
                                    <small className="text-muted">
                                      (HBL, Meezan, UBL, Bank Alfalah, etc.)
                                    </small>
                                  </div>
                                  <div className="card-body">
                                    <ol className="ps-3">
                                      <li>Open your bank's mobile app</li>
                                      <li>
                                        Log in with your credentials (MPIN,
                                        fingerprint, or face ID)
                                      </li>
                                      <li>
                                        Go to "Bill Payments" or "Payments"
                                      </li>
                                      <li>
                                        Select "1Bill" (some banks list it under
                                        "Add Biller" or "Pay Bill")
                                      </li>
                                      <li>
                                        Enter the 1Bill Consumer/Invoice Number
                                        (usually 12–15 digits)
                                      </li>
                                      <li>
                                        The system will fetch and display the
                                        bill details
                                      </li>
                                      <li>
                                        Verify the name, amount, and service
                                      </li>
                                      <li>Tap "Pay" or "Confirm"</li>
                                      <li>
                                        Enter your PIN/OTP to authorize the
                                        transaction
                                      </li>
                                      <li>Receive confirmation receipt/SMS</li>
                                    </ol>
                                  </div>
                                </div>
                              </div>

                              {/* JazzCash Tab */}
                              <div
                                className="tab-pane fade"
                                id="jazzcash"
                                role="tabpanel"
                                aria-labelledby="jazzcash-tab"
                              >
                                <div className="card border-0">
                                  <div className="card-header bg-light border-0 d-flex align-items-center">
                                    <img
                                      src="/images/jazzcash.png"
                                      alt="JazzCash"
                                      style={{
                                        width: "24px",
                                        height: "24px",
                                        marginRight: "8px",
                                        objectFit: "contain",
                                      }}
                                    />
                                    <h6 className="mb-0">JazzCash Payment</h6>
                                  </div>
                                  <div className="card-body">
                                    <ol className="ps-3">
                                      <li>Open your JazzCash App</li>
                                      <li>Tap on "Pay Bills"</li>
                                      <li>Scroll to and select "1Bill"</li>
                                      <li>
                                        Enter the 1Bill invoice/consumer number
                                      </li>
                                      <li>
                                        Tap "Fetch Bill" — details will appear
                                      </li>
                                      <li>
                                        Confirm the amount and service provider
                                      </li>
                                      <li>Tap "Pay Now"</li>
                                      <li>
                                        Enter your MPIN to complete the payment
                                      </li>
                                      <li>
                                        You'll receive a confirmation
                                        SMS/notification
                                      </li>
                                    </ol>
                                  </div>
                                </div>
                              </div>

                              {/* Easypaisa Tab */}
                              <div
                                className="tab-pane fade"
                                id="easypaisa"
                                role="tabpanel"
                                aria-labelledby="easypaisa-tab"
                              >
                                <div className="card border-0">
                                  <div className="card-header bg-light border-0 d-flex align-items-center">
                                    <img
                                      src="/images/Easypaisa.png"
                                      alt="Easypaisa"
                                      style={{
                                        width: "24px",
                                        height: "24px",
                                        marginRight: "8px",
                                        objectFit: "contain",
                                      }}
                                    />
                                    <h6 className="mb-0">Easypaisa Payment</h6>
                                  </div>
                                  <div className="card-body">
                                    <ol className="ps-3">
                                      <li>Open your Easypaisa App</li>
                                      <li>Go to "Pay Bills"</li>
                                      <li>Select the category "1Bill"</li>
                                      <li>Enter the 1Bill invoice number</li>
                                      <li>Tap "Proceed" or "Fetch Bill"</li>
                                      <li>
                                        Verify bill amount and merchant details
                                      </li>
                                      <li>Tap "Confirm & Pay"</li>
                                      <li>Enter your Easypaisa PIN</li>
                                      <li>
                                        You will get a payment confirmation
                                      </li>
                                    </ol>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            {onlinePsid && (
                              <div
                                className="alert alert-info d-flex align-items-center justify-content-between"
                                style={{ marginBottom: 16 }}
                              >
                                <div>
                                  <strong>Your PSID:</strong>{" "}
                                  <span
                                    style={{
                                      fontFamily: "monospace",
                                      fontSize: "1.1em",
                                    }}
                                  >
                                    {onlinePsid}
                                  </span>
                                </div>
                                <button
                                  className="btn btn-sm btn-outline-success ms-3"
                                  onClick={() => {
                                    if (onlinePsid) {
                                      navigator.clipboard.writeText(onlinePsid);
                                    }
                                  }}
                                  title="Copy PSID"
                                >
                                  <i className="fa fa-copy"></i>
                                </button>
                              </div>
                            )}
                          </div>
                          <button
                            className="btn-green btn-success btn rounded-2"
                            onClick={handleGeneratePdf}
                            disabled={hasOnlineChallan || isGeneratingChallan}
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
                                {hasOnlineChallan
                                  ? "PSID Already Generated"
                                  : "Generate PSID"}
                              </>
                            )}
                          </button>
                        </div>
                        <div
                          className="tab-pane fade "
                          id="pills-profile"
                          role="tabpanel"
                          aria-labelledby="pills-profile-tab"
                          tabIndex="0"
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
                              to complete your payment, confirm your Enrollment
                              & Get a chance to avail Scholarship Card.
                            </li>
                          </ol>
                          <button
                            className="btn-green btn-success btn rounded-2"
                            onClick={handleGeneratePdf}
                            disabled={hasOnlineChallan || isGeneratingChallan}
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
                                {hasOnlineChallan
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
            <Accordion defaultActiveKey="0" className="d-none ">
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
                            Pay using Online Mobile Banking or mobile wallet
                            using 1 Biller
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
                            Pay at any bank using Kamyaab Freelancer Program
                            bank challan
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="fw-bold">Instructions:</p>
                  <p>
                    digikhyber also provides the option to deposit your
                    application processing fee conveniently via Bank Challan.
                    This method is simple and accessible for all applicants
                    across Pakistan. Follow the steps below to deposit your
                    application processing fee using a Bank Challan:
                  </p>
                  <ul>
                    <li>
                      <strong>Download & Print the Challan Form:</strong>{" "}
                      Download the challan form provided below and take a
                      printed copy with you.
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
                      <strong>Deposit the Challan:</strong> Submit the challan
                      at the bank counter and deposit your application
                      processing fee.
                    </li>
                    <li>
                      <strong>Notification of Payment:</strong> Once your
                      application processing fee is deposited, you will receive
                      an instant notification confirming the application
                      processing fee from digikhyber Initiative.
                    </li>
                    <li>
                      <strong>Application Status:</strong>
                      <ul>
                        <li>
                          <strong>Within 24 Hours:</strong> Your Learning Portal
                          credentials and class details will be shared with you
                          if your application is approved.
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <button
                    className="btn-green btn-success btn rounded-2"
                    onClick={handleGeneratePdf}
                    disabled={hasOnlineChallan || isGeneratingChallan}
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
                        {hasOnlineChallan
                          ? "Challan Already Submitted"
                          : "Download Bank Challan"}
                      </>
                    )}
                  </button>

                  <div className="alert alert-success mt-4 border">
                    <b> Note: </b>After paying your digikhyber application
                    processing fee, you don't need to do anything further.
                    Please allow up to 30 minutes for processing. Within this
                    period, you should receive a confirmation email. If you do
                    not receive the confirmation within 30 minutes , click on
                    the below Check Status button to resolve the issue. If the
                    confirmation is still not available, contact our support
                    team at admissions@digikhyber.pk for any kind of assistance.
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
        {false && (
          // <div style={modalOverlayStyle} tabIndex="-1" role="dialog">
          //   <div style={{ width: "100%", maxWidth: 600 }}>
          //     <div style={modalContentStyle}>
          //       <div style={modalHeaderStyle}>
          //         <h5 style={modalTitleStyle}>Edit Courses</h5>
          //         <button
          //           type="button"
          //           style={closeBtnStyle}
          //           aria-label="Close"
          //           onClick={() => setShowModal(false)}
          //         >
          //           <span aria-hidden="true">&times;</span>
          //         </button>
          //       </div>
          //       <div style={modalBodyStyle}>
          //         {editCourses.map((course, idx) => (
          //           <div
          //             key={idx}
          //             className="d-flex align-items-center mb-2 gap-2"
          //           >
          //             <select
          //               className="form-select"
          //               style={selectStyle}
          //               value={course}
          //               onChange={(e) => handleCourseChange(idx, e.target.value)}
          //             >
          //               <option value="">Select Course</option>
          //               {availableCourses.map((c, i) => (
          //                 <option
          //                   key={i}
          //                   value={c.name}
          //                   disabled={
          //                     editCourses.includes(c.name) && c.name !== course
          //                   }
          //                 >
          //                   {c.name}
          //                 </option>
          //               ))}
          //             </select>
          //             <button
          //               style={deleteBtnStyle}
          //               onClick={() => handleDeleteCourse(idx)}
          //               disabled={editCourses.length === 1}
          //             >
          //               Delete
          //             </button>
          //           </div>
          //         ))}
          //         {editCourses.length < 3 && (
          //           <button style={addBtnStyle} onClick={handleAddCourse}>
          //             Add Course
          //           </button>
          //         )}
          //         {error && (
          //           <div className="text-danger mt-2" style={{ fontWeight: 500 }}>
          //             {error}
          //           </div>
          //         )}
          //       </div>
          //       <div style={modalFooterStyle}>
          //         <button
          //           type="button"
          //           style={cancelBtnStyle}
          //           onClick={() => setShowModal(false)}
          //         >
          //           Cancel
          //         </button>
          //         <button type="button" style={saveBtnStyle} onClick={handleSave}>
          //           Save
          //         </button>
          //       </div>
          //     </div>
          //   </div>
          // </div>
          <div style={modalOverlayStyle} tabIndex="-1" role="dialog">
            <div style={{ width: "100%", maxWidth: 600, minWidth: "auto" }}>
              <div style={modalContentStyle}>
                <div style={modalHeaderStyle}>
                  <h5 style={modalTitleStyle}>
                    Official Notice – Digikhyber
                  </h5>
                  <button
                    type="button"
                    style={closeBtnStyle}
                    aria-label="Close"
                    onClick={() => setShowLoginAlert(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div style={modalBodyStyle}>
                  <div style={{ padding: "24px", lineHeight: "1.6" }}>
                    <p
                      style={{
                        marginBottom: "20px",
                        color: "#333",
                        fontSize: "15px",
                      }}
                    >
                      As earlier communicated, the tentative date for LMS access
                      was to be shared after <strong>20th August</strong>.
                    </p>

                    <p
                      style={{
                        marginBottom: "20px",
                        color: "#333",
                        fontSize: "15px",
                      }}
                    >
                      We are pleased to officially announce that the{" "}
                      <strong style={{ color: "#0B5D3B" }}>
                        final date for LMS access is 1st September 2025
                      </strong>
                      .
                    </p>

                    <p
                      style={{
                        marginBottom: "20px",
                        color: "#333",
                        fontSize: "15px",
                      }}
                    >
                      All students are advised to check their{" "}
                      <strong>Candidate Portal</strong> regularly. Please note
                      that all official notifications regarding Classes and LMS
                      will only be available on the{" "}
                      <strong>Candidate Portal</strong>. There is no need to
                      rely on <strong>SMS or Emails</strong> for updates.
                    </p>
                  </div>
                </div>
                <div style={modalFooterStyle}>
                  <button
                    type="button"
                    style={cancelBtnStyle}
                    onClick={() => setShowLoginAlert(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Physical Admission Content - Commented out for now */}
      {/* {showTabs && activeTab === "physical" && (
        <div className="container  pb-5 mt-4">
          <div className="payment">
            <h2 className="text-center">Your admission details</h2>
            <p>
              Now, you're just one step away from confirming your Scholarship
              Card . Please follow the instructions below to submit the
              processing fee through the given payment methods.
            </p>
          </div>
          <div className="col-12 mt-4">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <td style={{ width: "30%" }}>Full Name</td>
                        <td>{user?.user?.data?.user?.fullName || "-"}</td>
                      </tr>
                      <tr>
                        <td>Father Name</td>
                        <td>{user?.user?.data?.user?.fatherName || "-"}</td>
                      </tr>
                      <tr>
                        <td>CNIC/B-form</td>
                        <td>{user?.user?.data?.user?.cnic || "-"}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{user?.user?.data?.user?.email || "-"}</td>
                      </tr>
                      <tr>
                        <td>Mobile</td>
                        <td>{user?.user?.data?.user?.mobile || "-"}</td>
                      </tr>
                      <tr>
                        <td>City</td>
                        <td>{user?.user?.data?.user?.city || "-"}</td>
                      </tr>
                      <tr>
                        <td>Selected Courses</td>
                        <td>
                          <ul className="mb-0">
                            {(
                              user?.user?.data?.user?.physicalCourses ||
                              user?.user?.data?.user?.courses ||
                              []
                            ).map((c, idx) => (
                              <li key={idx}>{c}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button
                  className="btn btn-success mt-3"
                  onClick={handleDownloadPhysicalPdf}
                  disabled={isDownloadingPhysical}
                >
                  {isDownloadingPhysical ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-download"></i> Download Admission
                      Card (PDF)
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* 2nd Enrolment Content */}
      <div
        className={`container ${activeTab === "2nd-enrolment" ? "d-block" : "d-none"
          }`}
        style={{ paddingBottom: "100px" }}
      >
        <div className="row pt-4 pb-4">
          {/* Check if user already has second enrolled courses */}
          {(() => {
            const secondEnrolledCourses =
              user?.user?.data?.user?.secondEnrolledCourses || [];
            const hasSecondEnrolledCourses =
              Array.isArray(secondEnrolledCourses) &&
              secondEnrolledCourses.length > 0;

            if (hasSecondEnrolledCourses) {
              // Show read-only display of enrolled courses
              return (
                <>
                  <div className="d-flex align-items-center text-black gap-2 mb-2">
                    <i className="fas fa-check-square"></i>
                    <h5 className="fw-bold mb-0">Your 2nd Batch Courses</h5>
                  </div>
                  <div className="col-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th
                                  style={{ backgroundColor: "#dee2e6" }}
                                  scope="col"
                                >
                                  Course #
                                </th>
                                <th
                                  style={{ backgroundColor: "#dee2e6" }}
                                  scope="col"
                                >
                                  Course Name
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {secondEnrolledCourses.map((course, idx) => (
                                <tr key={idx}>
                                  <td>{idx + 1}</td>
                                  <td>{course}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        {/* <button
                            className="btn btn-success mt-3"
                            onClick={handleGenerateSecondEnrolmentPdf}
                            disabled={isGeneratingSecondEnrolmentPdf}
                          >
                            {isGeneratingSecondEnrolmentPdf ? (
                              <>
                                <span
                                  className="spinner-border spinner-border-sm me-2"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                                Generating PDF...
                              </>
                            ) : (
                              <>
                                <i className="fas fa-download"></i> Download PDF
                              </>
                            )}
                          </button> */}
                      </div>
                    </div>
                  </div>
                </>
              );
            } else {
              // Show course selection form
              return (
                <>
                  <div className="d-flex align-items-center text-black gap-2 mb-2">
                    <i className="fas fa-check-square"></i>
                    <h5 className="fw-bold mb-0">
                      Select Courses for 2nd Enrolment
                    </h5>
                  </div>
                  <p>
                    You can select up to 2 courses for your second enrolment.
                    Please note that courses you have already enrolled in are
                    not available for selection.
                  </p>
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="mb-2" htmlFor="secondEnrolmentCourse1">
                        First Course <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select p-3"
                        id="secondEnrolmentCourse1"
                        value={secondEnrolmentCourses[0]}
                        onChange={(e) =>
                          handleSecondEnrolmentCourseChange(0, e.target.value)
                        }
                      >
                        <option value="">Choose your Course</option>
                        {availableCoursesFor2ndEnrolment
                          .filter(
                            (course) =>
                              course.name !== secondEnrolmentCourses[1]
                          )
                          .map((course) => (
                            <option key={course.name} value={course.name}>
                              {course.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="mb-2" htmlFor="secondEnrolmentCourse2">
                        Second Course (Optional)
                      </label>
                      <select
                        className="form-select p-3"
                        id="secondEnrolmentCourse2"
                        value={secondEnrolmentCourses[1]}
                        onChange={(e) =>
                          handleSecondEnrolmentCourseChange(1, e.target.value)
                        }
                      >
                        <option value="">Choose your Course (Optional)</option>
                        {availableCoursesFor2ndEnrolment
                          .filter(
                            (course) =>
                              course.name !== secondEnrolmentCourses[0]
                          )
                          .map((course) => (
                            <option key={course.name} value={course.name}>
                              {course.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    {secondEnrolmentCourses.filter((c) => c).length > 0 && (
                      <div className="alert alert-info mt-3">
                        <strong>Selected Courses:</strong>
                        <ul className="mb-0 mt-2">
                          {secondEnrolmentCourses
                            .filter((c) => c)
                            .map((course, idx) => (
                              <li key={idx}>{course}</li>
                            ))}
                        </ul>
                      </div>
                    )}
                    <div className="mt-4">
                      <button
                        className="btn btn-success btn-green w-100 p-3 mb-3"
                        onClick={handleSubmitSecondEnrolment}
                        disabled={
                          isSubmittingSecondEnrolment ||
                          secondEnrolmentCourses.filter((c) => c).length === 0
                        }
                      >
                        {isSubmittingSecondEnrolment ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-paper-plane me-2"></i>
                            Submit 2nd Enrolment Courses
                          </>
                        )}
                      </button>
                      {/* {secondEnrolmentCourses.filter((c) => c).length > 0 && (
                          <button
                            className="btn btn-success btn-green w-100 p-3"
                            onClick={handleGenerateSecondEnrolmentPdf}
                            disabled={isGeneratingSecondEnrolmentPdf}
                          >
                            {isGeneratingSecondEnrolmentPdf ? (
                              <>
                                <span
                                  className="spinner-border spinner-border-sm me-2"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                                Generating PDF...
                              </>
                            ) : (
                              <>
                                <i className="fas fa-download me-2"></i>
                                Generate PDF
                              </>
                            )}
                          </button>
                        )} */}
                    </div>
                  </div>
                </>
              );
            }
          })()}
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
              const secondEnrolmentChallanCreatedAt =
                secondEnrolmentChallan?.createdAt;
              if (secondEnrolmentChallanCreatedAt) {
                const challanDate = new Date(secondEnrolmentChallanCreatedAt);
                challanDate.setDate(challanDate.getDate() + 3);
                return challanDate.toLocaleDateString("en-US", options);
              } else {
                const today = new Date();
                today.setDate(today.getDate() + 3);
                return today.toLocaleDateString("en-US", options);
              }
            })()}
          </p>
          {secondEnrolmentChallanStatus && (
            <span
              className={`badge px-3 py-2 ms-2 fw-bold ${secondEnrolmentChallanStatus === "Paid"
                ? "bg-success text-white"
                : "bg-warning text-dark"
                }`}
              style={{
                fontSize: "1rem",
                borderRadius: "6px",
                letterSpacing: "0.5px",
                textAlign: "center",
              }}
            >
              {secondEnrolmentChallanStatus}
            </span>
          )}
        </div>
        <div
          style={{
            color: "#000",
            padding: "50px 0 80px",
          }}
        >
          <div className="container">
            <div className="payment">
              <h2 className="text-center">Pay Application Processing Fee!</h2>
              <p>
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
                    id="pills-tab-2nd"
                    role="tablist"
                  >
                    <div
                      className="nav-item col-md-6 mb-3 mb-lg-0"
                      role="presentation"
                    >
                      <button
                        className="nav-link active w-100 h-100 p-3"
                        id="pills-home-tab-2nd"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-home-2nd"
                        type="button"
                        role="tab"
                        aria-controls="pills-home-2nd"
                        aria-selected="true"
                        onClick={() => {
                          setPaymentMethod("psid");
                        }}
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
                    </div>
                    <div className="nav-item col-md-6" role="presentation">
                      <button
                        className="nav-link w-100 h-100 p-3"
                        id="pills-profile-tab-2nd"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-profile-2nd"
                        type="button"
                        role="tab"
                        aria-controls="pills-profile-2nd"
                        aria-selected="false"
                        onClick={() => {
                          setPaymentMethod("challan");
                        }}
                      >
                        <div className="d-flex align-items-start gap-2">
                          <div className="icon">
                            <i className="fa-solid fa-building-columns"></i>
                          </div>
                          <div className="ms-3 text-start">
                            <h4>CLICK HERE FOR BANK CHALLAN </h4>
                            <p>
                              Pay at any BOP Branch Using Digikhyber
                              Challan
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
                        id="pills-tabContent-2nd"
                      >
                        <div
                          className="tab-pane fade show active"
                          id="pills-home-2nd"
                          role="tabpanel"
                          aria-labelledby="pills-home-tab-2nd"
                          tabIndex="0"
                        >
                          <h5>Instructions How to Pay:</h5>
                          <div className="mt-4">
                            <ul
                              className="nav nav-tabs border-0"
                              id="paymentTabs-2nd"
                              role="tablist"
                              style={{ borderBottom: "1px solid #dee2e6" }}
                            >
                              <li className="nav-item" role="presentation">
                                <button
                                  className="nav-link active border-0"
                                  id="banking-tab-2nd"
                                  data-bs-toggle="tab"
                                  data-bs-target="#banking-2nd"
                                  type="button"
                                  role="tab"
                                  aria-controls="banking-2nd"
                                  aria-selected="true"
                                  style={{
                                    borderBottom: "2px solid #007bff",
                                  }}
                                >
                                  <i className="fas fa-university me-2"></i>
                                  Banking App
                                </button>
                              </li>
                              <li className="nav-item" role="presentation">
                                <button
                                  className="nav-link border-0 d-flex align-items-center"
                                  id="jazzcash-tab-2nd"
                                  data-bs-toggle="tab"
                                  data-bs-target="#jazzcash-2nd"
                                  type="button"
                                  role="tab"
                                  aria-controls="jazzcash-2nd"
                                  aria-selected="false"
                                >
                                  <img
                                    src="/images/jazzcash.png"
                                    alt="JazzCash"
                                    style={{
                                      width: "24px",
                                      height: "24px",
                                      marginRight: "8px",
                                      objectFit: "contain",
                                    }}
                                  />
                                  JazzCash
                                </button>
                              </li>
                              <li className="nav-item" role="presentation">
                                <button
                                  className="nav-link border-0 d-flex align-items-center"
                                  id="easypaisa-tab-2nd"
                                  data-bs-toggle="tab"
                                  data-bs-target="#easypaisa-2nd"
                                  type="button"
                                  role="tab"
                                  aria-controls="easypaisa-2nd"
                                  aria-selected="false"
                                >
                                  <img
                                    src="/images/Easypaisa.png"
                                    alt="Easypaisa"
                                    style={{
                                      width: "24px",
                                      height: "24px",
                                      marginRight: "8px",
                                      objectFit: "contain",
                                    }}
                                  />
                                  Easypaisa
                                </button>
                              </li>
                            </ul>

                            <div
                              className="tab-content my-3"
                              id="paymentTabContent-2nd"
                            >
                              <div
                                className="tab-pane fade show active"
                                id="banking-2nd"
                                role="tabpanel"
                                aria-labelledby="banking-tab-2nd"
                              >
                                <div className="card border-0">
                                  <div className="card-header bg-light border-0">
                                    <h6 className="mb-0">
                                      <i className="fas fa-university me-2"></i>
                                      Banking App Payment
                                    </h6>
                                    <small className="text-muted">
                                      (HBL, Meezan, UBL, Bank Alfalah, etc.)
                                    </small>
                                  </div>
                                  <div className="card-body">
                                    <ol className="ps-3">
                                      <li>Open your bank's mobile app</li>
                                      <li>
                                        Log in with your credentials (MPIN,
                                        fingerprint, or face ID)
                                      </li>
                                      <li>
                                        Go to "Bill Payments" or "Payments"
                                      </li>
                                      <li>
                                        Select "1Bill" (some banks list it under
                                        "Add Biller" or "Pay Bill")
                                      </li>
                                      <li>
                                        Enter the 1Bill Consumer/Invoice Number
                                        (usually 12–15 digits)
                                      </li>
                                      <li>
                                        The system will fetch and display the
                                        bill details
                                      </li>
                                      <li>
                                        Verify the name, amount, and service
                                      </li>
                                      <li>Tap "Pay" or "Confirm"</li>
                                      <li>
                                        Enter your PIN/OTP to authorize the
                                        transaction
                                      </li>
                                      <li>Receive confirmation receipt/SMS</li>
                                    </ol>
                                  </div>
                                </div>
                              </div>

                              <div
                                className="tab-pane fade"
                                id="jazzcash-2nd"
                                role="tabpanel"
                                aria-labelledby="jazzcash-tab-2nd"
                              >
                                <div className="card border-0">
                                  <div className="card-header bg-light border-0 d-flex align-items-center">
                                    <img
                                      src="/images/jazzcash.png"
                                      alt="JazzCash"
                                      style={{
                                        width: "24px",
                                        height: "24px",
                                        marginRight: "8px",
                                        objectFit: "contain",
                                      }}
                                    />
                                    <h6 className="mb-0">JazzCash Payment</h6>
                                  </div>
                                  <div className="card-body">
                                    <ol className="ps-3">
                                      <li>Open your JazzCash App</li>
                                      <li>Tap on "Pay Bills"</li>
                                      <li>Scroll to and select "1Bill"</li>
                                      <li>
                                        Enter the 1Bill invoice/consumer number
                                      </li>
                                      <li>
                                        Tap "Fetch Bill" — details will appear
                                      </li>
                                      <li>
                                        Confirm the amount and service provider
                                      </li>
                                      <li>Tap "Pay Now"</li>
                                      <li>
                                        Enter your MPIN to complete the payment
                                      </li>
                                      <li>
                                        You'll receive a confirmation
                                        SMS/notification
                                      </li>
                                    </ol>
                                  </div>
                                </div>
                              </div>

                              <div
                                className="tab-pane fade"
                                id="easypaisa-2nd"
                                role="tabpanel"
                                aria-labelledby="easypaisa-tab-2nd"
                              >
                                <div className="card border-0">
                                  <div className="card-header bg-light border-0 d-flex align-items-center">
                                    <img
                                      src="/images/Easypaisa.png"
                                      alt="Easypaisa"
                                      style={{
                                        width: "24px",
                                        height: "24px",
                                        marginRight: "8px",
                                        objectFit: "contain",
                                      }}
                                    />
                                    <h6 className="mb-0">Easypaisa Payment</h6>
                                  </div>
                                  <div className="card-body">
                                    <ol className="ps-3">
                                      <li>Open your Easypaisa App</li>
                                      <li>Go to "Pay Bills"</li>
                                      <li>Select the category "1Bill"</li>
                                      <li>Enter the 1Bill invoice number</li>
                                      <li>Tap "Proceed" or "Fetch Bill"</li>
                                      <li>
                                        Verify bill amount and merchant details
                                      </li>
                                      <li>Tap "Confirm & Pay"</li>
                                      <li>Enter your Easypaisa PIN</li>
                                      <li>
                                        You will get a payment confirmation
                                      </li>
                                    </ol>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            {secondEnrolmentPsid && (
                              <div
                                className="alert alert-info d-flex align-items-center justify-content-between"
                                style={{ marginBottom: 16 }}
                              >
                                <div>
                                  <strong>Your PSID:</strong>{" "}
                                  <span
                                    style={{
                                      fontFamily: "monospace",
                                      fontSize: "1.1em",
                                    }}
                                  >
                                    {secondEnrolmentPsid}
                                  </span>
                                </div>
                                <button
                                  className="btn btn-sm btn-outline-success ms-3"
                                  onClick={() => {
                                    if (secondEnrolmentPsid) {
                                      navigator.clipboard.writeText(
                                        secondEnrolmentPsid
                                      );
                                    }
                                  }}
                                  title="Copy PSID"
                                >
                                  <i className="fa fa-copy"></i>
                                </button>
                              </div>
                            )}
                          </div>
                          <button
                            className="btn-green btn-success btn rounded-2"
                            onClick={handleGeneratePdf}
                            disabled={
                              hasSecondEnrolmentChallan ||
                              isGeneratingChallan ||
                              hasSecondEnroll
                            }
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
                                {hasSecondEnrolmentChallan
                                  ? "PSID Already Generated"
                                  : "Generate PSID"}
                              </>
                            )}
                          </button>
                        </div>
                        <div
                          className="tab-pane fade "
                          id="pills-profile-2nd"
                          role="tabpanel"
                          aria-labelledby="pills-profile-tab-2nd"
                          tabIndex="0"
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
                              to complete your payment, confirm your Enrollment
                              & Get a chance to avail Scholarship Card.
                            </li>
                          </ol>
                          <button
                            className="btn-green btn-success btn rounded-2"
                            onClick={handleGeneratePdf}
                            disabled={
                              hasSecondEnrolmentChallan ||
                              isGeneratingChallan ||
                              hasSecondEnroll
                            }
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
                                {hasSecondEnrolmentChallan
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
          </div>
        </div>
      </div>

      {/* Physical Admission Content */}

      {/* {showLoginAlert && <LoginAlertWrapper />} */}
    </>
  );
};

export default AdmissionResult;
