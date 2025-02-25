import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginNavBar from './LoginNavBar';
const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Response Data:", data);

            sessionStorage.setItem('userid', data.details._id)
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('isAdmin', data.details.isAdmin)

            if (data.details.isAdmin) {
                navigate('/hotel-list');
            } else {
                navigate('/home');
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        }
    };

    return (
        <>
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="p-8 rounded-lg shadow-lg border border-gray-300 bg-white w-96">
                    <h2 className="text-2xl py-2 font-mono font-bold text-gray-700 text-center">Sign In</h2>

                    {error && <p className="text-red-500 font-mono text-sm text-center">{error}</p>}

                    <form onSubmit={handleSubmit} className="p-4 rounded-lg flex flex-col">
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium text-left py-2 font-mono">Email</label>
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

                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium text-left py-2 font-mono">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border border-gray-400 rounded-md p-2 h-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <div className="text-gray-700 font-medium text-right font-mono text-sm mt-2">
                            <a href="/signup" className="text-blue-500 hover:underline">New User? Sign up</a>
                        </div>

                        <button
                            type="submit"
                            className="bg-transparent text-blue-700 font-semibold border border-blue-500 hover:bg-blue-500 hover:text-white transition w-full py-2 rounded-lg font-mono mt-4 cursor-pointer"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </>


    );
};

export default Login;
