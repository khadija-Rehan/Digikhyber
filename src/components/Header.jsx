import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button, Offcanvas, Container } from 'react-bootstrap';
import Logo from "../assets/logo.png";

const Header = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);
  return (
    <header className="header">
      <Navbar bg="light" expand="xl"  >
        <Container className="d-flex justify-content-between align-items-center">


          <div className="d-flex align-items-center">

            <Navbar.Toggle
              aria-controls="offcanvasNavbar-expand-xl"
              className="me-2"
              onClick={handleShow}
            />

            <Navbar.Brand as={Link} to="/" className="logos m-0">
              <img src={Logo} alt="logo" />
            </Navbar.Brand>
          </div>

          <div className="d-flex align-items-center">
            <Button
              variant="success"
              as={Link}
              to="/apply-now"
              className="btn-green register-btn mobile"
            >
              APPLY NOW
            </Button>
          </div>

          {/* Offcanvas */}
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-xl"
            aria-labelledby="offcanvasNavbarLabel-expand-xl"
            placement="start"
            show={showOffcanvas}
            onHide={handleClose}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-xl">
                <img src={Logo} alt="logo" style={{ height: "30px" }} />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="align-items-center">
              <Nav className="mx-auto">
                <NavLink to="/" className="nav-link" onClick={handleClose}>Home</NavLink>
                <NavLink to="/courses" className="nav-link" onClick={handleClose}>Courses</NavLink>
                <NavLink to="/news" className="nav-link" onClick={handleClose}>News & Events</NavLink>
                <NavLink to="/certificate" className="nav-link" onClick={handleClose}>Certificate</NavLink>

                <NavLink to="/scholarship-card" className="nav-link" onClick={handleClose}>Scholarship Card</NavLink>

                {/* <NavLink to="/howitswork" className="nav-link" onClick={handleClose}>How Its Works</NavLink> */}

                <NavDropdown title="About Us" id="about-us-dropdown">
                  <NavDropdown.Item as={NavLink} to="/about-us" onClick={handleClose}>About Us</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/free-laptops" onClick={handleClose}>Free Laptops</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/free-solarpanels" onClick={handleClose}>Free Solar Panels</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/howitswork" onClick={handleClose}>How Its Works</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/contact-us" onClick={handleClose}>Contact Us</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <div className="auth-buttons">
                <Button as={Link} to="/login" className="btn-black bg-none login-btn p-0">
                  <i className="fas fa-sign-in-alt me-1"></i>CANDIDATE LOGIN
                </Button>
                <Button
                  variant="success"
                  as={Link}
                  to="/apply-now"
                  className="btn-green register-btn desktop"
                >
                  APPLY NOW
                </Button>
              </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>

        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
