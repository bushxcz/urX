import { motion } from 'framer-motion';

/**
 * PremiumCard - White card with subtle border and hover effects
 */
export default function PremiumCard({
    children,
    className = '',
    isSelected = true,
    delay = 0,
    ...props
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{
                y: -4,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
            }}
            className={`
        premium-card p-6
        ${isSelected ? 'opacity-100 scale-100' : 'opacity-60 scale-[0.98]'}
        ${className}
      `}
            {...props}
        >
            {children}
        </motion.div>
    );
}
