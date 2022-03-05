import {
  faBuilding,
  faCalendar,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  return (
    <div className="h-screen hidden lg:block shadow-lg relative w-52">
      <div className="bg-white h-full">
        <div className="flex items-center justify-start pt-6 ml-8">
          <p className="font-bold text-xl">Ucwork</p>
        </div>
        <nav className="mt-6">
          <div>
            <Link
              className={`
                w-full flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start border-l-4 ${
                  location.pathname === "/"
                    ? "text-gray-800 border-purple-500"
                    : "text-gray-400 border-transparent hover:text-gray-800"
                } 
              `}
              to="/"
            >
              <span className="text-left">
                <FontAwesomeIcon
                  icon={faHome}
                  fill="currentColor"
                  className=""
                />
                <span className="mx-4 text-sm font-normal">Home</span>
              </span>
            </Link>
            <Link
              className={`
                w-full flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start border-l-4 ${
                  location.pathname === "/companies"
                    ? "text-gray-800 border-purple-500"
                    : "text-gray-400 border-transparent hover:text-gray-800"
                } 
              `}
              to="/companies"
            >
              <span className="text-left">
                <FontAwesomeIcon
                  icon={faBuilding}
                  fill="currentColor"
                  className=""
                />
              </span>
              <span className="mx-4 text-sm font-normal">Company</span>
            </Link>
            <Link
              className={`
                w-full flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start border-l-4 ${
                  location.pathname === "/schedule"
                    ? "text-gray-800 border-purple-500"
                    : "text-gray-400 border-transparent hover:text-gray-800"
                } 
              `}
              to="/schedule"
            >
              <span className="text-left">
                <FontAwesomeIcon
                  icon={faCalendar}
                  fill="currentColor"
                  className=""
                />
              </span>
              <span className="mx-4 text-sm font-normal">Schedule</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default SideMenu;
