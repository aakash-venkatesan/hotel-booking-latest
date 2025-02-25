import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/hotels/";
// const ACCESS_TOKEN = "your-access-token-here";

function SearchResults() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchCity = params.get("city") || "all"; // Get city from query params
  const [sortBy, setSortBy] = useState("cheapestPrice"); // Default sorting by price
  const [order, setOrder] = useState("asc"); // Default order is ascending
  const [minPrice, setMinPrice] = useState(""); // Min price filter
  const [maxPrice, setMaxPrice] = useState(""); // Max price filter
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHotels(searchCity, sortBy, order, minPrice, maxPrice);
  }, [searchCity, sortBy, order, minPrice, maxPrice]);

  // Fetch hotels based on filters
  const fetchHotels = async (city, sortBy, order, min, max) => {
    try {
      const queryParams = { sortBy, order, limit: 50 };
      if (city !== "all") queryParams.city = city;
      if (min) queryParams.min = min;
      if (max) queryParams.max = max;

      const response = await axios.get(API_BASE_URL, {
        params: queryParams,
        // headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      });

      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  // Toggle sorting order between asc and desc
  const handleSortByPrice = () => {
    const newOrder = order === "asc" ? "desc" : "asc";
    setOrder(newOrder);
    params.set("order", newOrder);
    navigate(`?${params.toString()}`);
  };

  // Handle hotel click (navigate to hotel details)
  const handleHotelClick = (hotelId) => {
    navigate(`/hotel/${hotelId}`);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/4 p-6 bg-white border-r border-gray-300 h-full sticky top-0 shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-700 font-mono">Filters</h2>

        <button
          onClick={handleSortByPrice}
          className="w-full bg-transparent text-blue-700 font-semibold border border-blue-500 hover:bg-blue-500 hover:text-white transition py-2 px-4 rounded-lg font-mono mb-4 cursor-pointer"
        >
          Sort by Price {order === "asc" ? "⬆️" : "⬇️"}
        </button>

        <div className="flex flex-col gap-3">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border border-gray-400 p-2 rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border border-gray-400 p-2 rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
          />
        </div>
      </div>

      <div className="w-3/4 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-700 font-mono text-center">Hotels in {searchCity}</h1>

        {hotels.length > 0 ? (
          hotels.map((hotel) => (
            <div
              key={hotel._id}
              className="bg-white p-5 shadow-md rounded-lg border border-gray-300 flex gap-4 mb-6 cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => handleHotelClick(hotel._id)}
            >
              <img
                src={hotel.photos?.[0] || "https://via.placeholder.com/150"}
                alt={hotel.name}
                className="w-48 h-32 object-cover rounded-md border border-gray-300"
              />
              <div className="flex flex-col justify-between">
                <h2 className="text-lg text-gray-700 font-bold font-mono">{hotel.name}</h2>
                <p className="text-gray-600 font-mono">{hotel.address}, {hotel.state}, {hotel.country}</p>
                <p className="text-lg text-yellow-500 font-bold">⭐ {hotel.rating || "N/A"}</p>
                <p className="text-gray-500 italic">{hotel.title}</p>
                <p className="text-gray-600">{hotel.description}</p>
                <p className="text-blue-600 font-semibold">{hotel.offerings?.join(", ")}</p>
                <p className="text-green-600 font-bold text-lg">Price: ${hotel.cheapestPrice}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 font-mono text-center">No hotels found in {searchCity}.</p>
        )}
      </div>
    </div>

  );
}

export default SearchResults;
