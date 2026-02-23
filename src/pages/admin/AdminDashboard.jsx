import { useMemo } from 'react';
import {
    AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { motion } from 'framer-motion';
import { Briefcase, FileText, Users, Clock, TrendingUp, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { USERS, MONTHLY_APPLICATIONS, MONTHLY_HOURS } from '../../data/mockData';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { PageTransition } from '../../components/ui/PageTransition';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

function StatCard({ icon: Icon, label, value, sub, color, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.3 }}
        >
            <Card hover className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={22} className="text-white" />
                </div>
                <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{label}</p>
                    {sub && <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">{sub}</p>}
                </div>
            </Card>
        </motion.div>
    );
}

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-3 shadow-lg text-sm">
                <p className="font-semibold text-gray-700 dark:text-gray-200 mb-1">{label}</p>
                {payload.map((p, i) => (
                    <p key={i} style={{ color: p.color }} className="font-medium">
                        {p.name}: {p.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function AdminDashboard() {
    const { jobs, applications, workLogs, getTotalApprovedHours } = useApp();

    const students = USERS.filter((u) => u.role === 'student');
    const activeStudents = useMemo(() => {
        const ids = new Set(applications.filter((a) => a.status === 'approved').map((a) => a.studentId));
        return ids.size;
    }, [applications]);

    const totalHours = getTotalApprovedHours();

    const deptData = useMemo(() => {
        const counts = {};
        jobs.forEach((j) => { counts[j.department] = (counts[j.department] || 0) + 1; });
        return Object.entries(counts).map(([name, value]) => ({ name: name.split(' ')[0], value }));
    }, [jobs]);

    const recentApps = [...applications]
        .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
        .slice(0, 5);

    return (
        <PageTransition>
            <div className="p-5 md:p-7 max-w-7xl mx-auto space-y-6">
                {/* Welcome */}
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Good evening, Admin 👋</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Here's what's happening with your work-study program.</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    <StatCard delay={0} icon={Briefcase} label="Jobs Posted" value={jobs.length} color="bg-indigo-500" sub={`${jobs.filter(j => j.status === 'active').length} active`} />
                    <StatCard delay={0.05} icon={FileText} label="Total Applications" value={applications.length} color="bg-violet-500" sub={`${applications.filter(a => a.status === 'pending').length} pending`} />
                    <StatCard delay={0.1} icon={Users} label="Active Students" value={activeStudents} color="bg-pink-500" sub={`of ${students.length} enrolled`} />
                    <StatCard delay={0.15} icon={Clock} label="Hours Approved" value={totalHours} color="bg-amber-500" sub="cumulative" />
                </div>

                {/* Charts row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Applications over time */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Applications Over Time</CardTitle>
                                <Badge variant="active" dot>Last 6 months</Badge>
                            </CardHeader>
                            <ResponsiveContainer width="100%" height={220}>
                                <AreaChart data={MONTHLY_APPLICATIONS} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="appGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" className="dark:opacity-10" />
                                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area type="monotone" dataKey="applications" name="Applications" stroke="#6366f1" strokeWidth={2.5} fill="url(#appGrad)" dot={{ fill: '#6366f1', strokeWidth: 0, r: 3 }} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </Card>
                    </motion.div>

                    {/* Jobs by dept (pie) */}
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle>Jobs by Department</CardTitle>
                            </CardHeader>
                            <ResponsiveContainer width="100%" height={220}>
                                <PieChart>
                                    <Pie data={deptData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                                        {deptData.map((_, i) => (
                                            <Cell key={i} fill={COLORS[i % COLORS.length]} strokeWidth={0} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend
                                        formatter={(v) => <span className="text-xs text-gray-600 dark:text-gray-400">{v}</span>}
                                        iconSize={8}
                                        iconType="circle"
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </Card>
                    </motion.div>
                </div>

                {/* Hours bar chart + recent apps */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Monthly Hours Logged</CardTitle>
                            </CardHeader>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={MONTHLY_HOURS} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" className="dark:opacity-10" />
                                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar dataKey="hours" name="Hours" fill="#6366f1" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle>Recent Applications</CardTitle>
                                <a href="/admin/applications" className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
                                    View all
                                </a>
                            </CardHeader>
                            <div className="space-y-3">
                                {recentApps.map((app) => {
                                    const student = USERS.find((u) => u.id === app.studentId);
                                    const job = jobs.find((j) => j.id === app.jobId);
                                    const statusIcon = app.status === 'approved'
                                        ? <CheckCircle size={14} className="text-emerald-500" />
                                        : app.status === 'rejected'
                                            ? <XCircle size={14} className="text-red-500" />
                                            : <AlertCircle size={14} className="text-amber-500" />;
                                    return (
                                        <div key={app.id} className="flex items-center gap-3">
                                            <Avatar initials={student?.avatar || 'U'} size="sm" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                                    {student?.name}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{job?.title}</p>
                                            </div>
                                            <div className="flex items-center gap-1 text-xs">{statusIcon}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    );
}
