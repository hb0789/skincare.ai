"use client"

import React, {useEffect, useState} from 'react'
import Navbar from '../main-components/Navbar'
import "../styles/Main.css";
import "../styles/Navbar.css";
import "./styles/profile.css"
import { useSession} from 'next-auth/react';
import {
    collection,
    query,
    onSnapshot,
    where,
  } from "firebase/firestore";
import { db } from '@/app/HOCS/firebase';
import { onAuthStateChanged } from "firebase/auth";
import { getAuth, signOut as sg } from "firebase/auth";

const auth = getAuth();

const Page = () => {
    const { data: session, status } = useSession();
    const [items, setItems] = useState([]);
    const [profilePhoto, setProfilePhoto] = useState("");
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

    }, [status, session,authUser]);
    
  
    useEffect(() => {
      if (session?.user?.image) {
        const modifiedImage = session.user.image.replace("s96-c", "s384-c", true);
        setProfilePhoto(modifiedImage);
      }
    }, [session]);
    
    if(session){
    return (
     
        
      <div className='prof app-background'>
        <Navbar />
        <div className='profile-left'>
          {profilePhoto && <img className='profile-photo-main' src={profilePhoto}/>}
          <div className='profile-name-div'>
            {session?.user?.name}
          </div>
          <div className='profile-email-div'>
            {session?.user?.email}
          </div>
          {status === "authenticated" && session?.user && items.length > 0 ? (
        <div className="user-info">
          <h2>User Information</h2>
          <p>Name: {items[0].name}</p>
          <p>Email: {items[0].email}</p>
          <p>Age: {items[0].age}</p>
          {/* Add more fields from itemsArr as needed */}
        </div>
      ) : null}
        </div>
      </div>
      
    )
  }
  else if(authUser){
    return (
     
        
      <div className='prof app-background'>
        <Navbar />
        <div className='profile-left'>
           <img className='profile-photo-main' src="../avatar.png" alt='no image uploaded'/>
          <div className='profile-name-div'>
            {items[0]?.name}
          </div>
          <div className='profile-email-div'>
            {items[0]?.email}
          </div>
          {items.length > 0 ? (
        <div className="user-info">
          <h2>User Information</h2>
          <p>Name: {items[0]?.name}</p>
          <p>Email: {items[0]?.email}</p>
          <p>Age: {items[0]?.age}</p>
          {/* Add more fields from itemsArr as needed */}
        </div>
      ) : null}
        </div>
      </div>
      
    )
  }
  else{
    return (
     
        
      <div className='prof app-background'>
        <Navbar />
        <div>
          <h1>We ran into some issue .... </h1>
        </div>
      </div>
      
    )
  }
  }
  export default Page;
  
