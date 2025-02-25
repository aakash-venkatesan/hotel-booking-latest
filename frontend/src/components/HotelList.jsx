import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    navigate(`/hotel/${hotelId}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Available Hotels</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotels.map((hotel) => (
          <div
            key={hotel._id}
            className="border p-4 cursor-pointer"
            onClick={() => handleHotelClick(hotel._id)}
          >
            <img src={hotel.photos[0]} alt={hotel.name} className="w-full h-48 object-cover mb-2" />
            <h3 className="text-lg font-bold">{hotel.name}</h3>
            <p>{hotel.description}</p>
            <p className="text-sm text-gray-600">{hotel.address}</p>
            <p className="text-sm text-gray-600">{hotel.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;