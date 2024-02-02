// AddExpensePage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useTransaction } from './TransactionContext';
import './AddExpensePage.css';

const AddExpensePage = () => {
  const { addTransaction } = useTransaction();

  const categories = ['Food', 'Transportation', 'Utilities', 'Entertainment', 'Other'];

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [date, setDate] = useState(getCurrentDate());
  const [amount, setAmount] = useState('');
  const [merchant, setMerchant] = useState('');
  const [category, setCategory] = useState(categories[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the expense data to the server
      const response = await axios.post('http://localhost:5000/addExpense', {
        date,
        amount,
        merchant,
        category,
      });

      // Assuming the server responds with the newly added transaction
      const newTransaction = response.data;

      // Update the local state using the context
      addTransaction(newTransaction);

      // Reset form fields
      setDate(getCurrentDate());
      setAmount('');
      setMerchant('');
      setCategory(categories[0]);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div className="add-expense-container">
      <h1>Expense Tracker - Add Expense</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            max={getCurrentDate()}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="merchant">Merchant/Description:</label>
          <input
            type="text"
            id="merchant"
            value={merchant}
            onChange={(e) => setMerchant(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="category-dropdown"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpensePage;
