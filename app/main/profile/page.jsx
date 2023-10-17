"use client"

import React, {useEffect, useState} from 'react'
import Navbar from '../main-components/Navbar'
import "../styles/Main.css";
import "../styles/Navbar.css";
import { useSession} from 'next-auth/react';
import {
    collection,
    query,
    onSnapshot,
    where,
  } from "firebase/firestore";
import { db } from '@/app/HOCS/firebase';

const Page = () => {
    const { data: session, status } = useSession();
    const [items, setItems] = useState([]);
    const [profilePhoto, setProfilePhoto] = useState("");
  
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
  
    useEffect(() => {
      if (session?.user?.image) {
        const modifiedImage = session.user.image.replace("s96-c", "s384-c", true);
        setProfilePhoto(modifiedImage);
      }
    }, [session]);
  
    return (
      <div className='app-background'>
        <Navbar />
        <div className='profile-left'>
          {profilePhoto && <img className='profile-photo-main' src={profilePhoto} alt="Profile Photo" />}
        </div>
      </div>
    )
  }
  
  export default Page;
  