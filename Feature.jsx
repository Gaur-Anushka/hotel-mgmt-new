import React from "react";
import card_img1 from "../images/card_img1.png";
import pool from "../images/pool.png";
import compass from "../images/compass.png";
import vehicle from "../images/vehicle.png"
const Feature = () => {
  return (
    <div className="wrapper">
      <div className="wrapper-section wrapper-padding">
        <div className="card-section">
          <div className="card">
            <div className="card-icon">
              <img src={card_img1} alt="" />
            </div>
            <div className="card-content">
              <div>
             
                <h5>City Views</h5>
              </div>
              <div>
                {" "}
                <p>Urban vistas, hotel indulgence</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-icon">
              <img src={pool} alt="" />
            </div>
            <div className="card-content">
              <div>
                <h5>Swimming Pool</h5>
              </div>
              <div>
               
                <p>Dive into luxury relaxation</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-icon">
              <img src={compass} alt="" />
            </div>
            <div className="card-content">
              <div>
                <h5>South Facing Views</h5>
              </div>
              <div>
                <p>Premium Getaway Experiences</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-icon">
              <img src={vehicle} alt="" />
            </div>
            <div className="card-content">
              <div>
                <h5>Subway Nearby</h5>
              </div>
              <div>
                {" "}
                <p>Subway nearby, luxury awaits</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
