import axios from "axios";
import React, { useState } from "react";

export const Contact = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Check if form is valid
    const obj = {
      name: name,
      contactno: number,
      email: email,
      message: message,
    };
    try {
      const response = await axios.post(
        "https://spices-2jcs.onrender.com/contactus",
        obj
      );
      if (response) {
        setName("");
        setNumber("");
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      console.log("something is wrong ", error);
    }
  };

  const validateForm = () => {
    if (!name.trim() || !number.trim() || !email.trim() || !message.trim()) {
      alert("All fields are required.");
      return false;
    }
    if (!validateEmail(email)) {
      alert("Invalid email format.");
      return false;
    }
    return true;
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h5 className="section-title ff-secondary text-center text-primary fw-normal">
            Contact Us
          </h5>
          <h1 className="mb-5">Contact For Any Query</h1>
        </div>
        <div className="row g-4">
          <div className="col-md-6 wow fadeIn" data-wow-delay="0.1s">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.55000943911!2d75.87861337475998!3d22.67056032937381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcbe010ede31%3A0x8cf500da13c868a6!2sKhandwa%20Rd%2C%20Rani%20Bagh%20Main%2C%20Indore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1715412277895!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ order: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="col-md-6">
            <div className="wow fadeInUp" data-wow-delay="0.2s">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                        required
                      />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        type="tel"
                        className="form-control"
                        id="number"
                        placeholder="Number"
                        required
                        minLength={10} // Minimum length of 10 characters
                        maxLength={10} // Maximum length of 10 characters
                        pattern="[0-9]+" // Pattern to allow only numeric digits
                      />
                      <label htmlFor="number">Number (10 digits)</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Your Email"
                        required
                      />
                      <label htmlFor="email">Your Email</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="form-control"
                        placeholder="Leave a message here"
                        id="message"
                        style={{ height: "150px" }}
                        required
                      ></textarea>
                      <label htmlFor="message">Message</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
