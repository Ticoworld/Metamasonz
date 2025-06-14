import { motion } from "framer-motion";
import { Users, Shield, Code, Globe, Rocket } from "lucide-react";
import CountUp from "react-countup";
import { HashLink } from "react-router-hash-link";

const WhoWeAre = () => {
  const stats = [
    { number: 150, label: "Projects Contributed", suffix: "+" },
    { number: 5, label: "Years Experience" },
    { number: 90, label: "Success Rate", suffix: "%" },
    { number: 27, label: "Countries Served", suffix: "+" },
  ];

  const principles = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Build to Last",
      text: "We craft protocols and tokenomics that endure market cycles, not just ride the hype.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Security First",
      text: "Battle-tested smart contracts and audits to protect your vision.",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Reach",
      text: "Organic growth strategies that connect with real communities worldwide.",
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Rapid Execution",
      text: "From concept to mainnet in weeks, without cutting corners.",
    },
  ];

  return (
    <section className="relative py-24 bg-gray-50 dark:bg-black overflow-hidden">
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20 bg-[url('/grid.svg')]" />

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Ethos Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Who We Are: Metamasonz
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We’re Web3 builders who’ve seen the scams, survived the dumps, and know how to make projects thrive—not just launch.
          </p>
        </motion.div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-24">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all"
            >
              <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                {principle.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {principle.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{principle.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-24"
        >
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-gray-800">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Our Story
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We’ve been in the trenches—launching communities, managing projects, and watching good ideas crumble under bad teams or influencer scams. That’s why we founded Metamasonz: to help founders ditch the hype, build with real expertise, and create Web3 projects that last. We’re not here for quick pumps or memecoin seasons—we’re here to transform the space with sustainable value.
            </p>
            <HashLink smooth to="/proof" className="no-underline">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-black dark:bg-gray-800 text-white dark:text-gray-100 px-6 py-3 rounded-lg"
            >
              See Our Work
            </motion.button>
            </HashLink>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 text-center"
            >
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                <CountUp
                  end={stat.number}
                  suffix={stat.suffix || ""}
                  duration={2}
                />
              </div>
              <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Why It Matters */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Why It Matters
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Web3’s drowning in quick-buck schemes. We’re flipping that—building a future where projects stand out for their utility, not their volume spikes. With Metamasonz, founders thrive, investors trust, and ideas become legacies.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeAre;