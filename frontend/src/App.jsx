import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup";
import Userregister from "./components/Userregister";
import UserProfile from "./components/UserProfile";
import HomePage from "./components/HomePage.jsx";
import HotelForm from "./components/HotelForm";
import Review from "./components/Review";
import HotelList from "./components/HotelList";
import RoomManager from "./components/RoomManager.jsx";
import SearchResults from "./components/SearchResults.jsx";
import { FormProvider } from "./context/FormContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import HeroSection from "./components/HeroSection";
import HotelInfo from "./components/HotelInfo.jsx";
import HotelBookingPage from "./pages/HotelbookingPage.jsx";
import HotelDetailsPage from "./pages/HotelDetailsPage.jsx";
import Checkout from "./components/Checkout.jsx";

function App() {
  return (
    <Router>
      <FormProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HeroSection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/register" element={<Userregister />} />
 
          {/* Protected Routes (Require Login) */}
          <Route path="/profile" element={<ProtectedRoute element={<UserProfile />} />} />
          <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
          <Route path="/review" element={<ProtectedRoute element={<Review />} />} />
          <Route path="/search-results" element={<ProtectedRoute element={<SearchResults />} />} />
          <Route path="/hotel/:hotelId" element={<ProtectedRoute element={<HotelBookingPage />} />} />
          <Route path="/checkout/:roomId/:hotelId" element={<ProtectedRoute element={<Checkout />} />} />
 
          {/* Admin-Only Routes */}
          <Route path="/room-manager" element={<AdminRoute element={<RoomManager />} />} />
          <Route path="/hotel" element={<AdminRoute element={<HotelForm />} />} />
          <Route path="/hotel-list" element={<AdminRoute element={<HotelList />} />} />
          <Route path="/hotel-info/:hotelId" element={<AdminRoute element={<HotelDetailsPage />} />} />
      
        </Routes>
      </FormProvider>
    </Router>
  );
}
 
export default App;