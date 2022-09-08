import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useDarkMode from "~/components/parts/navigation/DarkModeToggle/hooks/use-dark-mode";
import { menuBackgroundColor } from "~/styles/colors";

const Toggle = () => {
  const { isDarkMode, changeMode } = useDarkMode();
  return (
    <label
      htmlFor="default-toggle"
      className="inline-flex relative items-center cursor-pointer"
    >
      <input
        type="checkbox"
        value=""
        id="default-toggle"
        className="sr-only peer"
        checked={isDarkMode}
        onChange={(e) => {
          changeMode();
        }}
      />
      <div
        className={`
        w-12 h-6 rounded-full ${menuBackgroundColor}
        peer peer-checked:after:translate-x-full
        after:absolute after:left-0 after:bg-white after:border-gray-300
        after:border after:rounded-full after:h-6 after:w-6 after:transition-all 
      dark:peer-focus:ring-blue-800 dark:border-yellow-600
     `}
      >
        {isDarkMode && (
          <FontAwesomeIcon className="pl-2 text-yellow-400" icon={faMoon} />
        )}
        {!isDarkMode && (
          <FontAwesomeIcon className="pl-7 text-orange-400" icon={faSun} />
        )}
      </div>
    </label>
  );
};

export default Toggle;
