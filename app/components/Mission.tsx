import React from "react";
import "../Style/Experts.css";
import { Parallax, Background } from "react-parallax";
import BackgroundPhoto from "../media/download-vertical.png";
import "../Style/MainStyle.css";
import "../Style/ServiceStyles.css";


export default function Mission() {
  const imageUrl = BackgroundPhoto.src;
  return (
    <>
      <div className="mission-main">
      <div className="mission-left">
          <Parallax
            className="experts-background"
            bgImage={imageUrl}
            bgClassName="experts-background"
            strength={400}
          ></Parallax>
        </div>
        <div className="mission-right">
          <div className={"poppins.className expert-title"}>
            OUR MISSION <br />
          </div>
          <div className="expert-description">Changing and saving millions of lives</div>
          <div className="expert-text">
          Our mission is to emphasize the vital significance of early detection when it comes to skin diseases. We firmly believe that being proactive about your skin health can save lives and reduce healthcare costs. Recognizing the signs and symptoms early not only helps individuals by ensuring timely medical intervention but also eases the burden on our healthcare system.
            <br/><br/><br/>
            At Skincare.ai, we strive to make understanding the importance of early diagnosis accessible to everyone. By fostering awareness and encouraging regular check-ups, we aim to create a community where individuals are empowered to take charge of their health. We understand the emotional challenges that come with dealing with skin conditions, and our mission extends to providing not just medical guidance but also a supportive environment.
             </div>
        </div>

      </div>
    </>
  );
}
