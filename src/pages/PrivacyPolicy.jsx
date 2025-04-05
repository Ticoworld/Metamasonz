import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const PrivacyPolicy = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

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
      className="relative py-24 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-black overflow-hidden"
      ref={ref}
    >
      {/* Cosmic Background Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "url('/image5.jpg') no-repeat center center",
          backgroundSize: "cover",
          opacity: 0.15,
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cosmic Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-indigo-300/50 dark:bg-purple-500/40 rounded-full"
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

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 dark:text-purple-100 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-indigo-700 dark:text-purple-300">
            Last updated: March 2, 2025
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/90 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl shadow-indigo-100/50 dark:shadow-purple-900/20 border border-indigo-100 dark:border-gray-700"
        >
          <div className="prose prose-indigo dark:prose-invert max-w-none">
            <p className="mb-6 text-indigo-900/90 dark:text-purple-100/90">
              At <a href="https://metamasonz.com" className="hidden-link">Metamasonz</a>, we respect your privacy and are committed to protecting any information you share with us. This Privacy Policy explains what data we collect, how we use it, and how we ensure its security. By using our services, you agree to the terms outlined here.
            </p>

            <h2 className="text-2xl font-bold text-indigo-800 dark:text-purple-200 mb-4 mt-8">
              Information We Collect
            </h2>
            <p className="mb-6 text-indigo-900/90 dark:text-purple-100/90">
              To provide our services effectively, we collect the following information:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-indigo-900/90 dark:text-purple-100/90">
              <li>
                <strong className="text-indigo-900 dark:text-purple-100">Project Details</strong> – This includes information about your Web3 project, its goals, budget, and requirements.
              </li>
              <li>
                <strong className="text-indigo-900 dark:text-purple-100">Socials and Contact Information</strong> – Such as your X (Twitter) handle, Discord, Telegram, or email, to maintain communication.
              </li>
              <li>
                <strong className="text-indigo-900 dark:text-purple-100">Technical and Blockchain Data</strong> – When we build blockchain products, we may collect relevant data such as wallet addresses, token information, and user-related data required for functionality.
              </li>
              <li>
                <strong className="text-indigo-900 dark:text-purple-100">Payment Information</strong> – We may process payment details when necessary for transactions, though we do not store sensitive financial data.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-indigo-800 dark:text-purple-200 mb-4 mt-8">
              How We Use Your Information
            </h2>
            <p className="mb-4 text-indigo-900/90 dark:text-purple-100/90">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-indigo-900/90 dark:text-purple-100/90">
              <li>Deliver the services you request, including project advisory, marketing, and technical development.</li>
              <li>Improve our offerings and provide a seamless experience.</li>
              <li>Communicate with you regarding updates, changes, or issues related to your project.</li>
              <li>Ensure security and prevent fraudulent activities.</li>
              <li>Comply with legal and regulatory requirements where applicable.</li>
            </ul>

            <h2 className="text-2xl font-bold text-indigo-800 dark:text-purple-200 mb-4 mt-8">
              How We Protect Your Information
            </h2>
            <p className="mb-6 text-indigo-900/90 dark:text-purple-100/90">
              We take security seriously and implement measures to prevent unauthorized access, disclosure, or misuse of your data. Our precautions include:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-indigo-900/90 dark:text-purple-100/90">
              <li>Restricting access to personal and project data only to authorized team members.</li>
              <li>Using encryption and secure storage for sensitive information.</li>
              <li>Avoiding disclosure of confidential information unless required by law or explicitly agreed upon.</li>
            </ul>

            <h2 className="text-2xl font-bold text-indigo-800 dark:text-purple-200 mb-4 mt-8">
              Third-Party Sharing
            </h2>
            <p className="mb-6 text-indigo-900/90 dark:text-purple-100/90">
              We do not sell, rent, or trade your information. However, in cases where external partners such as Key Opinion Leaders (KOLs), developers, or marketing collaborators are involved, we may share necessary data to fulfill our services. Any third-party we work with is expected to adhere to confidentiality agreements.
            </p>

            <h2 className="text-2xl font-bold text-indigo-800 dark:text-purple-200 mb-4 mt-8">
              User Rights & Data Removal
            </h2>
            <p className="mb-4 text-indigo-900/90 dark:text-purple-100/90">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-indigo-900/90 dark:text-purple-100/90">
              <li>Request access to the information we have about you.</li>
              <li>Ask for corrections or updates to your data.</li>
              <li>Request the deletion of your data from our records, except where retention is required for legal or operational purposes.</li>
            </ul>

            <h2 className="text-2xl font-bold text-indigo-800 dark:text-purple-200 mb-4 mt-8">
              Policy Updates
            </h2>
            <p className="mb-6 text-indigo-900/90 dark:text-purple-100/90">
              <a href="https://metamasonz.com" className="hidden-link">Metamasonz</a> may update this Privacy Policy from time to time to reflect changes in our services or legal obligations. Updates will be posted on our website, and continued use of our services constitutes acceptance of the revised policy.
            </p>

            <h2 className="text-2xl font-bold text-indigo-800 dark:text-purple-200 mb-4 mt-8">
              Contact Us
            </h2>
            <p className="text-indigo-900/90 dark:text-purple-100/90">
              For questions or concerns about this Privacy Policy, reach out to us at <a href="mailto:support.metamasons@gmail.com" className="hidden-link">support.metamasons@gmail.com</a> or <a href="https://x.com/Metamasonz" className="hidden-link">@Metamasonz</a> on X.
            </p>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .hidden-link {
          color: inherit;
          text-decoration: none;
          font-weight: 500;
          border-bottom: 1px dotted currentColor;
          transition: all 0.2s ease;
        }
        .hidden-link:hover {
          color: #6366f1;
          border-bottom-color: #6366f1;
        }
        .dark .hidden-link:hover {
          color: #a78bfa;
          border-bottom-color: #a78bfa;
        }
      `}</style>
    </section>
  );
};

export default PrivacyPolicy;