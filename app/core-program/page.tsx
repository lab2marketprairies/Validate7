'use client';

import { Header } from '@/components/layout/Header';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ProgramSession } from '@/components/shared/ProgramSession';
import scheduleData from '@/content/schedule.json';
import { Target, Sparkles, Award } from 'lucide-react';

export default function CoreProgramPage() {
    const coreSessions = scheduleData[1]?.sessions || [];

    return (
        <div className="min-h-screen bg-polar">
            <Header />

            <main className="container mx-auto px-4 py-8">
                <Breadcrumbs />
                <div className="mb-12">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl font-extrabold text-onyx mb-4 tracking-tight flex items-center gap-3">
                            <Target className="text-primary" size={36} />
                            Core Program
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Eight weeks of deep-dive validation, market sizing, and advisor engagement.
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    {coreSessions.map((session: any, idx: number) => (
                        <ProgramSession key={idx} session={session} />
                    ))}
                </div>
            </main>

            <footer className="bg-onyx text-white py-12 mt-24">
                <div className="container mx-auto px-4 text-center">
                    <div className="w-16 h-1 bg-primary/20 mx-auto mb-8 rounded-full" />
                    <p className="opacity-40 text-sm tracking-wide">© 2026 LAB2MARKET PRAIRIES • ALL RIGHTS RESERVED</p>
                </div>
            </footer>
        </div>
    );
}
