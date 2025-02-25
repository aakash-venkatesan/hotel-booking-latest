import { motion } from "framer-motion";
import { Hotel } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div 
      className="flex flex-col items-center justify-start min-h-screen pt-20 text-white bg-cover bg-center"
      style={{ backgroundImage: "url('https://wallpapercave.com/wp/wp1846089.jpg')" }}
    >
      {/* Title & Icon */}
      <motion.div 
        className="flex items-center gap-3 mb-4 bg-opacity-60 p-4 rounded-lg bg-gray-900"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Hotel className="w-12 h-12" />
        <h1 className="text-4xl font-bold">JHotels</h1>
      </motion.div>
      
      {/* Caption / Description */}
      <motion.p 
        className="text-lg max-w-xl text-center mb-4 bg-opacity-60 p-4 rounded-lg bg-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Discover luxury and comfort at JHotels. Enjoy world-class hospitality, elegant rooms, and unforgettable experiences.
      </motion.p>
      
      {/* Buttons */}
      <motion.div 
        className="flex gap-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <button 
          onClick={() => navigate("/login")}
          className="px-6 py-3 text-lg bg-white text-blue-600 rounded-xl shadow-lg hover:bg-gray-200"
        >
          Sign In
        </button>
        <button 
          onClick={() => navigate("/signup")}
          className="px-6 py-3 text-lg bg-sky-600 text-white rounded-xl shadow-lg hover:bg-sky-400"
        >
          Register
        </button>
      </motion.div>
    </div>
  );
}
