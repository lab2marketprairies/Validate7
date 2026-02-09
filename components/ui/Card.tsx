import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'accent';
    onClick?: () => void;
}

export const Card = ({
    children,
    className = '',
    variant = 'default',
    onClick
}: CardProps) => {
    const baseStyles = 'bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden';
    const accentStyles = variant === 'accent' ? 'border-l-4 border-l-primary' : '';
    const interactiveStyles = onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : '';

    return (
        <div
            className={`${baseStyles} ${accentStyles} ${interactiveStyles} ${className}`}
            onClick={onClick}
        >
            <div className="p-6">
                {children}
            </div>
        </div>
    );
};
