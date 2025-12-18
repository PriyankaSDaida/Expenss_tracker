import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { useExpense } from '../../context/ExpenseContext';
import { useTheme } from '../../context/ThemeContext';
import { Card } from '../ui/Card';
import { format, parseISO, subDays } from 'date-fns';

export const OverviewChart = () => {
    const { transactions } = useExpense();
    const { theme } = useTheme(); // Added useTheme hook

    const isDark = theme === 'dark'; // Added theme-dependent variables
    const textColor = isDark ? '#f3f4f6' : '#374151';
    const gridColor = isDark ? '#333' : '#e5e7eb';
    const tooltipBg = isDark ? '#09090b' : '#fff';
    const tooltipBorder = isDark ? '#22d3ee' : '#374151';

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
        <Card className="p-6 h-96 relative paper-card border-neon-cyan border-2">
            <h3 className="text-xl font-bold mb-4 font-[Patrick_Hand] text-gray-600 dark:text-neon-cyan">Weekly Overview</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                    <XAxis
                        dataKey="date"
                        stroke={textColor}
                        tick={{ fill: textColor, fontSize: 14, fontFamily: 'Patrick Hand' }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke={textColor}
                        tick={{ fill: textColor, fontSize: 12, fontFamily: 'Patrick Hand' }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip
                        cursor={{ fill: textColor, opacity: 0.1 }}
                        contentStyle={{
                            backgroundColor: tooltipBg,
                            border: `2px solid ${tooltipBorder}`,
                            borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                            color: textColor
                        }}
                        itemStyle={{ color: textColor, fontFamily: 'Patrick Hand', fontSize: '1.1rem' }}
                    />
                    <Legend wrapperStyle={{ fontFamily: 'Patrick Hand', color: textColor }} />
                    <Bar dataKey="Income" fill={isDark ? "#22d3ee" : "#00ffff"} radius={[4, 4, 0, 0]} maxBarSize={40} />
                    <Bar dataKey="Expense" fill={isDark ? "#fb923c" : "#ff9900"} radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};
