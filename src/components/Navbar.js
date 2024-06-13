import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
  useEffect(()=>{
      //  console.log("Hello")
  },[isLoggedIn])
 
  return (
    <div className="container-xxl position-relative p-0">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 px-lg-5 py-3 py-lg-0">
      <img src="img/[removal.ai]_87d2665f-1390-472d-8c1b-74852e3b0057-prashil-exports-logo-op1-png_page-0001.png" alt="Logo" className="responsive-img" />
 
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="fa fa-bars"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarCollapse">
         
          {isLoggedIn ? (<>
            <div className="navbar-nav ms-auto py-0 pe-4">
            <Link to="/" className="nav-item nav-link active">Home</Link>
            <Link to="/about" className="nav-item nav-link">About</Link>
            <Link to="/segments" className="nav-item nav-link">Segments</Link>
            <Link to="/product" className="nav-item nav-link">Product</Link>
            <Link to="/contact" className="nav-item nav-link">Contact</Link>
          </div>
            <div className="nav-item dropdown">
              <Link to="/table" className="nav-link dropdown-toggle btn btn-primary py-2 px-4" data-bs-toggle="dropdown">AdminPanel</Link>
              <div className="dropdown-menu m-0">
                <Link to="/table" className="dropdown-item">Inquiry List</Link>
                
                <Link to="/add-product" className="dropdown-item">Add Product</Link>
                <Link to="/productlist" className="dropdown-item">Product List</Link>
                <Link style={{marginLeft:'14px'}} className="btn btn-dark" onClick={LogOut}>Logout</Link>
              </div>
             
            </div>
           </>
          ) : (<>
           
            <div className="navbar-nav ms-auto py-0 pe-4">
             <Link to="/" className="nav-item nav-link active">Home</Link>
             <Link to="/about" className="nav-item nav-link">About</Link>
             <Link to="/segments" className="nav-item nav-link">Segments</Link>
             <Link to="/product" className="nav-item nav-link">Product</Link>
             <Link to="/contact" className="nav-item nav-link">Contact</Link>
           </div>
           <Link to="/contact" className='btn btn-primary py-2 px-4'>Inquiry</Link>
            </> )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
