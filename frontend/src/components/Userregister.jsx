import React from 'react'
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import LoginNavBar from './LoginNavBar';
const Userregister = () => {
  const location = useLocation();
  const receivedData = location.state || {};
  const [formData, setFormData] = useState({
    name: "",
    username: receivedData.username,
    email: "",
    password: receivedData.password,
    type: "",
    age: "",
    gender: "",
    wallet: "",
    nationality: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    isAdmin: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful!");
        setFormData({
          name: "",
          username: receivedData.username,
          email: "",
          password: receivedData.password,
          type: "",
          age: "",
          gender: "",
          wallet: "",
          nationality: "",
          phone: "",
          country: "",
          state: "",
          city: "",
          isAdmin: false,
        });
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while registering.");
    }
  };

  return (
    <>
      <LoginNavBar />
      <div className='flex justify-center items-center h-screen mt-20'>
        <div className="p-8 rounded-lg min-w-2xl h-screen ">
          <h2 className="text-2xl py-2 font-mono font-bold">
            Register
          </h2>
          <form onSubmit={handleSubmit} className=" p-6 rounded-lg flex flex-col ">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium text-left py-2 font-mono">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-black rounded-md p-2 h-12"
                placeholder="Enter your Name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium text-left py-2 font-mono">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-black rounded-md h-12 p-2"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium text-left py-2 font-mono">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border border-black rounded-md h-12 p-2"
                placeholder="Country Name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium text-left py-2 font-mono">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full border border-black rounded-md h-12 p-2"
                placeholder="State Name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium text-left py-2 font-mono">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border border-black rounded-md h-12 p-2"
                placeholder="City Name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium text-left py-2 font-mono">Phone no</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-black rounded-md h-12 p-2"
                placeholder="Enter your Phone no"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium text-left py-2 font-mono">Age</label>
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full border border-black rounded-md h-12 p-2"
                placeholder="Enter your Phone no"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium text-left py-2 font-mono">Wallet</label>
              <input
                type="text"
                name="wallet"
                value={formData.wallet}
                onChange={handleChange}
                className="w-full border border-black rounded-md h-12 p-2"
                placeholder="Enter your wallet amount"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium text-left py-2 font-mono">Nationality</label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="w-full border border-black rounded-md h-12 p-2"
                placeholder="Enter your Nationality"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium text-left py-2 font-mono">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-black rounded-md h-12 p-2 text-gray-700"
                placeholder="Select User Type"
                required
              >
                <option value="" className='text-gray-700 font-medium text-left py-2 font-mono'>Select User Type</option>
                <option value="guest" className='text-gray-700 font-medium text-left py-2 font-mono'>Guest</option>
                <option value="admin" className='text-gray-700 font-medium text-left py-2 font-mono'>Admin</option>
                <option value="hotel_owner" className='text-gray-700 font-medium text-left py-2 font-mono'>Hotel Owner</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium text-left py-2 font-mono">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-black rounded-md h-12 p-2 text-gray-700"
                required
              >
                <option value="">Select your Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                name="isAdmin"
                checked={formData.isAdmin}
                onChange={handleChange}
                id="isAdmin"
                className="w-5 h-5 mr-2"
              />
              <label htmlFor="isAdmin" className="text-gray-700 font-medium text-left py-2 font-mono">
                Is Admin?
              </label>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 transition font-mono mt-2"
            > Sign up
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Userregister
