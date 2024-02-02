import React, { createContext, useState, useContext } from 'react';

export const TransactionContext = createContext({
    transactions: [],
    addTransaction: () => { },
    deleteTransaction: () => { },
    totalExpense: 0,
});

const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);

    const addTransaction = (newTransaction) => {
        setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
        setTotalExpense((prevTotalExpense) => prevTotalExpense + parseFloat(newTransaction.amount));
    };

    const deleteTransaction = (id) => {
        // Find the transaction with the provided ID
        const deletedTransaction = transactions.find((transaction) => transaction.id === id);

        // Filter out the transaction with the provided ID
        const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);

        setTransactions(updatedTransactions);

        // Subtract the deleted transaction amount from the total expense
        setTotalExpense((prevTotalExpense) => prevTotalExpense - parseFloat(deletedTransaction.amount));
    };

    const contextValue = {
        transactions,
        addTransaction,
        deleteTransaction,
        totalExpense,
        setTransactions,
    };

    return (
        <TransactionContext.Provider value={contextValue}>
            {children}
        </TransactionContext.Provider>
    );
};

export default TransactionProvider;

export const useTransaction = () => {
    return useContext(TransactionContext);
};
