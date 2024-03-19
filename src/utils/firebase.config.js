
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC65-6r7ZM7qCP52Mh9waDsnhaOXdjXzs0",
  authDomain: "netflix-6753d.firebaseapp.com",
  projectId: "netflix-6753d",
  storageBucket: "netflix-6753d.appspot.com",
  messagingSenderId: "269277555993",
  appId: "1:269277555993:web:86735870f1a5beb0012988",
  measurementId: "G-TMVLFT664Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth=getAuth(app);