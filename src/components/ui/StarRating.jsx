import { Star } from 'lucide-react';
import { clsx } from 'clsx';

export function StarRating({ rating, max = 5, size = 16, className }) {
    return (
        <div className={clsx('flex items-center gap-0.5', className)}>
            {Array.from({ length: max }).map((_, i) => (
                <Star
                    key={i}
                    size={size}
                    className={
                        i < rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'
                    }
                />
            ))}
        </div>
    );
}
