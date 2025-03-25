import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const ProofOfBuild = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Placeholder projects showcasing your work
  const projects = [
    {
      name: "DecentralHub",
      image: "https://via.placeholder.com/400x300?text=DecentralHub",
      description: "A community-driven DAO platform with sustainable tokenomics.",
      stats: [
        { label: "Users", value: "50K+" },
        { label: "TVL", value: "$10M+" },
        { label: "Launched", value: "Q2 2023" },
      ],
    },
    {
      name: "NFTVault",
      image: "https://via.placeholder.com/400x300?text=NFTVault",
      description: "Secure NFT staking protocol with audited smart contracts.",
      stats: [
        { label: "NFTs Staked", value: "20K+" },
        { label: "Volume", value: "$5M+" },
        { label: "Launched", value: "Q4 2022" },
      ],
    },
    {
      name: "EcoChain",
      image: "https://via.placeholder.com/400x300?text=EcoChain",
      description: "Green blockchain with organic growth to 100K users.",
      stats: [
        { label: "Users", value: "100K+" },
        { label: "Tx/Day", value: "1M+" },
        { label: "Launched", value: "Q1 2024" },
      ],
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
      id="proof-of-build"
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
            Proof of Build
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Real projects. Real results. See how Metamasonz delivers lasting Web3 success.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg dark:shadow-gray-800/20"
            >
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {project.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {project.description}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {project.stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {stat.value}
                    </p>
                  </div>
                ))}
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
                         Meet The Builders 
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

export default ProofOfBuild;