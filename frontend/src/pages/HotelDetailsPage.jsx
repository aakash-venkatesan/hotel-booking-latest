import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomManager from '../components/RoomManager';
import { useParams } from 'react-router-dom';
import AdminNavBar from '../components/NavBar';

const HotelDetailsPage = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [showRoomManager, setShowRoomManager] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  useEffect(() => {
    fetchHotelDetails();
  }, [hotelId]);

  const fetchHotelDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/hotels/${hotelId}`);
      setHotel(response.data);
      const roomIds = response.data.rooms || [];
      const roomPromises = roomIds.map((roomId) =>
        axios.get(`http://localhost:5000/api/rooms/${roomId}`).catch(() => null) // Catch errors and return null
      );
      const roomResponses = await Promise.all(roomPromises);
      setRooms(roomResponses.filter((res) => res && res.data).map((res) => res.data)); // Filter out null responses
    } catch (error) {
      console.error('Error fetching hotel details:', error);
    }
  };

  const handleAddRoomsClick = () => {
    setShowRoomManager(!showRoomManager);
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      await axios.delete(`http://localhost:5000/api/rooms/${roomId}/${hotelId}`, {
        withCredentials: true,
      });
      // Filter out the deleted room from the state
      setRooms((prevRooms) => prevRooms.filter((room) => room._id !== roomId));
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  const handleEditRoom = (room) => {
    setEditingRoom(room);
  };

  const handleUpdateRoom = async (updatedRoom) => {
    try {
      await axios.put(`http://localhost:5000/api/rooms/${updatedRoom._id}`, updatedRoom, {
        withCredentials: true,
      });
      setEditingRoom(null);
      fetchHotelDetails(); // Refresh the room list
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };

  if (!hotel) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <AdminNavBar />
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-300">
      <h2 className="text-2xl font-mono font-bold text-gray-800">{hotel.name}</h2>
      <p className="text-gray-600 mt-2">{hotel.description}</p>
      <p className="text-sm text-blue-600 font-semibold">{hotel.location}</p>
  
      <h3 className="text-xl font-mono font-bold text-gray-800 mt-6">Available Rooms</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <RoomCard
              key={room._id}
              room={room}
              onDelete={() => handleDeleteRoom(room._id)}
              onEdit={() => handleEditRoom(room)}
            />
          ))
        ) : (
          <p>No rooms available.</p>
        )}
      </div>
  
      <button
        onClick={handleAddRoomsClick}
        className="bg-green-500 hover:bg-green-600 text-white font-mono font-semibold px-4 py-2 rounded-lg mt-6 transition cursor-pointer"
      >
        {showRoomManager ? 'Hide Room Manager' : 'Add Rooms'}
      </button>
  
      {showRoomManager && (
        <div className="mt-6">
          <RoomManager hotelId={hotelId} onRoomAdded={fetchHotelDetails} />
        </div>
      )}
      {editingRoom && (
        <EditRoomForm
          room={editingRoom}
          onUpdate={handleUpdateRoom}
          onCancel={() => setEditingRoom(null)}
        />
      )}
    </div>
  </>
  

  );
};

const RoomCard = ({ room, onDelete, onEdit }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % room.photos.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? room.photos.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
  <h4 className="text-lg font-bold text-gray-800">Room {room.roomNumber}</h4>
  <p className="text-gray-600">Type: {room.title}</p>
  <p className="text-gray-600">Description: {room.desc}</p>
  <p className="text-gray-600">Price: {room.price}</p>
  <p className="text-gray-600">Occupancy: {room.maxPeople}</p>
  <p className="text-gray-600">Discount: {room.discount}%</p>
  {room.photos && room.photos.length > 0 && (
    <div className="relative mt-2">
      <img
        src={room.photos[currentImageIndex]}
        alt="Room"
        className="w-full h-32 object-cover rounded-md"
      />
      {room.photos.length > 1 && (
        <div className="absolute top-0 left-0 right-0 flex justify-between">
          <button
            onClick={handlePrevImage}
            className="bg-gray-500 text-white p-1 rounded-l-md hover:bg-gray-600 transition cursor-pointer"
          >
            &lt;
          </button>
          <button
            onClick={handleNextImage}
            className="bg-gray-500 text-white p-1 rounded-r-md hover:bg-gray-600 transition cursor-pointer"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  )}
  <div className="mt-4">
    <button
      onClick={onEdit}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition cursor-pointer"
    >
      Edit
    </button>
    <button
      onClick={onDelete}
      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg ml-2 transition cursor-pointer"
    >
      Delete
    </button>
  </div>
</div>

  );
};

const EditRoomForm = ({ room, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState(room);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="p-6 border mt-6 bg-white rounded-lg shadow-md">
  <h3 className="text-xl font-mono font-bold mb-4 text-gray-800">Edit Room</h3>
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2">Room Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2">Max People</label>
      <input
        type="number"
        name="maxPeople"
        value={formData.maxPeople}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
      <textarea
        name="desc"
        value={formData.desc}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="4"
      />
    </div>
    <div className="flex space-x-4">
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-mono font-semibold px-4 py-2 rounded-lg transition cursor-pointer"
      >
        Update
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="bg-gray-500 hover:bg-gray-600 text-white font-mono font-semibold px-4 py-2 rounded-lg transition cursor-pointer"
      >
        Cancel
      </button>
    </div>
  </form>
</div>

  );
};

export default HotelDetailsPage;