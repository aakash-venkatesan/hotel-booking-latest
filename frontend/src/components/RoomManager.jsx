import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomManager = ({ hotelId }) => {
  const [room, setRoom] = useState({
    title: '',
    price: '',
    discount: '',
    maxPeople: '',
    desc: '',
    photos: [],
    roomNumbers: [{ number: '', unavailableDates: [] }], // Initialize with an empty room number
  });

  const [existingRooms, setExistingRooms] = useState([]); // Initialize as an empty array
  const userId = sessionStorage.getItem('userid'); // Adjust this line based on how you store the user ID in the session

  // Fetch existing rooms when the component mounts
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/rooms/${hotelId}`, {
          withCredentials: true,
        });
        setExistingRooms(response.data || []); // Ensure it's an array
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setExistingRooms([]); // Ensure it remains an array
      }
    };

    fetchRooms();
  }, [hotelId]);

  const handleRoomChange = (e) => {
    const { name, value } = e.target;
    setRoom((prevRoom) => ({
      ...prevRoom,
      [name]: value,
    }));
  };

  const handleRoomNumberChange = (e) => {
    const { value } = e.target;
    setRoom((prevRoom) => ({
      ...prevRoom,
      roomNumbers: [{ number: value, unavailableDates: [] }], // Update the room number
    }));
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map((file) => URL.createObjectURL(file));
    setRoom((prevRoom) => ({
      ...prevRoom,
      photos: [...prevRoom.photos, ...newPhotos],
    }));
  };

  const handleImageDelete = (photoIndex) => {
    setRoom((prevRoom) => ({
      ...prevRoom,
      photos: prevRoom.photos.filter((_, j) => j !== photoIndex),
    }));
  };

  const uploadImagesToCloudinary = async (images) => {
    const uploadPromises = images.map(async (image) => {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'hotel-booking');

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/drn7pbcb8/image/upload',
        formData
      );
      return response.data.secure_url;
    });

    return Promise.all(uploadPromises);
  };

  const handlePublish = async () => {
    try {
      const roomPhotoFiles = await Promise.all(
        room.photos.map(async (url) => {
          const response = await fetch(url);
          return response.blob();
        })
      );
      const roomPhotoUrls = await uploadImagesToCloudinary(roomPhotoFiles);

      // Prepare the room data in the required format
      const finalData = {
        title: room.title,
        price: room.price,
        discount: room.discount,
        maxPeople: room.maxPeople,
        desc: room.desc,
        photos: roomPhotoUrls,
        roomNumbers: room.roomNumbers.map((roomNumber) => ({
          number: roomNumber.number,
          unavailableDates: roomNumber.unavailableDates,
        })),
        userId: userId, // Include userId in the final data
      };

      console.log('Final data to send:', finalData); // Debugging line

      await axios.post(`http://localhost:5000/api/rooms/${hotelId}`, finalData, {
        withCredentials: true,
      });

      alert('Room published successfully!');
      console.log('Room data:', finalData);
      // Reset the room state after successful submission
      setRoom({
        title: '',
        price: '',
        discount: '',
        maxPeople: '',
        desc: '',
        photos: [],
        roomNumbers: [{ number: '', unavailableDates: [] }], // Reset room number
      });

      // Fetch the updated list of rooms
      const response = await axios.get(`http://localhost:5000/api/rooms/${hotelId}`, {
        withCredentials: true,
      });
      setExistingRooms(response.data || []); // Ensure it's an array
    } catch (error) {
      console.error('Error publishing room:', error);
      alert('There was an error publishing the room. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-300">
      <h2 className="text-2xl font-mono font-bold text-gray-800 mb-4">Manage Room</h2>

      <div className="mb-6 p-6 bg-gray-50 rounded-lg border border-gray-300 shadow-sm">
        <div className="mb-4">
          <label className="block font-mono font-semibold text-gray-700 mb-1">Room Title</label>
          <input
            type="text"
            name="title"
            value={room.title}
            onChange={handleRoomChange}
            className="border border-gray-300 p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-mono font-semibold text-gray-700 mb-1">Room Price</label>
          <input
            type="number"
            name="price"
            value={room.price}
            onChange={handleRoomChange}
            className="border border-gray-300 p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-mono font-semibold text-gray-700 mb-1">Discount</label>
          <input
            type="number"
            name="discount"
            value={room.discount}
            onChange={handleRoomChange}
            className="border border-gray-300 p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block font-mono font-semibold text-gray-700 mb-1">Max People</label>
          <input
            type="number"
            name="maxPeople"
            value={room.maxPeople}
            onChange={handleRoomChange}
            className="border border-gray-300 p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-mono font-semibold text-gray-700 mb-1">Room Number</label>
          <input
            type="text"
            name="roomNumber"
            value={room.roomNumbers[0].number}
            onChange={handleRoomNumberChange}
            className="border border-gray-300 p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-mono font-semibold text-gray-700 mb-1">Description</label>
          <textarea
            name="desc"
            value={room.desc}
            onChange={handleRoomChange}
            className="border border-gray-300 p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block font-mono font-semibold text-gray-700 mb-1">Room Photos</label>
          <input
            type="file"
            multiple
            onChange={handleImageSelect}
            className="border border-gray-300 p-2 w-full rounded-lg cursor-pointer"
            required
          />
          <div className="mt-3 flex flex-wrap gap-3">
            {room.photos.map((photo, photoIndex) => (
              <div key={photoIndex} className="relative w-24 h-24 border rounded-lg overflow-hidden">
                <img src={photo} alt="Room" className="w-full h-full object-cover" />
                <button
                  onClick={() => handleImageDelete(photoIndex)}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 rounded-lg shadow-md hover:bg-red-600 transition cursor-pointer"
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handlePublish}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-mono font-bold py-2 rounded-lg transition cursor-pointer"
        >
          Publish Room
        </button>
      </div>
    </div>



  );
};

export default RoomManager;