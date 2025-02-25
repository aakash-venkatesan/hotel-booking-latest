import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const userId = sessionStorage.getItem('userid');
            console.log(userId);
            try {
                const userResponse = await axios.get(`http://localhost:5000/api/users/${userId}`, {
                    withCredentials: true
                });
                setUser(userResponse.data);
                setEditedUser(userResponse.data);

                // Fetch user bookings (✅ Includes cookies)
                const bookingsResponse = await axios.get("http://localhost:5000/api/bookings/", {
                    withCredentials: true
                });
                setBookings(bookingsResponse.data);
            } catch (err) {
                console.error("Error:", err);
                setError(err.response?.data?.message || "Authorization failed. Please log in again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleEditClick = () => setIsEditing(true);
    const handleCancelEdit = () => {
        setEditedUser(user);
        setIsEditing(false);
    };
    const handleInputChange = (e) => {
        setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        const userId = sessionStorage.getItem('userid');
        try {
            // Update user profile (✅ Includes cookies)
            const response = await axios.put(`http://localhost:5000/api/users/${userId}`, editedUser, {
                withCredentials: true
            });
            setUser(response.data);
            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (err) {
            console.error("Update Error:", err);
            alert("Error updating profile: " + (err.response?.data?.message || err.message));
        }
    };

    const handleLogout = async () => {
        try {
          await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
    
          // Optional: Clear any stored user info
          localStorage.removeItem("user");
          localStorage.removeItem("access_token");
    
          // Redirect to login page
          navigate("/");
        } catch (error) {
          console.error("Logout failed:", error);
        }
      };

    if (loading) return <p className="text-center">Loading user data...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            <div className="border p-4 rounded-lg shadow flex items-center gap-4">
                {isEditing ? (
                    <div className="flex flex-col gap-2">
                        <div className="flex ">
                        <label className="block text-gray-700 font-medium text-left py-2 px-2 font-mono">Name :</label>
                        <input
                            type="text"
                            name="name"
                            value={editedUser.name}
                            onChange={handleInputChange}
                            className="border rounded px-2 py-1"
                        />
                        </div>
                        <div className="flex ">
                        <label className="block text-gray-700 font-medium text-left py-2 px-2 font-mono">Username :</label>
                        <input
                            type="text"
                            name="username"
                            value={editedUser.username}
                            onChange={handleInputChange}
                            className="border rounded px-2 py-1"
                        />
                        </div>
                        <div className="flex ">
                        <label className="block text-gray-700 font-medium text-left py-2 px-2 font-mono">Email :</label>
                        <input
                            type="text"
                            name="email"
                            value={editedUser.email}
                            onChange={handleInputChange}
                            className="border rounded px-2 py-1"
                        />
                        </div>
                        <div className="flex ">
                        <label className="block text-gray-700 font-medium text-left py-2 px-2 font-mono">UserType :</label>
                        <select
                            name="type"
                            value={editedUser.type}
                            onChange={handleInputChange}
                            className="border rounded px-2 py-1"
                        >
                            <option value="">Select User Type</option>
                            <option value="guest">Guest</option>
                            <option value="admin">Admin</option>
                        </select>
                        </div>
                        <div className="flex ">
                        <label className="block text-gray-700 font-medium text-left py-2 px-2 font-mono">Age :</label>
                        <input
                            type="text"
                            name="age"
                            value={editedUser.age}
                            onChange={handleInputChange}
                            className="border rounded px-2 py-1"
                        />
                        </div>
                        <div className="flex ">
                        <label className="block text-gray-700 font-medium text-left py-2 px-2 font-mono">Phone :</label>
                        <select
                            name="phone"
                            value={editedUser.gender}
                            onChange={handleInputChange}
                            className="border rounded px-2 py-1"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        </div>
                        <div className="flex ">
                        <label className="block text-gray-700 font-medium text-left py-2 px-2 font-mono">Wallet :</label>
                        <input
                            type="text"
                            name="wallet"
                            value={editedUser.wallet}
                            onChange={handleInputChange}
                            className="border rounded px-2 py-1"
                        />
                        </div>
                        <div className="flex ">
                        <label className="block text-gray-700 font-medium text-left py-2 px-2 font-mono">Nationality :</label>
                        <input
                            type="text"
                            name="nationality"
                            value={editedUser.nationality}
                            onChange={handleInputChange}
                            className="border rounded px-2 py-1"
                        />
                        </div>
                        <div className="flex ">
                        <label className="block text-gray-700 font-medium text-left py-2 px-2 font-mono">Phone :</label>
                        <input
                            type="text"
                            name="phone"
                            value={editedUser.phone}
                            onChange={handleInputChange}
                            className="border rounded px-2 py-1"
                        />
                        </div>
                        <div className="flex ">
                        <label className="block text-gray-700 font-medium text-left py-2 px-2 font-mono">Country :</label>
                        <input
                            type="text"
                            name="country"
                            value={editedUser.country}
                            onChange={handleInputChange}
                            className="border rounded px-2 py-1"
                        />
                        </div>
                        <div className="flex ">
                        <label className="block text-gray-700 font-medium text-left py-2 px-2 font-mono">State :</label>
                        <input
                            type="text"
                            name="state"
                            value={editedUser.state}
                            onChange={handleInputChange}
                            className="border rounded px-2 py-1"
                        />
                        </div>
                        <div className="flex ">
                        <label className="block text-gray-700 font-medium text-left py-2 px-2 font-mono">City :</label>
                        <input
                            type="text"
                            name="city"
                            value={editedUser.city}
                            onChange={handleInputChange}
                            className="border rounded px-2 py-1"
                        />
                        </div>
                        <button onClick={handleSave} className="bg-green-500 text-white px-3 py-1 rounded">Save</button>
                        <button onClick={handleCancelEdit} className="bg-gray-500 text-white px-3 py-1 rounded">Cancel</button>
                    </div>
                ) : (
                    <div className="text-left">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>UserName:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Usertype:</strong> {user.type}</p>
                        <p><strong>Age:</strong> {user.age}</p>
                        <p><strong>Gender:</strong> {user.gender}</p>
                        <p><strong>Wallet:</strong> {user.wallet}</p>
                        <p><strong>Nationality:</strong> {user.nationality}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>
                        <p><strong>Country:</strong> {user.country}</p>
                        <p><strong>State:</strong> {user.state}</p>
                        <p><strong>City:</strong> {user.city}</p>
                        <button onClick={handleEditClick} className="bg-blue-500 text-white px-3 py-1 mt-2 rounded">Edit Profile</button>
                        <button onClick={handleLogout} className="bg-blue-500 text-white px-3 py-1 mt-2 rounded ml-5">Logout</button>
                    </div>
                )}
            </div>

            <h2 className="text-2xl font-bold my-6">Previous Room Bookings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-1">
                {bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <div key={booking.id} className="border rounded-lg shadow p-4">
                            <img
                                src={booking.image}
                                alt={booking.hotelName}
                                className="w-full h-32 object-cover rounded"
                            />
                            <p><strong>{booking.hotelName}</strong></p>
                            <p>{booking.roomType}</p>
                            <p>{booking.checkIn} to {booking.checkOut}</p>
                            <p>{booking.price}</p>
                        </div>
                    ))
                ) : (
                    <p>No bookings found.</p>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
