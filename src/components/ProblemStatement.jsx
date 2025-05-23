import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiUsers, FiTrendingUp, FiDollarSign, FiClock } from "react-icons/fi";
import { HashLink } from "react-router-hash-link";


const ProblemStatement = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const problems = [
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Broken Team Building",
      content:
        "Founders wasting resources on inexperienced teams that lack Web3 fundamentals",
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: "Hype-Driven Failure",
      content:
        "Over-reliance on influencer marketing instead of real value creation",
    },
    {
      icon: <FiDollarSign className="w-8 h-8" />,
      title: "Short-Term Mindset",
      content: "Sacrificing long-term sustainability for quick pumps and dumps",
    },
    {
      icon: <FiClock className="w-8 h-8" />,
      title: "Wasted Potential",
      content:
        "Good ideas dying from poor execution and lack of strategic vision",
    },
  ];

  // Star animation variants for cosmic particles
  const starVariants = {
    twinkle: {
      opacity: [0, 1, 0],
      scale: [1, 1.5, 1],
      transition: {
        duration: 2 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      className="relative py-24 bg-gray-50 dark:bg-black overflow-hidden"
      ref={ref}
      id="problemstatement"
    >
      {/* Cosmic Background Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "url('/image5.jpg') no-repeat center center",
          backgroundSize: "cover",
          opacity: 0.2,
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cosmic Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gray-300/50 dark:bg-purple-400/30 rounded-full"
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            The Web3 Trap
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Why 92% of projects fail within their first year - and how we're
            changing it
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg dark:shadow-gray-800/20"
            >
              <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                {problem.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {problem.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {problem.content}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 relative z-10"
        >
          <HashLink smooth to="/solutions" className="no-underline">
            <motion.button
              className="bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-900 dark:to-black text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center gap-2 mx-auto"
              animate={{
                boxShadow: [
                  "0 0 10px rgba(150,150,150,0.5)",
                  "0 0 20px rgba(150,150,150,0.8)",
                  "0 0 10px rgba(150,150,150,0.5)",
                ],
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(150,150,150,1)",
                transition: { duration: 0.3 },
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Break The Cycle
              <motion.span
                animate={{ x: [0, 8, 0] }}
                whileHover={{
                  x: [0, 12, 0],
                  transition: {
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block"
              >
                →
              </motion.span>
            </motion.button>
          </HashLink>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemStatement;
