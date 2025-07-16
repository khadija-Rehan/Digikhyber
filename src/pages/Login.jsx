import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logIn } from "../api/auth";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

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
    try {
      const { data } = await logIn(formData);
      login({ user: data.user, token: data.token });

      if (data.user.testPassed === false) {
        navigate("/admission-test", { replace: true });
      } else {
        navigate("/admission-result", { replace: true });
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="login">
      <div className="login-form">
        <div className="text-center mb-4">
          <img src={Logo} alt={Logo} />
        </div>
        <div className="text-center mb-4">
          <h5>CANDIDATE LOGIN</h5>
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
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label className="mb-2" htmlFor="password">
              Password <span className="text-danger">*</span>
            </label>
            <input
              className="form-control p-3"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="text-end">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <button
            type="submit"
            className="btn-green register-btn btn btn-success w-100 mt-3 rounded-2"
          >
            Login
          </button>
          <div className="text-center mt-3 fs-6">
            <span>Don't have an account? </span>
            <Link to="/register">New Registration</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
