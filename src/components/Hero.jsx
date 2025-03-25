import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { FiArrowUpRight } from "react-icons/fi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Array of 5 images (update paths to your actual images)
  const images = [
    '/image1.jpg',
    '/image2.jpg',
    '/image3.jpg',
    '/image4.jpg',
    '/image5.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const starVariants = {
    twinkle: {
      opacity: [0, 1, 0],
      scale: [1, 1.8, 1],
      transition: {
        duration: 2 + Math.random() * 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const stats = [
    { number: 90, suffix: "%", label: "Success Rate" },
    { number: 200, suffix: "+", label: "Projects Guided" },
    { number: 4, suffix: "B+", label: "Total Raised" },
    { number: 10, suffix: "k+", label: "Community Members" },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-black dark:via-black dark:to-black relative overflow-hidden">
      {/* Cosmic Particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gray-500/50 dark:bg-white rounded-full"
            style={{
              width: Math.random() * 4 + "px",
              height: Math.random() * 4 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            variants={starVariants}
            animate="twinkle"
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
        {/* Main Content */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.3 }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Content */}
          <div className="space-y-8">
            <motion.h1
              variants={contentVariants}
              className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100"
            >
              <motion.span
                className="block"
                initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: "backOut" }}
              >
                Building Web3
              </motion.span>
              <motion.span
                className="block mt-4 bg-gradient-to-r from-gray-900 to-purple-600 dark:from-gray-100 dark:to-purple-300 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: 20, scale: 1.1 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
              >
                Foundations
              </motion.span>
            </motion.h1>

            <motion.p
              variants={contentVariants}
              className="text-xl text-gray-700 dark:text-gray-300"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Empowering projects through expertise and organic growth.
              </motion.span>
              <motion.span
                className="block mt-4 text-gray-600 dark:text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                No hype. No shortcuts. Just sustainable success.
              </motion.span>
            </motion.p>

            <motion.div
  variants={contentVariants}
  className="flex flex-wrap gap-4"
>
  <Link to="/launch-project" className="no-underline">
    <motion.button
      whileHover={{
        scale: 1.05,
        background: "linear-gradient(45deg, #4F46E5, #9333EA)",
      }}
      whileTap={{ scale: 0.95 }}
      className="bg-black dark:bg-gray-100 text-white dark:text-black px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center gap-2"
    >
      Start Building
      <FiArrowUpRight className="inline-block" />
    </motion.button>
  </Link>
  <Link to="/process" className="no-underline">
    <motion.button
      whileHover={{
        scale: 1.05,
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
      }}
      whileTap={{ scale: 0.95 }}
      className="border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors dark:border-gray-100 dark:text-gray-100"
    >
      Our Process
    </motion.button>
  </Link>
</motion.div>
          </div>

          {/* Image Carousel Section */}
          <motion.div
            className="relative"
            initial={{ scale: 0.9, opacity: 0, rotate: 5 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "backOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-transparent dark:from-purple-900/30 blur-3xl opacity-40" />
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative h-96 w-full mx-auto bg-gray-200 dark:bg-black/5 overflow-hidden rounded-xl"
            >
              <AnimatePresence mode='wait'>
                <motion.div
                  key={currentImageIndex}
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: "0%", opacity: 1 }}
                  exit={{ x: "-100%", opacity: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Progress Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-1 rounded-full ${
                      index === currentImageIndex 
                        ? 'bg-purple-500' 
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    animate={{
                      width: index === currentImageIndex ? 32 : 8,
                      opacity: index === currentImageIndex ? 1 : 0.5
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex overflow-x-hidden md:overflow-visible gap-1 md:gap-4 md:grid md:grid-cols-4 mt-24 pb-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="min-w-[70px] md:min-w-0 p-4 md:p-6 backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 rounded-xl md:border md:border-gray-200 dark:md:border-purple-500/30 border-r border-gray-200 dark:border-purple-500/30 flex-shrink-0"
            >
              <div className="text-xl md:text-4xl font-bold text-gray-900 dark:text-purple-300 mb-2">
                <CountUp
                  start={0}
                  end={stat.number}
                  suffix={stat.suffix}
                  duration={2}
                  decimals={stat.number % 1 !== 0 ? 1 : 0}
                />
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-[0.6rem]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute bottom-20 left-1/4 w-24 h-24 bg-purple-300/20 dark:bg-purple-500/20 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 180],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </section>
  );
};

export default Hero;