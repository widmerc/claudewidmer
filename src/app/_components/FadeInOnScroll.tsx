"use client";

import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

interface FadeInOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
}

const FadeInOnScroll: React.FC<FadeInOnScrollProps> = ({
  children,
  delay = 0,
  duration = 1000,
  yOffset = 100,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "20px" });
  const lastY = React.useRef<number>(0);
  const [scrollDirection, setScrollDirection] = React.useState<'down' | 'up'>('down');

  React.useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > lastY.current) {
        setScrollDirection('down');
      } else if (y < lastY.current) {
        setScrollDirection('up');
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // y-Offset nur beim Herunterscrollen, beim Hochscrollen immer y: 0
  const getInitial = () => {
    return scrollDirection === 'down' ? { opacity: 0, y: yOffset } : { opacity: 0, y: 0 };
  };
  const getAnimate = () => {
    return inView
      ? { opacity: 1, y: 0 }
      : scrollDirection === 'down'
        ? { opacity: 0, y: yOffset }
        : { opacity: 0, y: 0 };
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitial()}
      animate={getAnimate()}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 18,
        delay,
        duration,
      }}
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInOnScroll;
