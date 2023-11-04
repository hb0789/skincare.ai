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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  


  useEffect(() => {
    if (session || success) {
      router.push("/main");
      
    }
  }, [session,success,router]);

 

  const handleRegister = async () => {

    const userData = {
      credits: 100,
      email,
      password,
      
    };

    try {
      const docRef = await addDoc(collection(db, 'item'), userData);
      console.log('User data added with ID: ', docRef.id);
      setSuccess(true);
    } 
    catch (error) {
      console.error('Error adding user data: ', error);
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
      <form>
        <input type="email" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)}/>

        <input type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleRegister} >Register</button>
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
