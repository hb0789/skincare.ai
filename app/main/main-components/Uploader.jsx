import React, { useState, useRef } from "react";
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

      setDiseaseData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      // Clear the input field using the ref
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
