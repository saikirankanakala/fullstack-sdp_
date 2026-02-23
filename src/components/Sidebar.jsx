import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import {
    LayoutDashboard, Briefcase, FileText, Clock, Star,
    ChevronLeft, ChevronRight, GraduationCap, LogOut, Search,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Avatar } from './ui/Avatar';

const adminNav = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/post-job', icon: Briefcase, label: 'Post Job' },
    { to: '/admin/applications', icon: FileText, label: 'Applications' },
    { to: '/admin/hours', icon: Clock, label: 'Track Hours' },
];

const studentNav = [
    { to: '/student/jobs', icon: Search, label: 'Browse Jobs' },
    { to: '/student/applications', icon: FileText, label: 'My Applications' },
    { to: '/student/log-hours', icon: Clock, label: 'Log Hours' },
    { to: '/student/feedback', icon: Star, label: 'Feedback' },
];

export function Sidebar({ isCollapsed, setIsCollapsed }) {
    const { currentUser, logout, isAdmin } = useAuth();
    const navItems = isAdmin ? adminNav : studentNav;
    const location = useLocation();

    return (
        <motion.aside
            animate={{ width: isCollapsed ? 72 : 240 }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            className="relative flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 overflow-hidden shrink-0"
        >
            {/* Logo */}
            <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-100 dark:border-gray-800 min-h-[65px]">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-200 dark:shadow-indigo-900">
                    <GraduationCap size={16} className="text-white" />
                </div>
                <AnimatePresence>
                    {!isCollapsed && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.15 }}
                            className="overflow-hidden"
                        >
                            <span className="font-bold text-gray-900 dark:text-white text-sm tracking-tight">
                                StudyWork
                            </span>
                            <span className="block text-[10px] text-gray-400 dark:text-gray-500 font-medium mt-0.5">
                                {isAdmin ? 'Admin Portal' : 'Student Portal'}
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto overflow-x-hidden">
                {navItems.map(({ to, icon: Icon, label }) => {
                    const active = location.pathname === to;
                    return (
                        <NavLink
                            key={to}
                            to={to}
                            className={clsx(
                                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative',
                                active
                                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                            )}
                            title={isCollapsed ? label : undefined}
                        >
                            {active && (
                                <motion.div
                                    layoutId="sidebar-active"
                                    className="absolute inset-0 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 -z-10"
                                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                                />
                            )}
                            <Icon size={18} className="flex-shrink-0" />
                            <AnimatePresence>
                                {!isCollapsed && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.1 }}
                                        className="truncate"
                                    >
                                        {label}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </NavLink>
                    );
                })}
            </nav>

            {/* User profile */}
            <div className="px-2 py-3 border-t border-gray-100 dark:border-gray-800 space-y-1">
                <div className={clsx('flex items-center gap-3 px-3 py-2.5 rounded-xl', isCollapsed ? 'justify-center' : '')}>
                    <Avatar initials={currentUser?.avatar || 'U'} size="sm" />
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex-1 min-w-0"
                            >
                                <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">
                                    {currentUser?.name}
                                </p>
                                <p className="text-[10px] text-gray-400 dark:text-gray-500 truncate">
                                    {currentUser?.email}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <button
                    onClick={logout}
                    title={isCollapsed ? 'Sign out' : undefined}
                    className={clsx(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                        'text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-950/50 hover:text-red-600 dark:hover:text-red-400',
                        isCollapsed && 'justify-center'
                    )}
                >
                    <LogOut size={16} />
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                Sign out
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* Collapse toggle */}
            <button
                onClick={() => setIsCollapsed((c) => !c)}
                className="absolute -right-3 top-16 w-6 h-6 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-10"
            >
                {isCollapsed ? (
                    <ChevronRight size={12} className="text-gray-500 dark:text-gray-400" />
                ) : (
                    <ChevronLeft size={12} className="text-gray-500 dark:text-gray-400" />
                )}
            </button>
        </motion.aside>
    );
}
