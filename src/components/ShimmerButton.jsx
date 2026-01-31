import { motion } from 'framer-motion';

/**
 * ShimmerButton - Black button with shimmer effect on hover
 */
export default function ShimmerButton({ children, onClick, className = '', ...props }) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
        relative overflow-hidden
        bg-obsidian text-white
        px-8 py-4 rounded-lg
        font-sans font-semibold text-sm
        transition-all duration-300
        shimmer-button
        ${className}
      `}
            {...props}
        >
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
}
