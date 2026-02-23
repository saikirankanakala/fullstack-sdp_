import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, ShieldCheck, User, ChevronRight, ArrowLeft, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { USERS } from '../../data/mockData';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { ThemeToggle } from '../../components/ui/ThemeToggle';

const roles = [
    {
        key: 'admin',
        icon: ShieldCheck,
        title: 'Admin',
        subtitle: 'Manage jobs, applications & hours',
        gradient: 'from-violet-500 to-indigo-600',
        shadow: 'shadow-indigo-200 dark:shadow-indigo-900',
        bg: 'bg-indigo-50 dark:bg-indigo-950/30',
        border: 'border-indigo-200 dark:border-indigo-800',
    },
    {
        key: 'student',
        icon: GraduationCap,
        title: 'Student',
        subtitle: 'Browse jobs & track your work',
        gradient: 'from-emerald-500 to-teal-600',
        shadow: 'shadow-emerald-200 dark:shadow-emerald-900',
        bg: 'bg-emerald-50 dark:bg-emerald-950/30',
        border: 'border-emerald-200 dark:border-emerald-800',
    },
];

export default function LoginPage() {
    const { currentUser, login } = useAuth();
    const [selectedRole, setSelectedRole] = useState(null);
    const [step, setStep] = useState('role'); // 'role' | 'user'

    if (currentUser) {
        return <Navigate to={currentUser.role === 'admin' ? '/admin/dashboard' : '/student/jobs'} />;
    }

    const filteredUsers = USERS.filter((u) => u.role === selectedRole);

    const handleRoleSelect = (roleKey) => {
        setSelectedRole(roleKey);
        setStep('user');
    };

    const handleUserSelect = (userId) => {
        login(userId);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 dark:from-gray-950 dark:via-indigo-950/20 dark:to-purple-950/10 flex flex-col">
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-indigo-900">
                        <GraduationCap size={18} className="text-white" />
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white text-lg tracking-tight">StudyWork</span>
                    <span className="hidden sm:flex items-center gap-1 px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-medium">
                        <Sparkles size={10} />
                        Work-Study Platform
                    </span>
                </div>
                <ThemeToggle />
            </div>

            {/* Main content */}
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                            Welcome back
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            {step === 'role'
                                ? 'Choose your role to continue'
                                : `Select your account to sign in as ${selectedRole}`}
                        </p>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        {step === 'role' && (
                            <motion.div
                                key="role"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-3"
                            >
                                {roles.map(({ key, icon: Icon, title, subtitle, gradient, shadow, bg, border }) => (
                                    <motion.button
                                        key={key}
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleRoleSelect(key)}
                                        className={`w-full flex items-center gap-4 p-5 rounded-2xl border ${bg} ${border} hover:shadow-md ${shadow} transition-all duration-300 group text-left`}
                                    >
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg ${shadow} flex-shrink-0`}>
                                            <Icon size={22} className="text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-900 dark:text-gray-100 text-base">{title}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
                                        </div>
                                        <ChevronRight size={18} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 group-hover:translate-x-0.5 transition-all" />
                                    </motion.button>
                                ))}

                                {/* Demo badge */}
                                <p className="text-center text-xs text-gray-400 dark:text-gray-500 pt-2">
                                    🔒 Demo mode — no password required
                                </p>
                            </motion.div>
                        )}

                        {step === 'user' && (
                            <motion.div
                                key="user"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-3"
                            >
                                <button
                                    onClick={() => setStep('role')}
                                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mb-4 transition-colors"
                                >
                                    <ArrowLeft size={14} />
                                    Back to roles
                                </button>
                                {filteredUsers.map((user) => (
                                    <motion.button
                                        key={user.id}
                                        whileHover={{ scale: 1.02, y: -1 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleUserSelect(user.id)}
                                        className="w-full flex items-center gap-4 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all duration-200 group text-left"
                                    >
                                        <Avatar initials={user.avatar} size="lg" />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{user.name}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                                            {user.department && (
                                                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-0.5">{user.department}</p>
                                            )}
                                        </div>
                                        <ChevronRight size={16} className="text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center py-4 text-xs text-gray-400 dark:text-gray-500">
                © 2026 StudyWork — Student Work-Study Management Platform
            </div>
        </div>
    );
}
