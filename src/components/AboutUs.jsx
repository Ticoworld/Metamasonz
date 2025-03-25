import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Users, Rocket, Shield, Lightbulb } from "lucide-react";
import { HashLink } from "react-router-hash-link";
const AboutUs = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotate: 5, scale: 0.9 },
    visible: { opacity: 1, y: 0, rotate: 0, scale: 1 },
  };

  const sparkleVariants = {
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

  const aboutContent = [
    {
      icon: <Users className="w-8 h-8 " />,
      title: "Build Strong Teams",
      description:
        "We craft experienced teams that understand Web3 fundamentals.",
    },
    {
      icon: <Rocket className="w-8 h-8 " />,
      title: "Create Real Value",
      description: "We focus on meaningful utility and sustainable growth.",
    },
    {
      icon: <Shield className="w-8 h-8 " />,
      title: "Grow Organically",
      description: "We build communities that stick around, without the hype.",
    },
    {
      icon: <Lightbulb className="w-8 h-8 " />,
      title: "Deliver Results",
      description: "We’re hands-on partners who get it done—smart and steady.",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative py-24 bg-gray-50 dark:bg-black overflow-hidden"
      id="about"
    >
      {/* Animated Gradient Background with Layers */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ scale: 0.8, opacity: 0.7, rotate: 0 }}
        animate={{
          scale: [0.8, 1.05, 0.8],
          opacity: [0.7, 1, 0.7],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(211,211,211,0.2), transparent 70%)",
        }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ scale: 1.1, opacity: 0.6, rotate: 0 }}
        animate={{
          scale: [1.1, 0.95, 1.1],
          opacity: [0.6, 0.9, 0.6],
          rotate: [0, -5, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 70% 70%, rgba(0,0,0,0.2), transparent 70%)",
        }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ scale: 1, opacity: 0.5, rotate: 0 }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
          rotate: [0, 3, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(150,150,150,0.1), transparent 70%)",
        }}
      />

      {/* Sparkle Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gray-300/50 dark:bg-white/20 rounded-full"
            style={{
              width: Math.random() * 4 + "px",
              height: Math.random() * 4 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            variants={sparkleVariants}
            animate="twinkle"
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={contentVariants}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Who We Are
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We’re Metamasonz—a crew of Web3 builders who’ve seen the hype,
            survived the crashes, and know what it takes to make projects last.
          </p>
        </motion.div>

        {/* Staggered Card Layout with Enhanced Motion */}
        <div className="relative flex flex-wrap justify-center gap-8">
          {aboutContent.map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={cardVariants}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              className={`bg-white dark:bg-black rounded-2xl p-8 shadow-lg dark:border dark:border-gray-800 hover:translate-y-[-5px] hover:shadow-xl transition-all ${
                index % 2 === 0 ? "mt-16" : ""
              }`}
              style={{ zIndex: aboutContent.length - index }}
            >
              <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 text-center">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12"> {/* Added margin-top for spacing */}
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
              Meet the Team
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
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
