import React, { createContext, useContext, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { type Transaction, type ExpenseState, type TransactionType } from '../types';

const ExpenseContext = createContext<ExpenseState | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', []);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [initialTransactionType, setInitialTransactionType] = useState<TransactionType>('expense');

    const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
        const newTransaction = { ...transaction, id: uuidv4() };
        setTransactions((prev) => [newTransaction, ...prev]);
    };

    const deleteTransaction = (id: string) => {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
    };

    const resetAllData = () => {
        setTransactions([]);
    };

    const { balance, totalIncome, totalExpense } = useMemo(() => {
        return transactions.reduce(
            (acc, curr) => {
                const amount = curr.amount;
                if (curr.type === 'income') {
                    acc.totalIncome += amount;
                    acc.balance += amount;
                } else {
                    acc.totalExpense += amount;
                    acc.balance -= amount;
                }
                return acc;
            },
            { balance: 0, totalIncome: 0, totalExpense: 0 }
        );
    }, [transactions]);

    return (
        <ExpenseContext.Provider
            value={{
                transactions,
                addTransaction,
                deleteTransaction,
                balance,
                totalIncome,
                totalExpense,
                isAddModalOpen,
                setIsAddModalOpen,
                initialTransactionType,
                setInitialTransactionType,
                resetAllData,
            }}
        >
            {children}
        </ExpenseContext.Provider>
    );
};

export const useExpense = () => {
    const context = useContext(ExpenseContext);
    if (!context) {
        throw new Error('useExpense must be used within an ExpenseProvider');
    }
    return context;
};
