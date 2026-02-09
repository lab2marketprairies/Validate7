'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import teamMembers from '@/content/team.json';
import { MapPin, Lightbulb, Search, Linkedin, Mail, User, Info } from 'lucide-react';

const TeamSection = ({ title, members, emptyMessage }: { title: string, members: any[], emptyMessage?: string }) => (
    <section className="mb-16">
        <h2 className="text-2xl font-bold text-onyx mb-8 flex items-center gap-3">
            <span className="w-1.5 h-8 bg-primary rounded-full"></span>
            {title}
            <span className="ml-2 text-sm font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                {members.length}
            </span>
        </h2>

        {members.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {members.map((member, idx) => (
                    <Card key={`${member.name}-${idx}`} className="overflow-hidden flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-gray-100 bg-white/80 backdrop-blur-sm">
                        <div className="h-28 bg-gradient-to-br from-primary/10 via-white to-secondary/5 mb-6 flex items-center justify-center relative">
                            <div className="absolute top-4 right-4 text-primary opacity-20">
                                <User size={48} />
                            </div>
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg border-4 border-white relative overflow-hidden z-10 translate-y-4">
                                {member.thumbnail ? (
                                    <Image
                                        src={member.thumbnail}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <span className="text-gray-300 font-bold">{member.name.charAt(0)}</span>
                                )}
                            </div>
                        </div>

                        <div className="flex-1 text-center pt-8 px-2">
                            <h3 className="text-xl font-bold text-onyx mb-1">{member.name}</h3>
                            <p className="text-primary font-bold text-sm mb-3 uppercase tracking-wide px-4">{member.role}</p>

                            <p className="text-gray-500 text-sm flex items-center justify-center gap-1.5 mb-4">
                                <MapPin size={14} className="text-gray-400" />
                                {member.location}
                            </p>

                            {member.expertise && (
                                <div className="mb-6 flex flex-wrap justify-center gap-2 px-2">
                                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-onyx bg-secondary/10 py-1.5 px-4 rounded-full border border-secondary/20 uppercase tracking-tighter">
                                        <Lightbulb size={12} className="text-secondary" />
                                        {member.expertise}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="px-6 pb-6 pt-4 border-t border-gray-50 mt-auto flex items-center gap-3">
                            <Button
                                variant="outline"
                                className="flex-1 text-xs font-bold gap-2 border-gray-200 hover:border-primary hover:text-primary"
                                size="sm"
                                onClick={() => window.open(member.linkedin, '_blank')}
                                disabled={!member.linkedin}
                            >
                                <Linkedin size={14} />
                                LinkedIn
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-1 text-xs font-bold gap-2 border-gray-200 hover:border-primary hover:text-primary"
                                size="sm"
                                onClick={() => window.location.href = `mailto:${member.email}`}
                                disabled={!member.email}
                            >
                                <Mail size={14} />
                                Email
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        ) : (
            <div className="bg-white/50 backdrop-blur-sm p-12 rounded-2xl shadow-sm text-center border-2 border-dashed border-gray-200">
                <Info size={32} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium italic">{emptyMessage || "Team members matching your search coming soon..."}</p>
            </div>
        )}
    </section>
);

export default function TeamPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredMembers = useMemo(() => {
        if (!searchQuery.trim()) return teamMembers;
        const query = searchQuery.toLowerCase();
        return teamMembers.filter(member =>
            member.name.toLowerCase().includes(query) ||
            member.role.toLowerCase().includes(query) ||
            member.expertise?.toLowerCase().includes(query) ||
            member.location.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    const getMembersByGroup = (group: string) =>
        filteredMembers.filter(member => member.group === group);

    const operationsTeam = getMembersByGroup('operations');
    const facilitatorsTeam = getMembersByGroup('facilitators');
    const mentorsTeam = getMembersByGroup('mentors');

    return (
        <div className="min-h-screen bg-polar">
            <Header />

            <main className="container mx-auto px-4 py-8">
                <Breadcrumbs />

                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl font-extrabold text-onyx mb-4 tracking-tight">Facilitators & Mentors</h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Meet the dedicated team supporting your journey through the Lab2Market Prairies program.
                        </p>
                    </div>

                    <div className="relative w-full md:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name, expertise..."
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    {operationsTeam.length > 0 && <TeamSection title="Program Operations" members={operationsTeam} />}
                    {facilitatorsTeam.length > 0 && <TeamSection title="Facilitators" members={facilitatorsTeam} />}
                    {mentorsTeam.length > 0 && (
                        <TeamSection
                            title="Mentors"
                            members={mentorsTeam}
                            emptyMessage="Mentor list coming soon. Please check back shortly."
                        />
                    )}

                    {filteredMembers.length === 0 && (
                        <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
                            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                                <Search size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-onyx mb-2">No results found</h3>
                            <p className="text-gray-500 max-w-sm mx-auto">
                                We couldn't find any team members matching "{searchQuery}". Try a different keyword.
                            </p>
                            <Button
                                variant="text"
                                className="mt-4"
                                onClick={() => setSearchQuery('')}
                            >
                                Clear search
                            </Button>
                        </div>
                    )}
                </div>

            </main>

            <footer className="bg-onyx text-white py-12 mt-24">
                <div className="container mx-auto px-4 text-center">
                    <div className="w-12 h-1 bg-primary/20 mx-auto mb-8 rounded-full" />
                    <p className="opacity-60 text-sm">© 2026 Lab2Market Prairies. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
