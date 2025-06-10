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
  duration = 1.5,
  yOffset = 150,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-20px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{
        type: "spring",
        stiffness: 80,
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
