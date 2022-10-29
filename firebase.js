// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import {getFirestore, getFireStore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASDequeDTTKAgcHNvhNDzd0O6kYBwNZso",
  authDomain: "insta-clone-46ad8.firebaseapp.com",
  projectId: "insta-clone-46ad8",
  storageBucket: "insta-clone-46ad8.appspot.com",
  messagingSenderId: "634558458463",
  appId: "1:634558458463:web:1c98a1e2ee79b77d7849ea"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();


export {app, db, storage}