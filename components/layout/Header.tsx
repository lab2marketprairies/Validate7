'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { LayoutDashboard, Users, Rocket, Target, BookOpen, Layers } from 'lucide-react';

export const Header = () => {
    const pathname = usePathname();

    const navLinks = [
        { href: '/', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/about', label: 'Program Info', icon: BookOpen },
        { href: '/bootcamp', label: 'Bootcamp', icon: Rocket },
        { href: '/core-program', label: 'Core Program', icon: Target },
        { href: '/team', label: 'Team', icon: Users },
        { href: '/team-folders', label: 'Folders', icon: Layers },
    ];

    const isActive = (path: string) => {
        if (path === '/' && pathname !== '/') return false;
        return pathname?.startsWith(path);
    };

    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform shadow-sm">
                            L2M
                        </div>
                        <div className="hidden sm:block">
                            <span className="block text-onyx font-bold leading-none">Prairies</span>
                            <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Validate</span>
                        </div>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all group ${isActive(link.href)
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-onyx'
                                    }`}
                            >
                                <link.icon size={16} className={isActive(link.href) ? 'text-primary' : 'text-gray-400 group-hover:text-primary transition-colors'} />
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="text-sm font-bold text-primary px-4 py-2 hover:bg-primary/5 rounded-lg transition-colors border border-primary/20">
                                    Sign In
                                </button>
                            </SignInButton>
                        </SignedOut>

                        {/* Mobile Menu Toggle - Simplified for now */}
                        <div className="lg:hidden flex items-center p-2 rounded-lg bg-gray-50 text-gray-500">
                            <span className="text-xs font-bold uppercase">Menu</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
