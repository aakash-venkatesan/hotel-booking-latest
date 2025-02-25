import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { hotelId, roomId } = useParams();
  const [hotelDetails, setHotelDetails] = useState(null);
  const [roomDetails, setRoomDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numberOfNights, setNumberOfNights] = useState(1);
  const [timeLeft, setTimeLeft] = useState(600);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [wallet, setWallet] = useState(1000);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // const hotelId = "67bd554831433cbdcb94a49a";
  // const roomId = "67bd4b7831433cbdcb94a48a";
  const userId = sessionStorage.getItem('userid');
  //"67bc73c12bc809e3d15565c5"; // This can be retrieved dynamically if needed
  const bookingFees = 200;

//  Get userId and token from localStorage
//   const userId = localStorage.getItem("userId");  
//   const token = localStorage.getItem("token");    

//   // Get hotelId and roomId from query params
//   const queryParams = new URLSearchParams(window.location.search);
//   const hotelId = queryParams.get("hotelId");
//   const roomId = queryParams.get("roomId");

  useEffect(() => {
      console.log("Hotel ID from URL:", hotelId, "Room Id:", roomId);
  }, [hotelId, roomId]);

  useEffect(() => {
    // Fetch hotel details
    const fetchHotelDetails = async () => {
      try {
        const hotelResponse = await axios.get(`http://localhost:5000/api/hotels/${hotelId}`, {
          withCredentials: true,
        });
        setHotelDetails(hotelResponse.data);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
        setModalMessage("Failed to fetch hotel details.");
        setShowModal(true);
      }
    };

    // Fetch room details
    const fetchRoomDetails = async () => {
      try {
        const roomResponse = await axios.get(`http://localhost:5000/api/rooms/${roomId}`, {
          withCredentials: true,
        });
        setRoomDetails(roomResponse.data);
      } catch (error) {
        console.error("Error fetching room details:", error);
        setModalMessage("Failed to fetch room details.");
        setShowModal(true);
      }
    };

    const fetchUserDetails = async () => {
        try {
          const userResponse = await axios.get(`http://localhost:5000/api/users/${userId}`, {
            withCredentials: true,
          });
          setUserDetails(userResponse.data);
        } catch (error) {
          console.error("Error fetching user details:", error);
          setModalMessage("Failed to fetch user details.");
          setShowModal(true);
        }
      };

    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([fetchHotelDetails(), fetchRoomDetails(), fetchUserDetails()]);
      setIsLoading(false);
    };

    fetchData();
  }, [hotelId, roomId, userId]);//modify this later

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const calculateTotalPrice = (
    originalPrice,
    discount,
    bookingFees,
    numberOfNights
  ) => {
    const discountedPrice = originalPrice - originalPrice * (discount / 100);
    const totalPrice = (discountedPrice + bookingFees) * numberOfNights;
    const totalPriceWithGST = totalPrice * 1.18; // Adding GST of 18%
    return totalPriceWithGST.toFixed(2);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {Array.from({ length: fullStars }, (_, index) => (
          <FaStar key={`full-${index}`} color="#ffc107" />
        ))}
        {halfStar && <FaStarHalfAlt color="#ffc107" />}
        {Array.from({ length: emptyStars }, (_, index) => (
          <FaRegStar key={`empty-${index}`} color="#e4e5e9" />
        ))}
      </>
    );
  };

  const handleNextImage = () => {
    if (hotelDetails && hotelDetails.photos && hotelDetails.photos.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % hotelDetails.photos.length);
    }
  };

  const handlePrevImage = () => {
    if (hotelDetails && hotelDetails.photos && hotelDetails.photos.length > 0) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + hotelDetails.photos.length) % hotelDetails.photos.length
      );
    }
  };

  const handleBookNow = async () => {
    const totalPrice = parseFloat(
      calculateTotalPrice(
        roomDetails.price,
        roomDetails.discount,
        bookingFees,
        numberOfNights
      )
    );
 
    // Ensure wallet is a number as well
    const walletAmount = parseFloat(userDetails.wallet);
    console.log(userDetails);
    console.log(walletAmount);
 
    if (walletAmount >= totalPrice) {
      try {
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YmM3M2MxMmJjODA5ZTNkMTU1NjVjNSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3NDA0ODg0NTAsImV4cCI6MTc0MDU3NDg1MH0.wlJWNfPeUXrNZA6jYwAFD9ZEeeCshsWnI5877bB6ho8"; // Replace with actual token
        // Post booking data to backend with Authorization header
        const response = await axios.post(
          "http://localhost:5000/api/bookings",
          {
            user: userId,
            hotel: hotelId,
            room: roomId,
            startDate: startDate,
            endDate: endDate,
            totalPrice: totalPrice,
            status: "confirmed",
          },
          {
            withCredentials: true,
          }
        );
 
        if (response.data.success) {
          setWallet(wallet - totalPrice);
          setModalMessage(`Booking successful! Your new wallet balance is ₹${walletAmount - totalPrice}`);
          setShowModal(true);
        //   navigate("/home");
        } else {
          setModalMessage("Booking failed. Please try again.");
          setShowModal(true);
        }
      } catch (error) {
        console.error("Error creating booking:", error);
        setModalMessage("Booking failed due to an error.");
        setShowModal(true);
      }
    } else {
      setModalMessage("Insufficient funds in your wallet.");
      setShowModal(true);
    }
  };


  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!hotelDetails || !roomDetails) {
    return <div className="flex justify-center items-center h-screen">Error: Could not load data.</div>;
  }

  const totalPrice = calculateTotalPrice(
    roomDetails.price,
    roomDetails.discount,
    bookingFees,
    numberOfNights
  );

  return (
    <div className="container mx-auto p-6 bg-blue-300 min-h-screen relative">
      {/* Blurred Background when Modal is Open */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-40"></div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <p className="text-lg mb-4">{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300" onClick={() => navigate("/search-results")}>
          {"<"}
        </button>
        <h1 className="text-3xl font-bold text-center flex-grow">Checkout</h1>
      </div>

      {/* Booking and Hotel Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Booking Details Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
          <div className="mb-4">
            <p className="text-lg">Session Time Left: {formatTime(timeLeft)}</p>
          </div>
          <div className="mb-4">
            <p className="text-lg">Select Onboarding Date:</p>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <p className="text-lg">Select Off-boarding Date:</p>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <p className="text-lg">Enter Number of Nights:</p>
            <input
              type="number"
              value={numberOfNights}
              onChange={(e) => setNumberOfNights(Number(e.target.value))}
              className="border p-2 rounded w-full"
              min="1"
            />
          </div>
        </div>

        {/* Hotel Details Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-center mb-4">
            <button
              onClick={handlePrevImage}
              className="bg-gray-200 p-2 rounded-l-lg hover:bg-gray-300 transition duration-300"
            >
              &lt;
            </button>
            <div className="w-96 h-64 mx-2 overflow-hidden rounded-lg">
              {hotelDetails.photos && hotelDetails.photos.length > 0 ? (
                <img
                  src={roomDetails.photos[currentImageIndex]}
                  alt="Room"
                  className="w-full h-full object-cover"
                />
              ) : (
                <p>No images available</p>
              )}
            </div>
            <button
              onClick={handleNextImage}
              className="bg-gray-200 p-2 rounded-r-lg hover:bg-gray-300 transition duration-300"
            >
              &gt;
            </button>
          </div>
          <p className="text-xl font-semibold">{hotelDetails.name}</p>
          <p className="flex items-center">{renderStars(hotelDetails.rating)}</p>
          <p className="text-gray-600">{hotelDetails.location}</p>
          <div className="mt-4">
            <p className="text-lg">Max: {roomDetails.maxPeople} Adults</p>
            <p className="text-lg">
              Price: ₹{roomDetails.price} per night
            </p>
            <p className="text-lg">Discount: {roomDetails.discount}%</p>
            <p className="text-lg">Booking Fees: ₹{bookingFees}</p>
            <p className="text-lg">GST (18%): ₹{(roomDetails.price * 0.18).toFixed(2)}</p>
            <p className="text-xl font-semibold">Total Price: ₹{totalPrice}</p>
          </div>
        </div>
      </div>

      {/* Book Now Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleBookNow}
          className="bg-blue-500 text-white py-3 px-8 rounded-full hover:bg-blue-600 transition duration-300"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Checkout;
