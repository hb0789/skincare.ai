  import React, { useState, useRef, useEffect } from "react";
  import { signOut, signIn, useSession, SessionProvider } from 'next-auth/react'
  import { serverTimestamp } from "firebase/firestore";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
  import axios from "axios";
  import "../styles/Main.css";
  import {
    Timestamp,
    collection,
    addDoc,
    query,
    onSnapshot,
    deleteDoc,
    doc,
    where,
  } from "firebase/firestore";
  import { db } from "@/app/HOCS/firebase";

  export default function Uploader() {
    const [items, setItems] = useState([]);
    const {data: session, status} = useSession();
    useEffect(() => {
      if (status === "authenticated" && session?.user?.email) {
        const q = query(collection(db, "session"), where("email", "==", session.user.email));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let itemsArr = [];
          querySnapshot.forEach((doc) => {
            itemsArr.push({ ...doc.data(), id: doc.id });
          });
          setItems(itemsArr);
        });
      }
    }, [status, session]);

    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState("No files selected");
    const [diseaseData, setDiseaseData] = useState(null);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null); // Create a ref for the input element

    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        const newFile = new File([selectedFile], selectedFile.name, {
          type: selectedFile.type,
        });
        setFileName(selectedFile.name);
        setFile(newFile);
        setImage(URL.createObjectURL(selectedFile));
        event.target.value = null;
      }
    };

    const getDisease = async () => {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
    
      try {
        const response = await axios.post(
          "http://localhost:8000/classify/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
    
        const diseaseData = response.data;
        console.log(diseaseData);
    
        if (session && session.user && diseaseData.prediction) {
          const { email } = session.user;
          const sid = Date.now(); // Generate a numerical ID using the current timestamp, and rename it to "sid"
          const timestamp = serverTimestamp(); // Firestore server timestamp
    
          const dataToAdd = {
            email,
            disease: diseaseData.prediction, // Assuming diseaseData.prediction contains only the name of the disease
            sid, // Rename "id" to "sid"
            timestamp: Timestamp.fromDate(new Date()), // Convert JavaScript Date to Firestore Timestamp
          };
    
          // Add the data to the Firestore collection
          await addDoc(collection(db, "session"), dataToAdd);
    
          // Update the local state with the new item
          setItems((prevItems) => [...prevItems, dataToAdd]);
        }
    
        setDiseaseData(diseaseData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        inputRef.current.value = "";
      }
    };
    
    return (
      <>
        <div className="spacing"></div>
        <div className="uploader-main">
          <form
            className="uploader"
            onClick={() => document.querySelector(".input-image").click()}
          >
            <input
              type="file"
              accept="image/*"
              className="input-image"
              hidden
              onChange={handleFileChange}
              ref={inputRef} // Assign the ref to the input element
            />

            {file ? (
              <img src={image} height="500px" width="500px" alt="Uploaded" />
            ) : (
              <div className="uploader-placeholder">Upload here!</div>
            )}
          </form>
          <section>
            <span>
              {file ? (
                <span className="uploader-button">
                  {loading ? (
                    <div className="loader"></div>
                  ) : (
                    <div className="uploader-details">
                      {fileName}{" "}
                      <FontAwesomeIcon
                        onClick={() => {
                          setFile(null);
                          setDiseaseData(null);
                          setImage(null);
                          setFileName(null);
                        }}
                        icon={faTrashCan}
                      />
                      <br />
                      <button className="uploader-submit" onClick={getDisease}>
                        Submit
                      </button>
                    </div>
                  )}
                  {diseaseData && (
                    <div className="disease-data">
                      <h2>Disease Classification</h2>
                      <p>{diseaseData.prediction}</p>
                      <p>{diseaseData.accuracy}</p>
                    </div>
                  )}
                </span>
              ) : (
                ""
              )}
            </span>
          </section>
        </div>
      </>
    );
  }
