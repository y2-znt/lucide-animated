"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface BriefcaseBusinessIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface BriefcaseBusinessIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SVG_VARIANTS: Variants = {
  normal: {
    rotate: 0,
  },
  animate: {
    rotate: [0, -3, 2, 0],
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

const BODY_VARIANTS: Variants = {
  normal: {
    y: 0,
  },
  animate: {
    y: [0, -2, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const HANDLE_VARIANTS: Variants = {
  normal: {
    y: 0,
  },
  animate: {
    y: [0, -3, -1, 0],
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const DIVIDER_VARIANTS: Variants = {
  normal: {
    y: 0,
    opacity: 1,
  },
  animate: {
    y: [0, -1, 0],
    opacity: [1, 0.6, 1],
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      delay: 0.1,
    },
  },
};

const DOT_VARIANTS: Variants = {
  normal: {
    scale: 1,
    opacity: 1,
  },
  animate: {
    scale: [1, 1.8, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      delay: 0.2,
    },
  },
};

const BriefcaseBusinessIcon = forwardRef<
  BriefcaseBusinessIconHandle,
  BriefcaseBusinessIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const controls = useAnimation();
  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;

    return {
      startAnimation: () => controls.start("animate"),
      stopAnimation: () => controls.start("normal"),
    };
  });

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        onMouseEnter?.(e);
      } else {
        controls.start("animate");
      }
    },
    [controls, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        onMouseLeave?.(e);
      } else {
        controls.start("normal");
      }
    },
    [controls, onMouseLeave]
  );

  return (
    <div
      className={cn(className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <motion.svg
        animate={controls}
        fill="none"
        height={size}
        initial="normal"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        style={{ transformOrigin: "12px 20px" }}
        variants={SVG_VARIANTS}
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.rect
          animate={controls}
          height="14"
          rx="2"
          variants={BODY_VARIANTS}
          width="20"
          x="2"
          y="6"
        />
        <motion.path
          animate={controls}
          d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"
          variants={HANDLE_VARIANTS}
        />
        <motion.path
          animate={controls}
          d="M22 13a18.15 18.15 0 0 1-20 0"
          variants={DIVIDER_VARIANTS}
        />
        <motion.path
          animate={controls}
          d="M12 12h.01"
          variants={DOT_VARIANTS}
        />
      </motion.svg>
    </div>
  );
});

BriefcaseBusinessIcon.displayName = "BriefcaseBusinessIcon";

export { BriefcaseBusinessIcon };
