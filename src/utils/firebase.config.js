// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJZ1jB9eQlL84qK5K4J-SdjvFTPK9W-S4",
  authDomain: "netflix-clone-72b4f.firebaseapp.com",
  projectId: "netflix-clone-72b4f",
  storageBucket: "netflix-clone-72b4f.appspot.com",
  messagingSenderId: "377892849945",
  appId: "1:377892849945:web:72925f4d323f25badf5d88",
  measurementId: "G-LD56BWPGMM"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth=getAuth(app);
