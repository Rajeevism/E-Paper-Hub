// UI/src/components/AuthModal.jsx

import React, { useState, useEffect } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "../styles/AuthModal.css";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { auth } from "../firebase";
import {
  signInWithCustomToken,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

const AuthModal = ({ isOpen, onClose }) => {
  const [view, setView] = useState("login");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setView("login");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPhoneNumber("");
      setOtp("");
      setError("");
      setSuccessMessage("");
      setIsLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSendOtp = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    if (!phoneNumber) {
      setError("Please enter a valid phone number.");
      return;
    }
    setIsLoading(true);
    try {
      await axios.post("http://localhost:4000/send-otp", { phoneNumber });
      setSuccessMessage("OTP sent to your WhatsApp!");
      setView("phoneLogin_step2");
    } catch (err) {
      console.error("OTP Send Error:", err);
      setError("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/verify-otp", {
        phoneNumber,
        otp,
      });
      const { token } = response.data;
      await signInWithCustomToken(auth, token);
      setIsLoading(false);
      setSuccessMessage("Logged in Successfully!");
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.message || "Verification failed.");
    }
  };

  const handleSocialLogin = async (provider) => {
    setError("");
    setSuccessMessage("");
    setIsLoading(true);
    try {
      await signInWithPopup(auth, provider);
      setSuccessMessage("Logged in Successfully!");
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      if (err.code === "auth/account-exists-with-different-credential") {
        setError(
          "An account with this email already exists. Please login using the original method."
        );
      } else {
        setError("Could not complete social login. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    if (view === "signup" && password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setIsLoading(true);
    try {
      if (view === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      setIsLoading(false);
      setSuccessMessage(
        view === "login"
          ? "Logged in Successfully!"
          : "Account created successfully!"
      );
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setIsLoading(false);
      // --- THIS IS THE CORRECTED LINE ---
      console.error("Email/Password Auth Error:", err);
      setError(err.message);
    }
  };

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage("Password reset email sent! Please check your inbox.");
    } catch (err) {
      console.error("Password Reset Error:", err);
      setError("Failed to send reset email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        {view === "phoneLogin_step1" && (
          <>
            <h2>Login with Phone</h2>
            <form className="auth-form" onSubmit={handleSendOtp}>
              <p style={{ textAlign: "center", color: "#666", marginTop: 0 }}>
                Enter your phone number to receive an OTP on WhatsApp.
              </p>
              <div className="phone-input-container">
                <PhoneInput
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  international
                  defaultCountry="IN"
                  countryCallingCodeEditable={false}
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  "Send OTP"
                )}
              </button>
              <p className="switch-msg">
                <a href="#" onClick={() => setView("login")}>
                  Back to Login
                </a>
              </p>
            </form>
          </>
        )}

        {view === "phoneLogin_step2" && (
          <>
            <h2>Verify OTP</h2>
            <form className="auth-form" onSubmit={handleVerifyOtp}>
              <p style={{ textAlign: "center", color: "#666", marginTop: 0 }}>
                Enter the 6-digit OTP sent to {phoneNumber}.
              </p>
              <input
                type="text"
                placeholder="123456"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength="6"
              />
              {!isLoading && error && <p className="error-message">{error}</p>}
              {!isLoading && successMessage && (
                <p className="success-message">{successMessage}</p>
              )}
              {isLoading && (
                <div className="spinner-container">
                  <div className="loading-spinner"></div>
                </div>
              )}
              {!isLoading && !successMessage && (
                <button type="submit">Verify & Login</button>
              )}
            </form>
          </>
        )}

        {view === "forgotPassword" && (
          <>
            <h2>Reset Password</h2>
            <form className="auth-form" onSubmit={handlePasswordReset}>
              <p style={{ textAlign: "center", color: "#666", marginTop: 0 }}>
                Enter your email to receive a reset link.
              </p>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <p className="error-message">{error}</p>}
              {successMessage && (
                <p className="success-message">{successMessage}</p>
              )}
              <button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  "Send Reset Link"
                )}
              </button>
              <p className="switch-msg">
                <a href="#" onClick={() => setView("login")}>
                  Back to Login
                </a>
              </p>
            </form>
          </>
        )}

        {(view === "login" || view === "signup") && (
          <>
            <h2>{view === "login" ? "Login" : "Sign Up"}</h2>
            {view === "login" && (
              <>
                <div className="auth-options">
                  <button
                    className="social-btn google"
                    onClick={() => handleSocialLogin(new GoogleAuthProvider())}
                    disabled={isLoading}
                  >
                    <FcGoogle className="social-icon" /> Continue with Google
                  </button>
                  <button
                    className="social-btn github"
                    onClick={() => handleSocialLogin(new GithubAuthProvider())}
                    disabled={isLoading}
                  >
                    <FaGithub className="social-icon" /> Continue with GitHub
                  </button>
                </div>
                <div className="divider">or</div>
              </>
            )}
            <form className="auth-form" onSubmit={handleEmailSubmit}>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {view === "signup" && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              )}
              {error && <p className="error-message">{error}</p>}
              {successMessage && (
                <p className="success-message">{successMessage}</p>
              )}
              <button type="submit" disabled={isLoading || !!successMessage}>
                {isLoading ? (
                  <div className="loading-spinner"></div>
                ) : view === "login" ? (
                  "Login"
                ) : (
                  "Create Account"
                )}
              </button>
              {view === "login" && (
                <div className="extras">
                  <a
                    href="#"
                    className="forgot-password-link"
                    onClick={() => setView("forgotPassword")}
                  >
                    Forgot Password?
                  </a>
                  <button
                    type="button"
                    className="phone-login-btn"
                    onClick={() => setView("phoneLogin_step1")}
                  >
                    Login via Phone
                  </button>
                </div>
              )}
              <p className="switch-msg">
                {view === "login"
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <a
                  href="#"
                  onClick={() => setView(view === "login" ? "signup" : "login")}
                >
                  {view === "login" ? " Sign Up" : " Login"}
                </a>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
