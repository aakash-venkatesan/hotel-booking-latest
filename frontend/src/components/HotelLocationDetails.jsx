import React, { useContext, useState } from 'react';
import { FormContext } from '../context/FormContext';

const HotelLocationDetails = ({ next, prev }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [locationDetails, setLocationDetails] = useState({
    city: formData.city || '',
    address: formData.address || '',
    state: formData.state || '',
    country: formData.country || '',
    code: formData.code || '',
    distance: formData.distance || '',
  });

  const handleChange = (e) => {
    setLocationDetails({ ...locationDetails, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (
      locationDetails.city &&
      locationDetails.address &&
      locationDetails.state &&
      locationDetails.country &&
      locationDetails.code &&
      locationDetails.distance
    ) {
      setFormData({ ...formData, ...locationDetails });
      next();
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Location Details</h2>
        <div className="mb-6">
          <label className="block mb-2 text-gray-700">Country</label>
          <input
            type="text"
            name="country"
            value={locationDetails.country}
            onChange={handleChange}
            placeholder="Enter country"
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-gray-700">State</label>
          <input
            type="text"
            name="state"
            value={locationDetails.state}
            onChange={handleChange}
            placeholder="Enter state"
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-gray-700">City</label>
          <input
            type="text"
            name="city"
            value={locationDetails.city}
            onChange={handleChange}
            placeholder="Enter city"
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={locationDetails.address}
            onChange={handleChange}
            placeholder="Enter address"
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-gray-700">Postal Code</label>
          <input
            type="text"
            name="code"
            value={locationDetails.code}
            onChange={handleChange}
            placeholder="Enter postal code"
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-gray-700">Distance to Nearby Location</label>
          <input
            type="text"
            name="distance"
            value={locationDetails.distance}
            onChange={handleChange}
            placeholder="Enter distance"
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex justify-between">
          <button onClick={prev} className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition">
            Previous
          </button>
          <button onClick={handleNext} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelLocationDetails;