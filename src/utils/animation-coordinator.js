/**
 * Animation Coordinator - Manages animation timing and synchronization across components
 */

// Detect if the device prefers reduced motion
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Detect if the device is mobile (touch device)
export const isMobileDevice = () => {
  return (
    window.matchMedia('(max-width: 767px)').matches || 
    'ontouchstart' in window || 
    navigator.maxTouchPoints > 0
  );
};

// Get appropriate animation duration based on device and preferences
export const getAnimationDuration = (defaultDuration = 0.3, mobileDuration = 0.2) => {
  if (prefersReducedMotion()) return 0.1; // Minimal duration for reduced motion
  return isMobileDevice() ? mobileDuration : defaultDuration;
};

// Animation variants with device-specific adjustments
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: getAnimationDuration(),
    }
  }),
};

export const slideUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: getAnimationDuration(),
      ease: "easeOut",
    }
  }),
};

export const slideInLeftVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: getAnimationDuration(),
      ease: "easeOut",
    }
  }),
};

export const slideInRightVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: getAnimationDuration(),
      ease: "easeOut",
    }
  }),
};

export const popVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: getAnimationDuration(),
      type: "spring",
      stiffness: 200,
      damping: 15,
    }
  }),
};

// Staggered children animations
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: isMobileDevice() ? 0.05 : 0.1,
      delayChildren: 0.1,
    }
  }
};

// Sequence multiple animations
export const sequenceAnimations = (animations, baseDelay = 0) => {
  let currentDelay = baseDelay;
  
  return animations.map(anim => {
    const animWithDelay = {
      ...anim,
      transition: {
        ...anim.transition,
        delay: currentDelay
      }
    };
    
    // Add this animation's duration to the current delay
    currentDelay += (anim.transition?.duration || 0.3) + 0.05;
    
    return animWithDelay;
  });
};
