"use client";
import "../styles/Signin.css";


import { signOut, signIn, useSession, SessionProvider } from 'next-auth/react'
import React, {useState, useEffect} from 'react'
import NavItem from './NavItem.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'  
import {faPerson, faGear, faCoins} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from "next/navigation";
import {
  collection,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from '@/app/HOCS/firebase';




const SigninButton = () => {

    const [items, setItems] = useState([]);
    const router = useRouter();
    const {data: session, status} = useSession();
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
    }, [status, session]);
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
                      <div className='user-name'>
                      {session.user.name}
                      </div>
                      <div className='user-email'>
                        {session.user.email}
                      </div>
                      <div className='user-tokens'>
                      {status === "authenticated" && session?.user && items.length > 0 ? (
                    <div className="user-tokens">
                        <p>{items[0].credits} <FontAwesomeIcon icon={faCoins} /> </p>
                        {/* Add more fields from itemsArr as needed */}
                      </div>
                    ) :
                    <div className="credits-info">
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
                      <button className='menu-item' onClick={e => router.push('/main/token')}>
                      <FontAwesomeIcon icon={faCoins} /> Purchase Tokens
                      </button>
                      <div>
                      <button onClick={() => signOut()}>
                        <div className='main-signout-button'>
                          Sign out
                        </div>
                      </button>
                      </div>
                    </div>
                  </NavItem>
            </div>
        )
    }
  return (
    <button className='ml-auto' onClick={() => signIn()}>
      <div className='button-34 main-signin-button'>
        Sign In
      </div>
    </button>
  )
}

export default SigninButton
