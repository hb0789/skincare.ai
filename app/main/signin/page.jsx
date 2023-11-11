"use client"
import '../styles/Register.css'
import {React,useEffect,useState} from 'react';
import { signIn, useSession, SessionProvider } from 'next-auth/react'
import { useRouter } from "next/navigation";
import { collection, addDoc } from 'firebase/firestore';
import {   getDocs, query, where } from 'firebase/firestore';
import { db } from '@/app/HOCS/firebase';
import { redirect } from 'next/navigation';
import {auth} from "@/app/HOCS/firebase"
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [newItem, setNewItem] = useState({ email: "", password: "", credits: 100 ,name:"",age:''});
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [exists,setExists]=useState(false);

  useEffect(() => {
    if (session || success) {
      router.push("/main/login");
    }
    console.log(success);
  }, [session,success,router]);


  const checkUserExists = async (email) => {
    const q = query(collection(db, 'item'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };
 

  const handleRegister = async (e) => {
    e.preventDefault();
    if (newItem.email !== "" && newItem.password !== "" && newItem.name !== "" && newItem.age >= 0 ) {
      const userExists = await checkUserExists(newItem.email);
      if (userExists) {
        setExists(true);
      } else {
        createUserWithEmailAndPassword(auth, newItem.email, newItem.password);
      const docRef = await addDoc(collection(db, 'item'), {
        email: newItem.email,
        password: newItem.password,
        credits: newItem.credits,
        name:newItem.name,
        age:newItem.age,
      });
      console.log('User data added with ID: ', docRef.id);
      setSuccess(true);
      setNewItem({ email: "", password: "", credits: "" ,name:"",age:""});
      router.push("/main/login");
    }}
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
        <input type="text" placeholder="Name" value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}/>
        
        <input type="number" placeholder="Age" value={newItem.age}
            onChange={(e) => setNewItem({ ...newItem, age: e.target.value })}/>
        
        <input type="email" placeholder="Email" value={newItem.email}
            onChange={(e) => setNewItem({ ...newItem, email: e.target.value })}/>

        <input type="password" placeholder="Password" value={newItem.password}
            onChange={(e) => setNewItem({ ...newItem, password: e.target.value })}/>
        

        <button className='button-register' type="submit">Register</button>
        {errorMessage && <span>Please re-enter the information correctly.</span>}
        {exists && <span>User with this email already exists.</span>}
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
