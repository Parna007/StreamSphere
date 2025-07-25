// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgdu_V0S3Vorn8-yC5FUfDridmvmrfJbY",
  authDomain: "streamspehere.firebaseapp.com",
  projectId: "streamspehere",
  storageBucket: "streamspehere.firebasestorage.app",
  messagingSenderId: "313845090293",
  appId: "1:313845090293:web:5a32a72abfd172924102bc",
  measurementId: "G-3G8F5KHS9M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();