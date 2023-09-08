// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD5EBNejF2Z1eJqJr3pzCC7wIobSNbQ_qw",
  authDomain: "imgprueba-5de6d.firebaseapp.com",
  projectId: "imgprueba-5de6d",
  storageBucket: "imgprueba-5de6d.appspot.com",
  messagingSenderId: "360541345805",
  appId: "1:360541345805:web:0a4ac789d421952a991d44",
  measurementId: "G-D8PY6JFPD1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

