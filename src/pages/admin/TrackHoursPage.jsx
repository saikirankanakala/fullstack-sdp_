import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, User, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../hooks/useToast';
import { USERS } from '../../data/mockData';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { EmptyState } from '../../components/ui/EmptyState';
import { PageTransition } from '../../components/ui/PageTransition';

export default function TrackHoursPage() {
    const { workLogs, jobs, approveWorkLog, getTotalApprovedHours } = useApp();
    const { success } = useToast();
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    const enriched = workLogs.map((log) => ({
        ...log,
        student: USERS.find((u) => u.id === log.studentId),
        job: jobs.find((j) => j.id === log.jobId),
    }));

    const filtered = enriched.filter((l) => {
        const matchStatus = filter === 'all' ? true : filter === 'approved' ? l.approved : !l.approved;
        const q = search.toLowerCase();
        const matchSearch = !q || l.student?.name?.toLowerCase().includes(q) || l.job?.title?.toLowerCase().includes(q);
        return matchStatus && matchSearch;
    });

    // Sort: pending first
    const sorted = [...filtered].sort((a, b) => (a.approved === b.approved ? 0 : a.approved ? 1 : -1));

    const handleApprove = (logId) => {
        approveWorkLog(logId);
        success('Work hours approved ✓');
    };

    const totalHours = getTotalApprovedHours();
    const pendingHours = workLogs.filter((l) => !l.approved).reduce((s, l) => s + l.hours, 0);

    const studentSummary = USERS.filter((u) => u.role === 'student').map((s) => ({
        ...s,
        approved: workLogs.filter((l) => l.studentId === s.id && l.approved).reduce((sum, l) => sum + l.hours, 0),
        pending: workLogs.filter((l) => l.studentId === s.id && !l.approved).reduce((sum, l) => sum + l.hours, 0),
    })).filter((s) => s.approved > 0 || s.pending > 0);

    return (
        <PageTransition>
            <div className="p-5 md:p-7 max-w-6xl mx-auto space-y-5">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                            <Clock size={18} className="text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Track Work Hours</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{workLogs.length} submissions</p>
                        </div>
                    </div>
                    {/* Search */}
                    <div className="sm:ml-auto relative w-full sm:w-64">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search student or job..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-700 transition-all"
                        />
                    </div>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { label: 'Total Approved Hours', value: totalHours, color: 'bg-emerald-500' },
                        { label: 'Pending Hours', value: pendingHours, color: 'bg-amber-500' },
                        { label: 'Total Submissions', value: workLogs.length, color: 'bg-indigo-500' },
                    ].map(({ label, value, color }) => (
                        <Card key={label} className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                                <Clock size={18} className="text-white" />
                            </div>
                            <div>
                                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Per-student summary */}
                {studentSummary.length > 0 && (
                    <Card>
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                            <User size={15} className="text-gray-400" />
                            Hours by Student
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                            {studentSummary.map((s) => (
                                <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                                    <Avatar initials={s.avatar} size="sm" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{s.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {s.approved}h approved · {s.pending}h pending
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                )}

                {/* Filter tabs */}
                <div className="flex items-center gap-2">
                    {['all', 'pending', 'approved'].map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all border ${filter === s
                                    ? 'bg-indigo-600 border-indigo-600 text-white'
                                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 hover:border-gray-300'
                                }`}
                        >
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Work log cards */}
                {sorted.length === 0 ? (
                    <EmptyState icon={Clock} title="No work logs found" description="No submissions match the selected filter." />
                ) : (
                    <div className="space-y-3">
                        {sorted.map((log, i) => (
                            <motion.div key={log.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                                <Card hover>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                        <Avatar initials={log.student?.avatar || 'U'} size="md" className="flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{log.student?.name}</p>
                                                <Badge variant={log.approved ? 'approved' : 'pending'} dot>
                                                    {log.approved ? 'Approved' : 'Pending'}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">{log.job?.title}</p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                                {log.date} · <strong className="text-gray-700 dark:text-gray-300">{log.hours} hours</strong>
                                            </p>
                                            {log.notes && (
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 italic line-clamp-2">"{log.notes}"</p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3 shrink-0">
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{log.hours}h</p>
                                                <p className="text-xs text-gray-400">logged</p>
                                            </div>
                                            {!log.approved && (
                                                <Button variant="success" size="sm" icon={CheckCircle} onClick={() => handleApprove(log.id)}>
                                                    Approve
                                                </Button>
                                            )}
                                        </div>
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
