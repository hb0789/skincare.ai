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
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No files selected");
  return (
    <div className="app-background">
      <Navbar />
      <div className="spacing"></div>
      <div className="page-content">
        <div className="instructions">
          <h1>How to Use the Uploader</h1>
          <p>
            Follow these steps to upload your image for disease classification:
          </p>
          <ol>
            <li>
              Click on the upload area or drag and drop your image file into the
              designated area.
            </li>
            <li>
              The uploader accepts images in common formats such as JPG, PNG,
              and GIF.
            </li>
            <li>
              Ensure the image is clear, well-lit, and centered around the area
              of interest.
            </li>
            <li>
              Wait for the upload to complete. You will ll see a preview of your
              uploaded image.
            </li>
            <li>
              Click the Submit button to initiate the disease classification
              process.
            </li>
            <li>
              Once processed, the results will be displayed below the upload
              area.
            </li>
          </ol>
          <h2>Best Practices</h2>
          <ul>
            <li>
              Use high-quality images for accurate disease classification.
            </li>
            <li>Avoid uploading copyrighted or sensitive material.</li>
            <li>Double-check your image selection before submitting.</li>
            <li>
              For optimal results, use images with a single, well-defined object
              or area of interest.
            </li>
          </ul>
        </div>
        <div className="uploader-container">
          <Uploader />
        </div>
      </div>
    </div>
  );
}
