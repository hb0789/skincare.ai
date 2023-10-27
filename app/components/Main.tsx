import React from "react";
import { Inter } from "next/font/google";
import { Parallax, Background } from "react-parallax";
import BackgroundPhoto from "../media/download.png";
import "../Style/MainStyle.css";
import { motion } from 'framer-motion'
import { useRouter } from "next/navigation";
const inter = Inter({
  subsets: ["latin"],
  weight: "400",
});

export default function Main() {
  const router=useRouter();
  const imageUrl = BackgroundPhoto.src;
  return (
    <Parallax
      className="home-background" 
      bgImage={imageUrl}
      bgClassName="home-background"
      strength={600}
    >      
      <div className="home-title">
      <motion.div
      initial={{ y: -50, opacity: 0, scale: 1 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0,
        ease: [0.43, 0.9, 0.23, 0.96]
      }}>
        Skincare.ai <br />
        
        <div className="home-description ">
          Worried about skin issues?
          
          <br />
        </div>
        </motion.div>
        <br />
      </div>
      <div className="home-button-div">
      <motion.div
      initial={{ y: -50, opacity: 0, scale: 1 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0,
        ease: [0.43, 0.9, 0.23, 0.96]
      }}>
        <button className="home-button " onClick={e => router.push('/main')}>Get started →</button>
      
        </motion.div>
      </div>
    </Parallax>
  );
}
