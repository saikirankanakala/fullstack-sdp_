import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export function LoadingSpinner({ size = 'md', className }) {
    const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };
    return (
        <div className={clsx('flex items-center justify-center', className)}>
            <motion.div
                className={clsx('rounded-full border-2 border-gray-200 dark:border-gray-700 border-t-indigo-600', sizes[size])}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            />
        </div>
    );
}

export function PageLoader() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
            <div className="text-center space-y-3">
                <LoadingSpinner size="lg" />
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Loading...</p>
            </div>
        </div>
    );
}
