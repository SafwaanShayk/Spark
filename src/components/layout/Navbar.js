import React from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="container-fluid">
      <header className="d-flex flex-wrap justify-content-center py-2 mb-1 ">
        <Link
          to={{ pathname: "/", hash: "#home" }}
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <span className="fs-4">
            <img
              src={require("../../images/SparkLogo.svg").default}
              alt=""
              srcSet=""
              width="100px"
              style={{ position: "absolute", marginTop: "-50px" }}
            />
          </span>
        </Link>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link
              to={{ pathname: "/", hash: "#home" }}
              className="nav-link"
              aria-current="page"
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={{ pathname: "/", hash: "#features" }}
              className="nav-link"
            >
              Features
            </Link>
          </li>
          <li className="nav-item">
            <Link to={{ pathname: "/", hash: "#steps" }} className="nav-link">
              Guide
            </Link>
          </li>

          <li>
            <Link>
              Get Started <i className="bi bi-arrow-right"></i>
            </Link>
          </li>
        </ul>
        <button
          onClick={handleLogin}
          type="button"
          className="btn btn-outline-primary me-2"
        >
          Login
        </button>
        <button
          onClick={handleRegister}
          type="button"
          className="btn  btn-outline-primary me-2"
        >
          Sign-up
        </button>
      </header>
    </div>
  );
};

export default Navbar;
