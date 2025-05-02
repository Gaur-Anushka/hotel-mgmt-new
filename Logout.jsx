import React from 'react'
import { useHistory } from 'react-router-dom';
const Logout = () => {
  const history = useHistory();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        credentials: 'include', // Ensure cookies are sent with the request
      });

      const data = await response.json();
      if (data.message === 'Logout successful') {
        // Redirect to login page after successful logout
        history.push('/login');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  return (
    <div>
  <div className="create-account">
      <p onClick={handleLogout} style={{ cursor: 'pointer', color: 'red' }}>Logout</p>
    </div>


    </div>
  )
}

export default Logout