// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTtZ1YuHKxKcofYQaY2zAu7apUrqaDVvc",
  authDomain: "sih-neuralnexus.firebaseapp.com",
  projectId: "sih-neuralnexus",
  storageBucket: "sih-neuralnexus.appspot.com",
  messagingSenderId: "237649048312",
  appId: "1:237649048312:web:e229bbc46d2dc9ebaa010d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 