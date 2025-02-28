// Components/ui/badge.jsx
import React from 'react';
import { cn } from '@/lib/utils';

const Badge = ({ className, variant = "default", ...props }) => {
    const variants = {
        default: "bg-blue-100 text-blue-800 border-blue-200",
        secondary: "bg-gray-100 text-gray-800 border-gray-200",
        destructive: "bg-red-100 text-red-800 border-red-200",
        outline: "bg-white text-gray-800 border-gray-300",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
                variants[variant] || variants.default,
                className
            )}
            {...props}
        />
    );
};

export { Badge };