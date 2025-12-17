import { useExpense } from '../../context/ExpenseContext';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../ui/Card';

export const SummaryCards = () => {
    const { balance, totalIncome, totalExpense } = useExpense();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Wallet size={100} />
                </div>
                <div className="relative z-10">
                    <p className="text-sm font-medium text-slate-400">Total Balance</p>
                    <h2 className="text-3xl font-bold mt-2 text-white font-mono">
                        ${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </h2>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
            </Card>

            <Card className="relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-emerald-500">
                    <TrendingUp size={100} />
                </div>
                <div className="relative z-10">
                    <p className="text-sm font-medium text-slate-400">Total Income</p>
                    <h2 className="text-3xl font-bold mt-2 text-emerald-400 font-mono">
                        ${totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </h2>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-300" />
            </Card>

            <Card className="relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-red-500">
                    <TrendingDown size={100} />
                </div>
                <div className="relative z-10">
                    <p className="text-sm font-medium text-slate-400">Total Expenses</p>
                    <h2 className="text-3xl font-bold mt-2 text-red-400 font-mono">
                        ${totalExpense.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </h2>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-300" />
            </Card>
        </div>
    );
};
