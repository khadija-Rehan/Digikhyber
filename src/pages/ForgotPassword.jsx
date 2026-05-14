import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPasswordRequest } from "../api/auth";
import AuthBanner from "../components/AuthBanner";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await forgotPasswordRequest(formData);
      setSuccess(
        "Password reset link has been sent to your email address."
      );
      setLoading(false);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to send reset link."
      );
      setLoading(false);
    }
  };

  return (
    <AuthBanner 
      title=""
      description="Enter your email and we'll send you a reset link."
      isLogin={true}
    >
      <div className="auth-form-box">
        <h2 className="auth-title">Forgot Password?</h2>
        <p className="auth-subtitle">
          Enter your registered email address and we'll send you a reset link
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2" htmlFor="email">
              Email Address <span className="text-danger">*</span>
            </label>
            <input
              id="email"
              className="form-control p-3"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your registered email"
              required
              disabled={loading}
            />
          </div>

          {error && <div className="alert alert-danger py-2 mb-3">{error}</div>}
          {success && <div className="alert alert-success py-2 mb-3">{success}</div>}

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="text-center mt-4 auth-prompt">
            <span className="text-muted">Remember your password? </span>
            <Link to="/login">Back to Login</Link>
          </div>
        </form>
      </div>
    </AuthBanner>
  );
};

export default ForgotPassword;
