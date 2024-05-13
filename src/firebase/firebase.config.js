// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAdjSVSoqQ-oQ7A4pdiTY9S2jtsgLbyq4",
  authDomain: "share-dine-client.firebaseapp.com",
  projectId: "share-dine-client",
  storageBucket: "share-dine-client.appspot.com",
  messagingSenderId: "410881005282",
  appId: "1:410881005282:web:72d17a4da113ff3d86b0bb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);