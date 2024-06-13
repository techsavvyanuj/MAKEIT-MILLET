import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    // const obj = {
    //   email: email,
    //   password: password,
    // };

    try {
      const response = await fetch("https://prashilexports.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
        if(response.ok){
          const data = await response.json();
          localStorage.setItem("token",data.token)
          navigate("/table")
          window.location.reload();
        }

   
    } catch (error) {
      console.log(error);
    }

    // alert(JSON.stringify(obj));
    // console.log(obj);
  };

  console.log(`${email} ${password}`);

  return (
    <div className="container-xxl py-5 px-0 wow fadeInUp" data-wow-delay="0.1s">
      <div className="row g-0">
        <div className="col-md-6 bg-dark d-flex align-items-center">
          <div className="p-5 wow fadeInUp" data-wow-delay="0.2s">
            <h5 className="section-title ff-secondary text-start text-primary fw-normal">
              Login
            </h5>
            <h1 className="text-white mb-4">Welcome Back!</h1>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Email"
                      required
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Password"
                      required
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                </div>
                <div className="col-12">
                  <button className="btn btn-primary w-100 py-3" type="submit">
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
