import { Header } from '@/components/layout/Header';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Trophy, Rocket, Info } from 'lucide-react';
import Papa from 'papaparse';
import { LeaderboardChart } from '@/components/shared/LeaderboardChart';
import { Card } from '@/components/ui/Card';

export const revalidate = 60; // Revalidate every 60 seconds

async function fetchLeaderboardData() {
    try {
        const response = await fetch('https://docs.google.com/spreadsheets/d/18Lhnp9nK2Sm81RB9WS8_3WAikTOVNxYK9yZ_C5bYXII/export?format=csv', {
            next: { revalidate: 60 } // Cache for 1 minute
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch spreadsheet: ${response.statusText}`);
        }

        const csvText = await response.text();

        // Parse CSV
        const result = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
        });

        // Transform and clean data
        const data = result.data.map((row: any) => ({
            name: row['Participant'] || 'Unknown',
            interviews: parseInt(row['Interviews Scheduled'], 10) || 0,
            completed: parseInt(row['Interviews Completed'], 10) || 0,
        }));

        // Filter out any invalid names
        const validData = data.filter(p => p.name && p.name !== 'Unknown' && p.name !== 'Participant');

        return validData;
    } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        return [];
    }
}

export default async function LeaderboardPage() {
    const data = await fetchLeaderboardData();

    const scheduledData = [...data].sort((a, b) => b.interviews - a.interviews);
    const completedData = [...data].sort((a, b) => b.completed - a.completed);

    return (
        <div className="min-h-screen bg-polar">
            <Header />

            <main className="container mx-auto px-4 py-8">
                <Breadcrumbs />

                <div className="mb-12">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl font-extrabold text-onyx mb-4 tracking-tight flex items-center gap-3">
                            <Trophy className="text-secondary" size={36} />
                            Discovery Leaderboard
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed mb-6">
                            Tracking cohort progress through customer discovery! The taller the tower, the more interviews scheduled and completed. Let's see who can reach the stars! 🚀
                        </p>

                        <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 flex items-start gap-3">
                            <Info className="text-primary mt-1 flex-shrink-0" size={20} />
                            <p className="text-sm text-sky-900 leading-relaxed">
                                <strong>How it works:</strong> Each participant's progress in scheduled and completed interviews is represented by a tower. The height of your tower grows as you perform customer discovery. Data syncs directly from the program tracking sheet.
                            </p>
                        </div>
                    </div>
                </div>

                {data.length > 0 ? (
                    <div className="space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-onyx mb-6 flex items-center gap-2">
                                <span className="w-2 h-8 rounded-full bg-sky-500"></span>
                                Interviews Scheduled
                            </h2>
                            <Card className="p-2 sm:p-6 md:p-8 bg-white border-gray-100/50 shadow-xl overflow-hidden">
                                <LeaderboardChart data={scheduledData} type="scheduled" />
                            </Card>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-onyx mb-6 flex items-center gap-2">
                                <span className="w-2 h-8 rounded-full bg-emerald-500"></span>
                                Interviews Completed
                            </h2>
                            <Card className="p-2 sm:p-6 md:p-8 bg-white border-gray-100/50 shadow-xl overflow-hidden">
                                <LeaderboardChart data={completedData} type="completed" />
                            </Card>
                        </section>
                    </div>
                ) : (
                    <Card className="p-2 sm:p-6 md:p-8 bg-white border-gray-100/50 shadow-xl overflow-hidden">
                        <div className="flex flex-col items-center justify-center p-12 text-center">
                            <Rocket className="text-gray-300 mb-4" size={48} />
                            <h3 className="text-lg font-bold text-gray-700 mb-2">No data available</h3>
                            <p className="text-gray-500">Could not load the leaderboard data at this time.</p>
                        </div>
                    </Card>
                )}
            </main>

            <footer className="bg-onyx text-white py-8 mt-12">
                <div className="container mx-auto px-4 text-center">
                    <p className="opacity-80">© 2026 Lab2Market Prairies. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
