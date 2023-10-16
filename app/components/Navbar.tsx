"use client";
import React, { useState, useEffect } from "react";
import "../Style/Navbar.css";

const scrollToSection = (sectionId: string) => {
  const section = document.querySelector(`#${sectionId}`);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [nav, setNav] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const navChange = () => {
    if (window.scrollY >= 80) {
      setNav(true);
    } else {
      setNav(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", navChange);
  }, []);

  return (
    <nav
      className={
        nav
          ? "bg-white border-gray-200 dark:bg-blue-100 fixed top-0 w-full z-10 nav-style"
          : "bg-white border-gray-200 dark:bg-blue-100 fixed top-0 w-full z-10 nav-style active"
      }
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center">
          <span
            className={
              nav
                ? "self-center text-2xl font-semibold whitespace-nowrap dark:text-blue-400 title-style"
                : "self-center text-2xl font-semibold whitespace-nowrap dark:text-blue-400"
            }
          >
            NEURALNEXUS
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-blue-200 "
          aria-controls="navbar-default"
          aria-expanded={isMobileMenuOpen}
          onClick={toggleMobileMenu}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul
            className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-blue-200 md:dark:bg-transparent "
            onClick={toggleMobileMenu}
          >
            <li>
              <a
                className={nav ? "block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-blue-500 md:dark:hover:text-gray-900 md:dark:text-white" : "block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-blue-500 md:dark:hover:text-gray-900 md:dark:text-blue-500"}
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
            <a
                className={nav ? "block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-blue-500 md:dark:hover:text-gray-900 md:dark:text-white" : "block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-blue-500 md:dark:hover:text-gray-900 md:dark:text-blue-500"}
                aria-current="page"
              >                About
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  scrollToSection("services");
                  e.preventDefault();
                }}
                className={nav ? "block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-blue-500 md:dark:hover:text-gray-900 md:dark:text-white" : "block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-blue-500 md:dark:hover:text-gray-900 md:dark:text-blue-500"}
              >
                Services
              </a>
            </li>
            <li>
              <a className={nav ? "block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-blue-500 md:dark:hover:text-gray-900 md:dark:text-white" : "block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-blue-500 md:dark:hover:text-gray-900 md:dark:text-blue-500"}>
                Testimonials
              </a>
            </li>
            <li>
              <a className={nav ? "block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-blue-500 md:dark:hover:text-gray-900 md:dark:text-white" : "block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-blue-500 md:dark:hover:text-gray-900 md:dark:text-blue-500"}>                Client
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  scrollToSection("foot");
                  e.preventDefault();
                }}
                className={nav ? "block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-blue-500 md:dark:hover:text-gray-900 md:dark:text-white" : "block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-blue-500 md:dark:hover:text-gray-900 md:dark:text-blue-500"}

              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
