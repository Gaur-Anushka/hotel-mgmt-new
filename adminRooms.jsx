import React, { useState, useEffect } from 'react';

const AdminRoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({
    roomNumber: '',
    type: 'single',
    price: '',
    features: [],
    isAvailable: true,
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/rooms')
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error('Error fetching rooms:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRoom((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFeatureChange = (e) => {
    const { value, checked } = e.target;
    setNewRoom((prevDetails) => {
      const updatedFeatures = checked
        ? [...prevDetails.features, value]
        : prevDetails.features.filter((feature) => feature !== value);
      return { ...prevDetails, features: updatedFeatures };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRoom),
      });
      const result = await response.json();
      if (response.ok) {
        setRooms([...rooms, result.room]); // Add new room to the list
        alert('Room added successfully');
        setNewRoom({
          roomNumber: '',
          type: 'single',
          price: '',
          features: [],
          isAvailable: true,
        });
      } else {
        alert('Failed to add room');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add room.');
    }
  };

  // Handle delete room
  const handleDelete = async (roomId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/rooms/${roomId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setRooms(rooms.filter((room) => room._id !== roomId)); // Remove from list
        alert('Room deleted successfully');
      } else {
        alert('Failed to delete room');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete room.');
    }
  };

  return (
    <div>
      <h2>Manage Rooms</h2>

      {/* Add Room Form */}
      <form onSubmit={handleSubmit}>
        <h3>Add New Room</h3>
        <input
          type="number"
          name="roomNumber"
          value={newRoom.roomNumber}
          onChange={handleChange}
          placeholder="Room Number"
          required
        />
        <select name="type" value={newRoom.type} onChange={handleChange}>
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="deluxe">Deluxe</option>
        </select>
        <input
          type="number"
          name="price"
          value={newRoom.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <div>
          <label>Features:</label>
          <label>
            <input
              type="checkbox"
              value="AC"
              checked={newRoom.features.includes('AC')}
              onChange={handleFeatureChange}
            />
            AC
          </label>
          <label>
            <input
              type="checkbox"
              value="WiFi"
              checked={newRoom.features.includes('WiFi')}
              onChange={handleFeatureChange}
            />
            WiFi
          </label>
          <label>
            <input
              type="checkbox"
              value="TV"
              checked={newRoom.features.includes('TV')}
              onChange={handleFeatureChange}
            />
            TV
          </label>
        </div>
        <button type="submit">Add Room</button>
      </form>

      {/* Room List */}
      <h3>Existing Rooms</h3>
      <table>
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Type</th>
            <th>Price</th>
            <th>Features</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room._id}>
              <td>{room.roomNumber}</td>
              <td>{room.type}</td>
              <td>₹{room.price}</td>
              <td>{room.features.join(', ')}</td>
              <td>{room.isAvailable ? 'Available' : 'Not Available'}</td>
              <td>
                <button onClick={() => handleDelete(room._id)}>Delete</button>
                <button
                  onClick={() => {
                    // Add edit functionality later
                    alert('Edit functionality is not implemented yet');
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRoomManagement;
