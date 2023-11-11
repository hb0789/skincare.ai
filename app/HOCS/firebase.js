// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKZh-AmOWm4fbERn8jf1eB2Xiv67i8BrU",
  authDomain: "neuralnexus-1f738.firebaseapp.com",
  projectId: "neuralnexus-1f738",
  storageBucket: "neuralnexus-1f738.appspot.com",
  messagingSenderId: "854117692416",
  appId: "1:854117692416:web:f28d74789b88b6065d54e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth();
const db = getFirestore(app); 
export {db,auth};
