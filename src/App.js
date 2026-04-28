import AOS from "aos";
import "aos/dist/aos.css";
import React from 'react';
import { ModalProvider } from './context/ModalContext';
import ScholarshipModal from './components/ScholarshipModal';
import { AuthProvider } from './context/AuthContext';
import { CoursesProvider } from './context/CoursesContext';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AllCourses from './pages/AllCourses';
import ApplyNow from './pages/ApplyNow';
import NewsEvents from './pages/NewsEvents';
import FAQs from './pages/FAQs';
import Certificate from './pages/Certificate';
import ContactUs from './pages/ContactUs';
import Howitswork from './pages/Howitswork';
import ScholarshipCard from './pages/ScholarshipCard';
import AboutUs from './pages/AboutUs';
import FreeLaptops from './pages/FreeLaptops';
import FreeSolarPanel from './pages/FreeSolarPanel';
import BeacomeInstructors from './pages/BeacomeInstructors';
import TermsandCondition from './pages/TermsandCondition';
import ViewCourse from './pages/ViewCourse';
import ApplyScholarShipCard from './pages/ApplyScholarShipCard';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TaleemFinance from './pages/TaleemFinance';
import PhysicalAdmission from './pages/PhysicalAdmission';
import Admissiontest from './pages/Admissiontest';
import AdmissionResult from './pages/AdmissionResult';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Notificationbar from './components/Notificationbar';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const location = useLocation();

  // Define routes where footer/notification should be hidden
  const hideFooterRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/apply-now",
  ];

  const shouldHideHeaderFooter = hideFooterRoutes.some(route => 
    location.pathname === route || location.pathname.startsWith("/reset-password/")
  );

  return (
    <>
      <ModalProvider>
        <AuthProvider>
          <CoursesProvider>
            <ScrollToTop />
            {!shouldHideHeaderFooter && <Notificationbar />}
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
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
              <Route path="/physical-admission" element={<PhysicalAdmission />} />
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
          </CoursesProvider>
        </AuthProvider>
      </ModalProvider>
    </>
  );
}

export default App;
