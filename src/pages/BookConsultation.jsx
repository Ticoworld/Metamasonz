import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiArrowRight } from "react-icons/fi";
import { useState } from "react";

const BookConsultation = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    preferredTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Consultation booked:", formData); // Replace with your submission logic
    alert("Consultation request submitted! We’ll confirm your slot soon.");
    setFormData({ name: "", email: "", topic: "", preferredTime: "" });
  };

  return (
    <section
      className="relative py-24 bg-gray-50 dark:bg-black overflow-hidden"
      ref={ref}
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Book a Consultation
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Talk to our Web3 experts about your project, goals, or challenges—no strings attached.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg dark:shadow-gray-800/20 max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-gray-700 dark:text-gray-200 font-semibold mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g., John Doe"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 dark:text-gray-200 font-semibold mb-2"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="topic"
                className="block text-gray-700 dark:text-gray-200 font-semibold mb-2"
              >
                Discussion Topic
              </label>
              <input
                type="text"
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g., Tokenomics Design"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="preferredTime"
                className="block text-gray-700 dark:text-gray-200 font-semibold mb-2"
              >
                Preferred Time (Your Timezone)
              </label>
              <input
                type="text"
                id="preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="e.g., Tomorrow, 2 PM EST"
                required
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              Book Now
              <FiArrowRight />
            </motion.button>
          </form>
        </motion.div>

        {/* Response Time */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-gray-600 dark:text-gray-400 mt-6 text-sm text-center"
        >
          Average response time: 2.3 hours
        </motion.p>
      </div>
    </section>
  );
};

export default BookConsultation;