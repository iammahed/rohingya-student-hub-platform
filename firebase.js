
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCfD5WrTBnl8_3sqFIlu9N4uCV55V3_opY",
  authDomain: "rohingya-student-hub.firebaseapp.com",
  projectId: "rohingya-student-hub",
  storageBucket: "rohingya-student-hub.firebasestorage.app",
  messagingSenderId: "121616713383",
  appId: "1:121616713383:web:f1f37e58debb981f9c3d82",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
