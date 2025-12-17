import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { forwardRef } from 'react';

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
    {
        variants: {
            variant: {
                default: "bg-primary text-white border-2 border-slate-700 sketch-btn shadow-[3px_3px_0px_#374151] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#374151] active:translate-y-[3px] active:shadow-none",
                destructive: "bg-red-500 text-white border-2 border-slate-700 sketch-btn shadow-[3px_3px_0px_#374151] hover:bg-red-600",
                outline: "bg-transparent border-2 border-slate-700 text-slate-700 sketch-btn shadow-[3px_3px_0px_#374151]",
                ghost: "hover:bg-slate-100 text-slate-700",
                link: "underline-offset-4 hover:underline text-primary",
                glass: "bg-white/50 text-slate-800 border-2 border-slate-700 sketch-btn",
            },
            size: {
                default: "h-11 py-2 px-6",
                sm: "h-9 px-4 rounded-md",
                lg: "h-12 px-8 rounded-md",
                icon: "h-11 w-11",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
