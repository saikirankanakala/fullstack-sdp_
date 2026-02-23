import { motion } from 'framer-motion';

const pageVariants = {
    initial: { opacity: 0, y: 8 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -8 },
};

const pageTransition = {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.25,
};

export function PageTransition({ children }) {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={pageTransition}
            className="h-full"
        >
            {children}
        </motion.div>
    );
}
