'use client';

import { Header } from '@/components/layout/Header';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import content from '@/content/about.json';
import { BarChart3, Rocket, Target, Users, Mail, Info, Download, Sparkles } from 'lucide-react';

export default function AboutPage() {
    const statIcons = [BarChart3, Users, Target, Rocket];
    return (
        <div className="min-h-screen bg-polar">
            <Header />

            <main className="container mx-auto px-4 py-8">
                <Breadcrumbs />
                <div className="max-w-4xl mx-auto">
                    {/* Hero Content */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-onyx mb-4">{content.programOverview.title}</h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            {content.programOverview.description}
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        {content.programOverview.stats.map((stat) => (
                            <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm text-center">
                                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                                <div className="text-sm text-gray-500 uppercase tracking-wide">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Welcome Message */}
                    <Card className="mb-12 bg-white border-l-4 border-l-secondary">
                        <h3 className="text-xl font-bold mb-4">👋 Welcome to Cohort 7</h3>
                        <p className="text-gray-700 italic text-lg opacity-90">
                            "{content.programOverview.welcomeMessage}"
                        </p>
                    </Card>

                    {/* Welcome Package */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-onyx mb-6">Welcome Package</h2>
                        <div className="grid gap-4">
                            {content.welcomePackage.map((item) => (
                                <Card key={item.title} className="flex items-center justify-between p-6">
                                    <div className="flex items-center gap-4">
                                        <span className="text-3xl">📥</span>
                                        <div>
                                            <h4 className="font-bold text-lg">{item.title}</h4>
                                            <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                {item.type}
                                            </span>
                                        </div>
                                    </div>
                                    <Button onClick={() => window.open(item.link, '_blank')}>
                                        Download
                                    </Button>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="text-center bg-onyx text-white p-8 rounded-xl">
                        <h2 className="text-2xl font-bold mb-4">Questions?</h2>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center text-2xl mb-2">
                                👤
                            </div>
                            <p className="text-lg font-bold">{content.contact.name}</p>
                            <p className="text-primary mb-4">{content.contact.role}</p>
                            <Button variant="secondary" onClick={() => window.location.href = `mailto:${content.contact.email}`}>
                                Email Program Manager
                            </Button>
                        </div>
                    </div>
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
