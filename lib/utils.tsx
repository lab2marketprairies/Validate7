import React from 'react';

/**
 * Renders text with markdown-style links [text](url) as clickable <a> tags.
 */
export const renderTextWithLinks = (text: string) => {
    if (!text) return '';
    const parts = text.split(/(\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
        const match = part.match(/\[(.*?)\]\((.*?)\)/);
        if (match) {
            return (
                <a
                    key={i}
                    href={match[2]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                >
                    {match[1]}
                </a>
            );
        }
        return part;
    });
};

/**
 * Format a date string or range for display.
 */
export const formatDate = (dateStr: string) => {
    return dateStr; // Placeholder for more complex date formatting if needed later
};

/**
 * Simple debounce function for search inputs.
 */
export const debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};
