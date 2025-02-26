import React from 'react'
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
const Userregister = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
        navigate("/home")
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while registering.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-8 rounded-lg shadow-lg border border-gray-300 bg-white w-[600px]">
        <h2 className="text-3xl py-4 font-mono font-bold text-gray-700 text-center">Register</h2>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col space-y-4">
          <div>
            <label className="block text-gray-700 font-medium py-2 font-mono">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-md p-2 h-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium py-2 font-mono">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-md p-2 h-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {["Country", "State", "City"].map((field) => (
              <div key={field}>
                <label className="block text-gray-700 font-medium py-2 font-mono">{field}</label>
                <input
                  type="text"
                  name={field.toLowerCase()}
                  value={formData[field.toLowerCase()]}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-md p-2 h-12"
                  placeholder={field}
                  required
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {["Phone", "Age"].map((field) => (
              <div key={field}>
                <label className="block text-gray-700 font-medium py-2 font-mono">{field}</label>
                <input
                  type={field === "Age" ? "number" : "text"}
                  name={field.toLowerCase()}
                  value={formData[field.toLowerCase()]}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-md p-2 h-12"
                  placeholder={`Enter ${field}`}
                  required
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {["Wallet", "Nationality"].map((field) => (
              <div key={field}>
                <label className="block text-gray-700 font-medium py-2 font-mono">{field}</label>
                <input
                  type="text"
                  name={field.toLowerCase()}
                  value={formData[field.toLowerCase()]}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-md p-2 h-12"
                  placeholder={`Enter ${field}`}
                  required
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-gray-700 font-medium py-2 font-mono ">User Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-md p-2 h-12 bg-white cursor-pointer"
              required
            >
              <option value="">Select User Type</option>
              <option value="guest">Guest</option>
              <option value="admin">Admin</option>
              <option value="hotel_owner">Hotel Owner</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium py-2 font-mono ">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-md p-2 h-12 bg-white cursor-pointer"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isAdmin"
              checked={formData.isAdmin}
              onChange={handleChange}
              id="isAdmin"
              className="w-5 h-5 cursor-pointer"
            />
            <label htmlFor="isAdmin" className="text-gray-700 font-medium font-mono ">
              Is Admin?
            </label>
          </div>

          <button
            type="submit"
            className="bg-transparent text-blue-700 font-semibold border border-blue-500 hover:bg-blue-500 hover:text-white transition w-full py-2 rounded-lg font-mono mt-4 cursor-pointer"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>

  )
}

export default Userregister
