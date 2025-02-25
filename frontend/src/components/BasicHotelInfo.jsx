import React, { useContext, useState } from 'react';
import { FormContext } from '../context/FormContext';

const BasicHotelInfo = ({ next }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [basicInfo, setBasicInfo] = useState({
    name: formData.name || '',
    type: formData.type || '',
    title: formData.title || '',
    description: formData.description || '',
    photos: formData.photos || [],
  });

  const handleChange = (e) => {
    setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map((file) => URL.createObjectURL(file));
    setBasicInfo({ ...basicInfo, photos: [...basicInfo.photos, ...newPhotos] });
  };

  const handleImageDelete = (index) => {
    const updatedPhotos = basicInfo.photos.filter((_, i) => i !== index);
    setBasicInfo({ ...basicInfo, photos: updatedPhotos });
  };

  const handleNext = () => {
    if (
      basicInfo.name &&
      basicInfo.description &&
      basicInfo.photos.length > 0
    ) {
      setFormData({ ...formData, ...basicInfo });
      next();
    } else {
      alert('Please fill in all fields and upload at least one photo.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Basic Information</h2>
        <div className="mb-6">
          <label className="block mb-2 text-gray-700">Hotel Name</label>
          <input
            type="text"
            name="name"
            value={basicInfo.name}
            onChange={handleChange}
            placeholder="Enter hotel name"
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-gray-700">Description</label>
          <textarea
            name="description"
            value={basicInfo.description}
            onChange={handleChange}
            placeholder="Enter hotel description"
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-gray-700">Photos</label>
          <input
            type="file"
            multiple
            onChange={handleImageSelect}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="mt-4 flex flex-wrap">
            {basicInfo.photos.map((photo, index) => (
              <div key={index} className="relative mr-4 mb-4">
                <img src={photo} alt="Hotel" className="w-32 h-32 object-cover rounded-lg" />
                <button
                  onClick={() => handleImageDelete(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleNext} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition w-full">
          Next
        </button>
      </div>
    </div>
  );
};

export default BasicHotelInfo;