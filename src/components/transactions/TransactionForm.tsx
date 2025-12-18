import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useExpense } from '../../context/ExpenseContext';
import { type Category, type TransactionType } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { cn } from '../../lib/utils';

const categories: Category[] = [
    'Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Health', 'Salary', 'Freelance', 'Other'
];

interface TransactionFormProps {
    onClose?: () => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onClose }) => {
    const { addTransaction, initialTransactionType } = useExpense();
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState<Category>('Food');
    const [type, setType] = useState<TransactionType>(initialTransactionType);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || !description) return;

        addTransaction({
            amount: parseFloat(amount),
            description,
            category,
            type,
            date,
        });

        setAmount('');
        setDescription('');
        if (onClose) onClose();
    };

    const handleReset = () => {
        setAmount('');
        setDescription('');
        setCategory('Food');
        setType(initialTransactionType);
        setDate(new Date().toISOString().split('T')[0]);
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 font-[Patrick_Hand]"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-lg font-bold text-graphite">Type</label>
                    <div className="flex bg-transparent p-1 gap-2">
                        {(['expense', 'income'] as const).map((t) => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => setType(t)}
                                className={cn(
                                    "flex-1 py-1.5 text-lg font-bold border-b-2 transition-all capitalize",
                                    type === t
                                        ? t === 'income' ? "border-neon-cyan text-neon-cyan" : "border-neon-orange text-neon-orange"
                                        : "border-transparent text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200"
                                )}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-lg font-bold text-graphite">Amount</label>
                    <Input
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        step="0.01"
                        required
                        className="font-[Patrick_Hand] text-xl"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-lg font-bold text-graphite">Description</label>
                <Input
                    placeholder="What is this for?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="text-lg"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-lg font-bold text-graphite">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as Category)}
                        className="sketch-input w-full text-lg cursor-pointer bg-transparent"
                    >
                        {categories.map((c) => (
                            <option key={c} value={c} className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                                {c}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-lg font-bold text-graphite">Date</label>
                    <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="text-lg"
                    />
                </div>
            </div>

            <div className="flex gap-4 mt-4">
                <Button type="button" variant="ghost" onClick={handleReset} className="flex-1 text-xl border-2 border-dashed border-gray-300 hover:border-gray-400 text-gray-500 dark:text-gray-300 dark:border-gray-500 dark:hover:border-gray-300">
                    Reset
                </Button>
                <Button type="submit" className="flex-[2] text-xl">
                    <Plus className="w-5 h-5 mr-2" /> Add to List
                </Button>
            </div>
        </motion.form>
    );
};
