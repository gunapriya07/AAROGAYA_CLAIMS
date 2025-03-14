// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDqqkEopvvWILvIuDtYvEgwggHwyBslJks",
  authDomain: "aarogyaclaims-ddbff.firebaseapp.com",
  projectId: "aarogyaclaims-ddbff",
  storageBucket: "aarogyaclaims-ddbff.firebasestorage.app",
  messagingSenderId: "477382783366",
  appId: "1:477382783366:web:52ac0c62df1d26bf57fc07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);