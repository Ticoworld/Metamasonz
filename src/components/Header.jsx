import { useState } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { MdNightsStay } from "react-icons/md";
import { BiMenuAltRight } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { HashLink } from "react-router-hash-link";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const toggleNav = () => setNavOpen(!navOpen);

  

  // Navigation items that are sections on the LandingPage
  const navItems = [
    "Problem Statement",
    "About",
    "Solutions",
    "Proof",
    "Contact",
  ];

  const menuVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { ease: "easeInOut", duration: 0.2 },
    },
  };

  const headerVariants = {
    hidden: { y: -100 },
    visible: {
      y: 0,
      transition: { type: "spring", stiffness: 150 },
    },
  };

  return (
    <motion.header
      className="fixed top-0 w-full bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-black dark:via-black dark:to-black text-black dark:text-gray-300 z-50"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      style={{
        backgroundColor: isScrolled
          ? "rgba(243, 244, 246, 0.95)"
          : "rgba(243, 244, 246, 1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.h1
          className="text-2xl font-bold"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <HashLink
            smooth
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="cursor-pointer"
          >
            Metamasonz
          </HashLink>
        </motion.h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => (
            <HashLink
              key={item}
              smooth
              // Always navigate to the LandingPage ("/") with a hash target
              to={`/#${item.toLowerCase().replace(/\s+/g, "")}`}
              className="relative text-gray-800 dark:text-gray-300"
              style={{ textDecoration: "none" }}
            >
              {item}
              <motion.span
                className="absolute left-0 bottom-0 w-full h-[2px] bg-gray-600 dark:bg-gray-400"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </HashLink>
          ))}
        </nav>

       

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center space-x-4">
          <motion.button
            onClick={toggleNav}
            className="text-2xl focus:outline-none"
            whileTap={{ scale: 0.9 }}
          >
            <BiMenuAltRight />
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {navOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 dark:bg-gray-800/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleNav}
            />

            <motion.div
              className="md:hidden fixed top-20 right-4 w-64 bg-gray-200 dark:bg-black rounded-lg z-50"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ul className="flex flex-col items-center space-y-4 py-4">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item}
                    className="w-full text-center"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <HashLink
                      smooth
                      to={`/#${item.toLowerCase().replace(/\s+/g, "")}`}
                      className="block py-2 hover:bg-gray-300/30 dark:hover:bg-white/10 transition-colors"
                      onClick={toggleNav}
                    >
                      {item}
                    </HashLink>
                  </motion.li>
                ))}
                <motion.li
                  className="w-full text-center"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                >

                </motion.li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
