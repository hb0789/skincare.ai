import React from 'react';
import "../Style/Footer.css";
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
         
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>Email: neuralnexus@gmail.com</p>
            <p>Phone: +91 00000000</p>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <ul className="social-media">
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook">
                    <img src="./facebook.svg" alt="facebook" />
                  </i>
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"><img src="./twitter.svg" alt="twitter" /></i>
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"><img src="./insta.svg" alt="instagram" /></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} Neural Nexus. All rights reserved.</p>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;
