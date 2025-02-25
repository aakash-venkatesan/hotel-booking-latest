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

  const handleHotelClick = (hotelId) => {
    navigate(`/hotel/${hotelId}`);
  };

  return (
    <div className="flex flex-col items-center p-6 w-screen bg-gray-100">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-4xl border border-gray-300">
        <h2 className="text-2xl font-bold text-gray-700 font-mono text-center mb-4">Find Your Destination</h2>
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Enter a destination"
            value={searchTerm}
            onChange={handleSearchInput}
            className="w-full border border-gray-400 rounded-md p-2 h-12 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          />
          {filteredCities.length > 0 && (
            <ul className="absolute bg-white border border-gray-300 rounded shadow-md w-full text-black top-full left-0 z-50">
              {filteredCities.map((city, index) => (
                <li
                  key={index}
                  onClick={() => handleDestinationClick(city)}
                  className="p-2 hover:bg-gray-200 cursor-pointer font-mono"
                >
                  {city.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={handleSearch}
          className="w-full bg-transparent text-blue-700 font-semibold border border-blue-500 hover:bg-blue-500 hover:text-white transition py-2 rounded-lg font-mono mt-4 cursor-pointer"
        >
          Search
        </button>
      </div>
      <div className="flex gap-4 mt-5 w-full max-w-4xl justify-center">
        <button
          onClick={() => navigate("/add-hotel")}
          className="px-4 py-2 bg-transparent text-green-700 font-semibold border border-green-500 hover:bg-green-500 hover:text-white transition rounded-lg font-mono cursor-pointer"
        >
          Add Hotel
        </button>
        <button
          onClick={() => navigate("/search-results?city=all")}
          className="px-4 py-2 bg-transparent text-blue-700 font-semibold border border-blue-500 hover:bg-blue-500 hover:text-white transition rounded-lg font-mono cursor-pointer"
        >
          Book Hotel
        </button>
      </div>

      <div className="mt-8 w-full max-w-5xl">
        <h2 className="text-3xl font-bold mb-4 text-gray-700 text-center font-mono">Top Destinations</h2>
        <div className="flex overflow-x-auto space-x-4 p-2">
          {topDestinations.map((destination, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer bg-white p-4 rounded-lg shadow-md border border-gray-300 hover:shadow-lg transition"
              onClick={() => handleDestinationClick(destination)}
            >
              <img
                src={destination.img}
                alt={destination.name}
                className="w-48 h-32 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold mt-2 font-mono">{destination.name}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 w-full max-w-5xl">
        <h2 className="text-3xl font-bold mb-4 text-gray-700 text-center font-mono">Popular Hotels</h2>
        <div className="flex overflow-x-auto space-x-4 p-2">
          {popularHotels.map((hotel) => (
            <div
              key={hotel._id}
              className="flex flex-col items-center cursor-pointer bg-white p-4 rounded-lg shadow-md border border-gray-300 hover:shadow-lg transition"
              onClick={() => handleHotelClick(hotel._id)}
            >
              <img
                src={hotel.photos?.[0] || "https://via.placeholder.com/150"}
                alt={hotel.name}
                className="w-48 h-32 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold mt-2 font-mono">{hotel.name}</h3>
              <p className="text-yellow-500 font-bold">⭐ {hotel.rating || "N/A"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>



  );
};

export default HomePage;
