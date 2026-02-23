// ─── Users ──────────────────────────────────────────────────────────────────
export const USERS = [
    {
        id: 'admin-1',
        name: 'Dr. Sarah Mitchell',
        email: 'sarah.mitchell@university.edu',
        role: 'admin',
        avatar: 'SM',
        department: 'Administration',
        title: 'Work-Study Coordinator',
    },
    {
        id: 'student-1',
        name: 'Alex Johnson',
        email: 'alex.johnson@student.edu',
        role: 'student',
        avatar: 'AJ',
        department: 'Computer Science',
        gpa: 3.8,
        year: 'Junior',
    },
    {
        id: 'student-2',
        name: 'Maria Garcia',
        email: 'maria.garcia@student.edu',
        role: 'student',
        avatar: 'MG',
        department: 'Business',
        gpa: 3.6,
        year: 'Senior',
    },
    {
        id: 'student-3',
        name: 'James Chen',
        email: 'james.chen@student.edu',
        role: 'student',
        avatar: 'JC',
        department: 'Engineering',
        gpa: 3.9,
        year: 'Sophomore',
    },
    {
        id: 'student-4',
        name: 'Priya Patel',
        email: 'priya.patel@student.edu',
        role: 'student',
        avatar: 'PP',
        department: 'Psychology',
        gpa: 3.7,
        year: 'Junior',
    },
];

// ─── Jobs ────────────────────────────────────────────────────────────────────
export const INITIAL_JOBS = [
    {
        id: 'job-1',
        title: 'Library Research Assistant',
        description:
            'Assist library staff with cataloging, reference services, and helping students navigate digital resources. Ideal for detail-oriented individuals who enjoy academic environments.',
        department: 'Library Services',
        hourlyRate: 12.5,
        maxHours: 20,
        postedDate: '2026-01-10',
        status: 'active',
        postedBy: 'admin-1',
        requirements: 'Strong organizational skills, familiarity with research databases',
        location: 'Main Library, Floor 2',
    },
    {
        id: 'job-2',
        title: 'IT Help Desk Technician',
        description:
            'Provide first-level technical support to students and faculty. Troubleshoot hardware and software issues, manage tickets, and document solutions.',
        department: 'Information Technology',
        hourlyRate: 14.0,
        maxHours: 25,
        postedDate: '2026-01-12',
        status: 'active',
        postedBy: 'admin-1',
        requirements: 'Basic networking knowledge, Windows/Mac proficiency, customer service skills',
        location: 'Tech Center, Room 101',
    },
    {
        id: 'job-3',
        title: 'Campus Tour Guide',
        description:
            'Lead prospective students and families on engaging campus tours. Share your college experience and highlight key facilities, programs, and student life.',
        department: 'Admissions',
        hourlyRate: 11.0,
        maxHours: 15,
        postedDate: '2026-01-15',
        status: 'active',
        postedBy: 'admin-1',
        requirements: 'Excellent communication skills, enthusiasm, knowledge of campus',
        location: 'Admissions Office',
    },
    {
        id: 'job-4',
        title: 'Biology Lab Assistant',
        description:
            'Support faculty and graduate students with lab preparations, equipment maintenance, and safety compliance. Opportunity to gain hands-on research experience.',
        department: 'Sciences',
        hourlyRate: 13.5,
        maxHours: 20,
        postedDate: '2026-01-18',
        status: 'active',
        postedBy: 'admin-1',
        requirements: 'Biology coursework (BIO 101+), lab safety certification preferred',
        location: 'Science Building, Lab 3B',
    },
    {
        id: 'job-5',
        title: 'Student Affairs Office Assistant',
        description:
            'Handle administrative tasks including scheduling, filing, data entry and assisting with student events and programs coordination.',
        department: 'Student Affairs',
        hourlyRate: 11.5,
        maxHours: 20,
        postedDate: '2026-01-20',
        status: 'active',
        postedBy: 'admin-1',
        requirements: 'Proficiency in MS Office, strong communication, attention to detail',
        location: 'Student Union, Room 204',
    },
    {
        id: 'job-6',
        title: 'Fitness Center Monitor',
        description:
            'Supervise fitness center operations, ensure safe equipment use, assist members, and maintain cleanliness. Free gym membership included.',
        department: 'Recreation & Athletics',
        hourlyRate: 12.0,
        maxHours: 20,
        postedDate: '2026-01-22',
        status: 'active',
        postedBy: 'admin-1',
        requirements: 'CPR certification, interest in fitness, responsible and punctual',
        location: 'Recreation Center',
    },
];

