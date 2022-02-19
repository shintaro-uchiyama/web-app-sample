import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faHome,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

function SideMenu() {
  return (
    <div className="h-screen hidden lg:block shadow-lg relative w-60">
      <div className="bg-white h-full dark:bg-gray-700">
        <div className="flex items-center justify-start pt-6 ml-8">
          <p className="font-bold dark:text-white text-xl">Ucwork</p>
        </div>
        <nav className="mt-6">
          <div>
            <Link
              className={`
                w-full text-gray-800 dark:text-white flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start border-l-4 border-purple-500`}
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
              className="
                w-full text-gray-400 flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start hover:text-gray-800 border-l-4 border-transparent
              "
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
              className="w-full text-gray-400 flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start hover:text-gray-800 border-l-4 border-transparent"
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
