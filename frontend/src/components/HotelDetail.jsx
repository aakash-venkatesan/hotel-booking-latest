import { useParams, useLocation } from "react-router-dom";

function HotelDetail() {
  const { id } = useParams(); // Get hotel ID from the URL


  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Hotel ID: {id}</h2>
    </div>
  );
}

export default HotelDetail;
