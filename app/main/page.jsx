"use client"
import React, { useState, useEffect } from 'react';
import "./styles/Navbar.css";
import "./styles/Main.css";
import Navbar from './main-components/Navbar';
import Body from './main-components/Body';
import { useSession } from 'next-auth/react';
import {
  collection,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../HOCS/firebase";

export default function Page() {
  const { data: session, status } = useSession();
  const [items, setItems] = useState([]);

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

  return (
    <div className='app-background'>
      <Navbar />
      <Body />
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
  );
}
