"use client"
import '../styles/Login.css'

import {React,useEffect,useState} from 'react';
import {  signIn, useSession,SessionProvider } from 'next-auth/react'
import { useRouter } from "next/navigation";
import {  getAuth,signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from '@/app/HOCS/firebase';


const Login = () => {
  const router = useRouter();
  const {data: session} = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
      const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    console.log(userCredential)
    const user = userCredential.user;
    if (user!="") {
          // You can perform additional actions here if needed
          // For example, storing user data in local storage
          localStorage.setItem('token', user.accessToken);
          localStorage.setItem('user', JSON.stringify(user));
          
          // Redirect to the main page after successful login
          router.push('/main');
        }
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
  });
    
    
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
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
          <button className="button-login">Login</button>
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