// ─── Applications ─────────────────────────────────────────────────────────────
export const INITIAL_APPLICATIONS = [
    {
        id: 'app-1',
        studentId: 'student-1',
        jobId: 'job-2',
        status: 'approved',
        appliedDate: '2026-01-14',
        coverNote: 'I have strong IT skills and love helping others solve technical problems.',
    },
    {
        id: 'app-2',
        studentId: 'student-1',
        jobId: 'job-1',
        status: 'pending',
        appliedDate: '2026-01-16',
        coverNote: 'I spend a lot of time in the library and would love to work there.',
    },
    {
        id: 'app-3',
        studentId: 'student-2',
        jobId: 'job-3',
        status: 'approved',
        appliedDate: '2026-01-17',
        coverNote: 'I am outgoing and passionate about showcasing our campus to future students.',
    },
    {
        id: 'app-4',
        studentId: 'student-2',
        jobId: 'job-5',
        status: 'rejected',
        appliedDate: '2026-01-19',
        coverNote: 'I am experienced in administrative tasks from my internship.',
    },
    {
        id: 'app-5',
        studentId: 'student-3',
        jobId: 'job-4',
        status: 'approved',
        appliedDate: '2026-01-20',
        coverNote: 'Completed BIO 201 and have lab safety certification. Very interested!',
    },
    {
        id: 'app-6',
        studentId: 'student-4',
        jobId: 'job-6',
        status: 'pending',
        appliedDate: '2026-01-23',
        coverNote: 'Certified CPR trainer and fitness enthusiast. Would be a great fit.',
    },
];

// ─── Work Logs ────────────────────────────────────────────────────────────────
export const INITIAL_WORK_LOGS = [
    {
        id: 'log-1',
        studentId: 'student-1',
        jobId: 'job-2',
        date: '2026-01-20',
        hours: 4,
        notes: 'Resolved 12 help-desk tickets. Set up new laptop configurations for faculty.',
        approved: true,
        submittedDate: '2026-01-20',
    },
    {
        id: 'log-2',
        studentId: 'student-1',
        jobId: 'job-2',
        date: '2026-01-22',
        hours: 5,
        notes: 'Upgraded systems and provided training to new users.',
        approved: true,
        submittedDate: '2026-01-22',
    },
    {
        id: 'log-3',
        studentId: 'student-2',
        jobId: 'job-3',
        date: '2026-01-21',
        hours: 3,
        notes: 'Hosted two campus tours for a total of 28 visitors.',
        approved: true,
        submittedDate: '2026-01-21',
    },
    {
        id: 'log-4',
        studentId: 'student-3',
        jobId: 'job-4',
        date: '2026-01-22',
        hours: 6,
        notes: 'Prepared reagents for genetics lab experiment. Maintained lab cleanliness.',
        approved: false,
        submittedDate: '2026-01-22',
    },
    {
        id: 'log-5',
        studentId: 'student-1',
        jobId: 'job-2',
        date: '2026-01-25',
        hours: 4,
        notes: 'Network troubleshooting in building C. Installed software updates.',
        approved: false,
        submittedDate: '2026-01-25',
    },
];

// ─── Feedback ─────────────────────────────────────────────────────────────────
export const INITIAL_FEEDBACK = [
    {
        id: 'fb-1',
        studentId: 'student-1',
        jobId: 'job-2',
        adminId: 'admin-1',
        rating: 5,
        comment:
            'Alex is an outstanding IT assistant. Tickets are resolved quickly and users appreciate the communication skills. Highly recommend continuing.',
        date: '2026-01-28',
    },
    {
        id: 'fb-2',
        studentId: 'student-2',
        jobId: 'job-3',
        adminId: 'admin-1',
        rating: 4,
        comment:
            'Maria does great tours and receives excellent feedback from visitors. Punctual and professional. Minor improvement needed in Q&A handling.',
        date: '2026-01-28',
    },
    {
        id: 'fb-3',
        studentId: 'student-3',
        jobId: 'job-4',
        adminId: 'admin-1',
        rating: 5,
        comment:
            'James is meticulous in the lab. Follows all safety protocols and shows genuine curiosity. A future scientist in the making!',
        date: '2026-01-29',
    },
];

// ─── Chart Data Helpers ───────────────────────────────────────────────────────
export const DEPARTMENTS = [
    'Library Services',
    'Information Technology',
    'Admissions',
    'Sciences',
    'Student Affairs',
    'Recreation & Athletics',
    'Finance',
    'Marketing',
    'Human Resources',
];

export const MONTHLY_APPLICATIONS = [
    { month: 'Sep', applications: 8 },
    { month: 'Oct', applications: 14 },
    { month: 'Nov', applications: 11 },
    { month: 'Dec', applications: 6 },
    { month: 'Jan', applications: 18 },
    { month: 'Feb', applications: 13 },
];

export const MONTHLY_HOURS = [
    { month: 'Sep', hours: 42 },
    { month: 'Oct', hours: 78 },
    { month: 'Nov', hours: 91 },
    { month: 'Dec', hours: 55 },
    { month: 'Jan', hours: 112 },
    { month: 'Feb', hours: 87 },
];
