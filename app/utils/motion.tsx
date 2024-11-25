// Helper function to determine x, y offsets based on direction
const getDirectionOffsets = (direction: string) => {
  switch (direction) {
    case "left":
      return { x: 100, y: 0 };
    case "right":
      return { x: -100, y: 0 };
    case "up":
      return { x: 0, y: 100 };
    case "down":
      return { x: 0, y: -100 };
    default:
      return { x: 0, y: 0 }; // No movement by default
  }
};

// Common transition defaults
const createTransition = (
  type: "tween" | "spring" = "tween",
  delay: number = 0,
  duration: number = 1,
  ease: "easeOut" | string = "easeOut"
) => ({
  type,
  delay,
  duration,
  ease,
});

/**
 * Creates a text variant animation with a spring transition.
 *
 * @param {number} delay - The delay before the animation starts.
 * @returns {object} The animation variant object.
 */
export const textVariant = (delay: number = 0) => ({
  hidden: {
    y: -50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: createTransition("spring", delay, 1.25),
  },
});

/**
 * Creates a fade-in animation from a specified direction.
 *
 * @param {string} direction - The direction from which to fade in ('left', 'right', 'up', 'down').
 * @param {string} type - The transition type ('tween' or 'spring').
 * @param {number} delay - The delay before the animation starts.
 * @param {number} duration - The duration of the animation.
 * @param {string} ease - The easing function for the animation.
 * @returns {object} The animation variant object.
 */
export const fadeIn = (
  direction: "left" | "right" | "up" | "down" = "up",
  type: "tween" | "spring" = "tween",
  delay: number = 0,
  duration: number = 1,
  ease: "easeOut" | string = "easeOut"
) => {
  const { x, y } = getDirectionOffsets(direction);
  return {
    hidden: {
      x,
      y,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: createTransition(type, delay, duration, ease),
    },
  };
};

/**
 * Creates a zoom-in animation.
 *
 * @param {number} delay - The delay before the animation starts.
 * @param {number} duration - The duration of the animation.
 * @param {string} ease - The easing function for the animation.
 * @returns {object} The animation variant object.
 */
export const zoomIn = (
  delay: number = 0,
  duration: number = 1,
  ease: "easeOut" | string = "easeOut"
) => ({
  hidden: {
    scale: 0,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: createTransition("tween", delay, duration, ease),
  },
});

/**
 * Creates a slide-in animation from a specified direction.
 *
 * @param {string} direction - The direction from which to slide in ('left', 'right', 'up', 'down').
 * @param {string} type - The transition type ('tween' or 'spring').
 * @param {number} delay - The delay before the animation starts.
 * @param {number} duration - The duration of the animation.
 * @param {string} ease - The easing function for the animation.
 * @returns {object} The animation variant object.
 */
export const slideIn = (
  direction: "left" | "right" | "up" | "down" = "left",
  type: "tween" | "spring" = "tween",
  delay: number = 0,
  duration: number = 1,
  ease: "easeOut" | string = "easeOut"
) => {
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "-100%" : direction === "down" ? "100%" : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: createTransition(type, delay, duration, ease),
    },
  };
};

/**
 * Creates a stagger container animation for child elements.
 *
 * @param {number} staggerChildren - The delay between each child animation.
 * @param {number} delayChildren - The delay before the child animations start.
 * @returns {object} The animation variant object.
 */
export const staggerContainer = (
  staggerChildren: number = 0.25,
  delayChildren: number = 0.25
) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});
