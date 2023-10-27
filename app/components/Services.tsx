import React from "react";
import { Poppins } from "next/font/google";
import Card from "../utils/Card";
import AI from "../media/AI.png";
import doctor from "../media/doctor.jpg";
import bot from "../media/bot.jpg";
import "../Style/ServiceStyles.css";
import { motion } from "framer-motion";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export default function Services() {
  const AIurl = AI.src;
  const docurl = doctor.src;
  const boturl = bot.src;
  return (
    <div className="service-main" id="services">
      <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 0.3,
            ease: [0, 0.5, 0.2, 1.01],
          }}
          variants={{
            visible: { opacity: 1, scale: 1 },
            hidden: { opacity: 0, scale: 1 },
          }}
        >
      <div className={"poppins.className service-title"}>
        SERVICES <br />
      </div>
      <div className={"service-description"}>
        Introducing the next generation <br /> of skin care
      </div>
      </motion.div>
      <br />
      <div className="service-box-main">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 0.3,
            ease: [0, 0.5, 0.2, 1.01],
          }}
          variants={{
            visible: { x: 0, opacity: 1, scale: 1 },
            hidden: { x: -100, opacity: 0, scale: 1 },
          }}
        >
          <Card
            title="AI skin analysis"
            description="Use state of the art AI technology to get an early diagnosis."
            img={AIurl}
          />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 0.3,
            ease: [0, 0.5, 0.2, 1.01],
          }}
          variants={{
            visible: { y: 0, opacity: 1, scale: 1 },
            hidden: { y: 100, opacity: 0, scale: 1 },
          }}
        >
        <Card
          title="Consult doctors"
          description="Need an expert opinion? We got you covered."
          img={docurl}
        />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 0.3,
            ease: [0, 0.5, 0.2, 1.01],
          }}
          variants={{
            visible: { x: 0, opacity: 1, scale: 1 },
            hidden: { x: 100, opacity: 0, scale: 1 },
          }}
        >
          <Card
            title="Get recommendations"
            description="Have any questions? SkinBot will help you out. Any time, for free."
            img={boturl}
          />
        </motion.div>
      </div>
    </div>
  );
}
