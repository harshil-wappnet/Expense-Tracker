// import React from 'react';
// import { useTransaction } from './TransactionContext';
// import './ViewTransactionsPage.css';

// const ViewTransactionsPage = () => {
//     const { transactions, deleteTransaction } = useTransaction();

//     const handleDelete = (id) => {
//         // Call the deleteTransaction function from the context
//         deleteTransaction(id);
//     };

//     return (
//         <div className="view-transactions-container">
//             <h1>Expense Tracker - View Transactions</h1>
//             {/* Display transactions in a table */}
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Date</th>
//                         <th>Amount</th>
//                         <th>Merchant/Description</th>
//                         <th>Category</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {transactions.map((transaction) => (
//                         <tr key={transaction.id}>
//                             <td>{transaction.date}</td>
//                             <td>{transaction.amount}</td>
//                             <td>{transaction.merchant}</td>
//                             <td>{transaction.category}</td>
//                             <td>
//                                 {/* Add a button for each transaction to trigger delete */}
//                                 <button onClick={() => handleDelete(transaction.id)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ViewTransactionsPage;


// import React, { useState, useEffect } from 'react';
// import { useTransaction } from './TransactionContext';
// import axios from 'axios';
// import './ViewTransactionsPage.css';

// const ViewTransactionsPage = () => {
//     const { transactions, deleteTransaction, setTransactions } = useTransaction();

//     const fetchTransactions = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/transactions/transactions_records');
//             console.log('Fetched Transactions:', response.data);
//             setTransactions(response.data);
//         } catch (error) {
//             console.error('Error fetching transactions:', error);
//         }
//     };

//     useEffect(() => {
//         fetchTransactions();
//     }, [setTransactions]);

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:5000/transactions/transactions_records/${id}`);
//             // After deletion, fetch the updated transactions
//             fetchTransactions();
//         } catch (error) {
//             console.error('Error deleting transaction:', error);
//         }
//     };

//     return (
//         <div className="view-transactions-container">
//             <h1>Expense Tracker - View Transactions</h1>
//             {/* Display transactions in a table */}
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Date</th>
//                         <th>Amount</th>
//                         <th>Merchant/Description</th>
//                         <th>Category</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {transactions.map((transaction) => (
//                         <tr key={transaction.id}>
//                             <td>{transaction.date}</td>
//                             <td>{transaction.amount}</td>
//                             <td>{transaction.merchant}</td>
//                             <td>{transaction.category}</td>
//                             <td>
//                                 {/* Add a button for each transaction to trigger delete */}
//                                 <button onClick={() => handleDelete(transaction.id)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ViewTransactionsPage;

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

    useEffect(() => {
        console.log('harshillll', transactions[0]);
    }, [transactions]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/deleteTransaction/${id}`);
            // After deletion, fetch the updated transactions
            fetchTransactions();
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
    };

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
                                Add a button for each transaction to trigger delete
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
