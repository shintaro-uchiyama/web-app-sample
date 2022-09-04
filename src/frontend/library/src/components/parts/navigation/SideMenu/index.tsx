import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import { sideMenuBackgroundColor, titleTextColor } from "~/styles/colors";

const SideMenu = () => {
  const location = useLocation();
  return (
    <div
      className={`h-screen hidden lg:block shadow-lg relative w-32 ${sideMenuBackgroundColor}`}
    >
      <div className="h-full">
        <div className="flex items-center justify-start pt-6 ml-4">
          <p className={`font-bold text-xl ${titleTextColor}`}>Library</p>
        </div>
        <nav className="mt-6">
          <div>
            <Link
              className={`
                w-full flex items-center pl-2 p-2 my-2 transition-colors duration-200 justify-start border-l-4 ${
                  location.pathname === "/memo"
                    ? "text-gray-800 border-purple-500"
                    : "text-gray-400 border-transparent hover:text-gray-800"
                } 
              `}
              to="/"
            >
              <span className="text-left">
                <FontAwesomeIcon
                  icon={faBook}
                  fill="currentColor"
                  className=""
                />
                <span className="mx-2 text-sm font-normal">Memo</span>
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default SideMenu;
