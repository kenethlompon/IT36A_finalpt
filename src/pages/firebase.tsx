// src/firebase.tsx
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAchdn2O4o6rM-hbrqBt57E8CLovaIrNig",
  authDomain: "it36a-final.firebaseapp.com",
  projectId: "it36a-final",
  storageBucket: "it36a-final.appspot.com",
  messagingSenderId: "49580650468",
  appId: "1:49580650468:web:23d0e8eb7e6fce24b7a1f1",
  measurementId: "G-BYNZ9V24M0"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Authentication
const db = getFirestore(app); // Initialize Firestore

export { auth, db }; // Export Auth and Firestore instances
