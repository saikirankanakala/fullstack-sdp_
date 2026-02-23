import { clsx } from 'clsx';
import { motion } from 'framer-motion';

const variants = {
    primary:
        'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white shadow-sm hover:shadow-indigo-200 dark:hover:shadow-indigo-900',
    secondary:
        'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-750',
    ghost:
        'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100',
    danger:
        'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-sm',
    success:
        'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm',
    outline:
        'border border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950 dark:border-indigo-500 dark:text-indigo-400',
};

const sizes = {
    sm: 'px-3 py-1.5 text-xs font-medium',
    md: 'px-4 py-2 text-sm font-medium',
    lg: 'px-5 py-2.5 text-sm font-semibold',
    xl: 'px-6 py-3 text-base font-semibold',
};

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    className,
    disabled,
    loading,
    onClick,
    type = 'button',
    fullWidth,
    icon: Icon,
    ...props
}) {
    return (
        <motion.button
            type={type}
            whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
            whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
            onClick={onClick}
            disabled={disabled || loading}
            className={clsx(
                'inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed',
                variants[variant],
                sizes[size],
                fullWidth && 'w-full',
                className
            )}
            {...props}
        >
            {loading && (
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
            )}
            {!loading && Icon && <Icon size={16} />}
            {children}
        </motion.button>
    );
}
