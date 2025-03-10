
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom"; // Hook to capture hotelId from the URL
// import HotelInfo from "../components/HotelInfo";
// import Facilities from "../components/Facilities";
// import Filteroptions from "../components/Filteroptions";
// import Roomcard from "../components/Roomcard";
// import UserNavBar from "../components/LoginNavbar";

// const HotelBookingPage = () => {
//   const { hotelId } = useParams(); // Capture hotelId from the URL
//   const [filters, setFilters] = useState({});
//   const [roomData, setRoomData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Debugging log to check if useParams() is capturing the hotelId
//   useEffect(() => {
//     console.log("Hotel ID from URL:", hotelId);
//   }, [hotelId]);

//   // Fetch hotel data to get room IDs
//   useEffect(() => {
//     if (hotelId) {
//       axios
//         .get(`http://localhost:5000/api/hotels/${hotelId}`, { withCredentials: true })
//         .then((response) => {
//           const hotelData = response.data;
//           const roomIds = hotelData.rooms || [];
//           fetchRooms(roomIds);
//         })
//         .catch((error) => {
//           console.error("Error fetching hotel data:", error);
//           setLoading(false);
//         });
//     }
//   }, [hotelId]);

//   // Fetch room data for each room ID
//   const fetchRooms = (roomIds) => {
//     const roomPromises = roomIds.map((roomId) =>
//       axios.get(`http://localhost:5000/api/rooms/${roomId}`, { withCredentials: true }).catch(() => null) // Catch errors and return null
//     );

//     Promise.all(roomPromises)
//       .then((responses) => {
//         const rooms = responses.filter((response) => response && response.data).map((response) => response.data); // Filter out null responses
//         setRoomData(rooms);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching room data:", error);
//         setLoading(false);
//       });
//   };

//   // Handle filter changes
//   const handleFilterChange = (filterData) => {
//     setFilters({ ...filters, ...filterData });
//   };

//   // Apply filters to room data
//   const filteredRooms = roomData.filter((room) => {
//     return (
//       (!filters.capacity || room.maxPeople === filters.capacity) &&
//       (!filters.priceRange || room.price <= filters.priceRange)
//     );
//   });

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//     <UserNavBar/>
//     <div style={{ backgroundColor: "#E0F7FA", minHeight: "100vh", padding: "30px", fontFamily: "'Poppins', sans-serif" }}>
//       <div style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
//           <HotelInfo hotelId={hotelId} />
//           <Facilities hotelId={hotelId} />
//         </div>

//         <Filteroptions onFilterChange={handleFilterChange} />

//         <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
//           {filteredRooms.length > 0 ? (
//             filteredRooms.map((room) => (
//               <Roomcard key={room._id} room={room} hotelId={hotelId}/>
//             ))
//           ) : (
//             <div>No rooms available for this hotel.</div>
//           )}
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default HotelBookingPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Hook to capture hotelId from the URL
import HotelInfo from "../components/HotelInfo";
import Facilities from "../components/Facilities";
import Filteroptions from "../components/Filteroptions";
import Roomcard from "../components/Roomcard";
import UserNavBar from "../components/LoginNavbar";

const HotelBookingPage = () => {
  const { hotelId } = useParams(); // Capture hotelId from the URL
  const [filters, setFilters] = useState({});
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Debugging log to check if useParams() is capturing the hotelId
  useEffect(() => {
    console.log("Hotel ID from URL:", hotelId);
  }, [hotelId]);

  // Fetch hotel data to get room IDs
  useEffect(() => {
    if (hotelId) {
      axios
        .get(`http://localhost:5000/api/hotels/${hotelId}`, { withCredentials: true })
        .then((response) => {
          const hotelData = response.data;
          const roomIds = hotelData.rooms || [];
          fetchRooms(roomIds);
        })
        .catch((error) => {
          console.error("Error fetching hotel data:", error);
          setLoading(false);
        });
    }
  }, [hotelId]);

  // Fetch room data for each room ID
  const fetchRooms = (roomIds) => {
    const roomPromises = roomIds.map((roomId) =>
      axios.get(`http://localhost:5000/api/rooms/${roomId}`, { withCredentials: true }).catch(() => null)
    );

    Promise.all(roomPromises)
      .then((responses) => {
        const rooms = responses
          .filter((response) => response && response.data)
          .map((response) => response.data);
        setRoomData(rooms);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching room data:", error);
        setLoading(false);
      });
  };

  // Handle filter changes
  const handleFilterChange = (filterData) => {
    setFilters({ ...filters, ...filterData });
  };

  // Apply filters to room data
  const filteredRooms = roomData.filter((room) => {
    return (
      (!filters.capacity || room.maxPeople === filters.capacity) &&
      (!filters.priceRange || room.price <= filters.priceRange)
    );
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <UserNavBar />
      <div
        style={{
          backgroundColor: "#E0F7FA",
          minHeight: "100vh",
          padding: "30px",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <HotelInfo hotelId={hotelId} />
            <Facilities hotelId={hotelId} />
          </div>

          <Filteroptions onFilterChange={handleFilterChange} />

          {/* Room Cards Grid Container */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <Roomcard key={room._id} room={room} hotelId={hotelId} />
              ))
            ) : (
              <div>No rooms available for this hotel.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelBookingPage;
