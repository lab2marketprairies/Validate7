'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = () => {
    const pathname = usePathname();
    if (pathname === '/') return null;

    const pathSegments = pathname?.split('/').filter(segment => segment !== '') || [];

    const breadcrumbs = pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

        return {
            label,
            href,
            active: index === pathSegments.length - 1
        };
    });

    return (
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
            <Link
                href="/"
                className="hover:text-primary transition-colors flex items-center gap-1.5"
            >
                <Home size={14} />
                <span className="font-medium">Home</span>
            </Link>

            {breadcrumbs.map((crumb, idx) => (
                <div key={idx} className="flex items-center gap-2">
                    <ChevronRight size={14} className="text-gray-300" />
                    {crumb.active ? (
                        <span className="font-bold text-onyx">{crumb.label}</span>
                    ) : (
                        <Link
                            href={crumb.href}
                            className="hover:text-primary transition-colors font-medium "
                        >
                            {crumb.label}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    );
};
