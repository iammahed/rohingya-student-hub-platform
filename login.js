
import { auth, googleProvider } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const loginForm = document.getElementById("loginForm");
const googleButton = document.getElementById("googleSignIn");
const forgotPassword = document.getElementById("forgotPassword");
const message = document.getElementById("message");

function showMessage(text, isError = false) {
  message.textContent = text;
  message.style.color = isError ? "#ff7777" : "#22c58b";
}

// EMAIL AND PASSWORD LOGIN
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const button = loginForm.querySelector('button[type="submit"]');

  button.disabled = true;
  button.textContent = "Signing in...";

  try {
    const result = await signInWithEmailAndPassword(
      auth, email, password
    );

    if (!result.user.emailVerified) {
      await signOut(auth);
      showMessage("Please verify your email before logging in.", true);
      return;
    }

    window.location.replace("dashboard.html");

  } catch (error) {
    console.error("Login error:", error);

    const errors = {
      "auth/invalid-credential": "Incorrect email or password.",
      "auth/user-not-found": "No account found with this email.",
      "auth/wrong-password": "Incorrect password.",
      "auth/invalid-email": "Please enter a valid email."
    };

    showMessage(errors[error.code] || "Login failed. Please try again.", true);

  } finally {
    button.disabled = false;
    button.textContent = "Sign In →";
  }
});

// CONTINUE WITH GOOGLE
googleButton.addEventListener("click", async () => {
  googleButton.disabled = true;
  googleButton.textContent = "Connecting...";

  try {
    const result = await signInWithPopup(auth, googleProvider);

    if (!result.user.emailVerified) {
      await signOut(auth);
      showMessage("Please use a verified Google account.", true);
      return;
    }

    window.location.replace("dashboard.html");

  } catch (error) {
    console.error("Google login error:", error);

    const errors = {
      "auth/operation-not-allowed": "Google sign-in is not enabled in Firebase.",
      "auth/unauthorized-domain": "This website domain is not authorized in Firebase.",
      "auth/popup-blocked": "Your browser blocked the Google sign-in popup.",
      "auth/popup-closed-by-user": "Google sign-in was cancelled.",
      "auth/cancelled-popup-request": "A Google sign-in request is already running."
    };

    showMessage(
      errors[error.code] || `Google login failed: ${error.code || error.message}`,
      true
    );

  } finally {
    googleButton.disabled = false;
    googleButton.textContent = "Continue with Google";
  }
});

// FORGOT PASSWORD
forgotPassword.addEventListener("click", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();

  if (!email) {
    showMessage("Enter your email address first.", true);
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    showMessage("Password reset email sent. Please check your inbox.");

  } catch (error) {
    console.error("Password reset error:", error);
    showMessage("Could not send reset email. Check your email and try again.", true);
  }
});
