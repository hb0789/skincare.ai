"use client"
import '../styles/Login.css'

import {React,useEffect,useState} from 'react';
import { signOut, signIn, useSession, SessionProvider } from 'next-auth/react'
import { useRouter } from "next/navigation";

const Login = () => {
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
      <h1>Login</h1>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Login</button>
      </form>
      <p className="forgot-password">
        <a href="../main/forgot">Forgot Password?</a>
      </p>
      <div className="or-divider">
        <div className="divider-line"></div>
        <p>Or</p>
        <div className="divider-line"></div>
      </div>
      <div className="google-signin">
        
        
        <p>login using</p>
        <div className='logo'>
        <img className='google-image'
          src="https://img.icons8.com/fluent/48/000000/google-logo.png"
          alt="Google Logo" onClick={() => signIn()}
        /></div>
      </div>
      
      <p className="noaccount">
        Dont have an account? 
        <a href="../main/signin"> Sign Up</a>
      </p>
    </div>
  );
};
}
export default Login;
