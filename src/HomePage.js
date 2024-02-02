import React, { useContext, useEffect } from 'react';
import { TransactionContext } from './TransactionContext';

const HomePage = () => {
    const { transactions, totalExpense } = useContext(TransactionContext);

    // Example state for user name and tips
    const userName = 'User'; // Replace with actual user name
    let tips = "Based on your spending, you could save money by cooking at home more often.";

    useEffect(() => {

        console.log('expenssssssssssss', totalExpense);
        // You can perform additional actions when transactions change
        // For example, you can recalculate tips based on the latest transactions
        // ...
        localStorage.setItem('transactions', JSON.stringify(transactions));
        // This is just an example, you might have a more sophisticated logic for tips
        if (totalExpense > 1000) {
            tips = "Great job! You are managing your expenses well.";
        } else if (totalExpense > 500) {
            tips = "Consider reducing discretionary spending to save more.";
        }
    }, [transactions, totalExpense]);

    return (
        <div className="homepage-container">
            {/* Greeting message */}
            <h1 className="greeting-message">Hello {userName}, welcome back! Here's a snapshot of your expenses.</h1>

            {/* Display total expenses from TransactionContext */}
            <p className="total-expenses">Total Expenses: ${totalExpense.toFixed(2)}</p>

            {/* Tips for savings */}
            <p className="tips-section">Tips for Savings: {tips}</p>
        </div>
    );
};

export default HomePage;
