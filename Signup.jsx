import React, { useState } from 'react';
import search from '../images/search.png';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop page reload

    try {
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        alert('Signup successful!');
        console.log(data);
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <>

      <div className="wrapper">
        <div className="wrapper-section">
          <div className="login-wrapper">
            <div className="login-container">
              <div className="login-form-box">
                <form className="login-form" onSubmit={handleSubmit}>
                  <h1 className="login-title">Sign Up</h1>

                  {/* Name */}
                  <div className="login-input-group">
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange}
                      placeholder="Full Name" 
                      required 
                    />
                    <div className="login-icon">
                      <img src={search} alt="name icon" />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="login-input-group">
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange}
                      placeholder="Email" 
                      required 
                    />
                    <div className="login-icon">
                      <img src={search} alt="email icon" />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="login-input-group">
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange}
                      placeholder="Phone Number" 
                      required 
                    />
                    <div className="login-icon">
                      <img src={search} alt="phone icon" />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="login-input-group">
                    <input 
                      type="text" 
                      name="address" 
                      value={formData.address} 
                      onChange={handleChange}
                      placeholder="Address" 
                      required 
                    />
                    <div className="login-icon">
                      <img src={search} alt="address icon" />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="login-input-group">
                    <input 
                      type="password" 
                      name="password" 
                      value={formData.password} 
                      onChange={handleChange}
                      placeholder="Password" 
                      required 
                    />
                    <div className="login-icon">
                      <img src={search} alt="password icon" />
                    </div>
                  </div>

                  {/* Submit */}
                  <button type="submit" className="login-submit-button">
                    Sign Up
                  </button>

                  <div className="create-account">
                    <Link to="/login"><p>Login</p></Link>
                  </div>
                </form>
              </div>
            </div>
          </div>   
        </div>
      </div>
    </>
  );
};

export default Signup;
