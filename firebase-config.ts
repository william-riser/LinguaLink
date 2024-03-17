// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyAobQvUsOws4rXjh-odRpdZch7nnYpqt1A",
//   authDomain: "chatapp-9b234.firebaseapp.com",
//   projectId: "chatapp-9b234",
//   storageBucket: "chatapp-9b234.appspot.com",
//   messagingSenderId: "245503864267",
//   appId: "1:245503864267:web:7fcccfa3d2d27a94921a4e"
// };

export const firebaseConfig = {
  apiKey: "AIzaSyAl0Wx_cHz6AYYFo4qDGoU7J5Rk5AmY9N8",
  authDomain: "test-85bc6.firebaseapp.com",
  projectId: "test-85bc6",
  storageBucket: "test-85bc6.appspot.com",
  messagingSenderId: "785919432816",
  appId: "1:785919432816:web:af8d77214ed82af0313cb5",
  measurementId: "G-CTK115PQL0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
