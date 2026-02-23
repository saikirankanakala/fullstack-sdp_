import toast from 'react-hot-toast';

export function useToast() {
    const success = (msg) =>
        toast.success(msg, {
            style: {
                borderRadius: '12px',
                background: 'var(--toast-bg)',
                color: 'var(--toast-color)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: '500',
            },
            iconTheme: { primary: '#6366f1', secondary: '#fff' },
        });

    const error = (msg) =>
        toast.error(msg, {
            style: {
                borderRadius: '12px',
                background: 'var(--toast-bg)',
                color: 'var(--toast-color)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: '500',
            },
        });

    const info = (msg) =>
        toast(msg, {
            icon: 'ℹ️',
            style: {
                borderRadius: '12px',
                background: 'var(--toast-bg)',
                color: 'var(--toast-color)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: '500',
            },
        });

    return { success, error, info };
}
