import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Add this import

const CTASection = () => {
  return (
    <section className="relative py-20 bg-gray-50 dark:bg-gray-900" id="contact">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Build Web3 Right?
          </h2>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/launch-project">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Launch Your Project
              </motion.button>
            </Link>
            <Link to="/book-consultation">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:border-cyan-500 hover:text-cyan-500 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Book Consultation
              </motion.button>
            </Link>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-6 text-sm">
            Average response time: 2.3 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;