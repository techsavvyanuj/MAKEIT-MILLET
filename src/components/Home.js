import React from "react";
import { About } from "./About";

import Product from "./Product";
import { Link, useNavigate } from "react-router-dom";
import { PhotoUpload } from "../dashboard/PhotoUpload";

export const Home = () => {
  const navigate = useNavigate();

  const navigation = () => {
    navigate("/about");
  };

  const navigateToService = () => {
    navigate("/shop");
  };

  return (
    <>
      <div className="hero-header py-home bg-dark mb-5">
        <div className="my-5 py-home">
          <div className="col-lg-3 col-md-6 fixed">
            <div className="col-lg-3 col-md-6 fixed">
              <div className="col-lg-3 col-md-6 fixed">
                <div className="col-lg-3 col-md-6 fixed-icons"></div>
              </div>
            </div>
          </div>

          <div className="row align-items-center g-5 container mx-auto">
            <div className="col-lg-6 text-center text-lg-start">
              <h1 className="display-3 text-white animated slideInLeft">
                Explore the Essence of India:
              </h1>
              <p className="text-white animated slideInLeft mb-4 pb-2">
                We believe in feeding the world with what’s real. No shortcuts. No compromises. Just honest grains grown the way nature intended — right from the heart of India.
              </p>
              <button
                onClick={navigation}
                className="btn btn-primary py-sm-3 px-sm-5 me-3 animated slideInLeft"
              >
                Get the Details
              </button>
            </div>
            <div className="col-lg-5 text-center text-lg-end">
              <img
                className="img-fluid"
                src="img/thali-removebg-preview.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <About />
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-4">
            <div
              onClick={navigateToService}
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <h5>Sun-Kissed Fields</h5>
                  <p>
                    Our millets thrive in natural, open fields. They are nourished by sunlight and fertile soil.
                  </p>
                </div>
              </div>
            </div>
            <div
              onClick={navigateToService}
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <h5>Sustainable Farming</h5>
                  <p>
                    We use eco-friendly methods.
This protects the environment and ensures superior grain quality. 

                  </p>
                </div>
              </div>
            </div>
            <div
              onClick={navigateToService}
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <h5>Nutrient-Rich Grains</h5>
                  <p>
                    Each grain is packed with essential vitamins. Millets offer minerals and fiber for optimal health
                  </p>
                </div>
              </div>
            </div>
            <div
              onClick={navigateToService}
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.7s"
            >
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <h5>Quality Certified</h5>

                  <p>
                    Our products meet rigorous quality standards. We are committed to excellence and
purity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PhotoUpload />
    </>
  );
};
