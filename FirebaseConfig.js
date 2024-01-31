import { initializeApp } from "firebase/app";
import {getAuth} from "Firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDil4e22nV-yqPg1bULNjYao5XEe9cbVcs",
  authDomain: "vinotedapp.firebaseapp.com",
  projectId: "vinotedapp",
  storageBucket: "vinotedapp.appspot.com",
  messagingSenderId: "681295595268",
  appId: "1:681295595268:web:a8607ec04810981436f251"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
