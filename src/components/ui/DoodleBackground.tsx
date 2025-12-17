import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Random utility to avoid hydration mismatches
const useRandomProps = (count: number) => {
    const [props, setProps] = useState<{ id: number; type: string; left: string; top: string; duration: number; delay: number; scale: number; rotation: number }[]>([]);

    useEffect(() => {
        const types = ['star', 'circle', 'triangle', 'squiggle', 'math-plus', 'math-x'];
        const newProps = Array.from({ length: count }).map((_, i) => ({
            id: i,
            type: types[Math.floor(Math.random() * types.length)],
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            duration: 10 + Math.random() * 20, // Slow float 10-30s
            delay: Math.random() * 5,
            scale: 0.5 + Math.random() * 0.5,
            rotation: Math.random() * 360,
        }));
        setProps(newProps);
    }, [count]);

    return props;
};

const DoodlePath = ({ type }: { type: string }) => {
    const strokeProps = {
        strokeWidth: "2",
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
        fill: "none",
    };

    switch (type) {
        case 'star':
            return <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" {...strokeProps} />;
        case 'circle':
            return <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" strokeDasharray="4 4" {...strokeProps} />;
        case 'triangle':
            return <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" {...strokeProps} />;
        case 'squiggle':
            return <path d="M4 12c2.5-4 4-4 8 0s6 4 9 0" {...strokeProps} />;
        case 'math-plus':
            return <path d="M12 5v14M5 12h14" {...strokeProps} />;
        case 'math-x':
            return <path d="M18 6L6 18M6 6l12 12" {...strokeProps} />;
        default:
            return null;
    }
};

export const DoodleBackground = () => {
    const doodles = useRandomProps(20); // 20 random doodles

    // If client hasn't loaded (and generated random props), verify hydration
    if (doodles.length === 0) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {doodles.map((doodle) => (
                <motion.svg
                    key={doodle.id}
                    className="absolute opacity-20 text-gray-400"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    style={{
                        left: doodle.left,
                        top: doodle.top,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        rotate: [doodle.rotation, doodle.rotation + 10, doodle.rotation - 10, doodle.rotation],
                        scale: [doodle.scale, doodle.scale * 1.1, doodle.scale],
                    }}
                    transition={{
                        duration: doodle.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: doodle.delay,
                    }}
                >
                    <DoodlePath type={doodle.type} />
                </motion.svg>
            ))}
        </div>
    );
};
