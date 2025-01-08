import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FloatingKeywords = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const scrolled = window.scrollY;
      const progress = scrolled / (viewportHeight * 6);
      setIsVisible(progress > 0 && progress < 0.2);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const keywords = [
    "captcha solving",
    "state persistence",
    "proxies",
    "websocket routing",
    "chrome flags",
    "process management",
    "session recording",
    "load balancing",
    "monitoring"
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[9998]">
      {keywords.map((keyword, index) => {
        // Pre-calculate random positions for consistent movement
        const positions = {
          x: [
            Math.random() * window.innerWidth,
            Math.random() * window.innerWidth,
            Math.random() * window.innerWidth,
            Math.random() * window.innerWidth,
          ],
          y: [
            Math.random() * window.innerHeight,
            Math.random() * window.innerHeight,
            Math.random() * window.innerHeight,
            Math.random() * window.innerHeight,
          ]
        };

        return (
          <motion.div
            key={index}
            className="fixed text-sm text-gray-500 whitespace-nowrap z-[9998]"
            initial={{
              x: positions.x[0],
              y: positions.y[0],
              opacity: 0
            }}
            animate={{
              x: positions.x,
              y: positions.y,
              opacity: 1
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.33, 0.66, 1],
              repeatType: "reverse"
            }}
          >
            {keyword}
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingKeywords;