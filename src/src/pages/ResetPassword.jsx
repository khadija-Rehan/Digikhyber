import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.png";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { resetPassword } from "../api/auth";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  // const email = searchParams.get("email") || "";

  useEffect(() => {
    if (!token) {
      navigate("/forgot-password", { replace: true });
    }
  }, [token, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    if (password.length === 0) {
      setPasswordStrength("");
    } else if (
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar &&
      isLongEnough
    ) {
      setPasswordStrength("strong");
    } else if ((hasUpperCase || hasLowerCase) && hasNumbers && isLongEnough) {
      setPasswordStrength("medium");
    } else {
      setPasswordStrength("weak");
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case "strong":
        return "text-success";
      case "medium":
        return "text-warning";
      case "weak":
        return "text-danger";
      default:
        return "";
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case "strong":
        return "Strong password";
      case "medium":
        return "Medium strength password";
      case "weak":
        return "Weak password";
      default:
        return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Validate password strength
    if (passwordStrength === "weak") {
      setError("Password is too weak. Please choose a stronger password.");
      return;
    }

    setLoading(true);

    try {
      const resetData = {
        // email,
        password: formData.password,
      };
      const { data } = await resetPassword(resetData, token);
      setSuccess("Password has been reset successfully!");
      setLoading(false);
      // Navigate to login page after success
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to reset password. Please try again."
      );
      setLoading(false);
    }
  };

  if (!token) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="login">
      <div className="login-form">
        <div className="text-center mb-4">
          <img src={Logo} alt={Logo} />
        </div>
        <div className="text-center mb-4">
          <h5>RESET PASSWORD</h5>
          <p className="text-muted">Enter your new password</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="mb-2" htmlFor="password">
              New Password <span className="text-danger">*</span>
            </label>
            <div className="position-relative">
              <input
                className="form-control p-3 pe-5"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your new password"
                required
                disabled={loading}
              />
              <button
                type="button"
                className="btn position-absolute top-50 end-0 translate-middle-y me-3"
                onClick={togglePasswordVisibility}
                style={{ background: "none", border: "none", zIndex: 10 }}
              >
                <i
                  className={`fas ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                ></i>
              </button>
            </div>

            {passwordStrength && (
              <small className={`${getPasswordStrengthColor()} mt-1 d-block`}>
                {getPasswordStrengthText()}
              </small>
            )}
          </div>
          <div className="mb-3">
            <label className="mb-2" htmlFor="confirmPassword">
              Confirm Password <span className="text-danger">*</span>
            </label>
            <div className="position-relative">
              <input
                className="form-control p-3 pe-5"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your new password"
                required
                disabled={loading}
              />
              <button
                type="button"
                className="btn position-absolute top-50 end-0 translate-middle-y me-3"
                onClick={togglePasswordVisibility}
                style={{ background: "none", border: "none", zIndex: 10 }}
              >
                <i
                  className={`fas ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                ></i>
              </button>
            </div>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <button
            type="submit"
            className="btn-green register-btn btn btn-success w-100 mt-3 rounded-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
          <div className="text-center mt-3 fs-6">
            <span>Remember your password? </span>
            <Link to="/login">Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
