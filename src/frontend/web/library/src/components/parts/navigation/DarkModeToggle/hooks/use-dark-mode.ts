import { useEffect, useState } from "react";
import {
  darkModeExists,
  setDarkMode,
  setLightMode,
} from "~/features/dark-mode";

interface IUseDarkMode {
  isDarkMode: boolean;
  changeMode: () => void;
}

const useDarkMode = (): IUseDarkMode => {
  const [isDarkMode, setIsDarkMode] = useState(darkModeExists());

  const changeMode = () => {
    if (isDarkMode) {
      setLightMode();
    } else {
      setDarkMode();
    }

    setIsDarkMode(!isDarkMode);
  };

  return {
    isDarkMode,
    changeMode,
  };
};

export default useDarkMode;
