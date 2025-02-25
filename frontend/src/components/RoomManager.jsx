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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Room</h2>
      <div className="mb-4 border p-4">
        <div className="mb-2">
          <label className="block mb-1">Room Title</label>
          <input
            type="text"
            name="title"
            value={room.title}
            onChange={handleRoomChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Room Price</label>
          <input
            type="number"
            name="price"
            value={room.price}
            onChange={handleRoomChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Discount</label>
          <input
            type="number"
            name="discount"
            value={room.discount}
            onChange={handleRoomChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Max People</label>
          <input
            type="number"
            name="maxPeople"
            value={room.maxPeople}
            onChange={handleRoomChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Room Number</label>
          <input
            type="text"
            name="roomNumber"
            value={room.roomNumbers[0].number} // Access the first room number
            onChange={handleRoomNumberChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Description</label>
          <textarea
            name="desc"
            value={room.desc}
            onChange={handleRoomChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Room Photos</label>
          <input
            type="file"
            multiple
            onChange={handleImageSelect}
            className="border p-2 w-full"
            required
          />
          <div className="mt-2 flex">
            {room.photos.map((photo, photoIndex) => (
              <div key={photoIndex} className="relative mr-2">
                <img src={photo} alt="Room" className="w-32 h-32 object-cover" />
                <button
                  onClick={() => handleImageDelete(photoIndex)}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <button onClick={handlePublish} className="bg-blue-500 text-white p-2">
          Publish Room
        </button>
      </div>
    </div>
  );
};

export default RoomManager;