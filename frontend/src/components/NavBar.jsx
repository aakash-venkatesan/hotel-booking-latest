import { Search, SquarePen, Bell, CircleUserRound, House } from "lucide-react";
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="flex bg-blue-50 w-full">
      <div className="flex w-100">
        <h1 className="text-4xl font-bold m-4 mx-8">JHotels</h1>
      </div>
      <div className="flex justify-end w-full m-4 gap-5">
        <Link to="/home">
          <House className="mx-3 my-1" size={30} />
        </Link>
        <div className="flex">
          <Link to="/hotel">
            <SquarePen className="mx-3 my-1" size={30} />
          </Link>
        </div>
        <Link to="/profile">
          <CircleUserRound className="mx-3 my-1" size={30} />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
