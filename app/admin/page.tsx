'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { 
    LayoutDashboard, Users, Calendar, Info as InfoIcon, Bell,
    Save, Loader2, CheckCircle, AlertCircle
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

// Initial Data Imports
import heroData from '@/content/hero.json';
import aboutData from '@/content/about.json';
import remindersData from '@/content/reminders.json';
import scheduleData from '@/content/schedule.json';
import teamData from '@/content/team.json';
import supportHoursData from '@/content/support-hours.json';
import dashboardCardsData from '@/content/dashboard-cards.json';

// Server Action
import { updateContent } from '@/app/actions/updateContent';

// Array Component Editors
import TeamEditor from '@/components/admin/TeamEditor';
import ScheduleEditor from '@/components/admin/ScheduleEditor';
import DashboardCardsEditor from '@/components/admin/DashboardCardsEditor';

const ADMIN_USER_ID = 'user_39JNBjYkk78K3qb0WHwAaGRQnEU';

// --- SUB-COMPONENTS --- //

const Notification = ({ message, type }: { message: string, type: 'success'|'error' }) => (
    <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 text-sm font-medium border shadow-sm animate-in fade-in zoom-in duration-300 ${type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'}`}>
        {type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
        {message}
    </div>
);

// --- MAIN PAGE --- //

export default function AdminDashboardPage() {
    const { userId, isLoaded } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('hero');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notification, setNotification] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Form States
    const [heroForm, setHeroForm] = useState(heroData);
    const [aboutForm, setAboutForm] = useState(aboutData);
    const [remindersForm, setRemindersForm] = useState(remindersData);

    useEffect(() => {
        if (isLoaded && userId !== ADMIN_USER_ID) {
            router.push('/');
        }
    }, [isLoaded, userId, router]);

    if (!isLoaded || userId !== ADMIN_USER_ID) {
        return <div className="min-h-screen bg-polar flex items-center justify-center"><Loader2 className="animate-spin text-primary" size={32} /></div>;
    }

    const handleSave = async (filePath: string, data: any) => {
        setIsSubmitting(true);
        setNotification(null);
        try {
            const res = await updateContent(filePath, data);
            if (res.success) {
                setNotification({ type: 'success', text: 'Changes saved! A deployment has been triggered. The live site will update in ~30 seconds.' });
            } else {
                setNotification({ type: 'error', text: res.error || 'Failed to save changes.' });
            }
        } catch (err) {
            setNotification({ type: 'error', text: 'An unexpected error occurred.' });
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setNotification(null), 8000);
        }
    };

    const tabs = [
        { id: 'hero', label: 'Dashboard Hero', icon: LayoutDashboard },
        { id: 'dashboardCards', label: 'Dashboard Panels', icon: LayoutDashboard },
        { id: 'reminders', label: 'Reminders', icon: Bell },
        { id: 'about', label: 'About & Info', icon: InfoIcon },
        { id: 'team', label: 'Team & Mentors', icon: Users },
        { id: 'schedule', label: 'Schedule', icon: Calendar },
    ];

    return (
        <div className="min-h-screen bg-polar pb-24">
            <Header />

            <div className="bg-onyx text-white py-12 px-4 shadow-inner">
                <div className="container mx-auto">
                    <h1 className="text-3xl font-extrabold tracking-tight mb-2">Global CMS Dashboard</h1>
                    <p className="text-gray-400 font-medium max-w-2xl">Manage content across the entire Lab2Market Prairies platform. Changes here will be committed directly to GitHub and deployed live immediately.</p>
                </div>
            </div>

            <main className="container mx-auto px-4 py-8 -mt-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Nav */}
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        <Card className="p-4 bg-white/90 backdrop-blur-xl border-gray-100 shadow-xl shadow-gray-200/40 sticky top-8">
                            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-4">Content Modules</h2>
                            <nav className="flex flex-col gap-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => { setActiveTab(tab.id); setNotification(null); }}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                                            activeTab === tab.id 
                                            ? 'bg-primary/10 text-primary shadow-sm shadow-primary/5' 
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-onyx'
                                        }`}
                                    >
                                        <tab.icon size={18} className={activeTab === tab.id ? 'text-primary' : 'text-gray-400'} />
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>
                        </Card>
                    </aside>

                    {/* Editor Canvas */}
                    <div className="flex-1">
                        <Card className="p-6 md:p-10 bg-white border-gray-100 shadow-xl shadow-gray-200/30">
                            
                            {/* --- HERO TAB --- */}
                            {activeTab === 'hero' && (
                                <div className="space-y-8 animate-in fade-in duration-300">
                                    <div className="flex items-center justify-between border-b pb-6">
                                        <div>
                                            <h2 className="text-2xl font-bold text-onyx">Home Page Hero</h2>
                                            <p className="text-gray-500 text-sm mt-1">Edit the main landing section of the dashboard.</p>
                                        </div>
                                        <Button 
                                            variant="primary" 
                                            disabled={isSubmitting} 
                                            onClick={() => handleSave('content/hero.json', heroForm)}
                                            className="min-w-[120px]"
                                        >
                                            {isSubmitting ? <Loader2 size={16} className="animate-spin mr-2" /> : <Save size={16} className="mr-2" />} Save Changes
                                        </Button>
                                    </div>

                                    <div className="grid gap-6 max-w-3xl">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Main Headline</label>
                                            <input 
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-onyx font-medium shadow-sm"
                                                value={heroForm.title}
                                                onChange={(e) => setHeroForm({...heroForm, title: e.target.value})}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Subheadline / Description</label>
                                            <textarea 
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-onyx shadow-sm resize-none"
                                                rows={4}
                                                value={heroForm.subtitle}
                                                onChange={(e) => setHeroForm({...heroForm, subtitle: e.target.value})}
                                            />
                                        </div>

                                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mt-4">
                                            <h3 className="font-bold text-onyx mb-4 flex items-center gap-2"><LayoutDashboard size={16} className="text-primary"/> Button Copy</h3>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Skills Clinic Label</label>
                                                    <input 
                                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                                                        value={heroForm.buttons?.skillsClinic || ''}
                                                        onChange={(e) => setHeroForm({...heroForm, buttons: {...heroForm.buttons, skillsClinic: e.target.value}})}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* --- REMINDERS TAB --- */}
                            {activeTab === 'reminders' && (
                                <div className="space-y-8 animate-in fade-in duration-300">
                                    <div className="flex items-center justify-between border-b pb-6">
                                        <div>
                                            <h2 className="text-2xl font-bold text-onyx">Reminders Card</h2>
                                            <p className="text-gray-500 text-sm mt-1">Manage the High Priority and Upcoming reminders.</p>
                                        </div>
                                        <Button 
                                            variant="primary" 
                                            disabled={isSubmitting} 
                                            onClick={() => handleSave('content/reminders.json', remindersForm)}
                                            className="min-w-[120px]"
                                        >
                                            {isSubmitting ? <Loader2 size={16} className="animate-spin mr-2" /> : <Save size={16} className="mr-2" />} Save Changes
                                        </Button>
                                    </div>

                                    <div className="grid gap-6 max-w-3xl">
                                        <div className="space-y-4">
                                            <h3 className="font-bold text-rose-600 uppercase tracking-widest text-xs border-b pb-2">High Priority Reminder</h3>
                                            <div className="grid gap-3">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 mb-1">Label</label>
                                                    <input value={remindersForm.highPriority.label} onChange={e => setRemindersForm({...remindersForm, highPriority: {...remindersForm.highPriority, label: e.target.value}})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 text-sm" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 mb-1">Text</label>
                                                    <textarea value={remindersForm.highPriority.text} onChange={e => setRemindersForm({...remindersForm, highPriority: {...remindersForm.highPriority, text: e.target.value}})} rows={3} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 text-sm resize-none" />
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 mb-1">Action Link Text</label>
                                                        <input value={remindersForm.highPriority.linkText} onChange={e => setRemindersForm({...remindersForm, highPriority: {...remindersForm.highPriority, linkText: e.target.value}})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 text-sm" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 mb-1">URL / Link</label>
                                                        <input value={remindersForm.highPriority.link} onChange={e => setRemindersForm({...remindersForm, highPriority: {...remindersForm.highPriority, link: e.target.value}})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 text-sm" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4 pt-4 mt-4 border-t border-dashed">
                                            <h3 className="font-bold text-amber-500 uppercase tracking-widest text-xs border-b pb-2">Upcoming Reminder</h3>
                                            <div className="grid gap-3">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 mb-1">Label</label>
                                                    <input value={remindersForm.upcoming.label} onChange={e => setRemindersForm({...remindersForm, upcoming: {...remindersForm.upcoming, label: e.target.value}})} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 text-sm" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 mb-1">Text</label>
                                                    <textarea value={remindersForm.upcoming.text} onChange={e => setRemindersForm({...remindersForm, upcoming: {...remindersForm.upcoming, text: e.target.value}})} rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 text-sm resize-none" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* --- ABOUT TAB --- */}
                            {activeTab === 'about' && (
                                <div className="space-y-8 animate-in fade-in duration-300">
                                    <div className="flex items-center justify-between border-b pb-6">
                                        <div>
                                            <h2 className="text-2xl font-bold text-onyx">About & Info Page</h2>
                                            <p className="text-gray-500 text-sm mt-1">Manage the general information and resources blocks.</p>
                                        </div>
                                        <Button 
                                            variant="primary" 
                                            disabled={isSubmitting} 
                                            onClick={() => handleSave('content/about.json', aboutForm)}
                                            className="min-w-[120px]"
                                        >
                                            {isSubmitting ? <Loader2 size={16} className="animate-spin mr-2" /> : <Save size={16} className="mr-2" />} Save Changes
                                        </Button>
                                    </div>

                                    <div className="grid gap-8 max-w-4xl">
                                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                            <h3 className="font-bold text-onyx mb-4 flex items-center gap-2"><InfoIcon size={16} className="text-primary"/> Program Overview</h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Page Title</label>
                                                    <input value={aboutForm.programOverview.title} onChange={e => setAboutForm({...aboutForm, programOverview: {...aboutForm.programOverview, title: e.target.value}})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Description</label>
                                                    <textarea value={aboutForm.programOverview.description} onChange={e => setAboutForm({...aboutForm, programOverview: {...aboutForm.programOverview, description: e.target.value}})} rows={4} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white resize-none" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Welcome Message</label>
                                                    <textarea value={aboutForm.programOverview.welcomeMessage} onChange={e => setAboutForm({...aboutForm, programOverview: {...aboutForm.programOverview, welcomeMessage: e.target.value}})} rows={3} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white resize-none" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                            <h3 className="font-bold text-onyx mb-4 flex items-center justify-between">
                                                Welcome Packages
                                                <Button size="sm" variant="outline" className="text-xs py-1 h-8" onClick={() => setAboutForm({...aboutForm, welcomePackage: [...aboutForm.welcomePackage, { title: 'New Package', type: 'PDF', link: '' }]})}>+ Add Package</Button>
                                            </h3>
                                            <div className="space-y-4">
                                                {aboutForm.welcomePackage.map((pkg: any, idx: number) => (
                                                    <div key={idx} className="p-4 border border-gray-200 rounded-xl relative bg-white group hover:border-primary/50 transition-colors">
                                                        <button 
                                                            onClick={() => setAboutForm({...aboutForm, welcomePackage: aboutForm.welcomePackage.filter((_: any, i: number) => i !== idx)})}
                                                            className="absolute -top-3 -right-3 w-6 h-6 bg-rose-100 text-rose-600 rounded-full text-xs font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-500 hover:text-white shadow-sm"
                                                        >
                                                            ×
                                                        </button>
                                                        <div className="grid md:grid-cols-2 gap-4">
                                                            <div>
                                                                <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
                                                                <input value={pkg.title} onChange={e => { const newP = [...aboutForm.welcomePackage]; newP[idx].title = e.target.value; setAboutForm({...aboutForm, welcomePackage: newP}); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-medium text-gray-500 mb-1">Type (e.g., PDF)</label>
                                                                <input value={pkg.type} onChange={e => { const newP = [...aboutForm.welcomePackage]; newP[idx].type = e.target.value; setAboutForm({...aboutForm, welcomePackage: newP}); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                                                            </div>
                                                            <div className="md:col-span-2">
                                                                <label className="block text-xs font-medium text-gray-500 mb-1">Download Link</label>
                                                                <input value={pkg.link} onChange={e => { const newP = [...aboutForm.welcomePackage]; newP[idx].link = e.target.value; setAboutForm({...aboutForm, welcomePackage: newP}); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                {aboutForm.welcomePackage.length === 0 && <p className="text-sm text-gray-400 italic text-center py-4">No packages added.</p>}
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                            <h3 className="font-bold text-onyx mb-4 flex items-center gap-2">Contact Info</h3>
                                            <div className="grid md:grid-cols-3 gap-4">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                                                    <input value={aboutForm.contact.name} onChange={e => setAboutForm({...aboutForm, contact: {...aboutForm.contact, name: e.target.value}})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 mb-1">Role</label>
                                                    <input value={aboutForm.contact.role} onChange={e => setAboutForm({...aboutForm, contact: {...aboutForm.contact, role: e.target.value}})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                                                    <input value={aboutForm.contact.email} onChange={e => setAboutForm({...aboutForm, contact: {...aboutForm.contact, email: e.target.value}})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* --- DASHBOARD PANELS TAB --- */}
                            {activeTab === 'dashboardCards' && (
                                <DashboardCardsEditor 
                                    initialSupportHours={supportHoursData} 
                                    initialDashboardCards={dashboardCardsData} 
                                    onSave={handleSave} 
                                    isSubmitting={isSubmitting} 
                                />
                            )}

                            {/* --- TEAM TAB --- */}
                            {activeTab === 'team' && (
                                <TeamEditor initialData={teamData} onSave={handleSave} isSubmitting={isSubmitting} />
                            )}

                            {/* --- SCHEDULE TAB --- */}
                            {activeTab === 'schedule' && (
                                <ScheduleEditor initialData={scheduleData} onSave={handleSave} isSubmitting={isSubmitting} />
                            )}

                            {/* Notifications */}
                            {notification && <Notification message={notification.text} type={notification.type} />}

                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
