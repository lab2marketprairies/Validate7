import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'text';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    children: React.ReactNode;
}

export const Button = ({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    children,
    ...props
}: ButtonProps) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

    const variants = {
        primary: 'bg-primary text-white hover:bg-[#b09f75] focus:ring-primary',
        secondary: 'bg-secondary text-onyx hover:bg-[#e6d84b] focus:ring-secondary',
        outline: 'border-2 border-primary text-primary hover:bg-primary/10 focus:ring-primary',
        text: 'text-primary hover:bg-primary/10 hover:text-[#b09f75] underline-offset-4 hover:underline focus:ring-primary',
    };

    const sizes = {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
    };

    const widthClass = fullWidth ? 'w-full' : '';

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
