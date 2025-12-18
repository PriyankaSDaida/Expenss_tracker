import { AnimatePresence, motion } from 'framer-motion';
import { Plus, X, Sun, Moon, RotateCcw, Download } from 'lucide-react';
import { useExpense } from '../../context/ExpenseContext';
import { useTheme } from '../../context/ThemeContext';
import { generateMonthlyReport } from '../../utils/pdfGenerator';
import { SummaryCards } from './SummaryCards';
import { OverviewChart } from './OverviewChart';
import { CategoryChart } from './CategoryChart';
import { RecentTransactions } from '../transactions/RecentTransactions';
import { TransactionForm } from '../transactions/TransactionForm';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export const Dashboard = () => {
    const { isAddModalOpen, setIsAddModalOpen, setInitialTransactionType, resetAllData, transactions } = useExpense();
    const { theme, toggleTheme } = useTheme();

    const handleGlobalReset = () => {
        if (window.confirm('Are you sure you want to reset all data? This cannot be undone.')) {
            resetAllData();
        }
    };

    const handleOpenAddTransactionModal = () => {
        setInitialTransactionType('expense');
        setIsAddModalOpen(true);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
                <div className="text-center md:text-left">
                    <h1 className="text-5xl font-bold text-neon-pink font-[Patrick_Hand] drop-shadow-sm tracking-wide">
                        Dashboard
                    </h1>
                    <p className="text-gray-500 text-lg font-bold dark:text-gray-300">Track your financial health</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={toggleTheme} size="icon" className="rounded-full border-neon-purple text-neon-purple hover:bg-neon-purple/10 dark:text-neon-purple dark:border-neon-purple bg-transparent">
                        {theme === 'light' ? <Moon size={20} style={{ minWidth: 20, minHeight: 20 }} /> : <Sun size={20} style={{ minWidth: 20, minHeight: 20 }} />}
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => generateMonthlyReport(transactions)}
                        size="icon"
                        className="rounded-full border-neon-lime text-neon-lime hover:bg-neon-lime/10 dark:text-neon-lime dark:border-neon-lime bg-transparent"
                        title="Download Monthly Report"
                    >
                        <Download size={20} style={{ minWidth: 20, minHeight: 20 }} />
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleGlobalReset}
                        size="icon"
                        className="rounded-full border-neon-orange text-neon-orange hover:bg-neon-orange/10 dark:text-neon-orange dark:border-neon-orange bg-transparent"
                        title="Reset Dashboard"
                    >
                        <RotateCcw size={20} style={{ minWidth: 20, minHeight: 20 }} />
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleOpenAddTransactionModal}
                        className="gap-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 bg-transparent"
                    >
                        <Plus size={18} style={{ minWidth: 18, minHeight: 18 }} /> Add Transaction
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
                        <p className="text-gray-700 text-xl leading-relaxed font-[Patrick_Hand] dark:text-gray-200">
                            Review your "Food" expenses. They are <span className="text-teacher-red font-bold">15% higher</span> than last month.
                            <span className="block mt-2 text-sm text-gray-500 font-sans italic dark:text-gray-400">- Prof. Penny</span>
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
