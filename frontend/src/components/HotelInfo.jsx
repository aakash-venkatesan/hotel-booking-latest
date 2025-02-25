// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const HotelInfo = ({ hotelId }) => {
//   const [hotelInfo, setHotelInfo] = useState(null); // State to hold hotel data
//   const [isHovered, setIsHovered] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

//   const hotel = '67bd4f4d31433cbdcb94a498'; // Static hotel ID for this example, you can replace it with hotelId prop

//   useEffect(() => {
//     const fetchHotelInfo = async () => {
//       try {
//         // Corrected axios call with proper backticks for template string interpolation
//         const response = await axios.get(`http://localhost:5000/api/hotels/${hotel}`);
//         setHotelInfo(response.data); // Set the fetched hotel info
//       } catch (error) {
//         console.error("Error fetching hotel data:", error);
//       }
//     };

//     if (hotel) {
//       fetchHotelInfo();
//     }
//   }, [hotel]);

//   if (!hotelInfo) {
//     return <div>Loading...</div>; // Show loading until data is fetched
//   }

//   const buttonStyle = {
//     backgroundColor: isHovered ? "#218838" : "#28a745",
//     color: "white",
//     padding: "10px 20px",
//     borderRadius: "5px",
//     fontWeight: "bold",
//     textAlign: "center",
//     cursor: "pointer",
//     transition: "background-color 0.3s ease",
//   };

//   const modalStyle = {
//     display: isModalOpen ? "block" : "none",
//     position: "fixed",
//     top: "0",
//     left: "0",
//     width: "100%",
//     height: "100%",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     zIndex: "1000",
//     paddingTop: "100px",
//     textAlign: "center",
//   };

//   const modalContentStyle = {
//     backgroundColor: "#fff",
//     padding: "30px",
//     borderRadius: "8px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//     width: "80%",
//     maxWidth: "500px",
//     margin: "auto",
//   };

//   const closeButtonStyle = {
//     backgroundColor: "#FF5733",
//     color: "white",
//     padding: "10px 20px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     fontWeight: "bold",
//     marginTop: "20px",
//   };

//   return (
//     <div
//       style={{
//         borderBottom: "2px solid #ddd",
//         paddingBottom: "20px",
//         backgroundColor: "#f9f9f9",
//         borderRadius: "8px",
//         padding: "30px",
//         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//         maxWidth: "900px",
//         margin: "20px",
//       }}
//     >
//       <h1 style={{ fontSize: "2.5em", color: "#333", fontWeight: "600" }}>
//         {hotelInfo.name || "Hotel Name"} {/* Dynamically display hotel name */}
//       </h1>

//       <p
//         style={{
//           fontSize: "1.1em",
//           color: "#555",
//           lineHeight: "1.6",
//           margin: "10px 0",
//         }}
//       >
//         Welcome to <strong>{hotelInfo.name}</strong>, your ultimate destination for relaxation and luxury. Nestled in the heart of the city, we offer a variety of world-class amenities and impeccable service. Whether you're here for business or leisure, our hotel promises to provide an unforgettable experience.
//       </p>

//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           fontSize: "1.1em",
//           color: "#555",
//         }}
//       >
//         <p>
//           <strong>Location:</strong> {hotelInfo.location || "Location not available"}
//         </p>
//         <p>
//           <strong>Rating:</strong> {hotelInfo.rating ? "⭐".repeat(hotelInfo.rating) : "No rating"}
//         </p>
//       </div>

//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           fontSize: "1.2em",
//           color: "#333",
//           marginTop: "10px",
//         }}
//       >
//         <p>
//           <strong>Price Range:</strong> {hotelInfo.priceRange || "Price not available"}
//         </p>
//         <p
//           style={buttonStyle}
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//           onClick={() => setIsModalOpen(true)} // Open the modal when clicked
//         >
//           Book Now
//         </p>
//       </div>

//       {/* Modal */}
//       <div style={modalStyle}>
//         <div style={modalContentStyle}>
//           <h2 style={{ color: "#333" }}>Don't Miss Out!</h2>
//           <p style={{ fontSize: "1.2em", color: "#555" }}>
//             Check out the rooms and secure your stay at {hotelInfo.name} now!
//           </p>
//           <button
//             style={closeButtonStyle}
//             onClick={() => setIsModalOpen(false)} // Close the modal
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HotelInfo;



// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const HotelInfo = ({ hotelId }) => {
//   const [hotelInfo, setHotelInfo] = useState(null); // State to hold hotel data
//   const [isHovered, setIsHovered] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

