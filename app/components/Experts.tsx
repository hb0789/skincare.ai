import React from "react";
import "../Style/Experts.css";
import { Parallax, Background } from "react-parallax";
import BackgroundPhoto from "../media/download-vertical.png";
import "../Style/MainStyle.css";
import "../Style/ServiceStyles.css";
import ContactForm from "./ContactForm";

export default function Experts() {
  const imageUrl = BackgroundPhoto.src;
  return (
    <>
      <div className="experts-main">
        <div className="experts-left">
          <div className={"poppins.className expert-title"}>
            ABOUT <br />
          </div>
          <div className="expert-description">Our Experts are the Finest</div>
          <div className="expert-text">
            Our dermatology experts are truly the finest in their field, setting
            the standard for excellence in skin care and treatment. With years
            of rigorous training, extensive clinical experience, and a deep
            passion for dermatology, they bring a wealth of knowledge and
            expertise to every patient they serve. <br/>​ <br/>They stay at the forefront
            of medical advancements, utilizing cutting-edge technologies and
            innovative treatments to address a wide spectrum of skin concerns.
            What truly sets them apart, however, is their unwavering commitment
            to personalized patient care. <br/><br/>​ They take the time to listen,
            understand individual needs, and develop tailored treatment plans
            that prioritize both skin health and aesthetic goals.
          </div>
        </div>
        <div className="experts-right">
          <Parallax
            className="experts-background"
            bgImage={imageUrl}
            bgClassName="experts-background"
            strength={400}
          >
          <ContactForm/>
          </Parallax>
        </div>
      </div>
    </>
  );
}
