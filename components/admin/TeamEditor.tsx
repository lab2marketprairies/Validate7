import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Save, Loader2, Search } from 'lucide-react';

export default function TeamEditor({ 
    initialData, 
    onSave, 
    isSubmitting 
}: { 
    initialData: any[], 
    onSave: (path: string, data: any) => void, 
    isSubmitting: boolean 
}) {
    const [team, setTeam] = useState(initialData);
    const [search, setSearch] = useState('');

    const handleUpdate = (index: number, field: string, value: string) => {
        const newTeam = [...team];
        newTeam[index] = { ...newTeam[index], [field]: value };
        setTeam(newTeam);
    };

    const handleDelete = (index: number) => {
        if (confirm('Are you sure you want to remove this person?')) {
            setTeam(team.filter((_, i) => i !== index));
        }
    };

    const handleAdd = () => {
        setTeam([{ name: "New Member", role: "", email: "", group: "participants" }, ...team]);
    };

    const filteredIndices = useMemo(() => {
        if (!search) return team.map((_, i) => i);
        return team
            .map((t, i) => ({ t, i }))
            .filter(({ t }) => t.name?.toLowerCase().includes(search.toLowerCase()) || t.group?.toLowerCase().includes(search.toLowerCase()))
            .map(({ i }) => i);
    }, [team, search]);

    return (
        <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-6 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-onyx">Team & Mentors</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage the facilitators, mentors, and participants. ({team.length} total)</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={handleAdd}>+ Add Member</Button>
                    <Button variant="primary" disabled={isSubmitting} onClick={() => onSave('content/team.json', team)}>
                        {isSubmitting ? <Loader2 size={16} className="animate-spin mr-2" /> : <Save size={16} className="mr-2" />} Save Changes
                    </Button>
                </div>
            </div>

            <div className="relative max-w-sm mb-6">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                    placeholder="Search people..." 
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm"
                />
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {filteredIndices.map((idx) => {
                    const member = team[idx];
                    return (
                        <div key={idx} className="p-4 border border-gray-200 rounded-xl relative bg-white group hover:border-primary/50 transition-colors">
                            <button onClick={() => handleDelete(idx)} className="absolute -top-3 -right-3 w-6 h-6 bg-rose-100 text-rose-600 rounded-full text-xs font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-500 hover:text-white shadow-sm">×</button>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                                    <input value={member.name || ''} onChange={e => handleUpdate(idx, 'name', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Group Classification</label>
                                    <select value={member.group || 'participants'} onChange={e => handleUpdate(idx, 'group', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50">
                                        <option value="operations">Operations</option>
                                        <option value="facilitators">Facilitators</option>
                                        <option value="mentors">Mentors</option>
                                        <option value="participants">Participants</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Job Title</label>
                                    <input value={member.role || ''} onChange={e => handleUpdate(idx, 'role', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Email Address</label>
                                    <input value={member.email || ''} onChange={e => handleUpdate(idx, 'email', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">LinkedIn Profile URL</label>
                                    <input value={member.linkedin || ''} onChange={e => handleUpdate(idx, 'linkedin', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Image/Thumbnail Path</label>
                                    <input value={member.thumbnail || ''} onChange={e => handleUpdate(idx, 'thumbnail', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
