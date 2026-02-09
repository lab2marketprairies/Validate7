'use client';

import { Header } from '@/components/layout/Header';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ProgramSession } from '@/components/shared/ProgramSession';
import scheduleData from '@/content/schedule.json';
import { Rocket, Sparkles, Target } from 'lucide-react';

export default function BootcampPage() {
    const bootcampSessions = scheduleData[0]?.sessions || [];

    return (
        <div className="min-h-screen bg-polar">
            <Header />

            <main className="container mx-auto px-4 py-8">
                <Breadcrumbs />
                <div className="mb-12">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl font-extrabold text-onyx mb-4 tracking-tight flex items-center gap-3">
                            <Rocket className="text-primary" size={36} />
                            Bootcamp Schedule
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            A high-intensity week focusing on foundational entrepreneurship and customer discovery.
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    {bootcampSessions.map((session: any, idx: number) => (
                        <ProgramSession key={idx} session={session} />
                    ))}
                </div>
            </main>

            <footer className="bg-onyx text-white py-8 mt-12">
                <div className="container mx-auto px-4 text-center">
                    <p className="opacity-80">© 2026 Lab2Market Prairies. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
