import AOS from "aos";
import "aos/dist/aos.css";
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import AllCourses from "./pages/AllCourses";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AOSWrapper from "./components/AOAWrapper";
import ApplyNow from "./pages/ApplyNow";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NewsEvents from "./pages/NewsEvents";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Certificate from "./pages/Certificate";
import ContactUs from "./pages/ContactUs";
import Howitswork from "./pages/Howitswork";
import AboutUs from "./pages/AboutUs";
import ScholarshipCard from "./pages/ScholarshipCard";
import FreeLaptops from "./pages/FreeLaptops";
import FreeSolarPanel from "./pages/FreeSolarPanel";
import Admissiontest from "./pages/Admissiontest";
import AdmissionResult from "./pages/AdmissionResult";
import { AuthProvider } from "./context/AuthContext";
import { CoursesProvider } from "./context/CoursesContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Notificationbar from "./components/Notificationbar";
import BeacomeInstructors from "./pages/BeacomeInstructors";
import FAQs from "./pages/FAQs";
import TermsandCondition from "./pages/TermsandCondition";
import ViewCourse from "./pages/ViewCourse";
import ApplyScholarShipCard from "./pages/ApplyScholarShipCard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TaleemFinance from "./pages/TaleemFinance";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const location = useLocation();

  // Define routes where header and footer should be hidden
  const hideHeaderFooterRoutes = [
    "/login",
    "/register",
    "/apply-now",
    "/news",
    "/certificate",
    "/contact-us",
    "howitswork",
  ];
  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(
    location.pathname
  );
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <AuthProvider>
        <CoursesProvider>
          <AOSWrapper>
            <ScrollToTop />
            <Notificationbar />
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/courses" element={<AllCourses />} />
              <Route path="/apply-now" element={<ApplyNow />} />
              <Route path="/news" element={<NewsEvents />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/certificate" element={<Certificate />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/howitswork" element={<Howitswork />} />
              <Route path="/scholarship-card" element={<ScholarshipCard />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/free-laptops" element={<FreeLaptops />} />
              <Route path="/free-solarpanels" element={<FreeSolarPanel />} />
              <Route path="/become-instructors" element={<BeacomeInstructors />} />
              <Route path="/terms&policy" element={<TermsandCondition />} />
              <Route path="/course-detail" element={<ViewCourse />} />
              <Route path="/apply-scholarshipcard" element={<ApplyScholarShipCard />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/taleem-finance" element={<TaleemFinance />} />
              <Route
                path="/admission-test"
                element={
                  <ProtectedRoute>
                    <Admissiontest />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admission-result"
                element={
                  <ProtectedRoute>
                    <AdmissionResult />
                  </ProtectedRoute>
                }
              />
            </Routes>
            {!shouldHideHeaderFooter && <Footer />}
          </AOSWrapper>
        </CoursesProvider>
      </AuthProvider>
    </>
  );
}

export default App;
