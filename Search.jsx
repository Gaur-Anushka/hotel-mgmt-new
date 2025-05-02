import React, { useState } from "react";
import search from "../images/search.png";
import { Link } from "react-router-dom";
const Search = () => {
  const [roomType, setRoomType] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");
  const handleSearch = async () => {
    if (!dateInput) {
      setError("Please enter a valid date.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/rooms/available?date=${dateInput}`
      );
      const data = await res.json();

      if (res.ok) {
        setSearchResults(data);
        setError(data.length === 0 ? "No rooms available on this date." : "");
      } else {
        setError(data.message || "Failed to fetch data.");
        setSearchResults([]);
      }
    } catch (err) {
      console.error("Search failed:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="wrapper search-wrapper">
      <div className="page-width">
        <div className="search-section">
          <div className="search-heading">
            <h1>Maldives Luxury</h1>
            <p>
              A Luxury Hotel Located in the Maldives, Prices From $195 / Night
            </p>
          </div>
          <div className="search-inputs">
            <div className="room">
              <div className="room-input">
                <input
                  type="text"
                  placeholder="Search Room Type (optional)"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                />
                <div className="room-icon">
                  <img src={search} alt="search" />
                </div>
              </div>
              <div className="room-input">
                <input
                  type="date"
                  value={dateInput}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDateInput(e.target.value)}
                />
                <div className="room-icon"></div>
              </div>

              <button
                className="custom-button search-button"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
          <div className="search-results">
            {error && <p style={{ color: "red" }}>{error}</p>}

            {searchResults.length > 0 && (
              <div className="search-available-section">
                <h3>Available Rooms:</h3>
                {searchResults.filter(
                  (room) =>
                    roomType === "" ||
                    room.type.toLowerCase().includes(roomType.toLowerCase())
                ).length === 0 ? (
                  <p style={{ color: "red" }}>
                    No rooms available on this date.
                  </p>
                ) : (
                  <div className="search-rooms-list">
                    <ul>
                      {searchResults
                        .filter(
                          (room) =>
                            roomType === "" ||
                            room.type
                              .toLowerCase()
                              .includes(roomType.toLowerCase())
                        )
                        .map((room) => (
                          <div className="search-room">
                            <li key={room._id}>
                              Room {room.roomNumber} ({room.type}) - ₹
                              {room.price}
                            </li>
                              <div className="search-booking-btn">
                                <button className="booking-button">
                                  <Link to={`/room/${room._id}`}>Book</Link>
                                </button>
                              </div>
                          </div>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
