import React, { useState } from "react";
import { Link } from "react-router-dom";

export const About = () => {
    const [showmore, setShowMore] = useState(false)

    const handleReadMore = () =>{
      setShowMore(!showmore)
    }

  const shortContent = (
    <>
      <p className="mb-4">
        <strong>Rooted in Tradition. Growing with Trust.</strong>
      </p>
      <p className="mb-4">
        Since 1999, our journey has been deeply intertwined with the golden grains and now millets, grown in the rich soils of Madhya Pradesh.
      </p>
    </>
  );

  const fullContent = (
    <>
      <p className="mb-4">
        <strong>Rooted in Tradition. Growing with Trust.</strong>
      </p>
      <p className="mb-4">
        Since 1999, our journey has been deeply intertwined with the golden grains and now millets, grown in the rich soils of Madhya Pradesh. At PARAJ INDUSTRIES Pvt. Ltd. we don’t just supply millets — we nurture them from the root, ensuring every grain tells a story of purity, health, and heritage.
      </p>
      <p className="mb-4">
        What began as a humble effort over two decades ago has today become a trusted name in the world of grains. Our fields are not just farms — they’re a promise. A promise of wholesome nutrition, unmatched quality, and a deep respect for natural farming practices.
      </p>
      <p className="mb-4">
        We believe in feeding the world with what’s real. No shortcuts. No compromises. Just honest grains grown the way nature intended — right from the heart of India.
      </p>
      <p className="mb-4">
        Welcome to our world. Welcome to the future of food — rooted in the past, made for today.
      </p>
    </>
  );

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <div className="row g-3">
              <div className="col-6 text-start">
                <img
                  className="img-fluid rounded w-75 wow zoomIn"
                  data-wow-delay="0.1s"
                  src="img/image1.jpeg"
                />
              </div>
              <div className="col-6 text-start">
                <img
                  className="img-fluid rounded w-50 wow zoomIn"
                  data-wow-delay="0.3s"
                  src="img/image2.jpeg"
                  style={{ margintop: "25%" }}
                />
              </div>
              <div className="col-6 text-end">
                <img
                  className="img-fluid rounded w-52 wow zoomIn"
                  data-wow-delay="0.5s"
                  src="img/image3.jpeg"
                />
              </div>
              <div className="col-6 text-end">
                <img
                  className="img-fluid rounded w-75 wow zoomIn"
                  data-wow-delay="0.7s"
                  src="img/image4.jpeg"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <h5 className="section-title ff-secondary text-start text-primary fw-normal">
              About Us
            </h5>
            <h1 className="mb-4">Welcome to Makeit Millet</h1>
            {showmore ? fullContent : shortContent}
            <Link className="btn btn-primary py-3 px-5 mt-2" to="" onClick={handleReadMore} >
              {showmore ? "Read Less" : "Read More"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
