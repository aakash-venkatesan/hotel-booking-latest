import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomManager from '../components/RoomManager';
import { useParams } from 'react-router-dom';

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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{hotel.name}</h2>
      <p>{hotel.description}</p>
      <p className="text-sm text-gray-600">{hotel.location}</p>
      <h3 className="text-lg font-bold mt-4">Available Rooms</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
      <button onClick={handleAddRoomsClick} className="bg-green-500 text-white p-2 mt-4">
        {showRoomManager ? 'Hide Room Manager' : 'Add Rooms'}
      </button>
      {showRoomManager && <RoomManager hotelId={hotelId} onRoomAdded={fetchHotelDetails} />}
      {editingRoom && (
        <EditRoomForm room={editingRoom} onUpdate={handleUpdateRoom} onCancel={() => setEditingRoom(null)} />
      )}
    </div>
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
    <div className="border p-4">
      <h4 className="text-lg font-bold">Room {room.roomNumber}</h4>
      <p>Type: {room.title}</p>
      <p>Description: {room.desc}</p>
      <p>Price: {room.price}</p>
      <p>Occupancy: {room.maxPeople}</p>
      <p>Discount: {room.discount}%</p>
      {room.photos && room.photos.length > 0 && (
        <div className="relative">
          <img
            src={room.photos[currentImageIndex]}
            alt="Room"
            className="w-full h-32 object-cover mt-2"
          />
          {room.photos.length > 1 && (
            <div className="absolute top-0 left-0 right-0 flex justify-between">
              <button onClick={handlePrevImage} className="bg-gray-500 text-white p-1">
                &lt;
              </button>
              <button onClick={handleNextImage} className="bg-gray-500 text-white p-1">
                &gt;
              </button>
            </div>
          )}
        </div>
      )}
      <button onClick={onEdit} className="bg-blue-500 text-white p-2 mt-2">
        Edit
      </button>
      <button onClick={onDelete} className="bg-red-500 text-white p-2 mt-2 ml-2">
        Delete
      </button>
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
    <div className="p-4 border mt-4">
      <h3 className="text-lg font-bold mb-2">Edit Room</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block mb-1">Room Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Max People</label>
          <input
            type="number"
            name="maxPeople"
            value={formData.maxPeople}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Description</label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
          Update
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white p-2 mt-2 ml-2">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default HotelDetailsPage;