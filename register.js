
import { auth, googleProvider } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const registerForm = document.getElementById("registerForm");
const googleButton = document.getElementById("googleSignIn");
const message = document.getElementById("message");

function showMessage(text, isError = false) {
  message.textContent = text;
  message.style.color = isError ? "#ff7777" : "#22c58b";
}

// Email and password registration
registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!fullName) {
    showMessage("Please enter your full name.", true);
    return;
  }

  if (password.length < 8) {
    showMessage("Password must contain at least 8 characters.", true);
    return;
  }

  const button = registerForm.querySelector(".create-btn");
  button.disabled = true;
  button.textContent = "Creating account...";

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredential.user, {
      displayName: fullName
    });

    await sendEmailVerification(userCredential.user);

    showMessage("Account created! Please check your email to verify your account.");

    registerForm.reset();

  } catch (error) {
    console.error("Registration error:", error);

    const errors = {
      "auth/email-already-in-use": "This email already has an account.",
      "auth/invalid-email": "Please enter a valid email address.",
      "auth/weak-password": "Please choose a stronger password.",
      "auth/network-request-failed": "Network error. Please try again."
    };

    showMessage(
      errors[error.code] || "Registration failed. Please try again.",
      true
    );

  } finally {
    button.disabled = false;
    button.textContent = "Create My Account →";
  }
});

// Google registration / sign-in
googleButton.addEventListener("click", async () => {
  googleButton.disabled = true;
  googleButton.textContent = "Connecting to Google...";

  try {
    const result = await signInWithPopup(auth, googleProvider);

    showMessage("Welcome, " + result.user.displayName + "! Google sign-in successful.");

  } catch (error) {
    console.error("Google sign-in error:", error);

    showMessage(
      error.code === "auth/popup-closed-by-user"
        ? "Google sign-in was cancelled."
        : "Google sign-in failed. Please try again.",
      true
    );

  } finally {
    googleButton.disabled = false;
    googleButton.textContent = "Continue with Google";
  }
});
