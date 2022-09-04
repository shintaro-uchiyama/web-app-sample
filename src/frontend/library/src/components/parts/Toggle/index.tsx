import useDarkMode from "~/components/parts/Toggle/hooks/use-dark-mode";

const Toggle = () => {
  const { isDarkMode, changeMode } = useDarkMode();
  console.log("isDarkMode", isDarkMode);
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
        w-11 h-6 rounded-full peer 
      bg-gray-200 
      peer-checked:bg-blue-600 
        peer-checked:after:translate-x-full peer-checked:after:border-white 
        after:content-[''] 
        after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 
        after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
      dark:bg-gray-700 dark:peer-focus:ring-blue-800 dark:border-gray-600
     "
      ></div>
    </label>
  );
};

export default Toggle;
