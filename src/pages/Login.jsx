import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";
import AuthBanner from "../components/AuthBanner";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showError } = useModal();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await logIn(formData);
      login({ user: data.user, token: data.token });
      setLoading(false);
      if (data.user.testPassed === false) {
        navigate("/admission-test", { replace: true });
      } else {
        navigate("/admission-result", { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <AuthBanner 
      title="Welcome Back" 
      description="Log in to continue your journey with Digikhyber — unlocking IT training and government scholarship opportunities."
    >
      <div className="auth-form-box">
        <h2 className="auth-title">Candidate Login</h2>
        <p className="auth-subtitle">
          Enter your credentials to access your account
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
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
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="mb-2" htmlFor="password">
              Password <span className="text-danger">*</span>
            </label>
            <div className="position-relative">
              <input
                id="password"
                className="form-control p-3 pe-5"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="btn position-absolute top-50 end-0 translate-middle-y me-3"
                onClick={() => setShowPassword(!showPassword)}
                style={{ background: "none", border: "none", zIndex: 10 }}
              >
                <i className={`fas ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
              </button>
            </div>
          </div>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <div className="text-end mb-3">
            <Link to="/forgot-password" style={{ fontSize: "0.85rem", color: "#0B5D3B", fontWeight: 600 }}>
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          <div className="text-center mt-4 auth-prompt">
            <span className="text-muted">Don't have an account? </span>
            <Link to="/register">New Registration</Link>
          </div>
        </form>
      </div>
    </AuthBanner>
  );
};

export default Login;
