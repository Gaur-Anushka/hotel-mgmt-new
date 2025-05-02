import React, { useState } from "react";
import plus from "../images/plus.png";
const Faq = () => {
  const [openFaq,setFaq] = useState(false);
  const faqs = [
    {question: "What are the check-in and check-out times?", answer: "Anytime"},
    { question: "Do you offer free Wi-Fi?", answer: "Yes, we provide free Wi-Fi for all guests." },
    { question: "Are pets allowed?", answer: "Yes, we allow pets with an additional fee." },
    { question: "Is parking available?", answer: "Yes, we have free parking for guests." }
  ]
  const handleToggle = (index) =>{
    if(openFaq===index){
      setFaq(null)
    }
    else{
      setFaq(index);
    }
  };
  return (
    <div className="wrapper categories-section">
      <div className="wrapper-section ">
        <div className="categories-section">
          <div className="collection-heading join-button">
            <h2>Discover Locations</h2>
            <p>
              Find quick answers to common queries about our services,
              facilities, memberships, and more.
            </p>
          </div>
          {faqs.map((faq, index) => (
            <div key={index} className="join-button">
              <div className="faq-input">
                <div className="faq-input-section">
                  <input
                    type="text"
                    value={faq.question}
                    disabled
                    
                  />
                  <div className="faq-input-icon" onClick={() => handleToggle(index)}>
                    <img src={plus} alt="plus" />
                  </div>
                </div>
              </div>
              {openFaq === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
          {/* <div className="faq-input">
            <div className="faq-input-section">
              <input type="text" 
              value={faqs.question}
              disabled
              />

              <div className="faq-input-icon" onClick={()=>handleToggle(index)}>
                <img src={plus} alt="" />
              </div>
            </div>
          </div>
          <div className="faq-input">
            <div className="faq-input-section">
              <input type="text" />

              <div className="faq-input-icon">
                <img src={plus} alt="" />
              </div>
            </div>
          </div>
          <div className="faq-input">
            <div className="faq-input-section">
              <input type="text" />

              <div className="faq-input-icon">
                <img src={plus} alt="" />
              </div>
            </div>
          </div>
          <div className="faq-input">
            <div className="faq-input-section">
              <input type="text" />

              <div className="faq-input-icon">
                <img src={plus} alt="" />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Faq;
