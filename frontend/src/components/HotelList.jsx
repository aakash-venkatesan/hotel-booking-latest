import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNavBar from './NavBar';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch hotels from the server
    const fetchHotels = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hotels');
        setHotels(response.data);
        console.log('Hotels:', response.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, []);

  const handleHotelClick = (hotelId) => {
    navigate(`/hotel-info/${hotelId}`);
  };

  return (
    <>
    <AdminNavBar/>
    <div className="min-h-screen bg-blue-50 flex justify-center items-center ">
      <div className="p-6 bg-white rounded-lg shadow-md max-w-6xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Available Hotels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div
              key={hotel._id}
              className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleHotelClick(hotel._id)}
            >
              <img src={hotel.photos[0]} alt={hotel.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-lg font-bold text-gray-700">{hotel.name}</h3>
              <p className="text-gray-600">{hotel.description}</p>
              <p className="text-sm text-gray-500">{hotel.address}</p>
              <p className="text-sm text-gray-500">{hotel.city}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default HotelList;