import React, { useEffect, useState } from "react";
import "../styles/login.css";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
    address: "",
    phone: "",
  });
  const [confirm, setConfirm] = useState("");

  const navigate = useNavigate();
  const { register } = useAuth();

  const validateInput = (name, value) => {
    switch (name) {
      default:
      case "email":
        const emailRegex =
          /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        return !(!value || !emailRegex.test(value));
      case "address":
        return !(!value || value.length < 20 || value.length > 300);
      case "phone":
        const phoneRegex = /^\+?([0-9]{2})[-]{1}([0-9]{4})[-]{1}([0-9]{4})$/;
        return !(!value || !phoneRegex.test(value));
      case "password":
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return !(!value || !passwordRegex.test(value));
      case "confirm":
        return !(!value || value !== user.password);
    }
  };

  const validationMessages = {
    email: "Email is not valid",
    password:
      "Password should be minimum 8 characters and must contain only letters and numbers.",
    confirm: "Confirm password doesn't match.",
    address: "Address is not valid.Min length 20. Max characters 300.",
    phone: "Phone number is incorrect.\n Example format:+91-1234-5678",
  };

  useEffect(() => {
    if (!validateInput("email", user.email)) {
      setError(validationMessages.email);
    } else if (!validateInput("password", user.password)) {
      setError(validationMessages.password);
    } else if (!validateInput("confirm", confirm)) {
      setError(validationMessages.confirm);
    } else if (!validateInput("address", user.address)) {
      setError(validationMessages.address);
    } else if (!validateInput("phone", user.phone)) {
      setError(validationMessages.phone);
    } else{
      setError("");
    }
  }, [user, confirm]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(user);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <section className="login-container">
      <div className="wrapper">
        <div className="login-box">
          <div className="login-header">
            <span className="login-error">{error}</span>
            <h1>Register</h1>
            <form className="login-form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="email-label">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={user.email}
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                  className="email-input"
                  placeholder="name@company.com"
                />
              </div>
              <div className="password-section">
                <div className="input-item">
                  <label htmlFor="password" className="email-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    value={user.password}
                    onChange={(e) => {
                      setUser({ ...user, password: e.target.value });
                    }}
                    className="email-input"
                  />
                </div>
                <div className="input-item">
                  <label htmlFor="confirm-password" className="email-label">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    value={confirm}
                    placeholder="••••••••"
                    onChange={(e) => {
                      setConfirm(e.target.value);
                    }}
                    className="email-input"
                  />
                </div>
              </div>
              <div className="password-section">
                <div className="input-item">
                  <label htmlFor="address" className="email-label">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={user.address}
                    onChange={(e) => {
                      setUser({ ...user, address: e.target.value });
                    }}
                    placeholder="123 Higgs Avenue, Austin, TX"
                    className="email-input"
                  />
                </div>
                <div className="input-item">
                  <label htmlFor="phone" className="email-label">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={user.phone}
                    onChange={(e) => {
                      setUser({ ...user, phone: e.target.value });
                    }}
                    placeholder="+91-1234-5678"
                    className="email-input"
                  />
                </div>
              </div>
              <div className="remember-section">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="checkbox"
                  required
                />
                <div style={{ marginLeft: "0.75rem", fontSize: "14px" }}>
                  <label htmlFor="terms" style={{ fontWeight: 300 }}>
                    By signing up, you are creating a Lavish Look account, and
                    you agree to Lavish Look's{" "}
                    <a style={{ fontWeight: 500 }} href="/">
                      Terms of Use
                    </a>{" "}
                    and{" "}
                    <a style={{ fontWeight: 500 }} href="/">
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>
              </div>
              <button
                disabled={error !== ""}
                type="submit"
                className="login-form-submit"
              >
                Create an account
              </button>
              <p style={{ fontWeight: 300, fontSize: "0.875rem" }}>
                Already have an account?{" "}
                <a
                  href="/login"
                  style={{ fontWeight: 500, textDecoration: "none" }}
                >
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
