"use client";
import "../styles/Signin.css";
import "../styles/Main.css"
import "../styles/Navbar.css";

import { signOut, signIn, useSession, SessionProvider } from 'next-auth/react'
import React, {useState, useEffect} from 'react'
import NavItem from './NavItem.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'  
import {faPerson, faGear, faCoins, faHistory} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from "next/navigation";
import {
  collection,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";
import {  db } from '@/app/HOCS/firebase';
import { onAuthStateChanged } from "firebase/auth";
import { getAuth, signOut as sg } from "firebase/auth";
const auth = getAuth();



const SigninButton = () => {

    const [items, setItems] = useState([]);
    const router = useRouter();
    const {data: session, status} = useSession();
    const [authUser,setauthUser]=useState(auth.currentUser);
    useEffect(()=>{
      const listen=onAuthStateChanged(auth,(user)=>{
        if(user){
          setauthUser(user);
        }
        else{
          setauthUser(null);
        }
      })
    },[]);
    useEffect(() => {
      if (status === "authenticated" && session?.user?.email) {
        const q = query(collection(db, "item"), where("email", "==", session.user.email));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let itemsArr = [];
          querySnapshot.forEach((doc) => {
            itemsArr.push({ ...doc.data(), id: doc.id });
          });
          console.log(itemsArr);
          setItems(itemsArr);
        });
      }

      else if (authUser!=null) {
        const q = query(collection(db, "item"), where("email", "==", authUser.email));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let itemsArr = [];
          querySnapshot.forEach((doc) => {
            itemsArr.push({ ...doc.data(), id: doc.id });
          });
          console.log(itemsArr);
          setItems(itemsArr);
        });
      }

      else{
        console.log(authUser?.email??null)
      }
    }, [status, session,authUser]);

    if(session && session.user)
    {
        return(
            <div className=' fnav flex gap-4 ml-auto text-2xl items-center'>
                  {status === "authenticated" && session?.user && items.length > 0 ? (
                    <div className="credits-info">
                      <p>{items[0].credits} <FontAwesomeIcon icon={faCoins} /> </p>
                      {/* Add more fields from itemsArr as needed */}
                    </div>
                  ) :
                  <div className="credits-info">
                  <p> 0 <FontAwesomeIcon icon={faCoins} /> </p>
                  {/* Add more fields from itemsArr as needed */}
                </div>}
                  <NavItem image = {session.user.image}>
                    <div className='dropdown-menu'>
                      <div className='user-name '>
                      {session.user.name}
                      </div>
                      <div className='user-email '>
                        {session.user.email}
                      </div>
                      <div className='user-tokens '>
                      {status === "authenticated" && session?.user && items.length > 0 ? (
                    <div className="user-tokens ">
                        <p>{items[0].credits} <FontAwesomeIcon icon={faCoins} /> </p>
                        {/* Add more fields from itemsArr as needed */}
                      </div>
                    ) :
                    <div className="user-tokens ">
                    <p> 0 <FontAwesomeIcon icon={faCoins} /> </p>
                    {/* Add more fields from itemsArr as needed */}
                  </div>}
                      </div>
                      <hr/>
                      <div className='menu-item'>
                      <FontAwesomeIcon icon={faGear} /> Settings 
                      </div>
                      <button className='menu-item' onClick={e => router.push('/main/profile')}>
                      <FontAwesomeIcon icon={faPerson} /> Profile 
                      </button>
                      <button className='menu-item' onClick={e => router.push('/main/history')}>
                      <FontAwesomeIcon icon={faHistory} /> Report History
                      </button>
                      <button className='menu-item' onClick={e => router.push('/main/token')}>
                      <FontAwesomeIcon icon={faCoins} /> Purchase Tokens
                      </button>
                      
                      <button className='menu-item' onClick={() => signOut()}>
                        <div className='main-signout-button'>
                          Sign out
                        </div>
                      </button>
                      
                    </div>
                  </NavItem>
            </div>
        )
    }
    else if(authUser!=null)
    {
        return(
            <div className=' fnav flex gap-4 ml-auto text-2xl items-center'>
                  { items.length > 0 ? (
                    <div className="credits-info">
                      <p>{items[0]?.credits} <FontAwesomeIcon icon={faCoins} /> </p>
                      {/* Add more fields from itemsArr as needed */}
                    </div>
                  ) :
                  <div className="credits-info">
                  <p> 0 <FontAwesomeIcon icon={faCoins} /> </p>
                  {/* Add more fields from itemsArr as needed */}
                </div>}
                  <NavItem image = {""}>
                    <div className='dropdown-menu'>
                      <div className='user-name '>
                      {items[0]?.name}
                      </div>
                      <div className='user-email '>
                        {authUser.email}
                      </div>
                      <div className='user-tokens '>
                      {authUser&&items.length > 0 ? (
                    <div className="user-tokens ">
                        <p>{items[0]?.credits} <FontAwesomeIcon icon={faCoins} /> </p>
                        {/* Add more fields from itemsArr as needed */}
                      </div>
                    ) :
                    <div className="user-tokens ">
                    <p> 0 <FontAwesomeIcon icon={faCoins} /> </p>
                    {/* Add more fields from itemsArr as needed */}
                  </div>}
                      </div>
                      <hr/>
                      <div className='menu-item'>
                      <FontAwesomeIcon icon={faGear} /> Settings 
                      </div>
                      <button className='menu-item' onClick={e => router.push('/main/profile')}>
                      <FontAwesomeIcon icon={faPerson} /> Profile 
                      </button>
                      <button className='menu-item' onClick={e => router.push('/main/history')}>
                      <FontAwesomeIcon icon={faHistory} /> Report History
                      </button>
                      <button className='menu-item' onClick={e => router.push('/main/token')}>
                      <FontAwesomeIcon icon={faCoins} /> Purchase Tokens
                      </button>
                      
                      <button className='menu-item' onClick={() => sg(auth).then(()=>{router.push("/main")}).catch((error)=>{console.log(error)})}>
                        <div className='main-signout-button'>
                          Sign out
                        </div>
                      </button>
                      
                    </div>
                  </NavItem>
            </div>
        )
    }
  else{
  return (
    <button className='ml-auto' onClick={e => router.push('/main/login')}>
      <div className='button-34 main-signin-button'>
        Sign In
      </div>
    </button>
  )
}}

export default SigninButton
