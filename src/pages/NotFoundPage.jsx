import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Puzzle, Server, Link2Off } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center px-4">
      {/* Floating Blockchain Nodes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gray-300 dark:bg-gray-700 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-2xl text-center">
        {/* Error Code */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-4">
            <Link2Off className="w-16 h-16 text-red-500 dark:text-red-400" />
            <span className="text-8xl font-bold bg-gradient-to-r from-gray-900 to-purple-600 dark:from-gray-100 dark:to-purple-300 bg-clip-text text-transparent">
              404
            </span>
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Lost in the Blockchain
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            The page you're looking for doesn't exist or has been moved.
            <br />
            Let's get you back on-chain.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            to="/"
            className="inline-block bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Return to Mainnet
          </Link>
        </motion.div>

        {/* Web3 Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Blocks Mined", value: "42.9M" },
            { label: "Nodes Active", value: "16.8K" },
            { label: "Transactions", value: "1.2B" },
            { label: "Protocols", value: "230+" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800"
            >
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Floating Cube */}
      <motion.div
        className="hidden md:block absolute right-20 bottom-20 w-24 h-24 border-2 border-gray-300 dark:border-gray-700"
        animate={{
          rotate: [0, 90, 180, 270, 360],
          borderRadius: ["20%", "50%", "20%", "50%", "20%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default NotFoundPage;
