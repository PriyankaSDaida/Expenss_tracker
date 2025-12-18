import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { useExpense } from '../../context/ExpenseContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { format } from 'date-fns';

export const RecentTransactions = () => {
    const { transactions, deleteTransaction } = useExpense();

    return (
        <Card className="h-full paper-card flex flex-col border-neon-purple border-2">
            <h3 className="text-xl font-bold mb-4 text-neon-purple font-[Patrick_Hand]">Recent Transactions</h3>
            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                <AnimatePresence>
                    {transactions.map((t) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, x: -20, rotate: -1 }}
                            animate={{ opacity: 1, x: 0, rotate: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="group flex items-center justify-between p-3 rounded-none border-b-2 border-dotted border-gray-300 hover:bg-neon-purple/5 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-full border-2 ${t.type === 'income' ? 'border-neon-cyan text-neon-cyan' : 'border-neon-orange text-neon-orange'}`}>
                                    {t.type === 'income' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                                </div>
                                <div>
                                    <p className="font-bold text-graphite font-[Patrick_Hand] text-lg">{t.description}</p>
                                    <p className="text-sm text-gray-500 font-[Patrick_Hand] dark:text-gray-400">{format(new Date(t.date), 'MMM d, yyyy')} • {t.category}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`font-bold font-[Patrick_Hand] text-lg ${t.type === 'income' ? 'text-neon-cyan' : 'text-neon-orange'}`}>
                                    {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-teacher-red dark:text-gray-500 dark:hover:text-teacher-red"
                                    onClick={() => deleteTransaction(t.id)}
                                >
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                    {transactions.length === 0 && (
                        <div className="text-center text-gray-400 py-8 font-[Patrick_Hand] text-xl">
                            No transactions yet... start spending!
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </Card>
    );
};
