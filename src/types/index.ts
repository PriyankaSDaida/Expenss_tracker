export type TransactionType = 'income' | 'expense';

export type Category =
    | 'Food'
    | 'Transport'
    | 'Entertainment'
    | 'Bills'
    | 'Shopping'
    | 'Health'
    | 'Salary'
    | 'Freelance'
    | 'Other';

export interface Transaction {
    id: string;
    amount: number;
    description: string;
    category: Category;
    type: TransactionType;
    date: string; // ISO string
}

export interface ExpenseState {
    transactions: Transaction[];
    addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
    deleteTransaction: (id: string) => void;
    balance: number;
    totalIncome: number;
    totalExpense: number;
}
