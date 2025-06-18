import React, { useState, useEffect } from "react";
import "../styles/AuthModal.css";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

const AuthModal = ({ isOpen, onClose }) => {
  const [view, setView] = useState("login"); // 'login', 'signup', or 'forgotPassword'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setView("login");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError("");
      setSuccessMessage("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSocialLogin = async (provider) => {
    setError("");
    setSuccessMessage("");
    try {
      await signInWithPopup(auth, provider);
      setSuccessMessage("Logged in Successfully!");
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Social Login Error:", err.code);
      if (err.code === "auth/account-exists-with-different-credential") {
        setError(
          "An account already exists with this email. Please log in with the original method."
        );
      } else {
        setError("Could not complete social login. Please try again.");
      }
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

    try {
      if (view === "login") {
        await signInWithEmailAndPassword(auth, email, password);
        setSuccessMessage("Logged in Successfully!");
      } else {
        // 'signup'
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccessMessage("Account created successfully!");
      }
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      // --- THIS IS THE CORRECT, FULL ERROR HANDLING BLOCK ---
      console.error("Firebase Auth Error:", err.code);
      switch (err.code) {
        case "auth/user-not-found":
        case "auth/invalid-email":
          setError("No account found with this email.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password. Please try again.");
          break;
        case "auth/email-already-in-use":
          setError("This email is already registered. Please login.");
          break;
        default:
          setError("An error occurred. Please try again.");
          break;
      }
    }
  };

  const handlePasswordReset = async (event) => {
    // This function is correct and remains unchanged
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage("Password reset email sent! Please check your inbox.");
    } catch (err) {
      console.error("Password Reset Error:", err.code);
      setError("Failed to send reset email. Please check the address.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        {view === "forgotPassword" && (
          // ... The Forgot Password view is unchanged ...
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
              <button type="submit">Send Reset Link</button>
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

            {/* --- THIS SECTION IS RESTORED --- */}
            {view === "login" && (
              <>
                <div className="auth-options">
                  <button
                    className="social-btn google"
                    onClick={() => handleSocialLogin(new GoogleAuthProvider())}
                  >
                    <FcGoogle className="social-icon" /> Continue with Google
                  </button>
                  <button
                    className="social-btn github"
                    onClick={() => handleSocialLogin(new GithubAuthProvider())}
                  >
                    <FaGithub className="social-icon" /> Continue with GitHub
                  </button>
                </div>
                <div className="divider">or</div>
              </>
            )}
            {/* --- END OF RESTORED SECTION --- */}

            <form className="auth-form" onSubmit={handleEmailSubmit}>
              {/* ... The rest of the form is unchanged ... */}
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
              <button type="submit" disabled={!!successMessage}>
                {view === "login" ? "Login" : "Create Account"}
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
                  <button type="button" className="phone-login-btn">
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
