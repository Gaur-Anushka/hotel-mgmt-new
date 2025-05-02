import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import search from '../images/search.png';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      // localStorage.setItem(data.token)
      if (res.ok) {
        alert("Login successful!");
        setIsLoggedIn(true);  // Mark user as logged in
        navigate("/");  // Redirect to homepage or dashboard
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      const data = await res.json();
      if (res.ok) {
        setIsLoggedIn(false);  // Mark user as logged out
        alert(data.message);
        navigate("/login");  // Redirect to login page
      } else {
        alert(data.message || 'Logout failed');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong during logout.');
    }
  };

  return (
    <div className="wrapper">
      <div className="wrapper-section">
        <div className="login-wrapper">
          <div className="login-container">
            <div className="login-form-box">
              {!isLoggedIn ? (
                <form className="login-form" onSubmit={handleSubmit}>
                  <h1 className="login-title">Login</h1>
                  <div className="login-input-group">
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <div className="login-icon">
                      <img src={search} alt="email icon" />
                    </div>
                  </div>
                  <div className="login-input-group">
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <div className="login-icon">
                      <img src={search} alt="password icon" />
                    </div>
                  </div>
                  <button type="submit" className="login-submit-button">
                    Submit
                  </button>
                  <div className="create-account">
                    <Link to="/signup">
                      <p>Create Account</p>
                    </Link>
                  </div>
                </form>
              ) : (
                <div className="logout-container">
                  <button onClick={handleLogout} className="logout-button">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
