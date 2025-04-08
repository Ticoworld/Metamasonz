import React, { useEffect, useState } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { MdNightsStay } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const FloatingThemeToggle = () => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <motion.div
      className="fixed bottom-8 left-8 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <motion.button
        onClick={toggleTheme}
        className="cursor-pointer border dark:border-gray-600 border-gray-300 bg-gray-200 p-1 rounded-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {theme === "dark" ? (
          <IoSunnyOutline className="text-yellow-400 text-2xl" />
        ) : (
          <MdNightsStay className="text-gray-950 text-2xl" />
        )}
      </motion.button>
    </motion.div>
  );
};

export default FloatingThemeToggle;
