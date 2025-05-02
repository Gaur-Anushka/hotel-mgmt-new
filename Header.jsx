import React, { useEffect, useState } from "react";
import Logo from "../images/Logo.png";
import menu from "../images/menu.png"
import { Link } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/current-user", {
          method: "GET",
          credentials: "include", 
        });

        const data = await res.json();
        if (res.ok) {
          setUser(data);
        } else {
          console.log("Error:", data.message);
          setUser(null);
        }
      } catch (err) {
        console.error("Error fetching current user:", err);
        setUser(null);
      }
    };
    getCurrentUser();
  }, []);
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include", 
      });

      const data = await res.json();
      if (res.ok) {
        console.log("Logout successful:", data.message);
        setUser(null); 
      } else {
        console.log("Error:", data.message);
      }
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };
  return (
    <div className="wrapper">
      <div className="page-width">
        <div className="announcement-bar">
          <p>A Luxury Hotel Located in the Maldives, Prices From $195 / Night</p>
        </div>

        <div className="header-section">
          <div className="nav-items">
            <div className="home">
              <li><Link to="/">Home</Link></li>
            </div>

            <div className="home">
              <li><Link to="/rooms">Search Rooms</Link></li>
            </div>

            <div className="home">
              <li><Link to="/reservation">Reservations</Link></li>
            </div>
          </div>

          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="logo-menu">
            <img src={menu} alt="Logo" />
          </div>
          <div className="profile">
            <div className="home">
              <li><a href="/">Contact Us</a></li>
            </div>

            {user ? (
              <>
                <div className="home">
                  <li><a href="/profile">{user.name}</a></li>
                </div>
                
                <div className="custom-button-wrapper">
                  <button className="custom-button" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="custom-button-wrapper">
                <button className="custom-button">
                  <Link to="/login">Login</Link> / <Link to="/signup">Signup</Link>
                </button>
              </div>
            )}

            <div className="home">
              <li><a href="/profile">Profile</a></li>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
