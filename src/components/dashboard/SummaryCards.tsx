import { useExpense } from '../../context/ExpenseContext';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../ui/Card';

export const SummaryCards = () => {
    const { balance, totalIncome, totalExpense, setIsAddModalOpen, setInitialTransactionType } = useExpense();

    const handleAddIncome = () => {
        setInitialTransactionType('income');
        setIsAddModalOpen(true);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="relative overflow-hidden group hover:rotate-1 transition-transform duration-300 border-neon-cyan border-2">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Wallet size={100} className="text-neon-cyan" />
                </div>
                <div className="relative z-10">
                    <p className="text-xl font-bold text-gray-400 font-[Patrick_Hand] dark:text-gray-300">Total Balance</p>
                    <h2 className="text-5xl font-bold mt-2 text-neon-cyan font-[Patrick_Hand] drop-shadow-sm">
                        ${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </h2>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-3 bg-neon-cyan/20 rounded-full mx-4 mb-4 w-[calc(100%-2rem)] opacity-50" />
            </Card>

            <Card className="relative overflow-hidden group hover:-rotate-1 transition-transform duration-300 border-neon-lime border-2">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-neon-lime">
                    <TrendingUp size={100} />
                </div>
                <div className="relative z-10">
                    <div className="flex justify-between items-start">
                        <p className="text-xl font-bold text-gray-400 font-[Patrick_Hand] dark:text-gray-300">Total Income</p>
                        <button
                            onClick={handleAddIncome}
                            className="p-1 rounded-full hover:bg-neon-lime/20 text-neon-lime transition-colors"
                            title="Add Income"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>
                        </button>
                    </div>
                    <h2 className="text-5xl font-bold mt-2 text-neon-lime font-[Patrick_Hand] drop-shadow-sm">
                        ${totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </h2>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-3 bg-neon-lime/20 rounded-full mx-4 mb-4 w-[calc(100%-2rem)] opacity-50" />
            </Card>

            <Card className="relative overflow-hidden group hover:rotate-1 transition-transform duration-300 border-neon-orange border-2">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-neon-orange">
                    <TrendingDown size={100} />
                </div>
                <div className="relative z-10">
                    <p className="text-xl font-bold text-gray-400 font-[Patrick_Hand] dark:text-gray-300">Total Expenses</p>
                    <h2 className="text-5xl font-bold mt-2 text-neon-orange font-[Patrick_Hand] drop-shadow-sm">
                        ${totalExpense.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </h2>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-3 bg-neon-orange/20 rounded-full mx-4 mb-4 w-[calc(100%-2rem)] opacity-50" />
            </Card>
        </div>
    );
};
