// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-a3e1c.firebaseapp.com",
  projectId: "mern-estate-a3e1c",
  storageBucket: "mern-estate-a3e1c.firebasestorage.app",
  messagingSenderId: "127272417660",
  appId: "1:127272417660:web:6813c7a688544eb1af8cf9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
