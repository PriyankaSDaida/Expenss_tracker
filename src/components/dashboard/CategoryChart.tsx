import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useExpense } from '../../context/ExpenseContext';
import { useTheme } from '../../context/ThemeContext';
import { Card } from '../ui/Card';

const COLORS = ['#f0abfc', '#67e8f9', '#bef264', '#fdba74', '#d8b4fe', '#3b82f6', '#ef4444'];

export const CategoryChart = () => {
    const { transactions } = useExpense();
    const { theme } = useTheme();

    const isDark = theme === 'dark';
    const textColor = isDark ? '#f3f4f6' : '#374151';
    const tooltipBg = isDark ? '#09090b' : '#fff';
    const tooltipBorder = isDark ? '#22d3ee' : '#374151';

    const data = useMemo(() => {
        const expenses = transactions.filter(transaction => transaction.type === 'expense');
        const categoryTotals = expenses.reduce((totals, transaction) => {
            totals[transaction.category] = (totals[transaction.category] || 0) + transaction.amount;
            return totals;
        }, {} as Record<string, number>);

        return Object.entries(categoryTotals).map(([name, value]) => ({
            name,
            value,
        }));
    }, [transactions]);

    if (data.length === 0) {
        return (
            <Card className="flex items-center justify-center h-[300px] text-gray-500 paper-card font-[Patrick_Hand] text-xl">
                No expenses to display
            </Card>
        );
    }

    return (
        <Card className="p-6 h-96 relative paper-card border-neon-purple border-2">
            <h3 className="text-xl font-bold mb-4 font-[Patrick_Hand] text-gray-600 dark:text-neon-purple">Expenses by Category</h3>
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
                        stroke={isDark ? '#000' : '#fff'}
                        strokeWidth={2}
                    >
                        {data.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: tooltipBg,
                            border: `2px solid ${tooltipBorder}`,
                            borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                            boxShadow: '0 0 10px rgba(0,0,0,0.2)'
                        }}
                        itemStyle={{ color: textColor, fontFamily: 'Patrick Hand' }}
                    />
                    <Legend wrapperStyle={{ fontFamily: 'Patrick Hand', color: textColor }} />
                </PieChart>
            </ResponsiveContainer>
        </Card>
    );
};
