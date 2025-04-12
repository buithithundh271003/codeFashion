import React from "react";
import img from "../../../organic-1.0.0/images/banner.jpg";
const BannerSection = () => {
  return (
    <section
      style={{
        backgroundImage:  `url(${img})`   ,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="container-lg">
        <div className="row">
          <div className="col-lg-6 pt-2 mt-5">
            <h2 className="display-1 ls-1">
              <span className="fw-bold text-primary">Black Friday</span> Sale off 60%
              <span className="fw-bold"> Doorsteps</span>
            </h2>
            <div className="d-flex gap-3">
              <a href="#" className="btn btn-primary text-uppercase fs-6 rounded-pill px-4 py-3 mt-3">
                Start Shopping
              </a>
              <a href="#" className="btn btn-dark text-uppercase fs-6 rounded-pill px-4 py-3 mt-3">
                Join Now
              </a>
            </div>
            <div className="row my-5">
             
            </div>
          </div>
        </div>

        {/* <div className="row row-cols-1 row-cols-sm-3 row-cols-lg-3 g-0 justify-content-center">
          {[{ title: "Fresh from farm", color: "primary", icon: "#fresh" }, { title: "100% Organic", color: "secondary", icon: "#organic" }, { title: "Free delivery", color: "danger", icon: "#delivery" }].map((item, index) => (
            <div className="col" key={index}>
              <div className={`card border-0 bg-${item.color} rounded-0 p-4 text-light`}>
                <div className="row">
                  <div className="col-md-3 text-center">
                    <svg width="60" height="60">
                      <use xlinkHref={item.icon}></use>
                    </svg>
                  </div>
                  <div className="col-md-9">
                    <div className="card-body p-0">
                      <h5 className="text-light">{item.title}</h5>
                      <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipi elit.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default BannerSection;
