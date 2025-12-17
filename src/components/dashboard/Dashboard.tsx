import { AnimatePresence, motion } from 'framer-motion';
import { Plus, X, Sun, Moon } from 'lucide-react';
import { useExpense } from '../../context/ExpenseContext';
import { useTheme } from '../../context/ThemeContext';
import { SummaryCards } from './SummaryCards';
import { OverviewChart } from './OverviewChart';
import { CategoryChart } from './CategoryChart';
import { RecentTransactions } from '../transactions/RecentTransactions';
import { TransactionForm } from '../transactions/TransactionForm';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export const Dashboard = () => {
    const { isAddModalOpen, setIsAddModalOpen } = useExpense();
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="space-y-6 max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-5xl font-bold text-neon-pink font-[Patrick_Hand] drop-shadow-sm tracking-wide">
                        Dashboard
                    </h1>
                    <p className="text-gray-500 text-lg font-bold dark:text-gray-400">Track your financial health</p>
                </div>
                <div className="flex gap-3">
                    <Button onClick={toggleTheme} size="icon" className="rounded-full border-neon-purple text-neon-purple hover:bg-neon-purple/10">
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </Button>
                    <Button onClick={() => setIsAddModalOpen(true)} className="gap-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10">
                        <Plus size={18} /> Add Transaction
                    </Button>
                </div>
            </div>

            <SummaryCards />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <OverviewChart />
                <CategoryChart />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    {/* Transaction History Widget */}
                    <RecentTransactions />
                </div>
                <div className="lg:col-span-1">
                    <div className="paper-card h-full transform rotate-1 border-neon-orange border-2">
                        <h3 className="text-2xl font-bold mb-2 text-neon-orange flex items-center gap-2">
                            Pro Tip!
                        </h3>
                        <p className="text-gray-700 text-xl leading-relaxed font-[Patrick_Hand] dark:text-gray-300">
                            Review your "Food" expenses. They are <span className="text-teacher-red font-bold">15% higher</span> than last month.
                            <span className="block mt-2 text-sm text-gray-500 font-sans italic">- Prof. Penny</span>
                        </p>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
                            className="w-full max-w-md relative"
                        >
                            <Card className="bg-white border-2 border-graphite shadow-2xl dark:bg-paper dark:border-white">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-graphite border-b-2 border-dashed border-gray-300 w-full pb-2">Add Transaction</h2>
                                    <Button variant="ghost" size="icon" onClick={() => setIsAddModalOpen(false)} className="absolute right-4 top-4">
                                        <X size={24} />
                                    </Button>
                                </div>
                                <TransactionForm onClose={() => setIsAddModalOpen(false)} />
                            </Card>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
