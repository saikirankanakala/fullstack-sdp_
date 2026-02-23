import { clsx } from 'clsx';

export function Input({ label, error, className, helpText, required, ...props }) {
    return (
        <div className="space-y-1.5">
            {label && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}{required && <span className="text-red-500 ml-0.5">*</span>}
                </label>
            )}
            <input
                className={clsx(
                    'block w-full rounded-xl border px-3.5 py-2.5 text-sm transition-all duration-200',
                    'bg-white dark:bg-gray-800',
                    'text-gray-900 dark:text-gray-100',
                    'placeholder:text-gray-400 dark:placeholder:text-gray-500',
                    error
                        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900'
                        : 'border-gray-200 dark:border-gray-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900',
                    'outline-none shadow-sm',
                    className
                )}
                {...props}
            />
            {helpText && !error && <p className="text-xs text-gray-500 dark:text-gray-400">{helpText}</p>}
            {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
        </div>
    );
}

export function Select({ label, error, className, helpText, required, children, ...props }) {
    return (
        <div className="space-y-1.5">
            {label && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}{required && <span className="text-red-500 ml-0.5">*</span>}
                </label>
            )}
            <select
                className={clsx(
                    'block w-full rounded-xl border px-3.5 py-2.5 text-sm transition-all duration-200',
                    'bg-white dark:bg-gray-800',
                    'text-gray-900 dark:text-gray-100',
                    error
                        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900'
                        : 'border-gray-200 dark:border-gray-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900',
                    'outline-none shadow-sm',
                    className
                )}
                {...props}
            >
                {children}
            </select>
            {helpText && !error && <p className="text-xs text-gray-500 dark:text-gray-400">{helpText}</p>}
            {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
        </div>
    );
}

export function Textarea({ label, error, className, helpText, required, ...props }) {
    return (
        <div className="space-y-1.5">
            {label && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}{required && <span className="text-red-500 ml-0.5">*</span>}
                </label>
            )}
            <textarea
                className={clsx(
                    'block w-full rounded-xl border px-3.5 py-2.5 text-sm transition-all duration-200 resize-y min-h-[100px]',
                    'bg-white dark:bg-gray-800',
                    'text-gray-900 dark:text-gray-100',
                    'placeholder:text-gray-400 dark:placeholder:text-gray-500',
                    error
                        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900'
                        : 'border-gray-200 dark:border-gray-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900',
                    'outline-none shadow-sm',
                    className
                )}
                {...props}
            />
            {helpText && !error && <p className="text-xs text-gray-500 dark:text-gray-400">{helpText}</p>}
            {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
        </div>
    );
}
