// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/firestore';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDe8UWLlbQEkhyP89FC-peRClgj9TV_ciI",
  authDomain: "taskgo-ca3cd.firebaseapp.com",
  projectId: "taskgo-ca3cd",
  storageBucket: "taskgo-ca3cd.firebasestorage.app",
  messagingSenderId: "1007993071462",
  appId: "1:1007993071462:web:3786f46f8ea2d7915b8aa7",
  measurementId: "G-KKLLXKMZXD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = firebaseApp.firestore();

const auth = getAuth();

export { db, auth }