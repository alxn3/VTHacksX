import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import Axios from 'axios'

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBbjBySGzTZV8NskTVLH8OfMGTP56h7J8Q",
  authDomain: "artscaper.firebaseapp.com",
  projectId: "artscaper",
  storageBucket: "artscaper.appspot.com",
  messagingSenderId: "118369033760",
  appId: "1:118369033760:web:f1cc84a799cc6105156645",
  measurementId: "G-YWSMZP74Z5"
};
console.log(process.env.REACT_APP_FIREBASE_API_KEY)

const app = initializeApp(firebaseConfig, "Artscaper");

const projectAuth = getAuth(app)
const db = getFirestore(app)
export { Axios, db }