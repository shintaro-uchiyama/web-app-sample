const modeStorageKey = "theme";

const mode = {
  light: "light",
  dark: "dark",
} as const;

export const initialize = () => {
  if (darkModeExists()) {
    setDarkMode();
    return;
  }

  setLightMode();
};

export const darkModeExists = (): boolean => {
  if (localStorage.getItem(modeStorageKey) === mode.light) return false;

  return (
    localStorage.getItem(modeStorageKey) === mode.dark ||
    window.matchMedia(`(prefers-color-scheme: ${mode.dark})`).matches
  );
};

export const setLightMode = () => {
  localStorage.setItem(modeStorageKey, mode.light);
  document.documentElement.classList.remove(mode.dark);
};

export const setDarkMode = () => {
  localStorage.setItem(modeStorageKey, mode.dark);
  document.documentElement.classList.add(mode.dark);
};
