import React from 'react'
import Logo from '../images/Logo.png'
import twitter from '../images/twitter.png'
import facebook from '../images/facebook.png'
import youtube from '../images/youtube.png'
import instagram from '../images/instagram.png'
const Footer = () => {
  return (
     <div className="wrapper footer-wrapper">
        <div className="page-width">

          <div className="wrapper-section ">
           <div className="footer-section">
            <div className="footer-nav">
                <div className="footer-heading">
                    <img src={Logo} alt="" />
                </div>
                <div className="social">
                    <div className="twitter"> 
                         <img src={twitter} alt="" />
                         </div>
                         <div className="twitter"> 
                         <img src={youtube} alt="" />
                         </div>
                         <div className="twitter"> 
                         <img src={facebook} alt="" />
                         </div>
                         <div className="twitter"> 
                         <img src={instagram} alt="" />
                         </div>
                </div>
           
            </div>
          
            <div className="footer-nav">
                <div className="footer-heading">
                    <h4>Contact us</h4>
                </div>
                <div className="footer-nav-section">
                <div className="footer-nav-list">
                    <li><a href="/"> Your address here</a>
                       </li>
                    <li><a href="/"> 123456789</a></li>
                    <li><a href="/">example@gmail.com</a></li>
                </div>
                </div>
              
            </div>
            <div className="footer-nav">
                <div className="footer-heading">
                    <h4>Explore</h4>
                </div>
                <div className="footer-nav-section">
                <div className="footer-nav-list">
                    <li><a href="/"> Discover Locations</a>
                       </li>
                    <li><a href="/"> Help & FAQs</a></li>
                    <li><a href="/">Media</a></li>
                </div>
                </div>
              
            </div>
            <div className="footer-nav">
                <div className="footer-heading">
                    <h4>Information</h4>
                </div>
                <div className="footer-nav-section">
                <div className="footer-nav-list">
                    <li><a href="/"> Privacy policy</a>
                       </li>
                    <li><a href="/"> Return policy</a></li>
                    <li><a href="/">Shipping policy</a></li>
                </div>
                </div>
              
            </div>
           </div>
          </div>
        </div>
        </div>
  )
}

export default Footer