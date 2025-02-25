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
    <LoginNavBar/>
    <div className="flex justify-center items-center h-screen">
      <div className="p-8 rounded-lg min-w-2xl min-h-[300px]">
        <h2 className="text-2xl py-2 font-mono font-bold">Sign Up</h2>
        <form onSubmit={handleSubmit} className="p-6 rounded-lg flex flex-col">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium text-left py-2 font-mono">User Name</label>
            <input
              type="text"
              name="username"
              className="w-full border border-black rounded-md p-2 h-12"
              placeholder="Enter the username"
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
              className="w-full border border-black rounded-md h-12 p-2"
              placeholder="Enter the password"
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
              className="w-full border border-black rounded-md h-12 p-2"
              placeholder="Confirm the password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {error && <p className="text-red-500 font-mono">{error}</p>}

          <div className="block text-gray-700 font-medium text-right font-mono">
            <a href='/'>Already a User? Sign in</a>
          </div>
          
          <button
            type="submit"
            className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 transition font-mono mt-2"
          > 
            Sign up
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Signup;
