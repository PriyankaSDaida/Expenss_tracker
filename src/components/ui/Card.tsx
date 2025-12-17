import * as React from 'react';
import { cn } from '../../lib/utils';
import { forwardRef } from 'react';

const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "glass-card p-6",
                className
            )}
            {...props}
        />
    )
);
Card.displayName = "Card";

export { Card };
