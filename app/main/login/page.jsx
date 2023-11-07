"use client"
import '../styles/Login.css'

import {React,useEffect,useState} from 'react';
import {  signIn, useSession } from 'next-auth/react'
import { useRouter } from "next/navigation";
import {  signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from '@/app/HOCS/firebase';


const Login = () => {
  const router = useRouter();
  const {data: session} = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      const user = userCredential.user;
      localStorage.setItem('token', user.accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      router.push("/main");
    } catch (error) {
      console.error(error);
    }
    console.log("logged in")
  }


  useEffect(() => {
    if (session ) {
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
      <form onSubmit={handleSubmit}>
        <input id="email"
                  placeholder='Email'
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required />
        <input type="password" name="password" placeholder="Password" id="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required/>
        <button className='button-login' >Login</button>
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
