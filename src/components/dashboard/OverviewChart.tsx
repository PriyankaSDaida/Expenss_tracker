import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { useExpense } from '../../context/ExpenseContext';
import { Card } from '../ui/Card';
import { format, parseISO, subDays } from 'date-fns';

export const OverviewChart = () => {
    const { transactions } = useExpense();

    const data = useMemo(() => {
        // Get last 7 days
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const date = subDays(new Date(), 6 - i);
            return format(date, 'yyyy-MM-dd');
        });

        return last7Days.map(date => {
            const dayTransactions = transactions.filter(t => t.date === date);
            const income = dayTransactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
            const expense = dayTransactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);

            return {
                date: format(parseISO(date), 'MMM dd'),
                Income: income,
                Expense: expense,
            };
        });
    }, [transactions]);

    return (
        <Card className="h-[300px]">
            <h3 className="text-lg font-semibold mb-4 text-slate-200">Weekly Overview</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis
                        dataKey="date"
                        stroke="#94a3b8"
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#94a3b8"
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip
                        cursor={{ fill: '#334155', opacity: 0.2 }}
                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                        itemStyle={{ color: '#f8fafc' }}
                    />
                    <Legend />
                    <Bar dataKey="Income" fill="#34d399" radius={[4, 4, 0, 0]} maxBarSize={40} />
                    <Bar dataKey="Expense" fill="#f87171" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};
