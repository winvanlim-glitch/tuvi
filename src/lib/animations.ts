import { Variants, Transition } from 'framer-motion';

// ============================================
// SPRING CONFIGURATIONS
// ============================================

export const spring = {
    gentle: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
        mass: 0.5
    },
    bouncy: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 20,
        mass: 0.8
    },
    snappy: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 25,
        mass: 0.5
    },
    smooth: {
        type: 'spring' as const,
        stiffness: 200,
        damping: 30,
        mass: 1
    }
};

// ============================================
// EASE CONFIGURATIONS
// ============================================

export const easing = {
    easeOut: [0.22, 1, 0.36, 1],
    easeInOut: [0.43, 0.13, 0.23, 0.96],
    anticipate: [0.68, -0.55, 0.265, 1.55]
};

// ============================================
// FADE VARIANTS
// ============================================

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.5, ease: easing.easeOut }
    }
};

export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: spring.gentle
    }
};

export const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: spring.gentle
    }
};

export const fadeInScale: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: spring.bouncy
    }
};

// ============================================
// STAGGER CONTAINER VARIANTS
// ============================================

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05
        }
    }
};

export const staggerFast: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0
        }
    }
};

export const staggerSlow: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

// ============================================
// CARD VARIANTS
// ============================================

export const cardHover: Variants = {
    rest: {
        scale: 1,
        y: 0,
        boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.3)'
    },
    hover: {
        scale: 1.02,
        y: -8,
        boxShadow: '0 20px 50px -15px rgba(54, 226, 123, 0.3)',
        transition: spring.bouncy
    },
    tap: {
        scale: 0.98,
        transition: spring.snappy
    }
};

export const cardLift: Variants = {
    rest: {
        y: 0,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    },
    hover: {
        y: -4,
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
        transition: spring.gentle
    }
};

// ============================================
// ICON VARIANTS
// ============================================

export const iconBounce: Variants = {
    rest: { scale: 1, rotate: 0 },
    hover: {
        scale: 1.2,
        rotate: [0, -10, 10, -10, 0],
        transition: {
            scale: spring.bouncy,
            rotate: {
                duration: 0.5,
                ease: easing.anticipate
            }
        }
    }
};

export const iconPulse: Variants = {
    rest: { scale: 1 },
    hover: {
        scale: [1, 1.1, 1],
        transition: {
            duration: 0.6,
            repeat: Infinity,
            ease: easing.easeInOut
        }
    }
};

export const iconSpin: Variants = {
    rest: { rotate: 0 },
    hover: {
        rotate: 360,
        transition: {
            duration: 0.8,
            ease: 'linear'
        }
    }
};

// ============================================
// BUTTON VARIANTS
// ============================================

export const buttonTap: Variants = {
    rest: { scale: 1 },
    hover: {
        scale: 1.05,
        transition: spring.bouncy
    },
    tap: {
        scale: 0.95,
        transition: spring.snappy
    }
};

export const buttonPress: Variants = {
    rest: { scale: 1, y: 0 },
    hover: {
        scale: 1.02,
        y: -2,
        transition: spring.gentle
    },
    tap: {
        scale: 0.98,
        y: 1,
        transition: spring.snappy
    }
};

// ============================================
// SLIDE VARIANTS
// ============================================

export const slideInLeft: Variants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: spring.gentle
    }
};

export const slideInRight: Variants = {
    hidden: { x: 30, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: spring.gentle
    }
};

// ============================================
// SPECIAL EFFECTS
// ============================================

export const floatingAnimation: Variants = {
    initial: { y: 0 },
    animate: {
        y: [-10, 10, -10],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
        }
    }
};

export const glowPulse: Variants = {
    rest: { opacity: 0.5 },
    hover: {
        opacity: [0.5, 1, 0.5],
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
        }
    }
};

// ============================================
// PAGE TRANSITIONS
// ============================================

export const pageTransition: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: easing.easeOut
        }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.3,
            ease: easing.easeOut
        }
    }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getStaggerDelay = (index: number, baseDelay: number = 0.1): number => {
    return index * baseDelay;
};

export const createStaggerVariant = (staggerDelay: number = 0.1): Variants => ({
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.05
        }
    }
});
