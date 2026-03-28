import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../services/api";
import "../index.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordRule =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

  const validateFields = () => {
    const nextErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    let isValid = true;

    if (!name.trim()) {
      nextErrors.name = "Name is required";
      isValid = false;
    }

    if (!email.trim()) {
      nextErrors.email = "Email is required";
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        nextErrors.email = "Enter a valid email address";
        isValid = false;
      }
    }

    if (!password) {
      nextErrors.password = "Password is required";
      isValid = false;
    } else if (!passwordRule.test(password)) {
      nextErrors.password =
        "Use 8+ chars with uppercase, lowercase, number, and symbol";
      isValid = false;
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setFieldErrors(nextErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateFields()) {
      setError("Please fix the highlighted fields");
      setSuccess("");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await registerUser(name, email, password);
      setSuccess("Registration successful. You can login now.");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setFieldErrors({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1>Homefinder</h1>
      </div>
      <div className="auth-right">
        <div className="auth-form">
          <p className="welcome">Welcome</p>
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              const value = e.target.value;
              setName(value);
              if (fieldErrors.name) {
                setFieldErrors((prev) => ({ ...prev, name: "" }));
              }
            }}
          />
          {fieldErrors.name && (
            <p className="field-message error">{fieldErrors.name}</p>
          )}

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              const value = e.target.value;
              setEmail(value);
              if (fieldErrors.email) {
                setFieldErrors((prev) => ({ ...prev, email: "" }));
              }
            }}
          />
          {fieldErrors.email && (
            <p className="field-message error">{fieldErrors.email}</p>
          )}

          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                const value = e.target.value;
                setPassword(value);
                if (fieldErrors.password || fieldErrors.confirmPassword) {
                  setFieldErrors((prev) => ({
                    ...prev,
                    password: "",
                    confirmPassword: "",
                  }));
                }
              }}
            />
            <button
              type="button"
              className="toggle-password-icon"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M3 3l18 18m-3.6-3.6A10.7 10.7 0 0112 19C7 19 3.2 16 1.5 12 2.4 9.8 3.9 8 5.9 6.8m4.1-1.6A11 11 0 0112 5c5 0 8.8 3 10.5 7a12.6 12.6 0 01-1.9 3.1M10.6 10.6A2 2 0 0010 12a2 2 0 002 2c.5 0 1-.2 1.4-.6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M1.5 12C3.2 8 7 5 12 5s8.8 3 10.5 7c-1.7 4-5.5 7-10.5 7S3.2 16 1.5 12z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                </svg>
              )}
            </button>
          </div>
          {fieldErrors.password && (
            <p className="field-message error">{fieldErrors.password}</p>
          )}

          <div className="password-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                const value = e.target.value;
                setConfirmPassword(value);
                if (fieldErrors.confirmPassword) {
                  setFieldErrors((prev) => ({ ...prev, confirmPassword: "" }));
                }
              }}
            />
            <button
              type="button"
              className="toggle-password-icon"
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M3 3l18 18m-3.6-3.6A10.7 10.7 0 0112 19C7 19 3.2 16 1.5 12 2.4 9.8 3.9 8 5.9 6.8m4.1-1.6A11 11 0 0112 5c5 0 8.8 3 10.5 7a12.6 12.6 0 01-1.9 3.1M10.6 10.6A2 2 0 0010 12a2 2 0 002 2c.5 0 1-.2 1.4-.6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M1.5 12C3.2 8 7 5 12 5s8.8 3 10.5 7c-1.7 4-5.5 7-10.5 7S3.2 16 1.5 12z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                </svg>
              )}
            </button>
          </div>
          {fieldErrors.confirmPassword && (
            <p className="field-message error">{fieldErrors.confirmPassword}</p>
          )}

          {error && <p className="form-message error">{error}</p>}
          {success && <p className="form-message success">{success}</p>}

          <button onClick={handleRegister} disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          <p className="auth-switch">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;