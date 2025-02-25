import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup";
import Userregister from "./components/Userregister";
import UserProfile from "./components/UserProfile";
import HomePage from "./components/HomePage.jsx";
import BasicHotelInfo from "./components/BasicHotelInfo.jsx";
import HotelDetail from "./components/HotelDetail";
import HotelForm from "./components/HotelForm";
import HotelLocationDetails from "./components/HotelLocationDetails.jsx";
import HotelPropertyDetails from "./components/HotelPropertyDetails.jsx";
import Review from "./components/Review";
import { FormProvider } from "./context/FormContext";
import HotelList from "./components/HotelList.jsx";

function App() {
  return (
    <Router>
      <FormProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/register" element={<Userregister />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/hotel" element={<FormProvider><HotelForm/></FormProvider>} />
          <Route path="/review" element={<Review />} />
          <Route path="/hotel-list" element={<HotelList/>} />
        </Routes>
      </FormProvider>
    </Router>
  );
}

export default App;
