import React, { useState } from "react";
import { Link } from "react-router-dom";

export const About = () => {
    const [showmore, setShowMore] = useState(false)

    const handleReadMore = () =>{
      setShowMore(!showmore)
    }

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <div className="row g-3">
              <div className="col-6 text-start">
                <img
                  className="img-fluid rounded w-100 wow zoomIn"
                  data-wow-delay="0.1s"
                  src="img/mix-organic-seeds-food-powder.jpg"
                />
              </div>
              <div className="col-6 text-start">
                <img
                  className="img-fluid rounded w-75 wow zoomIn"
                  data-wow-delay="0.3s"
                  src="img/rawoil.jpg"
                  style={{ margintop: "25%" }}
                />
              </div>
              <div className="col-6 text-end">
                <img
                  className="img-fluid rounded w-75 wow zoomIn"
                  data-wow-delay="0.5s"
                  src="img/pexels-angele-j-35172-128402.jpg"
                />
              </div>
              <div className="col-6 text-end">
                <img
                  className="img-fluid rounded w-100 wow zoomIn"
                  data-wow-delay="0.7s"
                  src="img/pexels-quang-nguyen-vinh-222549-2162943.jpg"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <h5 className="section-title ff-secondary text-start text-primary fw-normal">
              About Us
            </h5>
            <h1 className="mb-4">Welcome to Prashil Exports</h1>
            <p className="mb-4">
              <h3 className="mb-2">VISION</h3>
              To be a leading, most trusted, reliable International Trading Company adding Sustainable Value to Stakeholders.
            </p>
            <p className="mb-4">
            <h3 className="mb-2"> MISSION</h3>
            Focused on being the leading International Trading Company with the intention to serve as an effective and socially responsible company. To provide integrated trade solutions to our customers to ensure sustainable growth and profits.
            </p>
            {showmore && (
              <div>
            <h3 className="mb-2">CORE VALUES</h3>
            <ul>
              <li>
              <span>Team Work:</span><br/> Team work is the core of our working culture. We believe that when everyone is working together towards a goal, then success take care of itself.
              </li>
              <li>
              <span>	Transparency and Accountability: </span><br/> Our team says greater the degree of transparency, greater the level of good management. And with good management comes accountability towards work.
              </li>
              <li>
              <span>	Integrity:  </span><br/> We care about our relationships and contributions to our company, communities and Industries we serve. We strive to do the right thing needed to maintain quality of work.
              </li>
              <li>
              <span>	Commitment:   </span><br/> Everyone in our team is fully committed towards their job and work, we reaches further towards our commitment for societies, communities and countries in which we work. Our team takes a special foot ahead in keeping up the said commitments.
              </li>
            </ul>
            </div>
            )}
            <Link className="btn btn-primary py-3 px-5 mt-2" to="" onClick={handleReadMore} >
            {showmore ? "Read Less" :"Read More"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
