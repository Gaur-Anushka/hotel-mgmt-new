import React from 'react'
import join from '../images/join.png'
import img1 from '../images/img1.png'
import img2 from '../images/img2.png'
import img3 from '../images/img3.png'
const Join = () => {
  return (
     <div className="wrapper collection-section">
           <div className="wrapper-section ">
             <div className="collection-section">
               <div className="join-heading join-button">
                 <h2>Are you a hotel manager looking
                 to collaborate with us?</h2>
                
                 <button className="custom-button ">
                  <a href="#">Become a Hotel Partner</a>
                 
                </button>
               </div>
          
             </div>
           
           </div>
               <div className="join-cards">
               <div className="join-card">
            <img src={join} alt="" />
           </div>
           <div className="join-card">
            <img src={img1} alt="" />
           </div>
           <div className="join-card">
            <img src={img2} alt="" />
           </div>
           <div className="join-card">
            <img src={img3} alt="" />
           </div>
               </div>
         </div>
  )
}

export default Join