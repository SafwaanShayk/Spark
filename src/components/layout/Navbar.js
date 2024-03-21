import React from "react";
import "./navbar.css";
const Navbar = ({ homeRef, featuresRef, GuideRef }) => {
  const scrollToSection = (elementRef) => {
    const navbarHeight = document.querySelector("header").offsetHeight; // Get the height of the fixed navbar
    const offsetTop = elementRef.current.offsetTop - navbarHeight; // Subtract the navbar height from the target element's offsetTop
    window.scroll({
      top: offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <div className="container-fluid">
      <header className="d-flex flex-wrap justify-content-center py-2 mb-1 ">
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <span className="fs-4">Simple header</span>
        </a>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a
            href="/#"
              onClick={() => scrollToSection(homeRef)}
              className="nav-link"
              aria-current="page"
            >
              Home
            </a>
          </li>
          <li className="nav-item">
            <a
            href="/#"
              onClick={() => scrollToSection(featuresRef)}
              className="nav-link"
            >
              Features
            </a>
          </li>
          <li className="nav-item">
            
            <a href="/#" onClick={() => scrollToSection(GuideRef)} className="nav-link">
              Guide
            </a>
          </li>
        </ul>
        <button type="button" className="btn btn-outline-primary me-2">
          Login
        </button>
        <button type="button" className="btn  btn-outline-primary me-2">
          Sign-up
        </button>
      </header>
    </div>
  );
};

export default Navbar;
