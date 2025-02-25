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
            console.log("Response Data:", data);  // Debugging step
    
            sessionStorage.setItem('userid',data.details._id)
    
            navigate('/profile');  // Ensure this line executes
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);  // Display error on UI
        }
    };
    
    return (
        <>
            <LoginNavBar />
            <div className='flex justify-center items-center h-screen'>
                <div className="p-8 rounded-lg min-w-2xl min-h-[300px]">
                    <h2 className="text-2xl py-2 font-mono font-bold">Sign in</h2>

                    {error && <p className="text-red-500">{error}</p>}

                    <form onSubmit={handleSubmit} className="p-6 rounded-lg flex flex-col">
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium text-left py-2 font-mono">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-black rounded-md p-2 h-12"
                                placeholder="Enter the username"
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
                                className="w-full border border-black rounded-md h-12 p-2"
                                placeholder="Enter the password"
                                required
                            />
                        </div>
                        <div className='block text-gray-700 font-medium text-right font-mono'>
                            <a href='/signup'>New User? Sign up</a>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 transition font-mono mt-2"
                        >
                            Sign in
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
