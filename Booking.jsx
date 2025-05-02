import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import search from "../images/search.png";
const generateTimeSlotsForDay = (date) => {
  const slots = [];
  let currentTime = new Date(date);
  currentTime.setHours(0, 0, 0, 0);
  for (let i = 0; i < 48; i++) {
    slots.push(new Date(currentTime));
    currentTime.setMinutes(currentTime.getMinutes() + 30);
  }
  return slots;
};
const checkIfFullyBooked = (date, bookings) => {
  const slots = generateTimeSlotsForDay(date);
  const bookedSet = new Set();

  bookings.forEach((booking) => {
    const start = new Date(booking.checkIn);
    const end = new Date(booking.checkOut);
    let current = new Date(start);
    while (current <= end) {
      bookedSet.add(current.toISOString());
      current.setMinutes(current.getMinutes() + 30);
    }
  });

  return slots.every((slot) => bookedSet.has(slot.toISOString()));
};
const generateCurrentTimeRoundedToHalfHour = () => {
  const now = new Date(); // Get the current date and time
  const minutes = now.getMinutes(); // Get the current minutes
  const remainder = minutes % 30; // Calculate remainder when divided by 30

  // Calculate the rounded minutes
  const roundedMinutes = remainder < 15 ? minutes - remainder : minutes + (30 - remainder);

  now.setMinutes(roundedMinutes, 0, 0); // Set the minutes to the rounded value, and reset seconds and milliseconds to 0
  return now; // Return the adjusted Date object
};
const roundedCurrentTime = generateCurrentTimeRoundedToHalfHour();
console.log(roundedCurrentTime);

