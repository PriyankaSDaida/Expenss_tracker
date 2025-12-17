import { motion } from 'framer-motion';

// Import local artifacts
// Note: In a real build pipeline these would need to be moved to /public or imported as assets.
// Since we are checking locally, we will use the absolute file paths for now to function,
// but for a production app these should be moved.
// However, the browser subagent can read local files if the server allows or if we map them.
// A safe way for a React/Vite app is to move them to public. 
// But as an agent I can just reference them if the user's dev server is not strict, 
// OR simpler: Use the filesystem paths if the browser can access them (unlikely for web security).
// BETTER: I will assume I need to move them to the public folder first? 
// Actually, `vite` serves /public. Let's try to reference them directly first? 
// No, browsers block local file access. 
// I SHOULD COPY THEM to a public dir. Or for this environment, I can reference them if I copy them to src/assets.

// Plan: I'll use placeholders here and assume I move them in the next step, OR simpler:
// I will base64 encode them? No, too large.
// I will just use the file paths and if they break I'll fix. 
// WAIT: The generated images are in artifacts. I should COPY them to `public/assets`.

export const SchoolDecorations = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden text-transparent">
            {/* School Bag - Bottom Left */}
            <motion.img
                src="/assets/school_bag_sketch.png"
                alt="School Bag"
                className="absolute bottom-5 left-5 w-32 md:w-48 opacity-80 mix-blend-multiply filter contrast-125 hover:scale-110 transition-transform duration-300"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 0.8 }}
                transition={{ delay: 1, duration: 0.8 }}
                whileHover={{ rotate: -5 }}
            />

            {/* Books Stack - Bottom Right */}
            <motion.img
                src="/assets/books_stack_sketch.png"
                alt="Stack of Books"
                className="absolute bottom-5 right-5 w-28 md:w-40 opacity-80 mix-blend-multiply filter contrast-125 hover:scale-110 transition-transform duration-300"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 0.8 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                whileHover={{ rotate: 5 }}
            />

            {/* Stationery Pot - Top Right (Floating) */}
            <motion.img
                src="/assets/stationery_pot_sketch.png"
                alt="Stationery Pot"
                className="hidden lg:block absolute top-20 right-10 w-24 opacity-60 mix-blend-multiply rotate-12"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6 }}
                transition={{ delay: 1.5, type: 'spring' }}
                whileHover={{ rotate: 0 }}
            />

            {/* Apple - Top Left */}
            <motion.img
                src="/assets/apple_sketch.png"
                alt="Apple"
                className="hidden lg:block absolute top-24 left-10 w-20 opacity-70 mix-blend-multiply"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 0.7 }}
                transition={{ delay: 1.8, duration: 0.8 }}
                whileHover={{ rotate: 10, scale: 1.1 }}
            />

            {/* Paper Airplane - Flying Animation */}
            <motion.img
                src="/assets/paper_airplane_sketch.png"
                alt="Paper Airplane"
                className="absolute w-24 opacity-60 mix-blend-multiply top-40 left-0"
                initial={{ x: -100, y: 300, rotate: -20, opacity: 0 }}
                animate={{
                    x: ['0vw', '110vw'],
                    y: [300, 100],
                    rotate: [-20, 10],
                    opacity: [0, 0.6, 0.6, 0]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 5
                }}
            />

            {/* Coffee Cup - Bottom Center */}
            <motion.img
                src="/assets/coffee_cup_sketch.png"
                alt="Coffee Cup"
                className="hidden md:block absolute bottom-10 left-1/3 w-20 opacity-60 mix-blend-multiply"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.6, scale: 1 }}
                transition={{ delay: 2.2, duration: 1 }}
                whileHover={{ y: -5 }}
            />
        </div>
    );
};
