'use client';

import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Edit, X, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { updateReminders, ReminderData } from '@/app/actions/updateReminders';

interface AdminEditRemindersProps {
    currentData: ReminderData;
}

const ADMIN_USER_ID = 'user_39JNBjYkk78K3qb0WHwAaGRQnEU';

export const AdminEditReminders = ({ currentData }: AdminEditRemindersProps) => {
    const { userId, isLoaded } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<ReminderData>(currentData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    if (!isLoaded || userId !== ADMIN_USER_ID) {
        return null;
    }

    const handleSave = async () => {
        setIsSubmitting(true);
        setMessage(null);
        try {
            const res = await updateReminders(formData);
            if (res.success) {
                setMessage({ type: 'success', text: 'Saved! The site is rebuilding and changes will be live in ~30 seconds.' });
                setTimeout(() => setIsOpen(false), 4000); // close after 4 seconds
            } else {
                setMessage({ type: 'error', text: res.error || 'Failed to update.' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'An unexpected error occurred.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-gray-600 hover:text-primary rounded-full shadow-sm backdrop-blur-sm transition-all flex items-center gap-1 text-xs font-bold border border-gray-100"
            >
                <Edit size={14} /> Edit
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-onyx/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-polar">
                            <h2 className="text-xl font-bold text-onyx">Edit Reminders</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 text-gray-400 hover:text-error hover:bg-error/10 rounded-full transition-colors"
                                disabled={isSubmitting}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto flex-1 space-y-6">
                            {message && (
                                <div className={`p-4 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                                    {message.text}
                                </div>
                            )}

                            <div className="space-y-4">
                                <h3 className="font-bold text-gray-700 uppercase tracking-widest text-xs border-b pb-2">High Priority Reminder</h3>
                                <div className="grid gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Label</label>
                                        <input
                                            type="text"
                                            value={formData.highPriority.label}
                                            onChange={e => setFormData({ ...formData, highPriority: { ...formData.highPriority, label: e.target.value } })}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Text</label>
                                        <textarea
                                            value={formData.highPriority.text}
                                            onChange={e => setFormData({ ...formData, highPriority: { ...formData.highPriority, text: e.target.value } })}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Link Text</label>
                                            <input
                                                type="text"
                                                value={formData.highPriority.linkText}
                                                onChange={e => setFormData({ ...formData, highPriority: { ...formData.highPriority, linkText: e.target.value } })}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">URL / Link</label>
                                            <input
                                                type="text"
                                                value={formData.highPriority.link}
                                                onChange={e => setFormData({ ...formData, highPriority: { ...formData.highPriority, link: e.target.value } })}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4">
                                <h3 className="font-bold text-gray-700 uppercase tracking-widest text-xs border-b pb-2">Upcoming Reminder</h3>
                                <div className="grid gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Label</label>
                                        <input
                                            type="text"
                                            value={formData.upcoming.label}
                                            onChange={e => setFormData({ ...formData, upcoming: { ...formData.upcoming, label: e.target.value } })}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Text</label>
                                        <textarea
                                            value={formData.upcoming.text}
                                            onChange={e => setFormData({ ...formData, upcoming: { ...formData.upcoming, text: e.target.value } })}
                                            rows={2}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
                            <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isSubmitting}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleSave} disabled={isSubmitting} className="min-w-[120px]">
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> Saving...</span>
                                ) : (
                                    <span className="flex items-center gap-2"><Save size={16} /> Save & Publish</span>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
