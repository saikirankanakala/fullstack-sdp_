import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, DollarSign, Clock, Building2, FileText, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../hooks/useToast';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, Select, Textarea } from '../../components/ui/FormFields';
import { PageTransition } from '../../components/ui/PageTransition';
import { DEPARTMENTS } from '../../data/mockData';

const INITIAL_FORM = {
    title: '',
    description: '',
    department: '',
    hourlyRate: '',
    maxHours: '',
    requirements: '',
    location: '',
};

export default function PostJobPage() {
    const { postJob } = useApp();
    const { success, error } = useToast();
    const [form, setForm] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const validate = () => {
        const errs = {};
        if (!form.title.trim()) errs.title = 'Job title is required.';
        if (!form.description.trim()) errs.description = 'Description is required.';
        if (!form.department) errs.department = 'Department is required.';
        if (!form.hourlyRate || isNaN(form.hourlyRate) || +form.hourlyRate <= 0)
            errs.hourlyRate = 'Enter a valid hourly rate.';
        if (!form.maxHours || isNaN(form.maxHours) || +form.maxHours <= 0)
            errs.maxHours = 'Enter valid max hours.';
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            error('Please fix the errors before submitting.');
            return;
        }
        setLoading(true);
        await new Promise((r) => setTimeout(r, 800));
        postJob({
            ...form,
            hourlyRate: parseFloat(form.hourlyRate),
            maxHours: parseInt(form.maxHours),
        });
        success('Job posted successfully! 🎉');
        setForm(INITIAL_FORM);
        setErrors({});
        setLoading(false);
    };

    return (
        <PageTransition>
            <div className="p-5 md:p-7 max-w-3xl mx-auto">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                            <Briefcase size={18} className="text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Post New Job</h2>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 ml-12">
                        Create a new work-study position for students to apply to.
                    </p>
                </motion.div>

                <Card>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Title & Department */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="sm:col-span-2">
                                <Input
                                    label="Job Title"
                                    required
                                    placeholder="e.g. Library Research Assistant"
                                    value={form.title}
                                    onChange={set('title')}
                                    error={errors.title}
                                    icon={<FileText size={16} />}
                                />
                            </div>
                            <Select
                                label="Department"
                                required
                                value={form.department}
                                onChange={set('department')}
                                error={errors.department}
                            >
                                <option value="">Select department...</option>
                                {DEPARTMENTS.map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </Select>
                            <Input
                                label="Location"
                                placeholder="e.g. Main Library, Floor 2"
                                value={form.location}
                                onChange={set('location')}
                            />
                        </div>

                        {/* Pay & Hours */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <Input
                                label="Hourly Rate ($)"
                                required
                                type="number"
                                min="7"
                                max="50"
                                step="0.5"
                                placeholder="12.50"
                                value={form.hourlyRate}
                                onChange={set('hourlyRate')}
                                error={errors.hourlyRate}
                            />
                            <Input
                                label="Max Hours per Week"
                                required
                                type="number"
                                min="1"
                                max="40"
                                placeholder="20"
                                value={form.maxHours}
                                onChange={set('maxHours')}
                                error={errors.maxHours}
                            />
                        </div>

                        {/* Description */}
                        <Textarea
                            label="Job Description"
                            required
                            placeholder="Describe the role, responsibilities, and what the student will do day-to-day..."
                            value={form.description}
                            onChange={set('description')}
                            error={errors.description}
                            className="min-h-[120px]"
                        />

                        {/* Requirements */}
                        <Textarea
                            label="Requirements"
                            placeholder="List any skills, courses, or certifications required..."
                            value={form.requirements}
                            onChange={set('requirements')}
                            className="min-h-[90px]"
                        />

                        {/* Preview row */}
                        {(form.hourlyRate || form.maxHours) && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="overflow-hidden"
                            >
                                <div className="flex items-center gap-4 p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl border border-indigo-100 dark:border-indigo-900">
                                    <div className="flex items-center gap-2 text-sm">
                                        <DollarSign size={14} className="text-indigo-500" />
                                        <span className="text-gray-700 dark:text-gray-300">
                                            <strong>${form.hourlyRate || '—'}/hr</strong>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Clock size={14} className="text-indigo-500" />
                                        <span className="text-gray-700 dark:text-gray-300">
                                            <strong>{form.maxHours || '—'}</strong> hrs/week max
                                        </span>
                                    </div>
                                    {form.maxHours && form.hourlyRate && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="text-gray-500 dark:text-gray-400">
                                                Up to <strong className="text-indigo-600 dark:text-indigo-400">
                                                    ${(form.hourlyRate * form.maxHours).toFixed(0)}/week
                                                </strong>
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* Submit */}
                        <div className="flex justify-end pt-2">
                            <Button type="submit" size="lg" loading={loading} icon={Plus}>
                                Post Job
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </PageTransition>
    );
}
