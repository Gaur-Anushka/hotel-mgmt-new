import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Booking from "./pages/Booking";
import Rooms from "./pages/Rooms";
import Header from "./components/Header";
import Reservation from "./components/Reservation";
import ViewDetails from "./components/Viewdetails";

function App() {
  return (
    <div className="App">
      <>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/room/:roomId" element={<Booking />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/view-bookings/:roomId" element={<ViewDetails />}/>
          </Routes>
        </Router>
      </>
    </div>
  );
}

export default App;
