import { motion } from 'framer-motion';
import { FileText, Clock, Briefcase, DollarSign } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/ui/EmptyState';
import { PageTransition } from '../../components/ui/PageTransition';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export default function MyApplicationsPage() {
    const { getStudentApplications, jobs } = useApp();
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const myApps = getStudentApplications(currentUser?.id || '');

    const enriched = [...myApps]
        .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
        .map((app) => ({
            ...app,
            job: jobs.find((j) => j.id === app.jobId),
        }));

    const counts = {
        pending: myApps.filter((a) => a.status === 'pending').length,
        approved: myApps.filter((a) => a.status === 'approved').length,
        rejected: myApps.filter((a) => a.status === 'rejected').length,
    };

    return (
        <PageTransition>
            <div className="p-5 md:p-7 max-w-4xl mx-auto space-y-5">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">My Applications</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{myApps.length} total applications</p>
                </div>

                {/* Summary chips */}
                {myApps.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                        {[
                            { label: 'Pending', count: counts.pending, variant: 'pending' },
                            { label: 'Approved', count: counts.approved, variant: 'approved' },
                            { label: 'Rejected', count: counts.rejected, variant: 'rejected' },
                        ].map(({ label, count, variant }) => (
                            <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
                                <Badge variant={variant} dot>{label}</Badge>
                                <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{count}</span>
                            </div>
                        ))}
                    </div>
                )}

                {enriched.length === 0 ? (
                    <EmptyState
                        icon={FileText}
                        title="No applications yet"
                        description="Browse available jobs and apply to get started."
                        action={
                            <Button onClick={() => navigate('/student/jobs')} icon={Briefcase}>
                                Browse Jobs
                            </Button>
                        }
                    />
                ) : (
                    <div className="space-y-3">
                        {enriched.map((app, i) => (
                            <motion.div
                                key={app.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Card hover>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                                            <Briefcase size={18} className="text-indigo-600 dark:text-indigo-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{app.job?.title}</p>
                                                <Badge variant={app.status} dot>
                                                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">{app.job?.department}</p>
                                            <div className="flex flex-wrap gap-3 text-xs text-gray-400 dark:text-gray-500 mt-1.5">
                                                <span className="flex items-center gap-1"><Clock size={11} />Applied {app.appliedDate}</span>
                                                {app.job && (
                                                    <span className="flex items-center gap-1">
                                                        <DollarSign size={11} />${app.job.hourlyRate}/hr · {app.job.maxHours}h/wk
                                                    </span>
                                                )}
                                            </div>
                                            {app.coverNote && (
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic line-clamp-1">
                                                    "{app.coverNote}"
                                                </p>
                                            )}
                                        </div>
                                        <div className="text-right shrink-0">
                                            {app.status === 'approved' && (
                                                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">✓ Congratulations!</p>
                                            )}
                                            {app.status === 'rejected' && (
                                                <p className="text-xs text-red-500 dark:text-red-400 font-medium">Not selected</p>
                                            )}
                                            {app.status === 'pending' && (
                                                <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">⏳ Under review</p>
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
