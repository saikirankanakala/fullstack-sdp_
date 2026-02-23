import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, XCircle, Search, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../hooks/useToast';
import { USERS } from '../../data/mockData';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { EmptyState } from '../../components/ui/EmptyState';
import { PageTransition } from '../../components/ui/PageTransition';

const STATUS_OPTIONS = ['all', 'pending', 'approved', 'rejected'];

export default function ManageApplicationsPage() {
    const { applications, jobs, updateApplicationStatus } = useApp();
    const { success } = useToast();
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    const enriched = applications.map((app) => ({
        ...app,
        student: USERS.find((u) => u.id === app.studentId),
        job: jobs.find((j) => j.id === app.jobId),
    }));

    const filtered = enriched.filter((a) => {
        const matchStatus = filter === 'all' || a.status === filter;
        const q = search.toLowerCase();
        const matchSearch =
            !q ||
            a.student?.name?.toLowerCase().includes(q) ||
            a.job?.title?.toLowerCase().includes(q) ||
            a.job?.department?.toLowerCase().includes(q);
        return matchStatus && matchSearch;
    });

    const sorted = [...filtered].sort((a, b) => {
        const order = { pending: 0, approved: 1, rejected: 2 };
        return (order[a.status] ?? 3) - (order[b.status] ?? 3);
    });

    const handleAction = (appId, action) => {
        updateApplicationStatus(appId, action);
        success(action === 'approved' ? 'Application approved ✓' : 'Application rejected');
    };

    const counts = {
        all: applications.length,
        pending: applications.filter((a) => a.status === 'pending').length,
        approved: applications.filter((a) => a.status === 'approved').length,
        rejected: applications.filter((a) => a.status === 'rejected').length,
    };

    return (
        <PageTransition>
            <div className="p-5 md:p-7 max-w-6xl mx-auto space-y-5">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                            <FileText size={18} className="text-violet-600 dark:text-violet-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Applications</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{applications.length} total</p>
                        </div>
                    </div>
                    {/* Search */}
                    <div className="sm:ml-auto flex items-center gap-2 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-64">
                            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by student or job..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-700 transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Filter tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {STATUS_OPTIONS.map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap border ${filter === s
                                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
                                }`}
                        >
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                            <span className={`px-1.5 py-0.5 rounded-full text-xs ${filter === s ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                                {counts[s]}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Application cards */}
                {sorted.length === 0 ? (
                    <EmptyState
                        icon={FileText}
                        title="No applications found"
                        description={search ? 'Try adjusting your search terms.' : 'No applications match this filter.'}
                    />
                ) : (
                    <div className="space-y-3">
                        {sorted.map((app, i) => (
                            <motion.div
                                key={app.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.04 }}
                            >
                                <Card hover>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                        <Avatar initials={app.student?.avatar || 'U'} size="md" className="flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                                                    {app.student?.name}
                                                </p>
                                                <Badge variant={app.status} dot>{app.status.charAt(0).toUpperCase() + app.status.slice(1)}</Badge>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">{app.job?.title}</p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                                {app.job?.department} · Applied {app.appliedDate}
                                            </p>
                                            {app.coverNote && (
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic line-clamp-2">
                                                    "{app.coverNote}"
                                                </p>
                                            )}
                                        </div>
                                        {app.status === 'pending' && (
                                            <div className="flex items-center gap-2 shrink-0">
                                                <Button
                                                    variant="success"
                                                    size="sm"
                                                    icon={CheckCircle}
                                                    onClick={() => handleAction(app.id, 'approved')}
                                                >
                                                    Approve
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    icon={XCircle}
                                                    onClick={() => handleAction(app.id, 'rejected')}
                                                >
                                                    Reject
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </PageTransition>
    );
}
