import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/hotels/";

const topDestinations = [
  { name: "New York", img: "https://images.unsplash.com/photo-1483653364400-eedcfb9f1f88?w=600&auto=format&fit=crop&q=60" },
  { name: "Miami", img: "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?w=600&auto=format&fit=crop&q=60" },
  { name: "San Francisco", img: "https://plus.unsplash.com/premium_photo-1673002094407-a72547fa791a?w=600&auto=format&fit=crop&q=60" },
  { name: "Phoenix", img: "https://images.unsplash.com/photo-1558362380-0d84fba529f3?w=600&auto=format&fit=crop&q=60" },
  { name: "Denver", img: "https://images.unsplash.com/photo-1617246405400-462cb1ab98ab?w=600&auto=format&fit=crop&q=60" },
];

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [popularHotels, setPopularHotels] = useState([]); // State for popular hotels
  const navigate = useNavigate();

  useEffect(() => {
    fetchPopularHotels(); // Fetch popular hotels on page load
  }, []);

  // Fetch top-rated hotels from API
  const fetchPopularHotels = async () => {
    try {
      const response = await axios.get(API_BASE_URL, {
        params: { sortBy: "rating", order: "desc", limit: 5 }, // Sort by highest rating
      });
      setPopularHotels(response.data);
    } catch (error) {
      console.error("Error fetching popular hotels:", error);
    }
  };

  useEffect(() => {
    if (searchTerm.length > 1) {
      fetchHotels(searchTerm);
    } else {
      setFilteredCities([]);
    }
  }, [searchTerm]);

  const fetchHotels = async (query) => {
    try {
      const response = await axios.get(API_BASE_URL, {
        params: { city: query, limit: 10 },
        withCredentials: true,
      });
      const uniqueCities = [...new Set(response.data.map((hotel) => hotel.city))].map((city) => ({ name: city }));
      setFilteredCities(uniqueCities);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const handleSearch = () => {
    if (searchTerm) {
      navigate(`/search-results?city=${searchTerm}`);
    } else {
      alert("Please enter a destination before searching.");
    }
  };

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDestinationClick = (location) => {
    setSearchTerm(location.name);
    setFilteredCities([]);
    navigate(`/search-results?city=${location.name}`);
  };

  // Handle click on a popular hotel
  const handleHotelClick = (hotelId) => {
    navigate(`/hotel/${hotelId}`);
  };

  return (
    <div className="flex flex-col items-center p-6 w-screen">
      {/* Search Box */}
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-4xl flex flex-col gap-4 border border-gray-300 relative">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Enter a destination"
            value={searchTerm}
            onChange={handleSearchInput}
            className="border border-gray-400 p-2 rounded w-full placeholder-gray-500 text-black"
          />
          {filteredCities.length > 0 && (
            <ul className="bg-white border border-gray-300 rounded shadow-md w-full text-black absolute top-full left-0 z-50">
              {filteredCities.map((city, index) => (
                <li
                  key={index}
                  onClick={() => handleDestinationClick(city)}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                  {city.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 border border-gray-400"
        >
          Search
        </button>
      </div>

      {/* Buttons for Add Hotel & Book Hotel */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => navigate("/add-hotel")}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Add Hotel
        </button>
        <button onClick={() => navigate("/search-results?city=all")} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Book Hotel
        </button>
      </div>

      {/* Top Destinations */}
      <div className="mt-8 w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Top destinations</h2>
        <div className="flex overflow-x-auto space-x-4">
          {topDestinations.map((destination, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleDestinationClick(destination)}
            >
              <img
                src={destination.img}
                alt={destination.name}
                className="w-48 h-32 object-cover rounded-lg shadow-md"
              />
              <h3 className="text-lg font-semibold mt-2">{destination.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Hotels */}
      <div className="mt-8 w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Popular Hotels</h2>
        <div className="flex overflow-x-auto space-x-4">
          {popularHotels.map((hotel) => (
            <div
              key={hotel._id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleHotelClick(hotel._id)}
            >
              <img
                src={hotel.photos?.[0] || "https://via.placeholder.com/150"}
                alt={hotel.name}
                className="w-48 h-32 object-cover rounded-lg shadow-md"
              />
              <h3 className="text-lg font-semibold mt-2">{hotel.name}</h3>
              <p className="text-yellow-500 font-bold">⭐ {hotel.rating || "N/A"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
