import * as React from 'react';
import { cn } from '../../lib/utils';
import { forwardRef } from 'react';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "sketch-input w-full text-gray-800 dark:text-gray-100 placeholder:text-gray-400",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };
