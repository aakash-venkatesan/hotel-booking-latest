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
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-3xl p-8 rounded-lg shadow-lg border border-gray-300 bg-white">
                <h2 className="text-3xl font-mono font-bold text-gray-700 text-center pb-4">User Profile</h2>

                <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg">
                    {isEditing ? (
                        <div className="space-y-4">
                            {[
                                { label: "Name", name: "name" },
                                { label: "Username", name: "username" },
                                { label: "Email", name: "email" },
                                { label: "Age", name: "age" },
                                { label: "Wallet", name: "wallet" },
                                { label: "Nationality", name: "nationality" },
                                { label: "Phone", name: "phone" },
                                { label: "Country", name: "country" },
                                { label: "State", name: "state" },
                                { label: "City", name: "city" },
                            ].map((field) => (
                                <div key={field.name} className="flex items-center gap-3">
                                    <label className="text-gray-700 font-mono font-medium w-32">{field.label}:</label>
                                    <input
                                        type="text"
                                        name={field.name}
                                        value={editedUser[field.name]}
                                        onChange={handleInputChange}
                                        className="border border-gray-400 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            ))}

                            <div className="flex items-center gap-3">
                                <label className="text-gray-700 font-mono font-medium w-32">User Type:</label>
                                <select
                                    name="type"
                                    value={editedUser.type}
                                    onChange={handleInputChange}
                                    className="border border-gray-400 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select User Type</option>
                                    <option value="guest">Guest</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-3">
                                <label className="text-gray-700 font-mono font-medium w-32">Gender:</label>
                                <select
                                    name="gender"
                                    value={editedUser.gender}
                                    onChange={handleInputChange}
                                    className="border border-gray-400 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            <div className="flex gap-4 mt-3">
                                <button
                                    onClick={handleSave}
                                    className="bg-transparent text-green-700 font-semibold border border-green-500 hover:bg-green-500 hover:text-white transition w-full py-2 rounded-lg font-mono cursor-pointer"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={handleCancelEdit}
                                    className="bg-transparent text-gray-700 font-semibold border border-gray-500 hover:bg-gray-500 hover:text-white transition w-full py-2 rounded-lg font-mono cursor-pointer"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-gray-700 space-y-2">
                            {Object.entries(user)
                                .filter(([key]) => !["_id", "password", "createdAt", "updatedAt", "__v", "isAdmin"].includes(key))
                                .map(([key, value]) => (
                                    <p key={key} className="mb-1">
                                        <strong className="text-gray-800 font-mono capitalize">{key.replace(/([A-Z])/g, " $1")}:</strong> {value}
                                    </p>
                                ))}
                            <div className="flex gap-4 mt-4">
                                <button
                                    onClick={handleEditClick}
                                    className="bg-transparent text-blue-700 font-semibold border border-blue-500 hover:bg-blue-500 hover:text-white transition w-full py-2 rounded-lg font-mono cursor-pointer"
                                >
                                    Edit Profile
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="bg-transparent text-red-700 font-semibold border border-red-500 hover:bg-red-500 hover:text-white transition w-full py-2 rounded-lg font-mono cursor-pointer"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <h2 className="text-3xl font-mono font-bold text-gray-700 text-center py-4">Previous Room Bookings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.length > 0 ? (
                        bookings.map((booking) => (
                            <div key={booking.id} className="bg-white border border-gray-300 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                                <img src={booking.image} alt={booking.hotelName} className="w-full h-40 object-cover rounded-md border border-gray-300" />
                                <div className="mt-3 space-y-1">
                                    <h3 className="text-lg font-mono font-semibold text-gray-700">{booking.hotelName}</h3>
                                    <p className="text-gray-600">{booking.roomType}</p>
                                    <p className="text-gray-500 italic">{booking.checkIn} to {booking.checkOut}</p>
                                    <p className="text-green-600 font-bold">Price: ${booking.price}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600 text-center">No bookings found.</p>
                    )}
                </div>
            </div>
        </div>




    );
};

export default UserProfile;
