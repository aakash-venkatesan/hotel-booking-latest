// import React from "react";
// import { useNavigate } from "react-router-dom";

// const RoomCard = ({ room }) => {
//   const navigate = useNavigate(); // Hook for navigation

//   const buttonStyle = {
//     base: {
//       color: "white",
//       border: "none",
//       padding: "8px 16px",
//       borderRadius: "4px",
//       cursor: "pointer",
//       transition: "all 0.3s ease",
//       fontSize: "0.9em",
//       fontWeight: "bold",
//     },
//     addToCart: {
//       backgroundColor: "#28a745",
//       marginRight: "10px", // Space between buttons
//     },
//     bookNow: {
//       backgroundColor: "#007bff",
//     },
//   };

//   // Destructuring the room object
//   const { _id, title, desc, price, maxPeople, photos, discount, facilities } = room;

//    const handleBooking = () => {
//      navigate(`/checkout/${_id}`); // Navigate to Checkout Page with room ID
//    };

//   return (
//     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
//       {room ? (
//         <div
//           key={_id} // Using _id as the unique key
//           style={{
//             width: '100%',
//             maxWidth: '300px',
//             padding: '10px',
//             boxSizing: 'border-box',
//             border: '1px solid #ddd',
//             borderRadius: '8px',
//             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//           }}
//         >
//           <img
//             src={photos[0] || "default-room-image.jpg"} // Displaying first image in photos array
//             alt={title}
//             style={{
//               width: '100%',
//               height: 'auto',
//               borderRadius: '4px',
//               objectFit: 'cover',
//             }}
//           />
//           <div style={{ marginTop: '10px', fontSize: '1.1em', color: '#333' }}>
//             <p><strong>Room Type:</strong> {title}</p>
//             <p><strong>Description:</strong> {desc}</p> {/* Displaying room description */}
//             <p><strong>Capacity:</strong> {maxPeople || "N/A"}</p> {/* Max people */}
//             <p style={{ fontSize: '1.2em', color: '#d9534f', fontWeight: 'bold' }}>
//               <strong>Price:</strong> ${price}
//             </p>
//             {discount > 0 && (
//               <p style={{ fontSize: '1.1em', color: '#ff9900' }}>
//                 <strong>Discount:</strong> {discount}% Off
//               </p>
//             )}

//             {/* Facilities displayed in two lines */}
//             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
//               {facilities && facilities.length > 0 ? (
//                 facilities.map((facility, index) => (
//                   <span
//                     key={index}
//                     style={{
//                       backgroundColor: '#f8f9fa',
//                       padding: '5px 10px',
//                       borderRadius: '4px',
//                       border: '1px solid #ddd',
//                       fontSize: '0.9em',
//                     }}
//                   >
//                     {facility}
//                   </span>
//                 ))
//               ) : (
//                 <p>No facilities available.</p>
//               )}
//             </div>

//             {/* Buttons aligned horizontally */}
//             <div style={{ display: 'flex', gap: '10px' }}>
//               {/* <button
//                 style={{ ...buttonStyle.base, ...buttonStyle.addToCart }}
//                 onMouseOver={(e) => (e.target.style.backgroundColor = '#218838')}
//                 onMouseOut={(e) => (e.target.style.backgroundColor = '#28a745')}
//               >
//                 Add to Cart
//               </button> */}
//               <button
//                 style={{ ...buttonStyle.base, ...buttonStyle.bookNow }}
//                 onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
//                 onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
//                 onClick={handleBooking}  // Navigate to Checkout Page
//               >
//                 Book Now
//               </button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <p>No room available at the moment.</p> // Message when room data is not available
//       )}
//     </div>
//   );
// };

// export default RoomCard;
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ room, userId }) => {
  const navigate = useNavigate();

  // Button Styles
  const buttonStyle = {
    base: {
      color: "white",
      border: "none",
      padding: "12px 20px",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      fontSize: "1em",
      fontWeight: "bold",
    },
    bookNow: {
      backgroundColor: "#007bff",
      width: "100%",
      textAlign: "center",
    },
  };

  // Destructure room object with fallbacks
  const {
    _id,
    title = "No Title",
    desc = "No Description Available",
    price = "N/A",
    maxPeople = "N/A",
    photos = [],
    discount = 0,
    facilities = [],
  } = room;

  // Navigate to Checkout with roomId and userId
  const handleBooking = () => {
    navigate(`/checkout/${_id}/${userId}`); // Pass room ID & user ID
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px", padding: "20px" }}>
      <div
        key={_id}
        style={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid #ddd",
          borderRadius: "12px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          backgroundColor: "#fff",
          transition: "transform 0.3s ease",
        }}
      >
        {/* Room Image */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img
            src={photos.length > 0 ? photos[0] : "default-room-image.jpg"}
            alt={title}
            style={{
              width: "100%",
              height: "220px",
              objectFit: "cover",
              transition: "transform 0.3s ease",
            }}
          />
        </div>

        {/* Room Details */}
        <div style={{ padding: "20px", flex: "1" }}>
          <h3 style={{ margin: "0", fontSize: "1.2em", color: "#333" }}>{title}</h3>
          <p style={{ fontSize: "0.95em", color: "#777", marginBottom: "10px" }}>{desc}</p>

          {/* Room Info */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <p style={{ fontSize: "1em", color: "#333" }}>
              <strong>Capacity:</strong> {maxPeople}
            </p>
            <p style={{ fontSize: "1.2em", color: "#d9534f", fontWeight: "bold" }}>
              <strong>Price:</strong> ${price}
            </p>
          </div>

          {/* Discount */}
          {discount > 0 && (
            <p style={{ fontSize: "1.1em", color: "#ff9900" }}>
              <strong>Discount:</strong> {discount}% Off
            </p>
          )}

          {/* Facilities */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
            {facilities.length > 0 ? (
              facilities.map((facility, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: "#f8f9fa",
                    padding: "5px 12px",
                    borderRadius: "16px",
                    border: "1px solid #ddd",
                    fontSize: "0.85em",
                    color: "#333",
                  }}
                >
                  {facility}
                </span>
              ))
            ) : (
              <p style={{ fontSize: "0.95em", color: "#777" }}></p>
            )}
          </div>

          {/* Book Now Button */}
          <button
            style={{ ...buttonStyle.base, ...buttonStyle.bookNow }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
            onClick={handleBooking} // Navigate to checkout page
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

// PropTypes for validation
RoomCard.propTypes = {
  room: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string,
    desc: PropTypes.string,
    price: PropTypes.number,
    maxPeople: PropTypes.number,
    photos: PropTypes.array,
    discount: PropTypes.number,
    facilities: PropTypes.array,
  }).isRequired,
  userId: PropTypes.string.isRequired, // User ID is required
};

export default RoomCard;
