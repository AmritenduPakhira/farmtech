// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmgGK4Z5lqGjRWcYTpAdqPdDKNEKWhInk",
  authDomain: "croplite-eb482.firebaseapp.com",
  projectId: "croplite-eb482",
  storageBucket: "croplite-eb482.appspot.com",
  messagingSenderId: "62975065759",
  appId: "1:62975065759:web:dc9025340974304980acaa",
  measurementId: "G-MW5JEBT5FV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;