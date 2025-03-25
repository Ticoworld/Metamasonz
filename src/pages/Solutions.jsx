import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiUsers, FiTrendingUp, FiDollarSign, FiClock, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Solutions = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const solutions = [
    {
      icon: <FiUsers className="w-8 h-8" />,
      problem: "Broken Team Building",
      title: "Expert Web3 Teams",
      content: "We assemble seasoned Web3 professionals who understand blockchain fundamentals, saving you from costly hiring mistakes.",
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      problem: "Hype-Driven Failure",
      title: "Organic Growth",
      content: "Ditch the influencer hype. We build authentic communities and marketing strategies that attract real users.",
    },
    {
      icon: <FiDollarSign className="w-8 h-8" />,
      problem: "Short-Term Mindset",
      title: "Sustainable Models",
      content: "Tokenomics and products designed for longevity, not just pumps—ensuring your project thrives through market cycles.",
    },
    {
      icon: <FiClock className="w-8 h-8" />,
      problem: "Wasted Potential",
      title: "Strategic Execution",
      content: "Turn ideas into reality with a clear roadmap, from concept to mainnet, executed with precision and vision.",
    },
  ];

  // Cosmic particle animation variants
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
      id="solutions"
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Breaking The Cycle
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            How Metamasonz turns Web3 failures into lasting successes
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg dark:shadow-gray-800/20"
            >
              <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                {solution.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {solution.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Fixing: <span className="italic">{solution.problem}</span>
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {solution.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 relative z-10"
        >
           <HashLink smooth to="/who-we-are" className="no-underline">
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
                 Learn How We Do It
                  <motion.span
                    animate={{ x: [0, 8, 0] }}
                    whileHover={{
                      x: [0, 12, 0],
                      transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
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

export default Solutions;