//   const hotel = hotelId || '67bd4f4d31433cbdcb94a494'; // Static hotel ID for this example, replace with hotelId prop if needed

//   useEffect(() => {
//     const fetchHotelInfo = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/hotels/${hotel}`);
//         setHotelInfo(response.data); // Set the fetched hotel info
//       } catch (error) {
//         console.error("Error fetching hotel data:", error);
//       }
//     };

//     if (hotel) {
//       fetchHotelInfo();
//     }
//   }, [hotel]);

//   if (!hotelInfo) {
//     return <div>Loading...</div>; // Show loading until data is fetched
//   }

//   const buttonStyle = {
//     backgroundColor: isHovered ? "#218838" : "#28a745",
//     color: "white",
//     padding: "10px 20px",
//     borderRadius: "5px",
//     fontWeight: "bold",
//     textAlign: "center",
//     cursor: "pointer",
//     transition: "background-color 0.3s ease",
//   };

//   const modalStyle = {
//     display: isModalOpen ? "block" : "none",
//     position: "fixed",
//     top: "0",
//     left: "0",
//     width: "100%",
//     height: "100%",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     zIndex: "1000",
//     paddingTop: "100px",
//     textAlign: "center",
//   };

//   const modalContentStyle = {
//     backgroundColor: "#fff",
//     padding: "30px",
//     borderRadius: "8px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//     width: "80%",
//     maxWidth: "500px",
//     margin: "auto",
//   };

//   const closeButtonStyle = {
//     backgroundColor: "#FF5733",
//     color: "white",
//     padding: "10px 20px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     fontWeight: "bold",
//     marginTop: "20px",
//   };

//   return (
//     <div
//       style={{
//         borderBottom: "2px solid #ddd",
//         paddingBottom: "20px",
//         backgroundColor: "#f9f9f9",
//         borderRadius: "8px",
//         padding: "30px",
//         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//         maxWidth: "900px",
//         margin: "20px",
//       }}
//     >
//       <h1 style={{ fontSize: "2.5em", color: "#333", fontWeight: "600" }}>
//         {hotelInfo.name || "Hotel Name"}
//       </h1>

//       {/* Display hotel images */}
//       {hotelInfo.photos && hotelInfo.photos.length > 0 ? (
//         <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
//           {hotelInfo.photos.map((image, index) => (
//             <img
//               key={index}
//               src={image}
//               alt={`Hotel Image ${index + 1}`}
//               style={{ width: "300px", height: "200px", objectFit: "cover", borderRadius: "8px" }}
//             />
//           ))}
//         </div>
//       ) : (
//         <p>No images available</p>
//       )}

//       <p
//         style={{
//           fontSize: "1.1em",
//           color: "#555",
//           lineHeight: "1.6",
//           margin: "10px 0",
//         }}
//       >
//         Welcome to <strong>{hotelInfo.name}</strong>, your ultimate destination for relaxation and luxury. Nestled in the heart of the city, we offer a variety of world-class amenities and impeccable service. Whether you're here for business or leisure, our hotel promises to provide an unforgettable experience.
//       </p>

//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           fontSize: "1.1em",
//           color: "#555",
//         }}
//       >
//         <p>
//           <strong>Location:</strong> {hotelInfo.address || "Location not available"}
//         </p>
//         <p>
//           <strong>Rating:</strong> {hotelInfo.rating ? "⭐".repeat(Math.round(hotelInfo.rating)) : "No rating"}
//         </p>
//       </div>

//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           fontSize: "1.2em",
//           color: "#333",
//           marginTop: "10px",
//         }}
//       >
//         <p>
//           <strong>Price Range:</strong> ${hotelInfo.rooms[0]?.cheapestPrice || "Price not available"}
//         </p>
//         <p
//           style={buttonStyle}
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//           onClick={() => setIsModalOpen(true)} // Open the modal when clicked
//         >
//           Book Now
//         </p>
//       </div>

//       {/* Modal */}
//       <div style={modalStyle}>
//         <div style={modalContentStyle}>
//           <h2 style={{ color: "#333" }}>Don't Miss Out!</h2>
//           <p style={{ fontSize: "1.2em", color: "#555" }}>
//             Check out the rooms and secure your stay at {hotelInfo.name} now!
//           </p>
//           <button
//             style={closeButtonStyle}
//             onClick={() => setIsModalOpen(false)} // Close the modal
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HotelInfo;


import React, { useState, useEffect } from "react";
import axios from "axios";

