import { Bell, Menu } from 'lucide-react';
import { ThemeToggle } from './ui/ThemeToggle';
import { Avatar } from './ui/Avatar';
import { useAuth } from '../context/AuthContext';
import { Badge } from './ui/Badge';

export function Topbar({ onMenuClick, title }) {
    const { currentUser, isAdmin } = useAuth();

    return (
        <header className="h-16 px-4 md:px-6 flex items-center gap-3 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shrink-0">
            {/* Mobile menu */}
            <button
                onClick={onMenuClick}
                className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
                <Menu size={20} />
            </button>

            {/* Page title */}
            <h1 className="flex-1 text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
                {title}
            </h1>

            {/* Actions */}
            <div className="flex items-center gap-1">
                <ThemeToggle />

                <div className="relative">
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <Bell size={18} />
                    </button>
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900" />
                </div>

                <div className="flex items-center gap-2.5 ml-2 pl-3 border-l border-gray-200 dark:border-gray-700">
                    <Avatar initials={currentUser?.avatar || 'U'} size="sm" />
                    <div className="hidden sm:block">
                        <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 leading-tight">
                            {currentUser?.name?.split(' ')[0]}
                        </p>
                        <Badge variant={isAdmin ? 'purple' : 'info'} className="text-[10px] px-1.5 py-0">
                            {isAdmin ? 'Admin' : 'Student'}
                        </Badge>
                    </div>
                </div>
            </div>
        </header>
    );
}
