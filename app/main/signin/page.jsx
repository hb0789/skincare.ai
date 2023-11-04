"use client"
import '../styles/Register.css'
import {React,useEffect,useState} from 'react';
import { signOut, signIn, useSession, SessionProvider } from 'next-auth/react'
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/main");
      
    }
  }, [session,router]);

  

  if (typeof session === "undefined") {
    return (
      <div className="loading-container">
        <div className="animated-dot red"></div>
        <div className="animated-dot blue"></div>
        <div className="animated-dot green"></div>
      </div>
      
    );
  }
  else if(!session){
  return (
    <div className="login-container">
      <h1>Register</h1>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Register</button>
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
          alt="Google Logo" 
        /></div>
      </div>
    </div>
  );
};
}
export default Register;
