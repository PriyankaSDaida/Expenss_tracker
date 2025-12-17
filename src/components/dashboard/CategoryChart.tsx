import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useExpense } from '../../context/ExpenseContext';
import { Card } from '../ui/Card';

const COLORS = ['#8b5cf6', '#22d3ee', '#34d399', '#f472b6', '#fbbf24', '#f87171', '#a78bfa', '#60a5fa'];

export const CategoryChart = () => {
    const { transactions } = useExpense();

    const data = useMemo(() => {
        const expenses = transactions.filter(t => t.type === 'expense');
        const categoryTotals = expenses.reduce((acc, curr) => {
            acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(categoryTotals).map(([name, value]) => ({
            name,
            value,
        }));
    }, [transactions]);

    if (data.length === 0) {
        return (
            <Card className="flex items-center justify-center h-[300px] text-slate-400">
                No expenses to display
            </Card>
        );
    }

    return (
        <Card className="h-[300px]">
            <h3 className="text-lg font-semibold mb-4 text-slate-200">Expenses by Category</h3>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                        itemStyle={{ color: '#f8fafc' }}
                    />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </Card>
    );
};
