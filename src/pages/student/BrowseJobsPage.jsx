import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Briefcase, DollarSign, Clock, MapPin, Building2, Users, CheckCircle, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../hooks/useToast';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Textarea } from '../../components/ui/FormFields';
import { EmptyState } from '../../components/ui/EmptyState';
import { PageTransition } from '../../components/ui/PageTransition';
import { DEPARTMENTS } from '../../data/mockData';

export default function BrowseJobsPage() {
    const { jobs, applications, applyForJob, getStudentApplications } = useApp();
    const { currentUser } = useAuth();
    const { success, error, info } = useToast();

    const [search, setSearch] = useState('');
    const [deptFilter, setDeptFilter] = useState('');
    const [selectedJob, setSelectedJob] = useState(null);
    const [coverNote, setCoverNote] = useState('');
    const [applying, setApplying] = useState(false);

    const myApps = getStudentApplications(currentUser?.id || '');
    const appliedJobIds = new Set(myApps.map((a) => a.jobId));

    const activeJobs = jobs.filter((j) => j.status === 'active');

    const filtered = activeJobs.filter((j) => {
        const q = search.toLowerCase();
        const matchSearch = !q || j.title.toLowerCase().includes(q) || j.department.toLowerCase().includes(q) || j.description.toLowerCase().includes(q);
        const matchDept = !deptFilter || j.department === deptFilter;
        return matchSearch && matchDept;
    });

    const depts = [...new Set(activeJobs.map((j) => j.department))].sort();

    const handleApply = async () => {
        if (!selectedJob) return;
        setApplying(true);
        await new Promise((r) => setTimeout(r, 600));
        const result = applyForJob(currentUser.id, selectedJob.id, coverNote);
        setApplying(false);
        if (result.success) {
            success('Application submitted! 🎉');
            setSelectedJob(null);
            setCoverNote('');
        } else {
            error(result.message);
        }
    };

    return (
        <PageTransition>
            <div className="p-5 md:p-7 max-w-6xl mx-auto space-y-5">
                {/* Header */}
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Browse Jobs</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        {activeJobs.length} work-study positions available
                    </p>
                </div>

                {/* Search & filter */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search jobs..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-700 transition-all"
                        />
                    </div>
                    <select
                        value={deptFilter}
                        onChange={(e) => setDeptFilter(e.target.value)}
                        className="px-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-700 transition-all sm:w-52"
                    >
                        <option value="">All Departments</option>
                        {depts.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>

                {/* Job grid */}
                {filtered.length === 0 ? (
                    <EmptyState
                        icon={Briefcase}
                        title="No jobs found"
                        description="Try adjusting your search or department filter."
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {filtered.map((job, i) => {
                            const applied = appliedJobIds.has(job.id);
                            const appStatus = myApps.find((a) => a.jobId === job.id)?.status;
                            return (
                                <motion.div
                                    key={job.id}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Card hover className="flex flex-col h-full">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                                                <Briefcase size={18} className="text-indigo-600 dark:text-indigo-400" />
                                            </div>
                                            {applied && (
                                                <Badge variant={appStatus || 'info'} dot>
                                                    {appStatus ? appStatus.charAt(0).toUpperCase() + appStatus.slice(1) : 'Applied'}
                                                </Badge>
                                            )}
                                        </div>
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">{job.title}</h3>
                                        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mb-3">{job.department}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 flex-1">{job.description}</p>
                                        <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400 mb-4">
                                            <span className="flex items-center gap-1">
                                                <DollarSign size={12} />${job.hourlyRate}/hr
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={12} />{job.maxHours}h/wk max
                                            </span>
                                            {job.location && (
                                                <span className="flex items-center gap-1">
                                                    <MapPin size={12} />{job.location.split(',')[0]}
                                                </span>
                                            )}
                                        </div>
                                        <Button
                                            variant={applied ? 'secondary' : 'primary'}
                                            size="sm"
                                            fullWidth
                                            disabled={applied}
                                            onClick={() => { if (!applied) setSelectedJob(job); }}
                                            icon={applied ? CheckCircle : FileText}
                                        >
                                            {applied ? 'Applied' : 'View & Apply'}
                                        </Button>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Apply Modal */}
            <Modal
                isOpen={!!selectedJob}
                onClose={() => { setSelectedJob(null); setCoverNote(''); }}
                title={selectedJob?.title || ''}
                size="lg"
                footer={
                    <>
                        <Button variant="secondary" onClick={() => { setSelectedJob(null); setCoverNote(''); }}>Cancel</Button>
                        <Button onClick={handleApply} loading={applying} icon={FileText}>Submit Application</Button>
                    </>
                }
            >
                {selectedJob && (
                    <div className="space-y-5">
                        {/* Meta */}
                        <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 text-sm">
                                <Building2 size={14} />{selectedJob.department}
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 text-sm">
                                <DollarSign size={14} />${selectedJob.hourlyRate}/hr
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 text-sm">
                                <Clock size={14} />{selectedJob.maxHours}h/week max
                            </div>
                            {selectedJob.location && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm">
                                    <MapPin size={14} />{selectedJob.location}
                                </div>
                            )}
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Description</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{selectedJob.description}</p>
                        </div>
                        {selectedJob.requirements && (
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Requirements</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{selectedJob.requirements}</p>
                            </div>
                        )}
                        <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                            <Textarea
                                label="Cover Note (optional)"
                                placeholder="Tell the admin why you're a great fit for this position..."
                                value={coverNote}
                                onChange={(e) => setCoverNote(e.target.value)}
                                className="min-h-[100px]"
                            />
                        </div>
                    </div>
                )}
            </Modal>
        </PageTransition>
    );
}
