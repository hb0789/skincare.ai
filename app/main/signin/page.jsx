"use client"
import '../styles/Register.css'
import {React,useEffect,useState} from 'react';
import { signOut, signIn, useSession, SessionProvider } from 'next-auth/react'
import { useRouter } from "next/navigation";
import { collection, addDoc } from 'firebase/firestore';
import {   getDocs, query, where } from 'firebase/firestore';

import { db } from '@/app/HOCS/firebase';

const Register = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [newItem, setNewItem] = useState({ email: "", password: "", credits: 100 });
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);


  useEffect(() => {
    if (session || success) {
      router.push("/main");
    }
    console.log(success);
  }, [session,success,router]);

 

  const handleRegister = async (e) => {
    e.preventDefault();
    if (newItem.email !== "" && newItem.password !== "" && newItem.credits !== "") {
      const docRef = await addDoc(collection(db, 'item'), {
        email: newItem.email,
        password: newItem.password,
        credits: newItem.credits,
      });
      console.log('User data added with ID: ', docRef.id);
      setSuccess(true);
      setNewItem({ email: "", password: "", credits: "" });
      router.push("/main");
    }
    else{
      setErrorMessage(true);
    }

  };
  

  if (typeof session === "undefined") {
    return (
      <div className="loading-container">
        <div className="animated-dot red"></div>
        <div className="animated-dot blue"></div>
        <div className="animated-dot green"></div>
      </div>
      
    );
  }
  else{
  return (
    <div className="login-container">
      <h1>Register</h1>
      <form onSubmit={handleRegister} >
        <input type="email" placeholder="Email" value={newItem.email}
            onChange={(e) => setNewItem({ ...newItem, email: e.target.value })}/>

        <input type="password" placeholder="Password" value={newItem.password}
            onChange={(e) => setNewItem({ ...newItem, password: e.target.value })}/>
        <button type="submit">Register</button>
        {errorMessage && <span>Please re-enter the information correctly.</span>}
      </form>
      
      <div className="or-divider">
        <div className="divider-line"></div>
        <p>Or</p>
        <div className="divider-line"></div>
      </div>
      <div className='tex'>
        Sign in using
      </div>
      <div className="google-signin">
        
        
        <div className='logo'>
        <img className='google-image'
          src="https://img.icons8.com/fluent/48/000000/google-logo.png"
          alt="Google Logo" onClick={() => signIn()}
        /></div>
      </div>
    </div>
  );
};
}
export default Register;
