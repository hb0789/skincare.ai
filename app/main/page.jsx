"use client";
import React, { useState, useEffect } from "react";
import "./styles/Navbar.css";
import "./styles/Main.css";
import Navbar from "./main-components/Navbar";
import { useSession } from "next-auth/react";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'  
import Uploader from "./main-components/Uploader"
import { db } from "../HOCS/firebase";
import {faDeleteLeft} from '@fortawesome/free-solid-svg-icons'

export default function Page() {
  const { data: session, status } = useSession();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      const q = query(
        collection(db, "item"),
        where("email", "==", session.user.email)
      );
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
  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState("No files selected")
  return (
    <div className="app-background">
      <Navbar />
      <Uploader/>
    </div>
  );
}
