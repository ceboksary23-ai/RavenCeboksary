import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [currentTheme, setCurrentTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
  }, []);

  const setTheme = (theme) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  const toggleTheme = () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {currentTheme === "dark" ? "☀️" : "🌙"}
    </button>
  );
};

export default ThemeToggle;
