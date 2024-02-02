import React, { useState } from 'react';
import HomePage from './HomePage';
import AddExpensePage from './AddExpensePage';
import ViewTransactionsPage from './ViewTransactionsPage';

const App = () => {
  // State to manage the current view
  const [currentView, setCurrentView] = useState('home');

  return (
    <div>
      {/* Header or Navigation Section (Optional) */}
      <header style={{ background: "#3498db" }}>
        <button onClick={() => setCurrentView('home')}>Home</button>
        <button onClick={() => setCurrentView('addExpense')}>Add Expense</button>
        <button onClick={() => setCurrentView('viewTransactions')}>View Transactions</button>
      </header>

      {/* Main Content Section */}
      <main>
        {/* Conditional rendering based on the current view */}
        {currentView === 'home' && <HomePage />}
        {currentView === 'addExpense' && <AddExpensePage />}
        {currentView === 'viewTransactions' && <ViewTransactionsPage />}
        {/* Add more views as needed */}
      </main>
    </div>
  );
};

export default App;
