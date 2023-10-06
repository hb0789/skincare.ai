import React from "react";
import { Poppins } from "next/font/google";
import Card from "../utils/Card";
import AI from "../media/AI.png";
import doctor from "../media/doctor.jpg";
import bot from "../media/bot.jpg";
import Numbers from "./Numbers";
import "../Style/ServiceStyles.css";
const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export default function Services() {
  const AIurl = AI.src;
  const docurl = doctor.src;
  const boturl = bot.src;
  return (
    <div className="service-main"  id="services">
      <div className={"poppins.className service-title"}>
        SERVICES <br />
      </div>
      <div className={"service-description"}>
        Taking skincare to the <br /> next level
      </div>
      <br />
      <div className="service-box-main">
        <Card
          title="AI skin analysis"
          description="Use state of the art AI technology to get an early diagnosis."
          img={AIurl}
        />
        <Card
          title="Consult doctors"
          description="Need an expert opinion? We got you covered."
          img={docurl}
        />
        <Card
          title="Get recommendations"
          description="Have any questions? SkinBot will help you out. Any time, for free."
          img={boturl}
        />
      </div>
    </div>
  );
}
