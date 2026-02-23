import { motion } from 'framer-motion';
import { Star, MessageSquare, Briefcase } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { USERS } from '../../data/mockData';
import { Card } from '../../components/ui/Card';
import { StarRating } from '../../components/ui/StarRating';
import { Avatar } from '../../components/ui/Avatar';
import { EmptyState } from '../../components/ui/EmptyState';
import { PageTransition } from '../../components/ui/PageTransition';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export default function FeedbackPage() {
    const { getStudentFeedback, jobs } = useApp();
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const myFeedback = getStudentFeedback(currentUser?.id || '');

    const enriched = myFeedback.map((fb) => ({
        ...fb,
        job: jobs.find((j) => j.id === fb.jobId),
        admin: USERS.find((u) => u.id === fb.adminId),
    }));

    const avgRating = myFeedback.length > 0
        ? (myFeedback.reduce((s, f) => s + f.rating, 0) / myFeedback.length).toFixed(1)
        : null;

    return (
        <PageTransition>
            <div className="p-5 md:p-7 max-w-4xl mx-auto space-y-5">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Performance Feedback</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                            {myFeedback.length} feedback {myFeedback.length === 1 ? 'entry' : 'entries'} from admins
                        </p>
                    </div>
                    {avgRating && (
                        <div className="text-right">
                            <p className="text-3xl font-bold text-amber-500">{avgRating}</p>
                            <StarRating rating={Math.round(parseFloat(avgRating))} size={14} />
                            <p className="text-xs text-gray-400 mt-0.5">avg. rating</p>
                        </div>
                    )}
                </div>

                {enriched.length === 0 ? (
                    <EmptyState
                        icon={Star}
                        title="No feedback yet"
                        description="Complete approved jobs and the admin will leave you performance reviews here."
                        action={<Button onClick={() => navigate('/student/jobs')} size="sm" icon={Briefcase}>Browse Jobs</Button>}
                    />
                ) : (
                    <div className="space-y-4">
                        {enriched.map((fb, i) => (
                            <motion.div
                                key={fb.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.06 }}
                            >
                                <Card hover>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        {/* Rating circle */}
                                        <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 flex-shrink-0">
                                            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{fb.rating}</p>
                                            <p className="text-[9px] text-amber-500 font-medium uppercase tracking-wide">/ 5</p>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            {/* Job info */}
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                <Briefcase size={14} className="text-indigo-500 flex-shrink-0" />
                                                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{fb.job?.title}</p>
                                                <span className="text-xs text-gray-400 dark:text-gray-500">· {fb.job?.department}</span>
                                            </div>
                                            {/* Stars */}
                                            <StarRating rating={fb.rating} size={16} className="mb-3" />
                                            {/* Comment */}
                                            <div className="relative pl-4">
                                                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-indigo-200 dark:bg-indigo-800 rounded-full" />
                                                <p className="text-sm text-gray-600 dark:text-gray-300 italic leading-relaxed">
                                                    "{fb.comment}"
                                                </p>
                                            </div>
                                            {/* Admin + date */}
                                            <div className="flex items-center gap-2 mt-3">
                                                <Avatar initials={fb.admin?.avatar || 'AD'} size="sm" />
                                                <div>
                                                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{fb.admin?.name}</p>
                                                    <p className="text-[10px] text-gray-400 dark:text-gray-500">{fb.date}</p>
                                                </div>
                                            </div>
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
