import { clsx } from 'clsx';

const colorMap = [
    'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
    'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
    'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
    'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
];

function getColorIndex(initials) {
    let sum = 0;
    for (let c of initials) sum += c.charCodeAt(0);
    return sum % colorMap.length;
}

export function Avatar({ initials, size = 'md', className }) {
    const sizes = {
        sm: 'w-7 h-7 text-xs',
        md: 'w-9 h-9 text-sm',
        lg: 'w-11 h-11 text-base',
        xl: 'w-14 h-14 text-lg',
    };
    const colorClass = colorMap[getColorIndex(initials || 'AA')];
    return (
        <div
            className={clsx(
                'rounded-full font-semibold flex items-center justify-center flex-shrink-0 select-none',
                colorClass,
                sizes[size],
                className
            )}
        >
            {(initials || 'AA').slice(0, 2).toUpperCase()}
        </div>
    );
}
