import React from "react";
import text_img1 from "../images/text_img1.png";
import img_text2 from "../images/img_text2.png";
const Imagetext = () => {
  return (
    <div className="wrapper collection-section">
     
      <div className="wrapper-section ">
        
        <div className="text-img-section">

        <div className="text-section">
            <div className="text-img-content">
            <h2>Give a day trip</h2>
          <p>
            Do you know someone who may benefit from some pampering and
            relaxation? A day of luxury is the ideal present.
          </p>

          <button className="custom-button">
            <a href="/">Learn more !</a>
          </button>
            </div>
         
        </div>
        <div className="img-section">
            <div className="text-img-wrapper">
            <div className="text-img-one">
            <img src={text_img1} alt="" />
          </div>
          <div className="text-img-two">
            <img src={img_text2} alt="" />
          </div>
            </div>
     
        </div>
        </div>
      </div>
    </div>
  );
};

export default Imagetext;
