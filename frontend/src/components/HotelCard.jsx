import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomManager from './RoomManager';

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
    <div className="p-4 mt-4 border-t">
      <h2 className="text-xl font-bold mb-4">{hotel.name}</h2>
      <p>{hotel.description}</p>
      <p className="text-sm text-gray-600">{hotel.location}</p>
      <h3 className="text-lg font-bold mt-4">Available Rooms</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <div key={room._id} className="border p-4">
            <h4 className="text-lg font-bold">Room {room.roomNumber}</h4>
            <p>Type: {room.title}</p>
            <p>Price: {room.price}</p>
            <p>Occupancy: {room.maxPeople}</p>
            {room.photos && room.photos.length > 0 && (
              <img src={room.photos[0]} alt="Room" className="w-full h-32 object-cover mt-2" />
            )}
          </div>
        ))}
      </div>
      <button onClick={handleAddRoomsClick} className="bg-green-500 text-white p-2 mt-4">
        Add Rooms
      </button>
      {showRoomManager && <RoomManager hotelId={hotel._id} />}
    </div>
  );
};

export default HotelCard;