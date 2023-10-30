import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../styles/Main.css";

export default function Uploader() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No files selected");
  const [diseaseData, setDiseaseData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getDisease = async () => {
    setLoading(true); // Set loading state to true

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

      setDiseaseData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };

  return (
    <>
      <div className="spacing"></div>
      <div className="setter">
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
            onChange={({ target: { files } }) => {
              if (files && files[0]) {
                setFileName(files[0].name);
                setFile(files[0]);
                setImage(URL.createObjectURL(files[0]));
              }
            }}
          />

          {file ? (
            <img className="im" src={image} height="200px" width="200px" alt="Uploaded" />
          ) : (
            <div className="uploader-placeholder">Add/Drag your skin image here!</div>
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
                    <div className="filename">{fileName}{" "}</div>
                    <div className="dustbin"><FontAwesomeIcon 
                      onClick={() => {
                        setFile(null);
                        setDiseaseData(null);
                      }}
                      icon={faTrashCan}
                    /></div>
                    <br />
                    {/* <button className="btnupload" onClick={getDisease}>
                      Submit
                    </button> */}
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
        <button className="btnupload" onClick={getDisease}>Get Analysis</button>
      </div>
        <div className="second">
          <h1 className="tex">lorem ipmsin</h1>
          <div>
            <h1>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis facere in mollitia nesciunt pariatur deleniti. Deleniti, repellat. Qui reprehenderit sequi autem quasi rerum aperiam enim fugiat veritatis, adipisci quo nostrum? Lorem ipsum dolor sit amet consectetur adipisicing elit. In deleniti facere ex quos adipisci, incidunt ab dolorem minus eveniet at enim nam rerum nulla, blanditiis debitis saepe, dolores quasi iste. Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore blanditiis consectetur beatae minima sandae itaque, numquam, eum amet quam!</h1>
          </div>
          <button className="btnupload">More Details</button>
        </div>

      </div>
    </>
  );
}
