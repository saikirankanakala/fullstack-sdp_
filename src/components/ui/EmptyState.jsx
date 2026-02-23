import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export function EmptyState({ icon: Icon, title, description, action, className }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={clsx(
                'flex flex-col items-center justify-center py-16 px-6 text-center',
                className
            )}
        >
            {Icon && (
                <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                    <Icon size={28} className="text-gray-400 dark:text-gray-500" />
                </div>
            )}
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">{title}</h3>
            {description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mb-5">{description}</p>
            )}
            {action}
        </motion.div>
    );
}
