import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  Button,
  Offcanvas,
  Container,
  NavDropdown,
} from "react-bootstrap";
import Logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, paidUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className={`header-glamour ${scrolled ? "scrolled" : ""}`}>
      <Navbar expand="xl" className="navbar-custom">
        <Container fluid className="header-container">
          {/* Logo Section */}
          <Navbar.Brand as={Link} to="/" className="brand-wrapper">
            <img
              src={Logo}
              alt="Digikhyber logo"
              className="header-logo"
            />
          </Navbar.Brand>

          {/* Mobile Buttons & Toggle */}
          <div className="mobile-actions d-xl-none">
            <Button
              as={Link}
              to="/apply-now"
              className="btn-pill-green py-2 px-4 shadow-sm"
              style={{ 
                fontSize: '14px', 
                fontWeight: '800', 
                background: '#0B5D3B', 
                border: 'none',
                letterSpacing: '1px'
              }}
            >
              APPLY NOW
            </Button>
            <Navbar.Toggle
              aria-controls="offcanvasNavbar"
              onClick={handleShow}
              className="toggle-button"
            >
              <i className="fas fa-bars-staggered"></i>
            </Navbar.Toggle>
          </div>

          <Navbar.Offcanvas
            id="offcanvasNavbar"
            placement="end"
            show={showOffcanvas}
            onHide={handleClose}
            className="offcanvas-premium"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title className="fw-bold"></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="nav-links-center">
                <Nav.Link as={NavLink} to="/" end onClick={handleClose}>HOME</Nav.Link>
                <div className="nav-divider d-none d-xl-block"></div>

                <Nav.Link as={NavLink} to="/courses" onClick={handleClose}>COURSES</Nav.Link>
                <div className="nav-divider d-none d-xl-block"></div>

                <Nav.Link as={NavLink} to="/free-laptops" onClick={handleClose}>LAPTOP SCHEME</Nav.Link>
                <div className="nav-divider d-none d-xl-block"></div>

                <Nav.Link as={NavLink} to="/free-solarpanels" onClick={handleClose}>SOLAR SCHEME</Nav.Link>
                <div className="nav-divider d-none d-xl-block"></div>

                <Nav.Link as={NavLink} to="/scholarship-card" onClick={handleClose}>SCHOLARSHIP CARD</Nav.Link>
                <div className="nav-divider d-none d-xl-block"></div>

                <Nav.Link as={NavLink} to="/certificate" onClick={handleClose}>CERTIFICATE</Nav.Link>
                <div className="nav-divider d-none d-xl-block"></div>

                <Nav.Link as={NavLink} to="/about-us" onClick={handleClose}>ABOUT US</Nav.Link>
                <div className="nav-divider d-none d-xl-block"></div>

                <NavDropdown
                  title={
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      HELP DESK <i className="fas fa-chevron-down" style={{ fontSize: '7.5px', marginTop: '1px' }}></i>
                    </span>
                  }
                  id="help-desk-dropdown"
                  className="header-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/howitswork" onClick={handleClose}>How to Apply</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/faqs" onClick={handleClose}>FAQs</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/contact-us" onClick={handleClose}>Contact Us</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/news" onClick={handleClose}>Events & News</NavDropdown.Item>
                </NavDropdown>
              </Nav>

              <div className="header-actions">
                {user ? (
                  <>
                    <Link to="/dashboard" className="user-profile-pill d-none d-xl-flex" style={{ textDecoration: 'none' }}>
                      <div className="user-initials">
                        {(user?.user?.fullName || user?.fullName || "U").charAt(0)}
                      </div>
                      <div className="user-details">
                        <span className="user-name">{user?.user?.fullName || user?.fullName}</span>
                        <span className="user-meta">Roll: {user?.user?.rollNumber || '...'}</span>
                      </div>
                    </Link>
                    {paidUser && (
                      <Button
                        as={Link}
                        to="https://lms.digikhyber.org.pk/"
                        target="_blank"
                        className="btn-pill-outline d-none d-xl-inline-block"
                      >
                        LMS PORTAL
                      </Button>
                    )}
                    <button onClick={handleLogout} className="logout-trigger">
                      <i className="fas fa-power-off"></i>
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink to="/login" className="login-link" onClick={handleClose}>
                      <i className="fas fa-sign-in-alt me-1"></i> CANDIDATE LOGIN
                    </NavLink>
                    <Button
                      as={Link}
                      to="/apply-now"
                      className="btn-pill-green glow"
                      onClick={handleClose}
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

      <style>{`
        .header-glamour {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 90;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 0;
          margin: 0;
          background: #ffffff;
          border-bottom: 3px solid #0B5D3B;
          box-shadow: 0 4px 15px rgba(0,0,0,0.06);
        }

        .header-glamour.scrolled {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          box-shadow: 0 6px 25px rgba(11, 93, 59, 0.1);
        }

        .header-glamour .navbar-custom {
          padding-top: 5px !important;
          padding-bottom: 5px !important;
          margin-bottom: 0 !important;
        }

        .header-container {
          padding-left: 2%;
          padding-right: 2%;
          display: flex;
          align-items: center;
        }

        .header-logo {
          max-height: 110px;
          height: auto;
          width: auto;
          max-width: 280px;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .brand-wrapper:hover .header-logo {
          transform: scale(1.05);
        }

        .nav-links-center {
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 0px;
        }

        .nav-links-center .nav-link {
          font-family: 'Jost', sans-serif;
          font-weight: 700;
          font-size: 10.5px;
          color: #0B5D3B !important;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 4px 8px !important;
          border-radius: 4px;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-links-center .nav-link:hover {
          color: #C9A227 !important;
          background: rgba(201, 162, 39, 0.05);
        }

        .nav-links-center .nav-link::after {
          content: "";
          position: absolute;
          bottom: 0px;
          left: 8px;
          right: 8px;
          height: 2px;
          background: #C9A227;
          transform: scaleX(0);
          transition: transform 0.3s ease;
          transform-origin: right;
        }

        .nav-links-center .nav-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        /* Dropdown Styling */
        .header-dropdown .dropdown-toggle::after {
          display: none !important;
        }

        .header-dropdown .dropdown-toggle {
          font-family: 'Jost', sans-serif;
          font-weight: 700;
          font-size: 10.5px;
          color: #0B5D3B !important;
          letter-spacing: 0.5px;
          padding: 4px 8px !important;
          transition: all 0.3s ease;
        }
        
        .header-dropdown .dropdown-toggle:hover {
          color: #C9A227 !important;
          background: rgba(201, 162, 39, 0.05);
        }

        .header-dropdown .dropdown-menu {
          border: 1px solid rgba(11, 93, 59, 0.1);
          border-top: 3px solid #0B5D3B;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          border-radius: 0 0 8px 8px;
          padding: 8px 0;
          margin-top: 5px;
        }

        .header-dropdown .dropdown-item {
          font-size: 10px;
          font-weight: 500;
          color: #0B5D3B;
          padding: 6px 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.2s ease;
        }
        
        .header-dropdown .dropdown-item:hover {
          background-color: #f8fdfa;
          color: #C9A227;
          padding-left: 20px;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .login-link {
          font-weight: 700;
          font-size: 10.5px;
          color: #0B5D3B;
          text-decoration: none !important;
          letter-spacing: 0.5px;
          transition: color 0.3s;
          display: flex;
          align-items: center;
          gap: 6px;
          text-transform: uppercase;
        }

        .login-link i {
          font-size: 12px;
          color: #C9A227;
        }

        .login-link:hover {
          color: #C9A227;
        }

        .btn-pill-green {
          background: #0B5D3B;
          border: none;
          border-radius: 50px;
          padding: 6px 16px;
          font-weight: 700;
          font-size: 10px;
          color: white !important;
          letter-spacing: 1px;
          transition: all 0.3s;
          text-transform: uppercase;
          box-shadow: 0 4px 10px rgba(11, 93, 59, 0.2);
          text-decoration: none;
        }

        .btn-pill-green:hover {
          background: #C9A227;
          border-color: #C9A227;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(201, 162, 39, 0.3);
        }

        .btn-pill-outline {
          background: transparent;
          border: 2px solid #C9A227;
          border-radius: 5px;
          padding: 7px 18px;
          font-weight: 700;
          font-size: 11px;
          color: #C9A227;
          transition: all 0.3s ease;
          text-transform: uppercase;
        }
        
        .btn-pill-outline:hover {
          background: #C9A227;
          color: white;
          box-shadow: 0 4px 10px rgba(201, 162, 39, 0.2);
        }

        .user-profile-pill {
          background: #ffffff;
          border: 1px solid rgba(11, 93, 59, 0.2);
          padding: 4px 14px 4px 4px;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.03);
        }

        .user-initials {
          width: 32px;
          height: 32px;
          background: #0B5D3B;
          color: #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 13px;
          border: 2px solid #C9A227;
        }

        .user-details {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-size: 11px;
          font-weight: 800;
          line-height: 1.2;
          color: #0B5D3B;
          text-transform: uppercase;
        }

        .user-meta {
          font-size: 9px;
          color: #C9A227;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .logout-trigger {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #ef4444;
          font-size: 14px;
          padding: 8px 10px;
          border-radius: 5px;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logout-trigger:hover {
          background: #ef4444;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(239, 68, 68, 0.3);
        }

        .toggle-button {
          border: 1px solid rgba(11, 93, 59, 0.2) !important;
          background: #f8fdfa !important;
          border-radius: 5px;
          font-size: 20px;
          color: #0B5D3B;
          padding: 6px 12px;
          margin-left: 15px;
          box-shadow: none !important;
          transition: all 0.3s ease;
        }
        
        .toggle-button:hover {
          background: #0B5D3B !important;
          color: white;
        }

        @media (max-width: 1199px) {
          .header-logo {
            max-height: 80px;
            max-width: 180px;
          }
          .header-container {
             justify-content: space-between;
             padding-left: 15px;
             padding-right: 15px;
          }
          .nav-links-center {
            margin: 20px 0;
            flex-direction: column;
            align-items: flex-start;
          }
          .header-actions {
            flex-direction: column;
            align-items: flex-start;
            margin-top: 20px;
            gap: 15px;
          }
          .nav-divider {
            display: none;
          }
          .offcanvas-premium .nav-link {
            font-size: 14px !important;
            padding: 10px 0 !important;
            width: 100%;
            text-align: left;
            border: none !important;
            position: relative;
          }
          .offcanvas-premium .nav-link::after {
            display: none !important;
          }
          .offcanvas-premium .login-link {
            font-size: 14px;
            padding: 15px 0;
            justify-content: flex-start;
            width: 100%;
            border: none !important;
          }
          .offcanvas-premium .btn-pill-green {
            padding: 12px 30px;
            font-size: 13px;
            margin-top: 10px;
            width: fit-content;
            text-align: center;
          }
          .offcanvas-header {
            border-bottom: none !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
