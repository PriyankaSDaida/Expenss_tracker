import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { type Transaction } from '../types';

export const generateMonthlyReport = (transactions: Transaction[]) => {
    // Create new PDF document
    const doc = new jsPDF();
    const currentMonth = format(new Date(), 'MMMM yyyy');

    // Title
    doc.setFontSize(20);
    doc.setTextColor(44, 62, 80);
    doc.text(`Expense Report - ${currentMonth}`, 14, 22);

    // Filter transactions for current month
    const currentMonthTransactions = transactions.filter(t => {
        const tDate = new Date(t.date);
        const now = new Date();
        return tDate.getMonth() === now.getMonth() && tDate.getFullYear() === now.getFullYear();
    });

    if (currentMonthTransactions.length === 0) {
        doc.setFontSize(14);
        doc.setTextColor(100);
        doc.text('No transactions found for this month.', 14, 40);
        doc.save(`Expense_Report_${format(new Date(), 'MMM_yyyy')}.pdf`);
        return;
    }

    // Calculate totals
    const income = currentMonthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const expense = currentMonthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expense;

    // Summary Section
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Total Income: $${income.toFixed(2)}`, 14, 32);
    doc.text(`Total Expenses: $${expense.toFixed(2)}`, 14, 38);
    doc.text(`Net Balance: $${balance.toFixed(2)}`, 14, 44);

    // Table Data
    const tableData = currentMonthTransactions.map(t => [
        format(new Date(t.date), 'MMM dd, yyyy'),
        t.description,
        t.category,
        t.type.toUpperCase(),
        `$${t.amount.toFixed(2)}`
    ]);

    // Generate Table
    autoTable(doc, {
        head: [['Date', 'Description', 'Category', 'Type', 'Amount']],
        body: tableData,
        startY: 50,
        theme: 'striped',
        headStyles: { fillColor: [63, 81, 181] },
        styles: { fontSize: 10 },
        columnStyles: {
            0: { cellWidth: 30 },
            4: { halign: 'right' }
        }
    });

    // Save PDF
    doc.save(`Expense_Report_${format(new Date(), 'MMM_yyyy')}.pdf`);
};
