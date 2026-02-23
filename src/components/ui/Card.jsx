import { clsx } from 'clsx';
import { motion } from 'framer-motion';

export function Card({ children, className, hover = false, glass = false, onClick, padding = true }) {
    const Tag = onClick ? motion.div : motion.div;
    return (
        <Tag
            whileHover={hover ? { y: -2, boxShadow: '0 8px 30px rgba(0,0,0,0.1)' } : undefined}
            onClick={onClick}
            className={clsx(
                'rounded-2xl border transition-all duration-200',
                glass
                    ? 'bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border-white/30 dark:border-white/10'
                    : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800',
                'shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.4),0_4px_16px_rgba(0,0,0,0.3)]',
                padding && 'p-5',
                onClick && 'cursor-pointer',
                className
            )}
        >
            {children}
        </Tag>
    );
}

export function CardHeader({ children, className }) {
    return (
        <div className={clsx('flex items-center justify-between mb-4', className)}>
            {children}
        </div>
    );
}

export function CardTitle({ children, className }) {
    return (
        <h3 className={clsx('text-base font-semibold text-gray-900 dark:text-gray-100', className)}>
            {children}
        </h3>
    );
}
