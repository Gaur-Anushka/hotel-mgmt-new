import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams to access the roomId from URL

const ViewDetails = () => {
  const { roomId } = useParams(); // Get roomId from URL params
  const [bookings, setBookings] = useState([]);
  const [roomDetails, setRoomDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/booking/view-booking?roomId=${roomId}`, {
          credentials: "include",
        });
        const data = await res.json();
  
        console.log("Bookings API response:", data);
  
        // ✅ Ensure it's an array before setting it
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error loading room bookings:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchBookings();
  }, [roomId]);
  

  if (loading) return <div>Loading bookings...</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Bookings for Room {roomDetails?.roomNumber || "N/A"}</h2>

      {bookings.length === 0 ? (
        <p>No bookings found for this room.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" ,  tableLayout: "fixed", }}>
          <thead>
            <tr>
              <th style={thStyle}>User Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Phone number</th>
              <th style={thStyle}>Check-In (Date & Time)</th>
              <th style={thStyle}>Check-Out (Date & Time)</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => {
              // Log individual booking data to inspect user details
              console.log('Booking:', booking);

              return (
                <tr key={booking._id}>
                  <td style={tdStyle}>{booking.name || "N/A"}</td>
                  <td style={tdStyle}>{booking.email || "N/A"}</td>
                  <td style={tdStyle}>{booking.phone || "N/A" }</td>
                  <td style={tdStyle}>{new Date(booking.checkIn).toLocaleString()}</td>
                  <td style={tdStyle}>{new Date(booking.checkOut).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

const thStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  backgroundColor: "#f5f5f5",
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #ccc",
};

export default ViewDetails;
