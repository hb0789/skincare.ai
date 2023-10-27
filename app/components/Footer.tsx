import React from "react";
import { Inter } from "next/font/google";
import { Parallax, Background } from "react-parallax";
import BackgroundPhoto from "../media/footer.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "../Style/MainStyle.css";
import "../Style/Footer.css";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ContactForm from '../utils/ContactForm'

const inter = Inter({
  subsets: ["latin"],
  weight: "400",
});

export default function Main() {
  const router = useRouter();
  const imageUrl = BackgroundPhoto.src;
  return (
    <Parallax
      className="footer-background"
      bgImage={imageUrl}
      bgClassName="footer-background"
      strength={600}
    >
      <div className="footer-main">
        <div className="footer-left">
          <div className="footer-title">
            CONTACT <br />
          </div>
          <div className="footer-description">Let&apos;s Work Together</div>
          <div className="footer-text">
            Team Neural Nexus <br />
            neuralnexus10@gmail.com <br />
            +91 98765 43210 <br />
            <div className="footer-brands">
              <div className="footer-brand-item">
                <FontAwesomeIcon icon={faLinkedin} />
              </div>
              <div className="footer-brand-item">
                <FontAwesomeIcon icon={faTwitter} />
              </div>
              <div className="footer-brand-item">
                <FontAwesomeIcon icon={faFacebook} />
              </div>
              <div className="footer-brand-item">
                <FontAwesomeIcon icon={faInstagram} />
              </div>
            </div>
          </div>
        </div>
        <div className="footer-left">
          <div className="footer-title">
            THE TEAM <br />
          </div>
          <div className="footer-text">
            Hardik Bhatia <br />
            Arshlaan Siddiquie <br />
            Mridul Jain <br />
            Somil Agarwal <br />
            Sahil Murhekar <br />
            Sweta Soundarya Das <br />
          </div>
        </div>
      </div>
    </Parallax>
  );
}
