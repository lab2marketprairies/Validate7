'use client';

import { Header } from '@/components/layout/Header';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import platforms from '@/content/tech-stack.json';
import { ExternalLink, Download, HelpCircle, Mail, Puzzle, Layout } from 'lucide-react';

export default function TechStackPage() {
    return (
        <div className="min-h-screen bg-polar">
            <Header />

            <main className="container mx-auto px-4 py-8">
                <Breadcrumbs />
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-onyx mb-4">Tech Stack</h1>
                    <p className="text-xl text-gray-600">Our Software Platforms for Cohort 7</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {platforms.map((platform) => (
                        <Card key={platform.name} className="flex flex-col h-full hover:shadow-lg transition-shadow">
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-primary mb-2">{platform.name}</h3>
                                <p className="text-gray-600 mb-6 min-h-[3rem]">{platform.description}</p>

                                <div className="space-y-3">
                                    {platform.links.program && (
                                        <Button
                                            variant="primary"
                                            fullWidth
                                            onClick={() => window.open(platform.links.program, '_blank')}
                                        >
                                            View Program Page
                                        </Button>
                                    )}
                                    {platform.links.signup && (
                                        <Button
                                            variant="primary"
                                            fullWidth
                                            onClick={() => window.open(platform.links.signup, '_blank')}
                                        >
                                            Sign Up
                                        </Button>
                                    )}
                                    {platform.links.download && (
                                        <Button
                                            variant="secondary"
                                            fullWidth
                                            onClick={() => window.open(platform.links.download, '_blank')}
                                        >
                                            Download App
                                        </Button>
                                    )}
                                    {platform.links.help && (
                                        <Button
                                            variant="text"
                                            fullWidth
                                            onClick={() => window.open(platform.links.help, '_blank')}
                                        >
                                            Help Center
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {platform.email && (
                                <div className="mt-6 pt-4 border-t border-gray-100 text-sm text-center text-gray-500">
                                    Support: <a href={`mailto:${platform.email}`} className="text-primary hover:underline">{platform.email}</a>
                                </div>
                            )}
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
