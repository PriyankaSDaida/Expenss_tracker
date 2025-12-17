import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { SummaryCards } from './SummaryCards';
import { OverviewChart } from './OverviewChart';
import { CategoryChart } from './CategoryChart';
import { RecentTransactions } from '../transactions/RecentTransactions';
import { TransactionForm } from '../transactions/TransactionForm';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export const Dashboard = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    return (
        <div className="space-y-6 max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                        Dashboard
                    </h1>
                    <p className="text-slate-400">Track your financial health</p>
                </div>
                <Button onClick={() => setIsAddModalOpen(true)} className="gap-2 shadow-lg shadow-primary/25">
                    <Plus size={18} /> Add Transaction
                </Button>
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
                    <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl p-6 border border-white/5 h-full">
                        <h3 className="text-lg font-semibold mb-2 text-white">Pro Tip</h3>
                        <p className="text-slate-400 text-sm">
                            Review your "Food" expenses. They are 15% higher than last month.
                        </p>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="w-full max-w-md relative"
                        >
                            <Card className="bg-slate-900 border-slate-700 shadow-2xl">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold text-white">Add Transaction</h2>
                                    <Button variant="ghost" size="icon" onClick={() => setIsAddModalOpen(false)}>
                                        <X size={20} />
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
