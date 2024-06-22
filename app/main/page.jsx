"use client";
import React, { useState, useEffect } from "react";
import "./styles/Navbar.css";
import "./styles/Main.css";
import Navbar from "./main-components/Navbar";
import { useSession } from "next-auth/react";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Uploader from "./main-components/Uploader";
import { db } from "../HOCS/firebase";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import InstructionsCard from "./main-components/InstructionsCard";

export default function Page() {
  const { data: session, status } = useSession();
  const [items, setItems] = useState([]);
  const steps = [
    "Take a clear photo of the affected area in good lighting",
    "Navigate to the photo and upload it to the adjacent box",
    "Wait for your diagnosis to appear in your report history",
  ];

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
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No files selected");
  return (
    <div className="app-background">
      <Navbar />
      <div className="spacing"></div>
      <div className="page-content">
        <div className="instructions">
          <InstructionsCard title="How does it work?" steps={steps} />
          <div className="instructions frame-card">
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/F1yWJorSp--kGP8l2hXUB"
              frameBorder="1"
              width="100%"
              height="500px"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="uploader-container frame-card">
          <Uploader />
        </div>
      </div>
    </div>
  );
}
