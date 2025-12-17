import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { useExpense } from '../../context/ExpenseContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { format } from 'date-fns';

export const RecentTransactions = () => {
    const { transactions, deleteTransaction } = useExpense();

    return (
        <Card className="h-full max-h-[500px] overflow-hidden flex flex-col">
            <h3 className="text-lg font-semibold mb-4 text-slate-200">Recent Transactions</h3>
            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                <AnimatePresence>
                    {transactions.map((t) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="group flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-full ${t.type === 'income' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {t.type === 'income' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                                </div>
                                <div>
                                    <p className="font-medium text-slate-200">{t.description}</p>
                                    <p className="text-xs text-slate-400">{format(new Date(t.date), 'MMM d, yyyy')} • {t.category}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`font-mono font-medium ${t.type === 'income' ? 'text-emerald-400' : 'text-slate-200'}`}>
                                    {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-400"
                                    onClick={() => deleteTransaction(t.id)}
                                >
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                    {transactions.length === 0 && (
                        <div className="text-center text-slate-500 py-8">
                            No transactions yet
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </Card>
    );
};
