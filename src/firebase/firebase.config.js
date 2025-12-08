
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQ2ANvk_V3CZcWyIiTGn63eKPodqNwwXo",
  authDomain: "styledecor-be63d.firebaseapp.com",
  projectId: "styledecor-be63d",
  storageBucket: "styledecor-be63d.firebasestorage.app",
  messagingSenderId: "471488079350",
  appId: "1:471488079350:web:102d177e6ad7f3710dd3d7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
 // Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);