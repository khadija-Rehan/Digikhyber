import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button, Offcanvas, Container } from 'react-bootstrap';
import Logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <Navbar bg="light" expand="xl">
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

          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-xl"
            aria-labelledby="offcanvasNavbarLabel-expand-xl"
            placement="end"
            show={showOffcanvas}
            onHide={handleClose}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-xl">
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link as={NavLink} to="/" onClick={handleClose}>
                  Home
                </Nav.Link>
                <Nav.Link as={NavLink} to="/courses" onClick={handleClose}>
                  Courses
                </Nav.Link>
                <NavDropdown title="About Us" id="about-us-dropdown">
                  <NavDropdown.Item as={NavLink} to="/about-us" onClick={handleClose}>About Us</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/free-laptops" onClick={handleClose}>Free Laptops</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/free-solarpanels" onClick={handleClose}>Free Solar Panels</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/howitswork" onClick={handleClose}>How Its Works</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/contact-us" onClick={handleClose}>Contact Us</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <div className="auth-buttons">
                {user ? (
                  <>
                    <span className="me-3">Welcome, {user.user.fullName}</span>
                    <Button onClick={handleLogout} className="btn-black bg-none login-btn p-0">
                      <i className="fas fa-sign-out-alt me-1"></i>LOGOUT
                    </Button>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
