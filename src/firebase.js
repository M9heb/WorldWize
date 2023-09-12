// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsn6FJ9BygNMb7eVambs4JVpA_yzKaqh0",
  authDomain: "worldwise-fc516.firebaseapp.com",
  projectId: "worldwise-fc516",
  storageBucket: "worldwise-fc516.appspot.com",
  messagingSenderId: "1028043845352",
  appId: "1:1028043845352:web:40e21d3a9e29a4f4b1a35d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
