import React, { useState } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="wrapper">
        <div className="login-box">
          <div className="login-header">
            <span className="login-error">{error}</span>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
              <div>
                <label htmlFor="email" className="email-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="email-input"
                  placeholder="Enter your email"
                  value={email}
                  disabled={loading}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="email-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  disabled={loading}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  placeholder="••••••••"
                  className="email-input"
                  required
                />
              </div>

              <div className="remember-section">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="checkbox"
                />
                <label htmlFor="remember" className="remember-label">
                  Remember me
                </label>
              </div>

              <button type="submit" className="login-form-submit">
                {loading ? (
                  <span className="loader" />
                ) : (
                  <span>Sign in to your account</span>
                )}
              </button>
              <p style={{ fontWeight: 300, fontSize: "0.875rem" }}>
                Don't have an account?{" "}
                <a href="/register" style={{ fontWeight: 500 }}>
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
