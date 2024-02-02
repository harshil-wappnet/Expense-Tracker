import React, { createContext, useState, useContext, useEffect } from 'react';

export const TransactionContext = createContext({
    transactions: [],
    addTransaction: () => { },
    deleteTransaction: () => { },
    totalExpense: 0,
});

const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState(
        JSON.parse(localStorage.getItem('transactions')) || []
    );
    const [totalExpense, setTotalExpense] = useState(0);

    const calculateTotalExpense = (transactions) => {
        return transactions.reduce((total, transaction) => total + parseFloat(transaction.amount || 0), 0);
    };


    const addTransaction = (newTransaction) => {
        setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
        //setTotalExpense((prevTotalExpense) => prevTotalExpense + parseFloat(newTransaction.amount || 0));
        // Calculate total expense after adding a new transaction
        setTotalExpense(calculateTotalExpense([...transactions, newTransaction]));



    };

    useEffect(() => {
        // Calculate total expense when transactions change
        setTotalExpense(calculateTotalExpense(transactions));

        // Save transactions to localStorage
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);

    const deleteTransaction = (id) => {
        // Find the transaction with the provided ID
        const deletedTransaction = transactions.find((transaction) => transaction.id === id);

        // Filter out the transaction with the provided ID
        const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);

        setTransactions(updatedTransactions);

        // // Subtract the deleted transaction amount from the total expense
        // setTotalExpense((prevTotalExpense) => prevTotalExpense - parseFloat(deletedTransaction.amount));
        // Calculate total expense after deleting a transaction
        setTotalExpense(calculateTotalExpense(updatedTransactions));
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
