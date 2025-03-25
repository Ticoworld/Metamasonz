import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiUsers, FiActivity, FiBox, FiAnchor } from "react-icons/fi";
import { HashLink } from "react-router-hash-link";


const Solutions = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const solutions = [
    {
      icon: <FiUsers className="w-8 h-8 " />,
      title: "Elite Team Assembly",
      content:
        "We build battle-tested Web3 squads - no rookies, no mercenaries. Real builders who understand tokenomics, community dynamics, and sustainable growth.",
      delay: 0.1,
    },
    {
      icon: (
        <FiActivity className="w-8 h-8 " />
      ),
      title: "Organic Growth Engine",
      content:
        "Algorithms meet authenticity. Our growth strategies bypass influencer hype, focusing on real community building and protocol-value alignment.",
      delay: 0.2,
    },
    {
      icon: <FiBox className="w-8 h-8 " />,
      title: "Product-First Philosophy",
      content:
        "We help build actual utilities - not just tokens. DApps, protocols, and tools that solve real problems in DeFi, NFT infrastructure, and DAO governance.",
      delay: 0.3,
    },
    {
      icon: <FiAnchor className="w-8 h-8 " />,
      title: "Long-Term Architecture",
      content:
        "Multi-year roadmaps with built-in anti-fragility. Liquidity strategies, treasury management, and contingency planning that survives market cycles.",
      delay: 0.4,
    },
  ];

  // Sparkle variants for Web3-inspired animation
  const sparkleVariants = {
    animate: {
      opacity: [0, 1, 0],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 2 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.9 },
    visible: { opacity: 1, x: 0, scale: 1 },
  };

  return (
    <section
      id="solutions"
      ref={ref}
      className="relative py-24 overflow-hidden bg-gray-50 dark:bg-black"
      
    >
      {/* Background Sparkles for Web3 Aesthetic */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gray-300/50 dark:bg-white/20 rounded-full"
            style={{
              width: Math.random() * 3 + "px",
              height: Math.random() * 3 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            variants={sparkleVariants}
            animate="animate"
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Building Web3 Legacies
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our framework for sustainable protocol success in the age of degen
            noise.
          </p>
        </motion.div>

        {/* Vertical Timeline Layout */}
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 w-1 h-full bg-gray-300 dark:bg-gray-700 transform -translate-x-1/2"></div>
          <div className="space-y-12">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={cardVariants}
                transition={{
                  delay: solution.delay,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                className={`relative flex items-center ${
                  index % 2 === 0
                    ? "justify-start"
                    : "justify-end md:justify-end"
                } flex-col md:flex-row`}
              >
                <div
                  className={`w-full md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                  }`}
                >
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-all shadow-lg hover:shadow-xl">
                  <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                  {solution.icon}{" "}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 text-center">
                      {solution.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center">
                      {solution.content}
                    </p>
                  </div>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: 32 } : {}}
                  transition={{ delay: solution.delay + 0.3, duration: 0.5 }}
                  className={`hidden md:block absolute w-8 h-0.5 bg-gray-300 dark:bg-gray-700 top-1/2 transform -translate-y-1/2 ${
                    index % 2 === 0 ? "right-1/2" : "left-1/2"
                  }`}
                />
                <div className="hidden md:block absolute left-1/2 w-4 h-4 bg-gray-500 dark:bg-gray-400 rounded-full transform -translate-x-1/2 top-1/2 -translate-y-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Call-to-Action Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 relative z-10"
        >
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
              scale: 1.05, // Slightly scale up the button on hover
              boxShadow: "0 0 25px rgba(150,150,150,1)", // Intensify the glow on hover
              transition: { duration: 0.3 }, // Smooth transition for hover effects
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Build Your Legacy
            <motion.span
              animate={{ x: [0, 8, 0] }}
              whileHover={{
                x: [0, 12, 0], // Increase the arrow's movement range on hover
                transition: {
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }, // Faster arrow animation on hover
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
        </motion.div>
      </div>
    </section>
  );
};

export default Solutions;
