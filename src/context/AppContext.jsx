import { createContext, useContext, useState } from 'react';
import {
    INITIAL_JOBS,
    INITIAL_APPLICATIONS,
    INITIAL_WORK_LOGS,
    INITIAL_FEEDBACK,
} from '../data/mockData';

const LS_KEYS = {
    JOBS: 'swms_jobs',
    APPS: 'swms_applications',
    LOGS: 'swms_work_logs',
    FEEDBACK: 'swms_feedback',
};

function loadLS(key, fallback) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
    } catch {
        return fallback;
    }
}

function saveLS(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch { /* noop */ }
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
    const [jobs, setJobs] = useState(() => loadLS(LS_KEYS.JOBS, INITIAL_JOBS));
    const [applications, setApplications] = useState(() => loadLS(LS_KEYS.APPS, INITIAL_APPLICATIONS));
    const [workLogs, setWorkLogs] = useState(() => loadLS(LS_KEYS.LOGS, INITIAL_WORK_LOGS));
    const [feedback, setFeedback] = useState(() => loadLS(LS_KEYS.FEEDBACK, INITIAL_FEEDBACK));

    // ── Job Actions ──────────────────────────────────────────────────────────
    const postJob = (jobData) => {
        const newJob = {
            ...jobData,
            id: `job-${Date.now()}`,
            postedDate: new Date().toISOString().split('T')[0],
            status: 'active',
            postedBy: 'admin-1',
        };
        const updated = [newJob, ...jobs];
        setJobs(updated);
        saveLS(LS_KEYS.JOBS, updated);
        return newJob;
    };

    const updateJob = (jobId, changes) => {
        const updated = jobs.map((j) => (j.id === jobId ? { ...j, ...changes } : j));
        setJobs(updated);
        saveLS(LS_KEYS.JOBS, updated);
    };

    // ── Application Actions ──────────────────────────────────────────────────
    const applyForJob = (studentId, jobId, coverNote = '') => {
        // Check for duplicate
        const exists = applications.find(
            (a) => a.studentId === studentId && a.jobId === jobId
        );
        if (exists) return { success: false, message: 'Already applied to this job.' };

        const newApp = {
            id: `app-${Date.now()}`,
            studentId,
            jobId,
            status: 'pending',
            appliedDate: new Date().toISOString().split('T')[0],
            coverNote,
        };
        const updated = [newApp, ...applications];
        setApplications(updated);
        saveLS(LS_KEYS.APPS, updated);
        return { success: true };
    };

    const updateApplicationStatus = (appId, status) => {
        const updated = applications.map((a) =>
            a.id === appId ? { ...a, status } : a
        );
        setApplications(updated);
        saveLS(LS_KEYS.APPS, updated);
    };

    // ── Work Log Actions ─────────────────────────────────────────────────────
    const submitWorkLog = (logData) => {
        const newLog = {
            ...logData,
            id: `log-${Date.now()}`,
            approved: false,
            submittedDate: new Date().toISOString().split('T')[0],
        };
        const updated = [newLog, ...workLogs];
        setWorkLogs(updated);
        saveLS(LS_KEYS.LOGS, updated);
        return newLog;
    };

    const approveWorkLog = (logId) => {
        const updated = workLogs.map((l) =>
            l.id === logId ? { ...l, approved: true } : l
        );
        setWorkLogs(updated);
        saveLS(LS_KEYS.LOGS, updated);
    };

    // ── Feedback Actions ─────────────────────────────────────────────────────
    const addFeedback = (feedbackData) => {
        const newFb = {
            ...feedbackData,
            id: `fb-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            adminId: 'admin-1',
        };
        const updated = [newFb, ...feedback];
        setFeedback(updated);
        saveLS(LS_KEYS.FEEDBACK, updated);
        return newFb;
    };

    // ── Computed Selectors ───────────────────────────────────────────────────
    const getStudentApplications = (studentId) =>
        applications.filter((a) => a.studentId === studentId);

    const getStudentApprovedJobs = (studentId) => {
        const approvedJobIds = applications
            .filter((a) => a.studentId === studentId && a.status === 'approved')
            .map((a) => a.jobId);
        return jobs.filter((j) => approvedJobIds.includes(j.id));
    };

    const getStudentWorkLogs = (studentId) =>
        workLogs.filter((l) => l.studentId === studentId);

    const getStudentFeedback = (studentId) =>
        feedback.filter((f) => f.studentId === studentId);

    const getTotalApprovedHours = () =>
        workLogs.filter((l) => l.approved).reduce((sum, l) => sum + (l.hours || 0), 0);

    const getStudentTotalHours = (studentId) =>
        workLogs
            .filter((l) => l.studentId === studentId && l.approved)
            .reduce((sum, l) => sum + (l.hours || 0), 0);

    return (
        <AppContext.Provider
            value={{
                jobs,
                applications,
                workLogs,
                feedback,
                postJob,
                updateJob,
                applyForJob,
                updateApplicationStatus,
                submitWorkLog,
                approveWorkLog,
                addFeedback,
                getStudentApplications,
                getStudentApprovedJobs,
                getStudentWorkLogs,
                getStudentFeedback,
                getTotalApprovedHours,
                getStudentTotalHours,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useApp must be used within AppProvider');
    return ctx;
}
