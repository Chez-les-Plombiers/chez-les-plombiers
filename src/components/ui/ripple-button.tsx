"use client";

import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface RippleState {
  x: number;
  y: number;
  size: number;
  key: number;
  isLeaving?: boolean;
}

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  rippleColor?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

export function RippleButton({
  children,
  className = "",
  rippleColor = "bg-black",
  href,
  target,
  rel,
  onClick,
  ...props
}: RippleButtonProps) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripple, setRipple] = useState<RippleState | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const getRect = () => {
    const el = href ? anchorRef.current : buttonRef.current;
    return el?.getBoundingClientRect() ?? null;
  };

  const createRipple = useCallback(
    (event: React.MouseEvent) => {
      if (isHovered) return;
      const rect = getRect();
      if (!rect) return;
      setIsHovered(true);

      const size = Math.max(rect.width, rect.height) * 2;
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      setRipple({ x, y, size, key: Date.now() });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isHovered, href]
  );

  const removeRipple = useCallback((event: React.MouseEvent) => {
    if (event.target !== event.currentTarget) return;
    setIsHovered(false);

    const rect = getRect();
    if (!rect) return;
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setRipple({ x, y, size, key: Date.now(), isLeaving: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [href]);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (!isHovered || !ripple) return;
      const rect = getRect();
      if (!rect) return;

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      setRipple((prev) => (prev ? { ...prev, x, y } : null));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isHovered, ripple, href]
  );

  const handleEnter = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) createRipple(e);
  };

  const handleLeave = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) removeRipple(e);
  };

  const cls = `relative flex items-center justify-center overflow-hidden px-8 py-3 text-lg font-medium transition-colors duration-[600ms] ${className}`;

  const content = (
    <>
      <span className="relative z-[2]">{children}</span>
      <AnimatePresence>
        {ripple && (
          <motion.span
            key={ripple.key}
            className={`absolute rounded-full pointer-events-none z-[1] ${rippleColor}`}
            style={{
              width: ripple.size,
              height: ripple.size,
              left: ripple.x,
              top: ripple.y,
              x: "-50%",
              y: "-50%",
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              scale: ripple.isLeaving ? 0 : 1,
              x: "-50%",
              y: "-50%",
            }}
            exit={{ scale: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            onAnimationComplete={() => {
              if (ripple.isLeaving) {
                setRipple(null);
              }
            }}
          />
        )}
      </AnimatePresence>
    </>
  );

  if (href) {
    return (
      <a
        ref={anchorRef}
        href={href}
        target={target}
        rel={rel}
        className={cls}
        onClick={onClick}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onMouseMove={handleMouseMove}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef}
      className={cls}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseMove={handleMouseMove}
      {...props}
    >
      {content}
    </button>
  );
}
