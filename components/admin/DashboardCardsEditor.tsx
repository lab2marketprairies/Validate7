import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Save, Loader2, Slack, Mail, Calendar, Navigation } from 'lucide-react';

export default function DashboardCardsEditor({ 
    initialSupportHours,
    initialDashboardCards, 
    onSave, 
    isSubmitting 
}: { 
    initialSupportHours: any,
    initialDashboardCards: any, 
    onSave: (path: string, data: any) => Promise<void>, 
    isSubmitting: boolean 
}) {
    const [supportHours, setSupportHours] = useState(initialSupportHours);
    const [dashboardCards, setDashboardCards] = useState(initialDashboardCards);

    const [savingSupport, setSavingSupport] = useState(false);
    const [savingCards, setSavingCards] = useState(false);

    const handleSaveSupport = async () => {
        setSavingSupport(true);
        await onSave('content/support-hours.json', supportHours);
        setSavingSupport(false);
    };

    const handleSaveCards = async () => {
        setSavingCards(true);
        await onSave('content/dashboard-cards.json', dashboardCards);
        setSavingCards(false);
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-300">
            {/* Drop-in Support Editor */}
            <div>
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-6 gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-onyx flex items-center gap-2"><Calendar className="text-primary" /> Drop-in Support Settings</h2>
                        <p className="text-gray-500 text-sm mt-1">Manage the weekly group support hours card.</p>
                    </div>
                    <Button variant="primary" disabled={savingSupport || isSubmitting} onClick={handleSaveSupport}>
                        {savingSupport ? <Loader2 size={16} className="animate-spin mr-2" /> : <Save size={16} className="mr-2" />} Save Support
                    </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4 max-w-3xl bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Hosts</label>
                        <input value={supportHours.hosts || ''} onChange={e => setSupportHours({...supportHours, hosts: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Time</label>
                        <input value={supportHours.time || ''} onChange={e => setSupportHours({...supportHours, time: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Zoom Link</label>
                        <input value={supportHours.zoomLink || ''} onChange={e => setSupportHours({...supportHours, zoomLink: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white" />
                    </div>
                </div>
            </div>

            {/* Sidebar & Navigator Cards Editor */}
            <div>
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-6 gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-onyx flex items-center gap-2"><Navigation className="text-primary" /> Dashboard Panels</h2>
                        <p className="text-gray-500 text-sm mt-1">Manage Slack, Program Navigator links, and Quick Contacts.</p>
                    </div>
                    <Button variant="primary" disabled={savingCards || isSubmitting} onClick={handleSaveCards}>
                        {savingCards ? <Loader2 size={16} className="animate-spin mr-2" /> : <Save size={16} className="mr-2" />} Save Panels
                    </Button>
                </div>

                <div className="grid gap-8 max-w-4xl">
                    
                    {/* Slack Card */}
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <h3 className="font-bold text-onyx mb-4 flex items-center gap-2"><Slack size={16} className="text-[#4A154B]"/> Slack Community Card</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
                                <input value={dashboardCards.slack.title || ''} onChange={e => setDashboardCards({...dashboardCards, slack: {...dashboardCards.slack, title: e.target.value}})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Button Text</label>
                                <input value={dashboardCards.slack.buttonText || ''} onChange={e => setDashboardCards({...dashboardCards, slack: {...dashboardCards.slack, buttonText: e.target.value}})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                                <textarea rows={2} value={dashboardCards.slack.description || ''} onChange={e => setDashboardCards({...dashboardCards, slack: {...dashboardCards.slack, description: e.target.value}})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white resize-none" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-gray-500 mb-1">Invite Link URL</label>
                                <input value={dashboardCards.slack.link || ''} onChange={e => setDashboardCards({...dashboardCards, slack: {...dashboardCards.slack, link: e.target.value}})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white" />
                            </div>
                        </div>
                    </div>

                    {/* Quick Contacts */}
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <h3 className="font-bold text-onyx mb-4 flex items-center justify-between">
                            <span className="flex items-center gap-2"><Mail size={16} className="text-primary"/> Quick Contacts</span>
                            <Button size="sm" variant="outline" className="text-xs h-8" onClick={() => setDashboardCards({...dashboardCards, contacts: [...dashboardCards.contacts, { name: 'New Contact', email: '' }]})}>+ Add Contact</Button>
                        </h3>
                        <div className="space-y-3">
                            {dashboardCards.contacts.map((contact: any, idx: number) => (
                                <div key={idx} className="flex gap-4 items-end">
                                    <div className="flex-1">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase">Name</label>
                                        <input value={contact.name || ''} onChange={e => {
                                            const newContacts = [...dashboardCards.contacts];
                                            newContacts[idx].name = e.target.value;
                                            setDashboardCards({...dashboardCards, contacts: newContacts});
                                        }} className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm bg-white" />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase">Email</label>
                                        <input value={contact.email || ''} onChange={e => {
                                            const newContacts = [...dashboardCards.contacts];
                                            newContacts[idx].email = e.target.value;
                                            setDashboardCards({...dashboardCards, contacts: newContacts});
                                        }} className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm bg-white" />
                                    </div>
                                    <Button variant="outline" size="sm" className="h-8 text-rose-500 hover:bg-rose-50 border-gray-200" onClick={() => {
                                        setDashboardCards({...dashboardCards, contacts: dashboardCards.contacts.filter((_: any, i: number) => i !== idx)});
                                    }}>Remove</Button>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
