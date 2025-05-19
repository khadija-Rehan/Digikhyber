import AOS from "aos";
import "aos/dist/aos.css";

import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
import AllCourses from "./pages/AllCourses";
// import ScholarshipCard from "./pages/ScholarshipCard";
// import FreeSolarPanel from "./pages/FreeSolarPanel";
// import FreeLaptops from "./pages/FreeLaptops";
// import ApplyNow from "./pages/ApplyNow";
// import AboutUs from "./pages/AboutUs";
// import ContactUs from "./pages/ContactUs";
// import FAQs from "./pages/FAQs";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AOSWrapper from "./components/AOAWrapper";
import ApplyNow from "./pages/ApplyNow";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NewsEvents from "./pages/NewsEvents";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Certificate from "./pages/Certificate";
import ContactUs from "./pages/ContactUs";
import Howitswork from "./pages/Howitswork";

function App() {
  const location = useLocation();

  // Define routes where header and footer should be hidden
  const hideHeaderFooterRoutes = ["/login", "/register", "/apply-now" ,"/news","/certificate","/contact-us","howitswork"];
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
          {/* <Route path="/scholarship-card" element={<ScholarshipCard />} />
        <Route path="/free-solar-panel" element={<FreeSolarPanel />} />
        <Route path="/free-laptops" element={<FreeLaptops />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/faqs" element={<FAQs />} /> */}
        </Routes>
        {!shouldHideHeaderFooter && <Footer />}
      </AOSWrapper>
    </>
  );
}

export default App;
