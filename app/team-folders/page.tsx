'use client';

import { Header } from '@/components/layout/Header';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import teams from '@/content/team-folders.json';
import { FolderOpen, Lock, ExternalLink, Search } from 'lucide-react';

export default function TeamFoldersPage() {
    return (
        <div className="min-h-screen bg-polar">
            <Header />

            <main className="container mx-auto px-4 py-8">
                <Breadcrumbs />
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold text-onyx mb-4 tracking-tight">Team Folders</h1>
                    <p className="text-xl text-gray-600">Access your private team workspace for cohort collaboration.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {teams.map((team) => (
                        <Card key={team.id} className="hover:shadow-md transition-shadow group flex flex-col">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-polar rounded-full flex items-center justify-center text-sm font-bold text-gray-400 group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0">
                                    {team.id}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-onyx line-clamp-1">{team.name}</h3>
                                    <p className="text-xs text-gray-500">Private Folder</p>
                                </div>
                            </div>
                            <div className="mt-auto">
                                <Button
                                    variant="outline"
                                    fullWidth
                                    size="sm"
                                    onClick={() => window.open(team.link, '_blank')}
                                >
                                    Open Folder
                                </Button>
                            </div>
                        </Card>
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
