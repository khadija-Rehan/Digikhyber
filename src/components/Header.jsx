import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import Logo from "../assets/logo.png";
const Header = () => {
  return (
    <header className="header">
      <Navbar bg="light" expand="xxl">
        <div className="container">
          <Navbar.Brand as={Link} to="/" className="logo ">
            <img src={Logo} alt="logo" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link">Home</NavLink>
              <NavLink to="/courses" className="nav-link">Courses</NavLink>
              <NavLink to="/news" className="nav-link">News & Events</NavLink>
              <NavLink to="/certificate" className="nav-link">Certificate</NavLink>
              <NavLink to="/contact-us" className="nav-link">Contact Us</NavLink>
              {/* <NavLink to="/free-solar-panel" className="nav-link">Free Solar Panel</NavLink> */}
              {/* <NavLink to="/free-laptops" className="nav-link">Free Laptops</NavLink> */}

              <NavDropdown title="About Us" id="about-us-dropdown">
                <NavDropdown.Item as={NavLink} to="/about-us">About Us</NavDropdown.Item>
                {/* <NavDropdown.Item as={NavLink} to="/contact-us">Contact Us</NavDropdown.Item> */}
                {/* <NavDropdown.Item as={NavLink} to="/faqs">FAQs</NavDropdown.Item> */}
              </NavDropdown>
            </Nav>
            <div className="auth-buttons  ">
              <Button as={Link} to="/login" className="btn-black bg-none login-btn p-0"><i className="fas fa-sign-in-alt me-1"></i>CANDIDATE LOGIN</Button>
              <Button variant="success" as={Link} to="/apply-now" className="btn-green register-btn">APPLY NOW</Button>
            </div>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </header>
  );
};

export default Header;
