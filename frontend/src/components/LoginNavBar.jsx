import { Search, SquarePen, Bell, CircleUserRound, House } from "lucide-react";
import { Link } from 'react-router-dom';

const UserNavBar = () => {
  return (
    <div className="flex bg-gray-100 w-full p-4 border-b border-gray-300">
  <div className="flex w-full">
    <h1 className="text-4xl font-bold mx-8 font-mono text-gray-700">JHotels</h1>
  </div>
  <div className="flex justify-end w-full gap-5">
    <Link to="/home" className="flex items-center">
      <House className="mx-3 text-blue-700 hover:text-blue-500 transition duration-300" size={30} />
    </Link>
    <Link to="/profile" className="flex items-center">
      <CircleUserRound className="mx-3 text-blue-700 hover:text-blue-500 transition duration-300" size={30} />
    </Link>
  </div>
</div>

  );
};

export default UserNavBar;

