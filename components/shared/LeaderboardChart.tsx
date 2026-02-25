'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Medal } from 'lucide-react';

interface ParticipantData {
    name: string;
    interviews: number;
    completed: number;
}

interface LeaderboardChartProps {
    data: ParticipantData[];
}

export const LeaderboardChart = ({ data }: LeaderboardChartProps) => {
    const [animated, setAnimated] = useState(false);

    // Find absolute maximum for scaling. Minimum ceiling of 10 just in case.
    const maxInterviews = Math.max(...data.map(d => d.interviews), 10);

    useEffect(() => {
        // Trigger animation shortly after mount
        const timer = setTimeout(() => setAnimated(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Get rank colors
    const getRankColor = (index: number) => {
        if (index === 0) return 'from-yellow-400 to-yellow-300 border-yellow-500 shadow-yellow-200/50';
        if (index === 1) return 'from-gray-300 to-gray-200 border-gray-400 shadow-gray-200/50';
        if (index === 2) return 'from-amber-600 to-amber-500 border-amber-700 shadow-amber-200/50';
        return 'from-sky-500 to-sky-400 border-sky-600 shadow-sky-200/50';
    };

    return (
        <div className="w-full relative">
            {/* Legend / Stats */}
            <div className="flex flex-wrap items-center justify-between mb-8 gap-4 px-2">
                <div className="flex items-center gap-2">
                    <span className="inline-flex w-4 h-4 rounded bg-gradient-to-b from-sky-400 to-sky-500"></span>
                    <span className="text-sm font-medium text-gray-600">Scheduled Interviews</span>
                </div>
                <div className="text-sm font-bold text-onyx bg-gray-50 px-4 py-2 rounded-full border border-gray-100 flex gap-2 items-center">
                    <Sparkles className="text-yellow-500" size={16} />
                    Current Leader: <span className="text-primary">{data[0]?.name || 'N/A'}</span>
                </div>
            </div>

            {/* Chart Area */}
            <div className="relative w-full h-[450px] overflow-hidden rounded-xl bg-gradient-to-b from-slate-50 to-slate-100/50 border border-slate-200/60 p-6 flex flex-col justify-end">
                {/* Background Grid Lines */}
                <div className="absolute inset-x-0 bottom-6 top-6 flex flex-col justify-between pointer-events-none z-0">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-full border-b border-dashed border-slate-300/50 h-0 relative">
                            {i < 4 && (
                                <span className="absolute -top-3 -left-2 text-[10px] text-slate-400 font-mono">
                                    {Math.round(maxInterviews * (4 - i) / 4)}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Towers Container - Scrollable horizontally */}
                <div className="relative z-10 w-full h-full overflow-x-auto overflow-y-hidden flex items-end gap-2 sm:gap-4 pb-2 px-6 custom-scrollbar scroll-smooth">
                    {data.map((participant, index) => {
                        // Calculate percentage of max height (leave room for rocket)
                        const heightPercentage = Math.max((participant.interviews / maxInterviews) * 85, 5);
                        const isTop3 = index < 3;

                        return (
                            <div
                                key={index}
                                className="relative flex flex-col items-center justify-end h-full min-w-[60px] max-w-[80px] sm:min-w-[80px] flex-1 group"
                            >
                                {/* Tooltip on hover */}
                                <div className="absolute -top-16 opacity-0 group-hover:opacity-100 transition-opacity bg-onyx text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap z-50 pointer-events-none shadow-xl transform translate-y-2 group-hover:translate-y-0 duration-200">
                                    <p className="font-bold">{participant.name}</p>
                                    <p className="text-sky-300">{participant.interviews} Scheduled</p>
                                    <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-onyx"></div>
                                </div>

                                {/* Rocket and Count */}
                                <div
                                    className="flex flex-col items-center transition-all duration-1000 ease-out z-20"
                                    style={{
                                        transform: animated ? `translateY(-${heightPercentage}%)` : 'translateY(0)',
                                        bottom: 0,
                                        position: 'absolute'
                                    }}
                                >
                                    <div className="relative mb-1">
                                        <span className={`text-2xl sm:text-3xl filter transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-2 ${isTop3 ? 'drop-shadow-lg' : ''}`}>
                                            🚀
                                        </span>
                                        {isTop3 && (
                                            <Medal
                                                className={`absolute -right-3 -bottom-1 ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : 'text-amber-600'}`}
                                                size={16}
                                            />
                                        )}
                                    </div>
                                    <span className="font-mono font-bold text-sm text-onyx bg-white/80 backdrop-blur-sm px-2 rounded-md shadow-sm border border-gray-100 mb-1">
                                        {participant.interviews}
                                    </span>
                                </div>

                                {/* Tower Body */}
                                <div
                                    className={`w-full rounded-t-lg transition-all duration-1000 ease-out border-t-2 border-l border-r opacity-90 group-hover:opacity-100 shadow-lg bg-gradient-to-t ${getRankColor(index)} relative overflow-hidden`}
                                    style={{
                                        height: animated ? `${heightPercentage}%` : '0%',
                                        minHeight: animated ? '10px' : '0'
                                    }}
                                >
                                    {/* Tower windows pattern */}
                                    <div className="absolute inset-0 opacity-20"
                                        style={{
                                            backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
                                            backgroundSize: '10px 10px'
                                        }}>
                                    </div>

                                    {/* Inner gradient highlight */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"></div>
                                </div>

                                {/* Name Label below tower */}
                                <div className="mt-3 w-full text-center h-12 flex items-start justify-center">
                                    <span className="text-[10px] sm:text-xs font-semibold text-gray-600 truncate px-1 max-w-full block leading-tight">
                                        {participant.name.split(' ')[0]} {/* Show first name to fit better */}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Base platform */}
                <div className="absolute bottom-0 inset-x-0 h-14 bg-slate-200 border-t border-slate-300 z-0 shadow-inner rounded-b-xl"></div>
            </div>
        </div>
    );
};
