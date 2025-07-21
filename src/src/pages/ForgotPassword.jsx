import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordRequest } from "../api/auth";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    
    try {
      const { data } = await forgotPasswordRequest(formData);
      setSuccess("Password reset link has been sent to your email address. Please check your inbox and click on the link to reset your password.");
      setLoading(false);
      
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to send reset link. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login-form">
        <div className="text-center mb-4">
          <img src={Logo} alt={Logo} />
        </div>
        <div className="text-center mb-4">
          <h5>FORGOT PASSWORD</h5>
          <p className="text-muted">Enter your email address to reset your password</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="mb-2" htmlFor="email">
              Email <span className="text-danger">*</span>
            </label>
            <input
              className="form-control p-3"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
              disabled={loading}
            />
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
                Sending...
              </>
            ) : (
              "Send Reset Link"
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

export default ForgotPassword; 