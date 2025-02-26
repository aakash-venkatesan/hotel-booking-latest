import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomManager from './RoomManager';
import AdminNavBar from './NavBar';

const HotelCard = ({ hotel }) => {
  const [rooms, setRooms] = useState([]);
  const [showRoomManager, setShowRoomManager] = useState(false);

  useEffect(() => {
    // Fetch rooms for the selected hotel
    console.log('Hotel:', hotel);
    const fetchRooms = async () => {
      try {
        // Assuming hotel.rooms contains an array of room IDs
        const roomIds = hotel.rooms; // Adjust this line based on your actual hotel schema
        const roomPromises = roomIds.map((roomId) =>
          axios.get(`http://localhost:5000/api/rooms/${roomId}`, {
            withCredentials: true
          })
        );

        // Fetch all room details concurrently
        const responses = await Promise.all(roomPromises);
        const roomsData = responses.map(response => response.data); // Extract room data from responses
        setRooms(roomsData);
        console.log('Rooms:', roomsData);
        
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, [hotel]);

  const handleAddRoomsClick = () => {
    setShowRoomManager(true);
  };

  return (
    <>
    <AdminNavBar/>
    <div className="p-6 mt-6 border-t border-gray-300 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-mono font-bold text-gray-800">{hotel.name}</h2>
      <p className="text-gray-600 mt-2">{hotel.description}</p>
      <p className="text-sm text-blue-600 font-semibold">{hotel.location}</p>

      <h3 className="text-xl font-mono font-bold text-gray-800 mt-6">Available Rooms</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="bg-white border border-gray-300 rounded-lg shadow-md p-4 hover:shadow-lg transition"
          >
            <h4 className="text-lg font-bold text-gray-700">Room {room.roomNumber}</h4>
            <p className="text-gray-600 text-sm">Type: <span className="font-semibold">{room.title}</span></p>
            <p className="text-gray-600 text-sm">Price: <span className="font-semibold">${room.price}</span></p>
            <p className="text-gray-600 text-sm">Occupancy: <span className="font-semibold">{room.maxPeople} People</span></p>

            {room.photos && room.photos.length > 0 && (
              <img
                src={room.photos[0]}
                alt="Room"
                className="w-full h-40 object-cover mt-3 rounded-lg"
              />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleAddRoomsClick}
        className="bg-green-500 hover:bg-green-600 text-white font-mono font-semibold px-4 py-2 rounded-lg mt-6 transition cursor-pointer"
      >
        Add Rooms
      </button>

      {showRoomManager && (
        <div className="mt-6">
          <RoomManager hotelId={hotel._id} />
        </div>
      )}
    </div>
    </>

  );
};

export default HotelCard;