'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { renderTextWithLinks } from '@/lib/utils';
import { ChevronDown, ChevronUp, Calendar, Clock, MapPin, ExternalLink, Folder } from 'lucide-react';

interface AgendaItem {
    time: string;
    activity: string;
}

interface ToDoGroup {
    title: string;
    items: string[];
}

interface SessionProps {
    session: any;
    zoomLink?: string;
}

export const ProgramSession = ({ session, zoomLink = 'https://umanitoba.zoom.us/j/8399047985?pwd=Yzhab1VJV2RRQmYvZ2t2bWZIelV1QT09' }: SessionProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasDetails = session.description || session.agenda || session.todo;
    const isSocial = session.type === 'social' || session.week === 'Social' || session.day?.toLowerCase().includes('social');

    return (
        <Card className={`${isSocial ? 'bg-secondary/10 border-secondary' : ''} transition-all duration-200 overflow-hidden`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div
                    className={`flex-1 ${hasDetails ? 'cursor-pointer' : ''}`}
                    onClick={() => hasDetails && setIsExpanded(!isExpanded)}
                >
                    <div className="flex items-center gap-3 mb-1">
                        <span className="font-bold text-primary flex items-center gap-1">
                            {session.day || session.week}
                        </span>
                        <span className="text-gray-400 text-sm">•</span>
                        <span className="text-gray-600 font-medium flex items-center gap-1">
                            <Calendar size={14} className="text-gray-400" />
                            {session.date}
                        </span>
                        {hasDetails && (
                            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full ml-1 font-medium flex items-center gap-1">
                                {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                                {isExpanded ? 'Hide Details' : 'Show Details'}
                            </span>
                        )}
                    </div>
                    <h3 className="text-xl font-bold text-onyx">{session.title}</h3>
                </div>

                <div className="flex flex-col sm:items-end gap-3">
                    <div className="bg-white px-4 py-2 rounded-lg border border-gray-100 font-mono text-sm text-center whitespace-nowrap self-start sm:self-auto flex items-center gap-2 shadow-sm">
                        <Clock size={14} className="text-primary" />
                        {session.time}
                    </div>
                    <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
                        {session.materialsLink && (
                            <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 sm:flex-initial text-xs border-primary/20 hover:bg-primary/5 group"
                                onClick={() => window.open(session.materialsLink, '_blank')}
                            >
                                <Folder size={14} className="mr-2 opacity-60 transition-transform group-hover:scale-110" />
                                Post-Session Materials
                            </Button>
                        )}
                        <Button
                            size="sm"
                            variant="primary"
                            className="flex-1 sm:flex-initial"
                            onClick={() => window.open(zoomLink, '_blank')}
                        >
                            <ExternalLink size={14} className="mr-2" />
                            Join Session
                        </Button>
                    </div>
                </div>
            </div>

            {/* Expanded Details */}
            {isExpanded && (
                <div className="mt-6 pt-6 border-t border-gray-100 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                    {/* Description */}
                    {session.description && (
                        <div>
                            <h4 className="text-sm font-bold text-onyx uppercase tracking-wider mb-2 flex items-center gap-2">
                                <span className="w-1 h-4 bg-primary rounded-full"></span>
                                About the session
                            </h4>
                            <p className="text-gray-600 leading-relaxed italic">{session.description}</p>
                        </div>
                    )}

                    {/* Agenda */}
                    {session.agenda && (
                        <div>
                            <h4 className="text-sm font-bold text-onyx uppercase tracking-wider mb-3 flex items-center gap-2">
                                <span className="w-1 h-4 bg-primary rounded-full"></span>
                                Schedule (Central Time)
                            </h4>
                            <div className="overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-100">
                                        <tr>
                                            <th className="px-4 py-3 w-1/3">Time</th>
                                            <th className="px-4 py-3">Activity</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {session.agenda.map((item: any, idx: number) => (
                                            <tr key={idx} className={item.activity.toLowerCase().includes('break') || item.activity.toLowerCase().includes('lunch') ? 'bg-gray-50/50' : 'hover:bg-gray-50/30'}>
                                                <td className="px-4 py-3 font-mono text-gray-600">{item.time}</td>
                                                <td className="px-4 py-3 text-gray-700 italic">{item.activity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* To Do / Homework */}
                    {session.todo && (
                        <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                            <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                                <span className="bg-primary text-white p-1 rounded-lg">
                                    <MapPin size={14} />
                                </span>
                                Tasks & Preparation
                            </h4>
                            <div className="space-y-6">
                                {session.todo.map((group: any, idx: number) => (
                                    <div key={idx} className="last:mb-0">
                                        <h5 className="font-bold text-onyx mb-3 text-sm flex items-center gap-2">
                                            {group.title}
                                        </h5>
                                        {group.items.length > 0 && (
                                            <ul className="space-y-3">
                                                {group.items.map((item: any, i: number) => (
                                                    <li key={i} className="flex gap-3 text-gray-700 text-sm leading-relaxed">
                                                        <div className="w-1.5 h-1.5 bg-primary/40 rounded-full mt-2 flex-shrink-0" />
                                                        <div className="flex-1">{renderTextWithLinks(item)}</div>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </Card>
    );
};
