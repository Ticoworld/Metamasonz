import { motion } from 'framer-motion';
import { useScroll } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 z-50">
      <motion.div
        className="h-full bg-cyan-500"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}

export default ScrollProgress
