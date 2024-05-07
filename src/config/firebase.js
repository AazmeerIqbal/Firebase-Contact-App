// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlMKqEFWTQ0SRxlLm3qxLmU2YF4CTAslE",
  authDomain: "contact-app-ffa79.firebaseapp.com",
  projectId: "contact-app-ffa79",
  storageBucket: "contact-app-ffa79.appspot.com",
  messagingSenderId: "774113506096",
  appId: "1:774113506096:web:331a0ebf4d351c3ad08ef5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
