import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, FileText, Briefcase } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../hooks/useToast';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Select, Input, Textarea } from '../../components/ui/FormFields';
import { EmptyState } from '../../components/ui/EmptyState';
import { PageTransition } from '../../components/ui/PageTransition';
import { useNavigate } from 'react-router-dom';

const INITIAL_FORM = { jobId: '', date: '', hours: '', notes: '' };

export default function LogHoursPage() {
    const { getStudentApprovedJobs, submitWorkLog, getStudentWorkLogs } = useApp();
    const { currentUser } = useAuth();
    const { success, error } = useToast();
    const navigate = useNavigate();

    const approvedJobs = getStudentApprovedJobs(currentUser?.id || '');
    const myLogs = getStudentWorkLogs(currentUser?.id || '');

    const [form, setForm] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const set = (key) => (e) => {
        setForm((f) => ({ ...f, [key]: e.target.value }));
        setErrors((er) => ({ ...er, [key]: undefined }));
    };

    const validate = () => {
        const errs = {};
        if (!form.jobId) errs.jobId = 'Please select a job.';
        if (!form.date) errs.date = 'Date is required.';
        if (!form.hours || isNaN(form.hours) || +form.hours < 0.5 || +form.hours > 12)
            errs.hours = 'Enter hours between 0.5 and 12.';
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        setLoading(true);
        await new Promise((r) => setTimeout(r, 700));
        submitWorkLog({
            studentId: currentUser.id,
            jobId: form.jobId,
            date: form.date,
            hours: parseFloat(form.hours),
            notes: form.notes,
        });
        success('Work hours submitted for approval! ✓');
        setForm(INITIAL_FORM);
        setLoading(false);
    };

    const totalApproved = myLogs.filter((l) => l.approved).reduce((s, l) => s + l.hours, 0);
    const totalPending = myLogs.filter((l) => !l.approved).reduce((s, l) => s + l.hours, 0);

    const enrichedLogs = myLogs.map((l) => ({
        ...l,
        job: approvedJobs.find((j) => j.id === l.jobId),
    })).sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <PageTransition>
            <div className="p-5 md:p-7 max-w-5xl mx-auto space-y-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Log Work Hours</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Submit your hours for admin approval.</p>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { label: 'Approved Hours', value: totalApproved, color: 'bg-emerald-500' },
                        { label: 'Pending Hours', value: totalPending, color: 'bg-amber-500' },
                        { label: 'Total Submissions', value: myLogs.length, color: 'bg-indigo-500' },
                    ].map(({ label, value, color }) => (
                        <Card key={label} className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
                                <Clock size={18} className="text-white" />
                            </div>
                            <div>
                                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Form */}
                    <div>
                        {approvedJobs.length === 0 ? (
                            <Card>
                                <EmptyState
                                    icon={Briefcase}
                                    title="No approved jobs yet"
                                    description="You need an approved job application before logging hours."
                                    action={
                                        <Button onClick={() => navigate('/student/jobs')} size="sm">Browse Jobs</Button>
                                    }
                                />
                            </Card>
                        ) : (
                            <Card>
                                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                                    <FileText size={15} className="text-indigo-500" />
                                    Submit New Hours
                                </p>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <Select
                                        label="Job"
                                        required
                                        value={form.jobId}
                                        onChange={set('jobId')}
                                        error={errors.jobId}
                                    >
                                        <option value="">Select an approved job...</option>
                                        {approvedJobs.map((j) => (
                                            <option key={j.id} value={j.id}>{j.title}</option>
                                        ))}
                                    </Select>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            label="Date Worked"
                                            required
                                            type="date"
                                            value={form.date}
                                            onChange={set('date')}
                                            error={errors.date}
                                            max={new Date().toISOString().split('T')[0]}
                                        />
                                        <Input
                                            label="Hours"
                                            required
                                            type="number"
                                            min="0.5"
                                            max="12"
                                            step="0.5"
                                            placeholder="4.5"
                                            value={form.hours}
                                            onChange={set('hours')}
                                            error={errors.hours}
                                        />
                                    </div>
                                    <Textarea
                                        label="Notes"
                                        placeholder="Describe what you worked on..."
                                        value={form.notes}
                                        onChange={set('notes')}
                                        className="min-h-[90px]"
                                    />
                                    <Button type="submit" fullWidth loading={loading} icon={Clock}>
                                        Submit Hours
                                    </Button>
                                </form>
                            </Card>
                        )}
                    </div>

                    {/* Log history */}
                    <div className="space-y-3">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                            <Calendar size={15} className="text-gray-400" />
                            Recent Submissions
                        </p>
                        {enrichedLogs.length === 0 ? (
                            <Card>
                                <EmptyState icon={Clock} title="No submissions yet" description="Submit your first work hours above." />
                            </Card>
                        ) : (
                            enrichedLogs.slice(0, 8).map((log, i) => (
                                <motion.div key={log.id} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                                    <Card>
                                        <div className="flex items-center gap-3">
                                            <div className="text-center w-10 flex-shrink-0">
                                                <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{log.hours}h</p>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                                    {log.job?.title || 'Unknown Job'}
                                                </p>
                                                <p className="text-xs text-gray-400 dark:text-gray-500">{log.date}</p>
                                            </div>
                                            <Badge variant={log.approved ? 'approved' : 'pending'} dot>
                                                {log.approved ? 'Approved' : 'Pending'}
                                            </Badge>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
