import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const Methodology = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const processSteps = [
    {
      step: "1. Discovery",
      title: "Understand Your Vision",
      content: "We start with a deep dive into your goals, market, and Web3 needs to align our strategy with your vision.",
    },
    {
      step: "2. Team Assembly",
      title: "Expert Squads",
      content: "We build a tailored team of Web3 pros—developers, strategists, and marketers—who’ve been there, done that.",
    },
    {
      step: "3. Design & Build",
      title: "Sustainable Foundations",
      content: "From tokenomics to smart contracts, we craft solutions that endure, audited and optimized for longevity.",
    },
    {
      step: "4. Launch & Grow",
      title: "Organic Success",
      content: "We execute a launch plan with organic marketing and community building, ensuring steady, real growth.",
    },
    {
      step: "5. Support",
      title: "Long-Term Partnership",
      content: "Post-launch, we stick around to refine, scale, and adapt your project as the Web3 landscape evolves.",
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
      id="methodology"
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
            Our Process
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            How Metamasonz turns your Web3 idea into a thriving reality, step by step.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="space-y-12">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg dark:shadow-gray-800/20 flex items-start gap-6"
            >
              <div className="text-2xl font-bold text-cyan-500 dark:text-cyan-400">
                {step.step}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.content}
                </p>
              </div>
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
          <Link to="/launch-project">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center gap-2 mx-auto"
            >
              Start Building Now
              <FiArrowRight />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Methodology;