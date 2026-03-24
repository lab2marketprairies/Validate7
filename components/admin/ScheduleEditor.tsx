import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Save, Loader2, Edit3, Trash } from 'lucide-react';

export default function ScheduleEditor({ 
    initialData, 
    onSave, 
    isSubmitting 
}: { 
    initialData: any[], 
    onSave: (path: string, data: any) => void, 
    isSubmitting: boolean 
}) {
    const [schedule, setSchedule] = useState(initialData);

    const handleUpdateModule = (modIdx: number, field: string, value: string) => {
        const newSched = [...schedule];
        newSched[modIdx] = { ...newSched[modIdx], [field]: value };
        setSchedule(newSched);
    };

    const handleUpdateSession = (modIdx: number, sessIdx: number, field: string, value: string) => {
        const newSched = [...schedule];
        const newSessions = [...newSched[modIdx].sessions];
        newSessions[sessIdx] = { ...newSessions[sessIdx], [field]: value };
        newSched[modIdx] = { ...newSched[modIdx], sessions: newSessions };
        setSchedule(newSched);
    };

    const handleDeleteSession = (modIdx: number, sessIdx: number) => {
        if (!confirm('Remove this session?')) return;
        const newSched = [...schedule];
        newSched[modIdx].sessions = newSched[modIdx].sessions.filter((_: any, i: number) => i !== sessIdx);
        setSchedule(newSched);
    };

    const handleAddSession = (modIdx: number) => {
        const newSched = [...schedule];
        newSched[modIdx].sessions = [
            ...newSched[modIdx].sessions,
            { day: "New Day", title: "New Session", date: "TBD", time: "TBD", type: "session" }
        ];
        setSchedule(newSched);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-6 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-onyx">Schedule Curriculum</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage Bootcamp and Core modules.</p>
                </div>
                <Button variant="primary" disabled={isSubmitting} onClick={() => onSave('content/schedule.json', schedule)}>
                    {isSubmitting ? <Loader2 size={16} className="animate-spin mr-2" /> : <Save size={16} className="mr-2" />} Save Changes
                </Button>
            </div>

            <div className="space-y-12 max-h-[70vh] overflow-y-auto pr-4">
                {schedule.map((mod: any, modIdx: number) => (
                    <div key={modIdx} className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                        <div className="bg-gray-50 p-6 border-b border-gray-200">
                            <h3 className="text-lg font-bold text-onyx mb-4">Module {modIdx + 1} Settings</h3>
                            <div className="grid md:grid-cols-4 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Module Title</label>
                                    <input value={mod.title || ''} onChange={e => handleUpdateModule(modIdx, 'title', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Date Range</label>
                                    <input value={mod.dates || ''} onChange={e => handleUpdateModule(modIdx, 'dates', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                                    <select value={mod.status || 'upcoming'} onChange={e => handleUpdateModule(modIdx, 'status', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
                                        <option value="upcoming">Upcoming</option>
                                        <option value="ongoing">Ongoing</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <h4 className="font-bold text-gray-700 mb-4 flex items-center justify-between">
                                Sessions
                                <Button size="sm" variant="outline" className="text-xs h-8" onClick={() => handleAddSession(modIdx)}>+ Add Session</Button>
                            </h4>
                            <div className="space-y-3">
                                {mod.sessions.map((sess: any, sessIdx: number) => (
                                    <div key={sessIdx} className="border border-gray-200 rounded-xl p-4 bg-gray-50/50 group relative">
                                        <button onClick={() => handleDeleteSession(modIdx, sessIdx)} className="absolute -top-2 -right-2 w-6 h-6 bg-rose-100 text-rose-600 rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                                        <div className="grid md:grid-cols-5 gap-3">
                                            <div className="md:col-span-1">
                                                <label className="block text-[10px] font-bold text-gray-400 uppercase">Day Label</label>
                                                <input value={sess.day || ''} onChange={e => handleUpdateSession(modIdx, sessIdx, 'day', e.target.value)} className="w-full px-2 py-1 border border-gray-200 rounded text-sm bg-white" />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-[10px] font-bold text-gray-400 uppercase">Title</label>
                                                <input value={sess.title || ''} onChange={e => handleUpdateSession(modIdx, sessIdx, 'title', e.target.value)} className="w-full px-2 py-1 border border-gray-200 rounded text-sm bg-white" />
                                            </div>
                                            <div className="md:col-span-1">
                                                <label className="block text-[10px] font-bold text-gray-400 uppercase">Date</label>
                                                <input value={sess.date || ''} onChange={e => handleUpdateSession(modIdx, sessIdx, 'date', e.target.value)} className="w-full px-2 py-1 border border-gray-200 rounded text-sm bg-white" />
                                            </div>
                                            <div className="md:col-span-1">
                                                <label className="block text-[10px] font-bold text-gray-400 uppercase">Time</label>
                                                <input value={sess.time || ''} onChange={e => handleUpdateSession(modIdx, sessIdx, 'time', e.target.value)} className="w-full px-2 py-1 border border-gray-200 rounded text-sm bg-white" />
                                            </div>
                                            <div className="md:col-span-5">
                                                <label className="block text-[10px] font-bold text-gray-400 uppercase">Description (Optional)</label>
                                                <input value={sess.description || ''} onChange={e => handleUpdateSession(modIdx, sessIdx, 'description', e.target.value)} className="w-full px-2 py-1 border border-gray-200 rounded text-sm bg-white text-gray-600" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
