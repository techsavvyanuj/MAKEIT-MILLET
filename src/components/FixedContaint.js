import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const FixedContaint = () => {
  const navigate = useNavigate();
  const form = () => {
    navigate("/contact");
  };

  return (
    <div>
      {/* <button class="blue-btn" onClick={form}>Contact</button> */}
      <div className="social-media-buttons-container">
        <Link className="social-media-button btn-square me-3" to="">
          <i className="fab fa-facebook-f"></i>
        </Link>
        <Link className="social-media-button btn-square me-3" style={{marginTop:'8px'}} to="">
          <i className="fab fa-twitter"></i>
        </Link>
        <Link className="social-media-button btn-square me-3" style={{marginTop:'8px'}} to="">
          <i className="fab fa-instagram"></i>
        </Link>
        <Link className="social-media-button btn-square" style={{marginTop:'8px'}} to="">
          <i className="fab fa-linkedin-in"></i>
        </Link>
      </div>
    </div>
  );
};

export default FixedContaint;
