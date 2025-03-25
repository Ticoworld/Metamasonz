import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiCommand, FiCpu, FiShield, FiZap } from "react-icons/fi";
import { HashLink } from "react-router-hash-link";

const Methodology = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Animated background balls
  const EnergyBalls = () => {
    const balls = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 40 + 20,
      delay: Math.random() * 2,
    }));

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {balls.map((ball) => (
          <motion.div
            key={ball.id}
            className="absolute rounded-full bg-gray-200/20 dark:bg-purple-300/20 backdrop-blur-sm"
            style={{
              width: `${ball.size}px`,
              height: `${ball.size}px`,
              left: `${ball.x}%`,
              top: `${ball.y}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: ball.delay,
            }}
          />
        ))}
      </div>
    );
  };

  const processSteps = [
    {
      icon: <FiCommand className="w-8 h-8" />,
      title: "Protocol Architecture",
      content: "Smart contract auditing and tokenomics stress-testing",
    },
    {
      icon: <FiCpu className="w-8 h-8" />,
      title: "Builder Onboarding",
      content: "Assembling battle-tested Web3 teams",
    },
    {
      icon: <FiZap className="w-8 h-8" />,
      title: "Organic Ignition",
      content: "Community-driven growth without influencers",
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Anti-Fragile Setup",
      content: "Treasury management & contingency planning",
    },
  ];

  return (
    <section className="relative min-h-screen bg-white dark:bg-black overflow-hidden">
      <EnergyBalls />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold text-black dark:text-white mb-4">
            Web3 Execution Protocol
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our kinetic approach to building lasting blockchain infrastructure
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.2, type: "spring" }}
              className="bg-white/80 dark:bg-black/80 backdrop-blur-lg p-8 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all shadow-xl hover:shadow-2xl"
            >
              <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                <span className="text-gray-600 dark:text-gray-300">
                  {step.icon}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-black dark:text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{step.content}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 relative z-10"
        >
                     <HashLink smooth to="/proof" className="no-underline">
        
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
            See Our Work
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
          </HashLink>
        </motion.div>
      </div>
    </section>
  );
};

export default Methodology;