const Booking = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [roomDetails, setRoomDetails] = useState(null);
  const [unavailableTimes, setUnavailableTimes] = useState([]);
  const [fullyBookedDates, setFullyBookedDates] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkInTime: "",
    checkOut: "",
    checkOutTime: "",
  });
  const [isCheckInTimeRed, setIsCheckInTimeRed] = useState(false);
  const [isCheckOutTimeRed, setIsCheckOutTimeRed] = useState(false);

  useEffect(() => {
    if (!roomId) return;

    fetch(`http://localhost:5000/api/rooms/${roomId}`)
      .then((res) => res.json())
      .then((data) => setRoomDetails(data))
      .catch((err) => console.error("Error fetching room details:", err));

    fetch(`http://localhost:5000/api/booking/view-booking?roomId=${roomId}`)
      .then((res) => res.json())
      .then((data) => {
        const timeMap = [];
        const fullBookedDays = [];
        const dateSet = new Set();

        data.forEach((booking) => {
          const start = new Date(booking.checkIn);
          const end = new Date(booking.checkOut);
          let current = new Date(start);

          while (current <= end) {
            timeMap.push(new Date(current));
            current.setMinutes(current.getMinutes() + 30);
          }
        });

        data.forEach((booking) => {
          const bookingDate = new Date(booking.checkIn);
          const dateStr = bookingDate.toISOString().split("T")[0];

          if (!dateSet.has(dateStr)) {
            dateSet.add(dateStr);
            if (checkIfFullyBooked(bookingDate, data)) {
              fullBookedDays.push(new Date(dateStr));
            }
          }
        });

        setUnavailableTimes(timeMap);
        setFullyBookedDates(fullBookedDays);
      })
      .catch((err) => console.error("Error fetching booking data:", err));
  }, [roomId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const combineDateTime = (date, time) => {
    const combined = new Date(date);
    const t = new Date(time);
    combined.setHours(t.getHours(), t.getMinutes(), 0, 0);
    return combined.toISOString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { checkIn, checkInTime, checkOut, checkOutTime } = formData;
    if (!checkIn || !checkInTime || !checkOut || !checkOutTime) {
      alert("Please select both date and time for check-in and check-out.");
      return;
    }

    const checkInDateTime = combineDateTime(checkIn, checkInTime);
    const checkOutDateTime = combineDateTime(checkOut, checkOutTime);

    if (new Date(checkOutDateTime) <= new Date(checkInDateTime)) {
      alert("Check-out must be after check-in.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          room: roomId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          checkIn: checkInDateTime,
          checkOut: checkOutDateTime,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        alert("Booking successful!");
        navigate("/");
      } else {
        alert(result.message || "Booking failed.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("Something went wrong.");
    }
  };

  const isTimeUnavailable = (timeToCheck, selectedDate) => {
    if (!selectedDate) return false;

    const dateToCheck = new Date(selectedDate);
    dateToCheck.setHours(
      timeToCheck.getHours(),
      timeToCheck.getMinutes(),
      0,
      0
    );

    return unavailableTimes.some((bookedTime) => {
      return new Date(bookedTime).getTime() === dateToCheck.getTime();
    });
  };

  const handleCheckInTimeChange = (time) => {
    setFormData({ ...formData, checkInTime: time });
    setIsCheckInTimeRed(isTimeUnavailable(time));
  };

  const handleCheckOutTimeChange = (time) => {
    setFormData({ ...formData, checkOutTime: time });
    setIsCheckOutTimeRed(isTimeUnavailable(time));
  };

  const isDateFullyBooked = (date) => {
    return fullyBookedDates.some(
      (bookedDate) =>
        bookedDate.toISOString().split("T")[0] ===
        date.toISOString().split("T")[0]
    );
  };
  const roundToNearestHalfHour = (date) => {
    const minutes = date.getMinutes();
    const remainder = minutes % 30;
    date.setMinutes(minutes - remainder); // Round down to the previous 30-minute mark
    date.setSeconds(0, 0); // Set seconds and milliseconds to 0
    return date;
  };
  
const isTimeDisabledForToday = (time, selectedDate) => {
  const now = new Date();
  
  // If today is selected, disable times before the current time
  if (selectedDate.toISOString().split("T")[0] === now.toISOString().split("T")[0]) {
    return time < now;  // Disable times before the current time today
  }
  return false;  // No restriction for other days
};

  return (
    <div className="wrapper">
      <div className="wrapper-section">
        <div className="login-wrapper">
          <div className="login-container">
            <div className="login-form-box">
              <form className="login-form" onSubmit={handleSubmit}>
                <h1 className="login-title">Book Room</h1>

                {roomDetails && (
                  <div
                    className="room-details"
                    style={{ marginBottom: "1rem", fontWeight: "bold" }}
                  >
                    Booking for Room {roomDetails.roomNumber} -{" "}
                    {roomDetails.type}
                  </div>
                )}

                <div className="login-input-group">
                <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="input-style" // Apply the same styling used for the login form
                  />
                  <div className="login-icon">
                    <img src={search} alt="name icon" />
                  </div>
                </div>

                <div className="login-input-group">
                <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="input-style"
                  />
                  <div className="login-icon">
                    <img src={search} alt="email icon" />
                  </div>
                </div>

                <div className="login-input-group">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className="input-style"
                  />
                  <div className="login-icon">
                    <img src={search} alt="phone icon" />
                  </div>
                </div>

                <label>Check-In Date</label>
                <div className="login-input-group">
                  <DatePicker
                    selected={
                      formData.checkIn ? new Date(formData.checkIn) : null
                    }
                    onChange={(date) =>
                      setFormData({ ...formData, checkIn: date })
                    }
                    minDate={new Date()}
                    // excludeDates={fullyBookedDates}
                    dayClassName={(date) =>
                      isDateFullyBooked(date) ? "day-red" : undefined
                    }
                    placeholderText="Select a check-in date"
                    required
                    className="input-style" // Apply the same styling used for login form
                  />
                </div>

                <label>Check-In Time</label>
                <div className="login-input-group">
                  <DatePicker
                    selected={
                      formData.checkInTime
                        ? new Date(formData.checkInTime)
                        : null
                    }
                    onChange={handleCheckInTimeChange}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    placeholderText="Select a check-in time"
                    
                    required
                    filterTime={(time) =>
                      !isTimeUnavailable(time, formData.checkIn)
                    }
                    className={`input-style ${
                      isCheckInTimeRed ? "time-input-red" : ""
                    }`}
                  />
                </div>

                <label>Check-Out Date</label>
                <div className="login-input-group">
                  <DatePicker
                    selected={
                      formData.checkOut ? new Date(formData.checkOut) : null
                    }
                    onChange={(date) =>
                      setFormData({ ...formData, checkOut: date })
                    }
                    minDate={
                      formData.checkIn ? new Date(formData.checkIn) : new Date()
                    }
                    excludeDates={fullyBookedDates}
                    dayClassName={(date) =>
                      isDateFullyBooked(date) ? "day-red" : undefined
                    }
                    placeholderText="Select a check-out date"
                    required
                    className="input-style" // Same class as input fields
                  />
                </div>

                <label>Check-Out Time</label>
                <div className="login-input-group">
                  <DatePicker
                    selected={
                      formData.checkOutTime
                        ? new Date(formData.checkOutTime)
                        : null
                    }
                    onChange={handleCheckOutTimeChange}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    placeholderText="Select a check-out time"
                    required
                    filterTime={(time) =>
                      !isTimeUnavailable(time, formData.checkOut)
                    }
                    className={`input-style ${
                      isCheckOutTimeRed ? "time-input-red" : ""
                    }`}
                  />
                </div>

                <button type="submit" className="login-submit-button">
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
