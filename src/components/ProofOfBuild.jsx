import { motion } from "framer-motion";
import { Code, Lock, Network, Rocket } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { useRef } from "react";
import { useTheme } from "next-themes";

const FloatingOrbs = () => {
  const { theme } = useTheme();
  const orbColor = theme === 'dark' ? 0x404040 : 0xe5e7eb;
  const count = 12;
  
  return (
    <Canvas 
      className="absolute inset-0 pointer-events-none"
      camera={{ position: [0, 0, 10], fov: 35 }}
    >
      <ambientLight intensity={0.5} />
      {Array.from({ length: count }).map((_, i) => (
        <Orb key={i} index={i} color={orbColor} />
      ))}
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </Canvas>
  );
};

const Orb = ({ index, color }) => {
  const ref = useRef();
  const position = [
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10
  ];

  useFrame(({ clock }) => {
    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime + index) * 2;
    ref.current.rotation.x = clock.elapsedTime * 0.2;
    ref.current.rotation.y = clock.elapsedTime * 0.3;
  });

  return (
    <Sphere ref={ref} args={[0.3, 32, 32]} position={position}>
      <meshPhongMaterial
        color={color}
        transparent
        opacity={0.4}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </Sphere>
  );
};

const ProofOfBuild = () => {
  const cases = [
    {
      icon: <Network className="w-6 h-6" />,
      title: "DeFi Architecture",
      stats: "$42M TVL • 98% Retention",
      tech: ["Solidity", "AAVE", "Chainlink"],
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "DAO Systems",
      stats: "12 Protocols Adopted",
      tech: ["Governor", "Snapshot", "Gnosis"],
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Security Audits",
      stats: "0 Exploits • 100% Success",
      tech: ["CertiK", "Hacken", "MythX"],
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Launchpad Partners",
      stats: "$16M Raised • 8/10 Success",
      tech: ["Polkastarter", "DAO Maker", "Seedify"],
    },
  ];

  return (
    <section className="relative py-24 bg-gray-50 dark:bg-black overflow-hidden" 
      id="proof"
    >
      {/* Floating orbs background */}
      <div className="absolute inset-0 z-0">
        <FloatingOrbs />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 z-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Proof of Build
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Verifiable on-chain achievements
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 z-10">
          {cases.map((caseStudy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white/80 dark:bg-gray-900/80 rounded-xl p-8 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all shadow-sm hover:shadow-lg backdrop-blur-lg"
            >
              <div className="mb-6">
                <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300">
                  {caseStudy.icon}
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {caseStudy.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium mb-4">
                {caseStudy.stats}
              </p>

              <div className="flex flex-wrap gap-2">
                {caseStudy.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="absolute -inset-[2px] bg-gradient-to-r from-gray-200/30 to-gray-300/30 dark:from-gray-700/20 dark:to-gray-800/20 rounded-xl blur-sm" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProofOfBuild;