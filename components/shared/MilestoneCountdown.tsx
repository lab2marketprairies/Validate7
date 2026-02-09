'use client';

import { useState, useEffect } from 'react';
import { Timer, Calendar, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface MilestoneCountdownProps {
    targetDate: string;
    title: string;
}

export const MilestoneCountdown = ({ targetDate, title }: MilestoneCountdownProps) => {
    const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(targetDate) - +new Date();
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                setTimeLeft(null);
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    if (!timeLeft) return null;

    return (
        <Card className="bg-gradient-to-br from-onyx to-gray-800 text-white border-none shadow-xl overflow-hidden relative group">
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500" />

            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                    <div className="p-2 bg-primary/20 rounded-lg text-primary">
                        <Timer size={20} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Next Milestone</span>
                </div>

                <h3 className="text-2xl font-extrabold mb-8 tracking-tight group-hover:text-primary transition-colors cursor-default">
                    {title}
                </h3>

                <div className="grid grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Days', value: timeLeft.days },
                        { label: 'Hrs', value: timeLeft.hours },
                        { label: 'Min', value: timeLeft.minutes },
                        { label: 'Sec', value: timeLeft.seconds },
                    ].map((item) => (
                        <div key={item.label} className="text-center">
                            <div className="text-3xl font-black mb-1 tabular-nums">{item.value.toString().padStart(2, '0')}</div>
                            <div className="text-[10px] font-bold uppercase tracking-tighter text-gray-500">{item.label}</div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/10 text-sm font-bold text-gray-400">
                    <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        {new Date(targetDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-1 group-hover:text-primary transition-colors cursor-pointer">
                        Details <ChevronRight size={14} />
                    </div>
                </div>
            </div>
        </Card>
    );
};
