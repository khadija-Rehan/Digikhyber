import AOS from "aos";
import "aos/dist/aos.css";

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
      <AOSWrapper>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/courses" element={<AllCourses />} />
          <Route path="/apply-now" element={<ApplyNow />} />
          <Route path="/news" element={<NewsEvents />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/howitswork" element={<Howitswork />} />
          <Route path="/scholarship-card" element={<ScholarshipCard />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/free-laptops" element={<FreeLaptops />} />
          <Route path="/free-solarpanels" element={<FreeSolarPanel />} />
          <Route path="/admission-test" element={<Admissiontest />} />
          <Route path="/admission-result" element={<AdmissionResult />} />
          {/*
        <Route path="/faqs" element={<FAQs />} /> */}
        </Routes>
        {!shouldHideHeaderFooter && <Footer />}
      </AOSWrapper>
    </>
  );
}

export default App;
