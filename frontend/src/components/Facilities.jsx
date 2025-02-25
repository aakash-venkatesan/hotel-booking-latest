import React, { useEffect, useState } from "react";

const Facilities = ({ hotelId, accessToken }) => {
  const [facilities, setFacilities] = useState({
    basic: [
      { _id: "1", name: "Free Wi-Fi" },
      { _id: "2", name: "Air Conditioning" },
      { _id: "3", name: "Parking" },
    ],
    wellness: [
      { _id: "4", name: "Swimming Pool" },
      { _id: "5", name: "Spa" },
      { _id: "6", name: "Sauna" },
    ],
    business: [
      { _id: "7", name: "Conference Room" },
      { _id: "8", name: "Business Center" },
      { _id: "9", name: "Projector" },
    ],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Uncomment to fetch data later
    // const fetchFacilities = async () => {
    //   try {
    //     setLoading(true);
    //     const response = await axios.get(`/api/hotels/${hotelId}/facilities`, {
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //     });
    //     // Handle response data here...
    //   } catch (err) {
    //     setError("Failed to load facilities");
    //     console.error("Error fetching facilities:", err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchFacilities();
  }, [hotelId, accessToken]);

  if (loading) {
    return <div style={{ textAlign: "center", padding: "20px" }}>Loading facilities...</div>;
  }

  if (error) {
    return <div style={{ color: "red", textAlign: "center", padding: "20px" }}>{error}</div>;
  }

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1000px",
        margin: "auto",
        backgroundColor: "#f3f4f6",
        borderRadius: "10px",
        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ fontSize: "2.2em", color: "#333", fontWeight: "700", textAlign: "center" }}>Facilities</h2>

      {/* Render Basic Facilities */}
      <h3 style={{ color: "#4CAF50", textAlign: "center", fontWeight: "600" }}>Basic Amenities</h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {facilities.basic.length > 0 ? (
          facilities.basic.map((facility) => (
            <div
              key={facility._id}
              style={{
                backgroundColor: "#C8E6C9", // Light Green Background
                borderRadius: "12px",
                padding: "20px",
                textAlign: "center",
                width: "220px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
              }}
            >
              <h4 style={{ color: "#388E3C", fontSize: "1.2em", fontWeight: "500" }}>{facility.name}</h4>
            </div>
          ))
        ) : (
          <div>No basic amenities available.</div>
        )}
      </div>

      {/* Render Wellness Facilities */}
      <h3 style={{ color: "#00B8D4", textAlign: "center", fontWeight: "600" }}>Wellness Facilities</h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {facilities.wellness.length > 0 ? (
          facilities.wellness.map((facility) => (
            <div
              key={facility._id}
              style={{
                backgroundColor: "#B3E5FC", // Light Blue Background
                borderRadius: "12px",
                padding: "20px",
                textAlign: "center",
                width: "220px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
              }}
            >
              <h4 style={{ color: "#0288D1", fontSize: "1.2em", fontWeight: "500" }}>{facility.name}</h4>
            </div>
          ))
        ) : (
          <div>No wellness amenities available.</div>
        )}
      </div>

      {/* Render Business Facilities */}
      <h3 style={{ color: "#FF7043", textAlign: "center", fontWeight: "600" }}>Business Facilities</h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {facilities.business.length > 0 ? (
          facilities.business.map((facility) => (
            <div
              key={facility._id}
              style={{
                backgroundColor: "#FFCCBC", // Light Orange Background
                borderRadius: "12px",
                padding: "20px",
                textAlign: "center",
                width: "220px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
              }}
            >
              <h4 style={{ color: "#D32F2F", fontSize: "1.2em", fontWeight: "500" }}>{facility.name}</h4>
            </div>
          ))
        ) : (
          <div>No business facilities available.</div>
        )}
      </div>
    </div>
  );
};

export default Facilities;
