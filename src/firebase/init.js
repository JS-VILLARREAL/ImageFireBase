// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

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

export function uploadFile(file) {
  const storageRef = ref(storage, `scenas/${uuidv4()}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  // uploadBytes(storageRef, file).then((snapshot) => {
  //   console.log(snapshot);
  // });
  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }
  );
}