import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Copy, Send, Twitter } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

const LaunchProject = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    email: "",
    xHandle: "",
    tgHandle: "",
    dcHandle: "",
    founderTg: "",
  });

  const [submissionCode, setSubmissionCode] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const formatInput = (name, value) => {
    switch (name) {
      case 'xHandle':
        return value.replace(/^@/, '');
      case 'tgHandle':
      case 'founderTg':
        return value.startsWith('@') ? value : `@${value}`;
      case 'dcHandle':
        return value.includes('discord.gg/') ? value : `https://discord.gg/${value}`;
      default:
        return value;
    }
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = formatInput(name, value);
    setFormData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const copyCode = () => {
    navigator.clipboard.writeText(submissionCode);
    toast.success("Code copied to clipboard!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    const payload = {
      projectName: formData.projectName.trim(),
      description: formData.description.trim(),
      email: formData.email.trim() || undefined,
      socials: {
        x: formData.xHandle,
        telegram: formData.tgHandle,
        discord: formData.dcHandle,
        founderTg: formData.founderTg || undefined
      }
    };
  
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/v1/submissions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );
  
      const responseData = await response.json(); // Only parse once
  
      if (!response.ok) {
        let errorMessage = responseData.message || "Submission failed";
        if (responseData.errors) {
          errorMessage = Object.values(responseData.errors).join(', ');
        }
        throw new Error(errorMessage);
      }
  
      // Use responseData instead of parsing again
      setSubmissionCode(responseData.code);
      setIsSubmitted(true);
      setFormData({
        projectName: "",
        description: "",
        email: "",
        xHandle: "",
        tgHandle: "",
        dcHandle: "",
        founderTg: "",
      });
  
      toast.success("Proposal received!");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error.message || "Submission failed. Please check all fields.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="relative py-24 bg-gray-50 dark:bg-black overflow-hidden"
      ref={ref}
    >
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Launch Your Web3 Project
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Partner with Metamasonz to build a sustainable, successful Web3
            project from the ground up.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg dark:shadow-gray-800/20 max-w-2xl mx-auto"
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="projectName"
                  className="block text-gray-700 dark:text-gray-200 font-semibold mb-2"
                >
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="e.g., DecentralHub"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block text-gray-700 dark:text-gray-200 font-semibold mb-2"
                >
                  Project Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  rows="4"
                  placeholder="Tell us about your vision..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 dark:text-gray-200 font-semibold mb-2"
                  >
                    Contact Email (Optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="you@example.com"
                  />
                  <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
                    We'll respond via email if provided
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="founderTg"
                    className="block text-gray-700 dark:text-gray-200 font-semibold mb-2"
                  >
                    Founder's Telegram {!formData.email && "*"}
                  </label>
                  <input
                    type="text"
                    id="founderTg"
                    name="founderTg"
                    value={formData.founderTg}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="@founderusername"
                    required={!formData.email}
                  />
                  <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
                    {formData.email
                      ? "Optional"
                      : "Required if no email provided"}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="xHandle"
                    className="block text-gray-700 dark:text-gray-200 font-semibold mb-2"
                  >
                    X (Twitter) Handle *
                  </label>
                  <input
                    type="text"
                    id="xHandle"
                    name="xHandle"
                    value={formData.xHandle}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="@yourproject"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="tgHandle"
                    className="block text-gray-700 dark:text-gray-200 font-semibold mb-2"
                  >
                    Telegram Handle *
                  </label>
                  <input
                    type="text"
                    id="tgHandle"
                    name="tgHandle"
                    value={formData.tgHandle}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="@yourproject"
                    required
                  />
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="dcHandle"
                    className="block text-gray-700 dark:text-gray-200 font-semibold mb-2"
                  >
                    Discord Server *
                  </label>
                  <input
                    type="text"
                    id="dcHandle"
                    name="dcHandle"
                    value={formData.dcHandle}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="discord.gg/your-server"
                    required
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
                className={`w-full ${
                  isLoading
                    ? "bg-cyan-400 cursor-not-allowed"
                    : "bg-cyan-500 hover:bg-cyan-600"
                } text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center gap-2`}
              >
                {isLoading ? "Submitting..." : "Submit Project"}
                {!isLoading && <ArrowRight className="w-5 h-5" />}
              </motion.button>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="animate-pulse">
                <div className="text-4xl font-bold text-cyan-500 mb-4">✓</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Proposal Submitted Successfully!
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Your submission code:
                  <span
                    onClick={copyCode}
                    className="font-mono bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-md mx-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {submissionCode}
                    <Copy className="inline ml-2 w-4 h-4" />
                  </span>
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  Verify your submission through:
                </p>

                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <motion.a
                    href={`https://x.com/metamasonz?ref=${submissionCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center justify-center bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-900 dark:hover:bg-gray-200 transition-colors"
                  >
                    <Twitter className="mr-2 w-4 h-4" />X (Twitter)
                  </motion.a>

                  <motion.a
                    href={`https://t.me/metamasonz`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center justify-center bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-900 dark:hover:bg-gray-200 transition-colors"
                  >
                    <Send className="mr-2 w-4 h-4" />
                    Telegram
                  </motion.a>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Message us from your project's official account with your code
                </p>
              </div>

              <button
                onClick={() => setIsSubmitted(false)}
                className="text-cyan-500 hover:text-cyan-600 font-medium transition-colors"
              >
                Submit another proposal
              </button>
            </div>
          )}
        </motion.div>

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

export default LaunchProject;
