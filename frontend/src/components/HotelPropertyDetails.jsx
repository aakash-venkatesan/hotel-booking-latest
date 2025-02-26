import React, { useContext, useState } from 'react';
import { FormContext } from '../context/FormContext';
import axios from 'axios';
import AdminNavBar from './NavBar';

const HotelPropertyDetails = ({ prev }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [propertyDetails, setPropertyDetails] = useState({
    offerings: formData.offerings || [],
    cheapestPrice: formData.cheapestPrice || '',
    cancellationPolicy: formData.cancellationPolicy || '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setPropertyDetails({
        ...propertyDetails,
        offerings: checked
          ? [...propertyDetails.offerings, value]
          : propertyDetails.offerings.filter((offering) => offering !== value),
      });
    } else {
      setPropertyDetails({ ...propertyDetails, [name]: value });
    }
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
    if (
      propertyDetails.offerings.length >= 1 &&
      propertyDetails.cheapestPrice &&
      propertyDetails.cancellationPolicy
    ) {
      try {
        // Convert local image URLs to blobs
        const hotelPhotoFiles = formData.photos.map((url) =>
          fetch(url).then((res) => res.blob())
        );
        const hotelPhotos = await Promise.all(hotelPhotoFiles);

        // Upload images to Cloudinary
        const hotelPhotoUrls = await uploadImagesToCloudinary(hotelPhotos);

        const finalData = {
          ...formData,
          photos: hotelPhotoUrls,
          offerings: propertyDetails.offerings,
          cheapestPrice: parseFloat(propertyDetails.cheapestPrice),
          cancellationPolicy: propertyDetails.cancellationPolicy,
        };

        // Send the finalData to your backend
        await axios.post('http://localhost:5000/api/hotels', finalData, {
          withCredentials: true,
        });
        alert('Hotel published successfully!');
        console.log('Hotel data:', finalData);
      } catch (error) {
        console.error('Error publishing hotel:', error);
        alert('There was an error publishing the hotel. Please try again.');
      }
    } else {
      alert('Please fill in all fields and select at least one offering.');
    }
  };

  return (
    <>
    <AdminNavBar/>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Property Details</h2>
        <div className="mb-6">
          <label className="block mb-2 text-gray-700">Offerings</label>
          <div className="flex flex-wrap gap-2">
            {['ac', 'pets allowed', 'transport to airport', 'complimentary wifi', 'breakfast', 'daily cleaning', 'laundry service'].map((offering) => (
              <label key={offering} className="flex items-center">
                <input
                  type="checkbox"
                  name="offerings"
                  value={offering}
                  checked={propertyDetails.offerings.includes(offering)}
                  onChange={handleChange}
                  className="mr-2"
                />
                {offering.charAt(0).toUpperCase() + offering.slice(1)}
              </label>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-gray-700">Cheapest Price</label>
          <input
            type="number"
            name="cheapestPrice"
            value={propertyDetails.cheapestPrice}
            onChange={handleChange}
            placeholder="Enter cheapest price"
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-gray-700">Cancellation Policy</label>
          <select
            name="cancellationPolicy"
            value={propertyDetails.cancellationPolicy}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Policy</option>
            <option value="Refundable upto 1 day before check-in date">
              Refundable upto 1 day before check-in date
            </option>
            <option value="Refundable upto 3 day before check-in date">
              Refundable upto 3 day before check-in date
            </option>
            <option value="Non-refundable">Non-refundable</option>
          </select>
        </div>
        <div className="flex justify-between">
          <button onClick={prev} className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition">
            Previous
          </button>
          <button onClick={handlePublish} className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition">
            Publish
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default HotelPropertyDetails;