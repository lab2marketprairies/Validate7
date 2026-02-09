'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import generalMaterials from '@/content/support-materials.json';
import bootcampResources from '@/content/bootcamp-resources.json';
import { FileText, ExternalLink, Filter, Search, BookOpen, Layers, Video, Download } from 'lucide-react';

export default function SupportMaterialsPage() {
    const [activeTab, setActiveTab] = useState<'general' | 'bootcamp'>('general');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');

    const categories = useMemo(() => {
        const cats = new Set(generalMaterials.map(m => m.category));
        return ['All Categories', ...Array.from(cats)];
    }, []);

    const filteredGeneral = useMemo(() => {
        return generalMaterials.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.category.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const filteredBootcamp = useMemo(() => {
        if (!searchQuery) return bootcampResources;
        return bootcampResources.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.day.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    return (
        <div className="min-h-screen bg-polar">
            <Header />

            <main className="container mx-auto px-4 py-8">
                <Breadcrumbs />

                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-extrabold text-onyx mb-4 tracking-tight">Support Materials</h1>
                        <p className="text-xl text-gray-600 max-w-2xl">
                            Templates, guides, and recorded sessions to support your commercialization journey.
                        </p>
                    </div>

                    <div className="relative w-full md:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder={`Search ${activeTab === 'general' ? 'resources' : 'documents'}...`}
                            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-2 mb-8 bg-gray-100/50 p-1.5 rounded-2xl w-fit">
                    <button
                        onClick={() => { setActiveTab('general'); setSearchQuery(''); }}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'general'
                            ? 'bg-white text-onyx shadow-md'
                            : 'text-gray-500 hover:text-onyx'
                            }`}
                    >
                        <Layers size={16} />
                        General Resources
                    </button>
                    <button
                        onClick={() => { setActiveTab('bootcamp'); setSearchQuery(''); }}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'bootcamp'
                            ? 'bg-white text-onyx shadow-md'
                            : 'text-gray-500 hover:text-onyx'
                            }`}
                    >
                        <BookOpen size={16} />
                        Bootcamp Documents
                    </button>
                </div>

                {activeTab === 'general' ? (
                    <div className="space-y-8">
                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${selectedCategory === cat
                                        ? 'bg-onyx text-white border-onyx shadow-lg shadow-onyx/20'
                                        : 'bg-white text-gray-500 border-gray-100 hover:border-gray-300'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {filteredGeneral.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredGeneral.map((item, idx) => (
                                    <Card key={`${item.title}-${idx}`} className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full border-gray-100 bg-white/80 backdrop-blur-sm group">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                                <FileText size={20} />
                                            </div>
                                            <span className="text-[10px] font-bold bg-polar text-gray-500 px-3 py-1.5 rounded-full border border-gray-100 uppercase tracking-wider">
                                                {item.type}
                                            </span>
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="font-extrabold text-lg text-onyx mb-2 leading-tight group-hover:text-primary transition-colors">{item.title}</h3>
                                            <div className="text-xs font-medium text-gray-400 mb-6 flex items-center gap-2">
                                                <span className="bg-gray-50 px-2 py-0.5 rounded">{item.category}</span>
                                                <span>•</span>
                                                <span>{item.date}</span>
                                            </div>
                                        </div>

                                        <div className="mt-auto">
                                            <Button
                                                variant="outline"
                                                fullWidth
                                                size="sm"
                                                className="border-gray-200 text-xs font-bold hover:bg-primary hover:text-white hover:border-primary gap-2"
                                                onClick={() => window.open(item.link, '_blank')}
                                            >
                                                <Download size={14} />
                                                Download Resource
                                            </Button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                                <Search size={40} className="mx-auto text-gray-200 mb-4" />
                                <h3 className="text-xl font-bold text-gray-400">No resources found</h3>
                                <p className="text-gray-400 text-sm mt-2">Try adjusting your search or category filter.</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Bootcamp Resources Table */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="hidden md:grid grid-cols-12 gap-4 p-5 bg-gray-50/50 border-b border-gray-100 font-bold text-[10px] uppercase tracking-widest text-gray-400">
                                <div className="col-span-1">Day</div>
                                <div className="col-span-2">Category</div>
                                <div className="col-span-5">Title / Activity</div>
                                <div className="col-span-2">Format</div>
                                <div className="col-span-2 text-right">Action</div>
                            </div>

                            {filteredBootcamp.length > 0 ? (
                                <div className="divide-y divide-gray-50">
                                    {filteredBootcamp.map((item, index) => (
                                        <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 items-center hover:bg-primary/5 transition-all duration-300 group">
                                            <div className="col-span-1 font-bold text-onyx text-sm md:block flex justify-between">
                                                <span className="md:hidden text-gray-400 font-bold uppercase tracking-wider text-[10px]">Day</span>
                                                {item.day}
                                            </div>
                                            <div className="col-span-2 md:block flex justify-between items-center">
                                                <span className="md:hidden text-gray-400 font-bold uppercase tracking-wider text-[10px]">Category</span>
                                                <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full border ${item.category === 'Bonus' ? 'bg-sky-blue/10 text-sky-blue border-sky-blue/20' :
                                                    item.category === 'Watch Again' ? 'bg-primary/10 text-primary border-primary/20' :
                                                        'bg-gray-100 text-gray-500 border-gray-200'
                                                    }`}>
                                                    {item.category}
                                                </span>
                                            </div>
                                            <div className="col-span-5">
                                                <p className="font-bold text-onyx text-base group-hover:text-primary transition-colors">{item.title}</p>
                                                <p className="text-xs text-gray-400 font-medium italic mt-1">{item.activity}</p>
                                            </div>
                                            <div className="col-span-2 text-xs font-bold text-gray-500 md:block flex justify-between italic">
                                                <span className="md:hidden text-gray-400 font-bold uppercase tracking-wider text-[10px] not-italic">Format</span>
                                                {item.type}
                                            </div>
                                            <div className="col-span-2 text-right">
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    className="w-full md:w-auto text-xs font-bold gap-2 py-2"
                                                    onClick={() => window.open(item.link, '_blank')}
                                                >
                                                    <ExternalLink size={12} />
                                                    View
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20">
                                    <Search size={40} className="mx-auto text-gray-200 mb-4" />
                                    <p className="text-gray-400 font-bold italic">No sessions found matching your search</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

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
