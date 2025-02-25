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
    <div className="flex h-screen">
      {/* Left Pane - Fixed Filters */}
      <div className="w-1/4 p-6 bg-gray-100 border-r border-gray-300 h-full sticky top-0">
        <h2 className="text-xl font-bold mb-4">Filters</h2>

        {/* Sorting Button */}
        <button
          onClick={handleSortByPrice}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mb-4"
        >
          Sort by Price {order === "asc" ? "⬆️" : "⬇️"}
        </button>

        {/* Price Filters */}
        <div className="flex flex-col gap-2">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border border-gray-400 p-2 rounded w-full text-sm"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border border-gray-400 p-2 rounded w-full text-sm"
          />
        </div>
      </div>

      {/* Right Pane - Hotel Results */}
      <div className="w-3/4 p-6 overflow-y-auto">
        <h1 className="text-xl font-bold mb-4">Hotels in {searchCity}</h1>

        {hotels.length > 0 ? (
          hotels.map((hotel) => (
            <div
              key={hotel._id}
              className="bg-white p-4 shadow-lg rounded-lg border border-gray-300 flex mb-4 cursor-pointer"
              onClick={() => handleHotelClick(hotel._id)}
            >
              <img
                src={hotel.photos?.[0] || "https://via.placeholder.com/150"}
                alt={hotel.name}
                className="w-48 h-32 object-cover text-gray-600 rounded-md"
              />
              <div className="ml-4">
                <h2 className="text-lg text-gray-600 font-semibold">{hotel.name}</h2>
                <p className="text-gray-600">{hotel.address}, {hotel.state}, {hotel.country}</p>
                <p className="text-lg text-gray-600 font-bold">⭐ {hotel.rating || "N/A"}</p>
                <p className="text-gray-500 italic">{hotel.title}</p>
                <p className="text-gray-600">{hotel.description}</p>
                <p className="text-blue-600 font-semibold">{hotel.offerings?.join(", ")}</p>
                <p className="text-green-600 font-bold">Price: ${hotel.cheapestPrice}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No hotels found in {searchCity}.</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
