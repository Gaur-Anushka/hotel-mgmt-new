import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newRoom, setNewRoom] = useState({
    roomNumber: "",
    type: "single",
    price: "",
    features: [],
    checkAvailability: "Available",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error("Error loading rooms:", err));

    const getCurrentUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/current-user", {
          method: "GET",
          credentials: "include",
        });
        const userData = await res.json();

        if (res.ok) {
          if (userData.role === "admin") {
            setIsAdmin(true);
          }
        } else {
          console.error("Failed to fetch current user", userData);
        }
      } catch (err) {
        console.error("Error fetching current user:", err);
      }
    };

    getCurrentUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRoom((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (e) => {
    const { value, checked } = e.target;
    setNewRoom((prev) => ({
      ...prev,
      features: checked
        ? [...prev.features, value]
        : prev.features.filter((feature) => feature !== value),
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRoom),
        credentials: "include", // Ensure the cookies (token) are sent with the request
      });
      const result = await res.json();

      // Log the result to ensure it includes the room object with _id and user
      console.log(result); // Log to check the response structure

      if (res.ok) {
        setRooms([...rooms, result.room]); // Ensure result.room contains _id and user
        alert("Room added successfully");
        setNewRoom({
          roomNumber: "",
          type: "single",
          price: "",
          features: [],
          checkAvailability: "Available",
        });
      } else {
        alert(result.message || "Failed to add room");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error adding room");
    }
  };
  const handleViewBookings = async (roomId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/booking/view-booking?roomId=${roomId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();

      if (res.ok) {
        if (data.length === 0) {
          alert("No bookings found for this room.");
        } else {
          const bookingsInfo = data
            .map(
              (b, i) =>
                `${i + 1} 👤 ${b.user?.name || "User"}\n ${new Date(
                  b.checkIn
                ).toLocaleDateString()} - ${new Date(
                  b.checkOut
                ).toLocaleDateString()}`
            )
            .join("\n\n");
          alert(` Bookings for Room ${roomId}:\n\n${bookingsInfo}`);
        }
      } else {
        alert(data.message || "Error fetching bookings");
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
      alert("Failed to fetch bookings");
    }
  };

  return (
    <>
      <div style={{ padding: "2rem" }}>
        <h2>Available Rooms</h2>
        {rooms.length === 0 ? (
          <p>No rooms available.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              tableLayout: "fixed",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f5f5f5" }}>
                <th style={thStyle}>Room Number</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>Features</th>
                <th style={thStyle}>Availability</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {rooms
                .filter(
                  (room) => isAdmin || room.checkAvailability === "Available"
                )
                .map((room) => (
                  <tr key={room._id}>
                    <td style={tdStyle}>{room.roomNumber}</td>
                    <td style={tdStyle}>{room.type}</td>
                    <td style={tdStyle}>₹{room.price}</td>
                    <td style={tdStyle}>{room.features.join(", ")}</td>
                    <td style={tdStyle}>
                      {room.checkAvailability}

                      {/* Current Booking */}
                      {room.currentBooking && (
                        <div
                          style={{
                            fontSize: "0.8rem",
                            marginTop: "0.5rem",
                            color: "#555",
                          }}
                        >
                          <div>
                            <strong>Check-in:</strong>{" "}
                            {new Date(
                              room.currentBooking.checkIn
                            ).toLocaleDateString()}
                          </div>
                          <div>
                            <strong>Check-out:</strong>{" "}
                            {new Date(
                              room.currentBooking.checkOut
                            ).toLocaleDateString()}
                          </div>

                          {isAdmin && (
                            <div>
                              <strong>Booked By:</strong>{" "}
                              {room.currentBooking.user?.name || "User"}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Future Bookings for Admin */}
                      {isAdmin && room.futureBookings?.length > 0 && (
                        <div
                          style={{
                            fontSize: "0.75rem",
                            marginTop: "0.5rem",
                            color: "#007bff",
                          }}
                        >
                          <strong>Future Bookings:</strong>
                          {room.futureBookings.map((booking, i) => (
                            <div key={i}>
                              {new Date(booking.checkIn).toLocaleDateString()}{" "}
                              to{" "}
                              {new Date(booking.checkOut).toLocaleDateString()}{" "}
                              — {booking.user?.name || "User"}
                            </div>
                          ))}
                        </div>
                      )}
                    </td>

                    <td style={tdStyle}>
                      {!isAdmin && room.checkAvailability === "Available" && (
                        <button className="custom-button search-button">
                          <Link to={`/room/${room._id}`}>Book</Link>
                        </button>
                      )}

                      {isAdmin && (
                      <Link
                        to={`/view-bookings/${room._id}`}
                        className="custom-button view-bookings-button"
                        style={{ marginTop: "8px", display: "inline-block", textDecoration: "none" }}
                      >
                        View Bookings
                      </Link>
                    )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      {isAdmin && (
        <div className="wrapper">
          <div className="wrapper-section">
            <div className="login-wrapper">
              <div className="login-container">
                <div className="login-form-box">
                  <form className="login-form" onSubmit={handleSubmit}>
                    <h1 className="login-title">Add New Room</h1>

                    <div className="login-input-group">
                      <input
                        type="number"
                        name="roomNumber"
                        value={newRoom.roomNumber}
                        onChange={handleChange}
                        placeholder="Room Number"
                        required
                      />
                    </div>

                    <div className="login-input-group">
                      <select
                        name="type"
                        value={newRoom.type}
                        onChange={handleChange}
                      >
                        <option value="single">Single</option>
                        <option value="double">Double</option>
                        <option value="deluxe">Deluxe</option>
                      </select>
                    </div>

                    <div className="feature-section">
                      <div className="login-input-group">
                        <input
                          type="number"
                          name="price"
                          value={newRoom.price}
                          onChange={handleChange}
                          placeholder="Price"
                          required
                        />
                      </div>

                      <div className="login-input-group">
                        <label>Status</label>
                        <select
                          name="checkAvailability"
                          value={newRoom.checkAvailability}
                          onChange={handleChange}
                        >
                          <option value="Available">Available</option>
                          <option value="Unavailable">Unavailable</option>
                        </select>
                      </div>

                      <div className="login-input-group">
                        <label>Features:</label>
                        <br />
                        <label className="ac-checkbox">
                          <div className="checkbox-name">AC</div>
                          <div className="checkbox">
                            <input
                              type="checkbox"
                              value="AC"
                              checked={newRoom.features.includes("AC")}
                              onChange={handleFeatureChange}
                            />
                          </div>
                        </label>

                        <label className="ac-checkbox">
                          <div className="checkbox-name">WiFi</div>
                          <div className="checkbox">
                            <input
                              type="checkbox"
                              value="WiFi"
                              checked={newRoom.features.includes("WiFi")}
                              onChange={handleFeatureChange}
                            />
                          </div>
                        </label>

                        <label className="ac-checkbox">
                          <div className="checkbox-name">TV</div>
                          <div className="checkbox">
                            <input
                              type="checkbox"
                              value="TV"
                              checked={newRoom.features.includes("TV")}
                              onChange={handleFeatureChange}
                            />
                          </div>
                        </label>
                      </div>
                    </div>

                    <button type="submit" className="login-submit-button">
                      Add Room
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const thStyle = {
  padding: "12px",
  border: "1px solid #ccc",
  textAlign: "left",
};

const tdStyle = {
  padding: "12px",
  border: "1px solid #ccc",
};

export default Rooms;
