import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useDarkMode from "~/components/parts/navigation/DarkModeToggle/hooks/use-dark-mode";

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
        className="
        w-12 h-6 rounded-full bg-blue-600 
        peer 
      peer-checked:bg-gray-200
        peer-checked:after:translate-x-full peer-checked:after:border-white 
        after:content-[''] 
        after:absolute after:top-[2px] after:left-[4px] after:bg-white after:border-gray-300 
        after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
      dark:bg-gray-700 dark:peer-focus:ring-blue-800 dark:border-gray-600
     "
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
