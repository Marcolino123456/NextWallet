// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKHW_DQEeuDfY5EBWQMsWU9pMb1hiJu78",
  authDomain: "next13-wallet.firebaseapp.com",
  projectId: "next13-wallet",
  storageBucket: "next13-wallet.appspot.com",
  messagingSenderId: "625444974695",
  appId: "1:625444974695:web:cba518aea25e123bf7e4c2"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app)

export { db }