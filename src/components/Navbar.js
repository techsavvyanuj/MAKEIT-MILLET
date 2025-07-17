import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth(); // Destructure the logout function from useAuth
  const navigate = useNavigate();

  const LogOut = async () => {
    if (window.confirm("Confirm You Want to Log Out")) {
      await localStorage.removeItem("token");
      logout();
      navigate("/");
    }
  };
  useEffect(() => {
    //  console.log("Hello")
  }, [isLoggedIn]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 px-lg-5 py-3 py-lg-0">
      <img
        src="img/logomi.png"
        alt="MAKEIT Logo"
        className="responsive-img"
        style={{height: "120px", width: "auto"}}
      />

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="fa fa-bars"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarCollapse">
        {isLoggedIn ? (
          <>
            <div className="navbar-nav ms-auto py-0 pe-4">
              <Link to="/" className="nav-item nav-link active">
                Home
              </Link>
              <Link to="/about" className="nav-item nav-link">
                About
              </Link>
              <Link to="/shop" className="nav-item nav-link">
                Shop
              </Link>
              <Link to="/contact" className="nav-item nav-link">
                Contact Us
              </Link>
            </div>
            <div className="nav-item dropdown">
              <Link
                to="/table"
                className="nav-link dropdown-toggle btn btn-primary py-2 px-4"
                data-bs-toggle="dropdown"
              >
                AdminPanel
              </Link>
              <div className="dropdown-menu m-0">
                <Link to="/table" className="dropdown-item">
                  Inquiry List
                </Link>

                <Link to="/add-product" className="dropdown-item">
                  Add Product
                </Link>
                <Link to="/productlist" className="dropdown-item">
                  Product List
                </Link>
                <Link
                  style={{ marginLeft: "14px" }}
                  className="btn btn-dark"
                  onClick={LogOut}
                >
                  Logout
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="navbar-nav ms-auto py-0 pe-4">
              <Link to="/" className="nav-item nav-link active">
                Home
              </Link>
              <Link to="/about" className="nav-item nav-link">
                About
              </Link>
              <Link to="/shop" className="nav-item nav-link">
                Shop
              </Link>
              <Link to="/contact" className="nav-item nav-link">
                Contact Us
              </Link>
            </div>
            <Link to="/contact" className="btn btn-primary py-2 px-4">
              Inquiry
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
