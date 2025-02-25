import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HotelCard from './HotelCard';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);

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

  const handleHotelClick = (hotel) => {
    setSelectedHotel(hotel);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-mono font-bold text-gray-700 text-center mb-6">
        Available Hotels
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel._id}
            className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
            onClick={() => handleHotelClick(hotel)}
          >
            <img
              src={hotel.photos[0]}
              alt={hotel.name}
              className="w-full h-52 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-mono font-bold text-gray-800 mb-2">{hotel.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{hotel.description}</p>
              <p className="text-sm text-blue-600 font-semibold">{hotel.location}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedHotel && (
        <div className="mt-8">
          <HotelCard hotel={selectedHotel} />
        </div>
      )}
    </div>



  );
};

export default HotelList;