

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth , GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY  ,
  authDomain: "vihaanlearning-6806f.firebaseapp.com",
  projectId: "vihaanlearning-6806f",
  storageBucket: "vihaanlearning-6806f.firebasestorage.app",
  messagingSenderId: "315596800869",
  appId: "1:315596800869:web:f20f47dd431b6a3a19978c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider() ;

export {auth  , googleProvider }