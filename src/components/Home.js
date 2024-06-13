import React from "react";
import { About } from "./About";
import { Services } from "./Services";
import Product from "./Product";
import { Link, useNavigate } from "react-router-dom";
import { PhotoUpload } from "../dashboard/PhotoUpload";

export const Home = () => {
  const navigate = useNavigate();

  const navigation = () => {
    navigate("/about");
  };

  const navigateToService = () => {
    navigate("/service");
  };

  return (
    <>
      <div className="container-xxl py-home bg-dark hero-header mb-5">
        <div className="container my-5 py-home">
          <div className="col-lg-3 col-md-6 fixed">
            <div className="col-lg-3 col-md-6 fixed">
              <div className="col-lg-3 col-md-6 fixed">
                <div className="col-lg-3 col-md-6 fixed-icons"></div>
              </div>
            </div>
          </div>

          <div className="row align-items-center g-5">
            <div className="col-lg-6 text-center text-lg-start">
              <h1 className="display-3 text-white animated slideInLeft">
                Explore the Essence of India:
              </h1>
              <p className="text-white animated slideInLeft mb-4 pb-2">
                Indian Spices, Indian Wooden Cold Pressed Oils, Indian
                Agricultural Products and Indian Handicrafts
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
                  <h5>Exquisite Spices</h5>
                  <p>
                    Exquisitely Curated Spices: Capturing natural quality and
                    flavorful richness, each spice blend is meticulously curated
                    for a delightful culinary experience.
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
                  <h5>Indian Agriproducts</h5>
                  <p>
                    Innovative Agriproducts: Boosting farming productivity
                    sustainably with advanced solutions, blending technology for
                    efficient, eco-friendly results.
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
                  <h5>Healthful Edible Oils</h5>
                  <p>
                    Pure and Nourishing Edible Oils: Elevating your lifestyle
                    with wholesome oils, packed with essential nutrients and
                    pure natural goodness for a healthier you.
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
                  <h5>Handicraft Products</h5>

                  <p>
                    Indian Handicrafts: Exquisite, handcrafted items made by
                    skilled artisans, reflecting India's rich cultural heritage
                    and craftsmanship.
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
