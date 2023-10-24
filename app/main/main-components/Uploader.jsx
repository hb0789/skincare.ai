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
            <img src={image} height="200px" width="200px" alt="Uploaded" />
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
                  <>
                    {fileName}{" "}
                    <FontAwesomeIcon
                      onClick={() => {
                        setFile(null);
                        setDiseaseData(null);
                      }}
                      icon={faTrashCan}
                    />
                    <br />
                    <button className="uploader-submit" onClick={getDisease}>
                      Submit
                    </button>
                  </>
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
