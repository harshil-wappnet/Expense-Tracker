import React, { useEffect } from 'react';
import { useTransaction } from './TransactionContext';
import axios from 'axios';
import './ViewTransactionsPage.css';

const ViewTransactionsPage = () => {
    const { transactions, setTransactions } = useTransaction();

    const fetchTransactions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/viewTransactions');
            setTransactions(response.data.transactions);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const handleDelete = async (id) => {
        try {
            console.log('Deleting transaction with ID:', id);
            await axios.delete(`http://localhost:5000/deleteTransaction/${id}`);
            console.log('Transaction deleted successfully.');

            // After deletion, update the local transactions state to remove the deleted transaction
            setTransactions((prevTransactions) => prevTransactions.filter(transaction => transaction.id !== id));
            console.log('Transactions updated:', transactions);
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
    };

    const totalExpense = transactions.reduce((total, transaction) => total + parseFloat(transaction.amount || 0), 0);
    console.log('total', totalExpense);

    // useEffect(() => {
    //     console.log('total', totalExpense);
    // }, []);


    return (
        <div className="view-transactions-container">
            <h1>Expense Tracker - View Transactions</h1>
            {/* Display transactions in a table */}
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Merchant/Description</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.date}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.merchant}</td>
                            <td>{transaction.category}</td>
                            <td>
                                {/* Add a button for each transaction to trigger delete */}
                                <button onClick={() => handleDelete(transaction.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewTransactionsPage;
