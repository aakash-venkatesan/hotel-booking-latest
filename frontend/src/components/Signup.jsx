import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginNavBar from './LoginNavBar';
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    navigate("/register", { state: { username: formData.username, password: formData.password } });
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="p-8 rounded-lg shadow-lg border border-gray-300 bg-white w-96">
          <h2 className="text-2xl py-2 font-mono font-bold text-gray-700 text-center">Sign Up</h2>

          <form onSubmit={handleSubmit} className="p-4 rounded-lg flex flex-col">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium text-left py-2 font-mono">User Name</label>
              <input
                type="text"
                name="username"
                className="w-full border border-gray-400 rounded-md p-2 h-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
                required
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium text-left py-2 font-mono">Password</label>
              <input
                type="password"
                name="password"
                className="w-full border border-gray-400 rounded-md p-2 h-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium text-left py-2 font-mono">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full border border-gray-400 rounded-md p-2 h-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {error && <p className="text-red-500 font-mono text-sm">{error}</p>}

            <div className="text-gray-700 font-medium text-right font-mono text-sm mt-2">
              <a href="/" className="text-blue-500 hover:underline">Already a User? Sign in</a>
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
    </>

  );
};

export default Signup;
