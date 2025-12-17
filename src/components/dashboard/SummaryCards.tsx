import { useExpense } from '../../context/ExpenseContext';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../ui/Card';

export const SummaryCards = () => {
    const { balance, totalIncome, totalExpense } = useExpense();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="relative overflow-hidden group hover:rotate-1 transition-transform duration-300 border-neon-cyan border-2">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Wallet size={100} className="text-neon-cyan" />
                </div>
                <div className="relative z-10">
                    <p className="text-xl font-bold text-gray-400 font-[Patrick_Hand]">Total Balance</p>
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
                    <p className="text-xl font-bold text-gray-400 font-[Patrick_Hand]">Total Income</p>
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
                    <p className="text-xl font-bold text-gray-400 font-[Patrick_Hand]">Total Expenses</p>
                    <h2 className="text-5xl font-bold mt-2 text-neon-orange font-[Patrick_Hand] drop-shadow-sm">
                        ${totalExpense.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </h2>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-3 bg-neon-orange/20 rounded-full mx-4 mb-4 w-[calc(100%-2rem)] opacity-50" />
            </Card>
        </div>
    );
};
