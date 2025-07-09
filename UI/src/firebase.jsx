// UI/src/firebase.jsx

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// --- NEW: Import getFirestore ---
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAKfAfHwdoXXtAJb4q4QyKSj1mMvNNxmI",
  authDomain: "e-paper-hub.firebaseapp.com",
  projectId: "e-paper-hub",
  storageBucket: "e-paper-hub.firebasestorage.app",
  messagingSenderId: "341757419226",
  appId: "1:341757419226:web:29a2efffef4ff27ac18fe3",
  measurementId: "G-VNE17VWLT0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// --- NEW: Initialize and export Firestore Database ---
export const db = getFirestore(app);
