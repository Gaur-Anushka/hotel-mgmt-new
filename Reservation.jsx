import React, { useEffect, useState } from 'react';

const Reservation = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserAndBookings = async () => {
      try {
        const userRes = await fetch('http://localhost:5000/api/current-user', {
          credentials: 'include',
        });

        const userData = await userRes.json();

        if (userRes.ok && userData.role === 'admin') {
          setIsAdmin(true);

          // Admin - get all bookings
          const res = await fetch('http://localhost:5000/api/booking/all', {
            credentials: 'include',
          });

          const data = await res.json();
          setBookings(data);
        } else {
          // Normal user - get only their bookings
          const res = await fetch('http://localhost:5000/api/booking/my-bookings', {
            credentials: 'include',
          });

          const data = await res.json();
          setBookings(data);
        }
      } catch (err) {
        console.error('Error fetching bookings or user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndBookings();
  }, []);

  if (loading) return <div>Loading your reservations...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{isAdmin ? "All Reservations" : "My Reservations"}</h2>
      {bookings.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th style={thStyle}>Room Number</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Check-In (Date & Time)</th>
              <th style={thStyle}>Check-Out (Date & Time)</th>
              <th style={thStyle}>Price</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td style={tdStyle}>{booking.room?.roomNumber || 'N/A'}</td>
                <td style={tdStyle}>{booking.room?.type || 'N/A'}</td>
                <td style={tdStyle}>{new Date(booking.checkIn).toLocaleString()}</td>
                <td style={tdStyle}>{new Date(booking.checkOut).toLocaleString()}</td>
                <td style={tdStyle}>₹{booking.room?.price || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const thStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  backgroundColor: '#f5f5f5',
};

const tdStyle = {
  padding: '10px',
  border: '1px solid #ccc',
};

export default Reservation;
