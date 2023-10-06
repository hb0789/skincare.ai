import React from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link
            activeClass="active"
            to="<Main>"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            Section 1
          </Link>
        </li>
        <li className="navbar-item">
          <Link
            activeClass="active"
            to="section2"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            Section 2
          </Link>
        </li>
        <li className="navbar-item">
          <Link
            activeClass="active"
            to="section3"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            Section 3
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
