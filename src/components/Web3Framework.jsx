import { motion } from "framer-motion";
import { GitBranch, Users, Lock, Rocket, PieChart } from "lucide-react";

const Web3Framework = () => {
  const pillars = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Architecture",
      text: "Building squads with deep Web3 DNA",
    },
    {
      icon: <GitBranch className="w-8 h-8" />,
      title: "Protocol Design",
      text: "Tokenomics that incentivize longevity",
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Trust Infrastructure",
      text: "Non-negotiable security foundations",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Growth Engines",
      text: "Organic community flywheels",
    },
    {
      icon: <PieChart className="w-8 h-8" />,
      title: "Sustainability Models",
      text: "Anti-fragile economic systems",
    },
  ];

  return (
<section className="relative py-24 bg-gray-50 dark:bg-black/95 overflow-hidden min-h-[80vh]">
{/* Animated Background */}
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
        className="absolute inset-0 bg-[url('/image4.jpg')] bg-[size:120px] opacity-10 dark:opacity-[0.15]"
      />

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-400 via-gray-600 to-gray-400 dark:from-gray-300 dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-4 pb-3">
            Building Web3 Right
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our battle-tested framework for sustainable blockchain success
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white dark:bg-black p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all"
              >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                  {pillar.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {pillar.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animated Connector Lines */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <motion.path
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2 }}
              d="M10 50 Q 50 10 90 50"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
              className="text-gray-200 dark:text-gray-800"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Web3Framework;