const HotelInfo = ({ hotelId }) => {
  const [hotelInfo, setHotelInfo] = useState(null); // State to hold hotel data
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const hotel = hotelId || '67bd4f4d31433cbdcb94a494'; // Static hotel ID for this example, replace with hotelId prop if needed

  useEffect(() => {
    const fetchHotelInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/hotels/${hotel}`);
        setHotelInfo(response.data); // Set the fetched hotel info
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    if (hotel) {
      fetchHotelInfo();
    }
  }, [hotel]);

  if (!hotelInfo) {
    return <div>Loading...</div>; // Show loading until data is fetched
  }

  const buttonStyle = {
    backgroundColor: isHovered ? "#218838" : "#28a745",
    color: "white",
    padding: "12px 30px",
    borderRadius: "25px",
    fontWeight: "600",
    textAlign: "center",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    boxShadow: isHovered ? "0 4px 12px rgba(0, 0, 0, 0.2)" : "none",
  };

  const modalStyle = {
    display: isModalOpen ? "block" : "none",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: "1000",
    paddingTop: "100px",
    textAlign: "center",
  };

  const modalContentStyle = {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    width: "80%",
    maxWidth: "550px",
    margin: "auto",
    textAlign: "center",
  };

  const closeButtonStyle = {
    backgroundColor: "#FF5733",
    color: "white",
    padding: "12px 30px",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "600",
    marginTop: "20px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease",
  };

  return (
    <div
      style={{
        borderBottom: "2px solid #ddd",
        paddingBottom: "30px",
        backgroundColor: "#f8f9fa",
        borderRadius: "12px",
        padding: "40px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
        maxWidth: "1000px",
        margin: "40px auto",
      }}
    >
      <h1 style={{ fontSize: "3em", color: "#333", fontWeight: "700", marginBottom: "20px" }}>
        {hotelInfo.name || "Hotel Name"}
      </h1>

      {/* Display hotel images */}
      {hotelInfo.photos && hotelInfo.photos.length > 0 ? (
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px", flexWrap: "wrap" }}>
          {hotelInfo.photos.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Hotel Image ${index + 1}`}
              style={{
                width: "350px",
                height: "230px",
                objectFit: "cover",
                borderRadius: "12px",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            />
          ))}
        </div>
      ) : (
        <p>No images available</p>
      )}

      <p
        style={{
          fontSize: "1.1em",
          color: "#555",
          lineHeight: "1.6",
          margin: "15px 0",
          textAlign: "center",
          fontStyle: "italic",
        }}
      >
        Welcome to <strong>{hotelInfo.name}</strong>, your ultimate destination for relaxation and luxury.
        Nestled in the heart of the city, we offer a variety of world-class amenities and impeccable service.
        Whether you're here for business or leisure, our hotel promises to provide an unforgettable experience.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "1.2em",
          color: "#555",
          marginBottom: "20px",
        }}
      >
        <p>
          <strong>Location:</strong> {hotelInfo.address || "Location not available"}
        </p>
        <p>
          <strong>Rating:</strong>
          {hotelInfo.rating ? (
            <>
              {/* Render full stars */}
              <span style={{ fontSize: "1.5em", color: "#ffbb33" }}>
                {"⭐".repeat(Math.floor(hotelInfo.rating))}
              </span>
              {/* Render half star if applicable */}
              {hotelInfo.rating % 1 !== 0 && (
                <span style={{ fontSize: "1.5em", color: "#ffbb33" }}>⭐</span>
              )}
              {/* Display rating in decimals */}
              <span style={{ fontSize: "1.2em", color: "#777" }}>
                ({hotelInfo.rating.toFixed(1)})
              </span>
            </>
          ) : (
            "No rating"
          )}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "1.3em",
          color: "#333",
          marginTop: "10px",
        }}
      >
        <p>
          {/* <strong>Price Range:</strong> ${hotelInfo.rooms[0]?.cheapestPrice || "Price not available"} */}
        </p>
        <button
          style={buttonStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsModalOpen(true)} // Open the modal when clicked
        >
          Book Now
        </button>
      </div>

      {/* Modal */}
      <div style={modalStyle}>
        <div style={modalContentStyle}>
          <h2 style={{ color: "#333", fontSize: "2em" }}>Don't Miss Out!</h2>
          <p style={{ fontSize: "1.2em", color: "#555", marginBottom: "20px" }}>
            Check out the rooms and secure your stay at {hotelInfo.name} now!
          </p>
          <button
            style={closeButtonStyle}
            onClick={() => setIsModalOpen(false)} // Close the modal
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelInfo;
