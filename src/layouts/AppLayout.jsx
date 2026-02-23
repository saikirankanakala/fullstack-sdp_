import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { clsx } from 'clsx';

const PAGE_TITLES = {
    '/admin/dashboard': 'Overview Dashboard',
    '/admin/post-job': 'Post New Job',
    '/admin/applications': 'Manage Applications',
    '/admin/hours': 'Track Work Hours',
    '/student/jobs': 'Browse Jobs',
    '/student/applications': 'My Applications',
    '/student/log-hours': 'Log Work Hours',
    '/student/feedback': 'Performance Feedback',
};

export function AppLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const location = useLocation();
    const title = PAGE_TITLES[location.pathname] || 'StudyWork';

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
            {/* Desktop Sidebar */}
            <div className="hidden md:flex">
                <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            </div>

            {/* Mobile Sidebar Overlay */}
            {mobileSidebarOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setMobileSidebarOpen(false)}
                    />
                    <div className="relative w-60 h-full">
                        <Sidebar isCollapsed={false} setIsCollapsed={() => setMobileSidebarOpen(false)} />
                    </div>
                </div>
            )}

            {/* Main */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Topbar
                    title={title}
                    onMenuClick={() => setMobileSidebarOpen(true)}
                />
                <main className="flex-1 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        <div key={location.pathname} className="h-full">
                            <Outlet />
                        </div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
