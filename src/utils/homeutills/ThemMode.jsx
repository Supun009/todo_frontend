export const getDarkModePreference = () => {
    // First, check the system preference
    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
    // Then, override with localStorage if available
    const storedPreference = localStorage.getItem("isDarkMode");
    return storedPreference !== null ? JSON.parse(storedPreference) : systemPreference;
  };
  
  export const setDarkModePreference = (isDarkMode) => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  };
  