const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'transactions',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Route to handle adding expenses
app.post('/addExpense', (req, res) => {
    const { date, amount, merchant, category } = req.body;
    // console.warn(req.body);
    const query = 'INSERT INTO transactions_records(date, amount, merchant, category) VALUES (?, ?, ?, ?)';
    const values = [date, amount, merchant, category];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json({ success: true, message: 'Expense added successfully!' });
    });
});

app.get('/viewTransactions', async (req, res) => {
    // Construct the SQL query to retrieve all records from the 'transactions_records' table
    const query = 'SELECT * FROM transactions_records';

    // Execute the query
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Log the results to the console
        console.log('Query Results:', results);

        // Send the retrieved transactions as a JSON response
        res.json({ success: true, transactions: results });
    });
});

app.delete('/deleteTransaction/:id', (req, res) => {
    // Extract the transaction ID from the request parameters
    const transactionId = req.params.id;

    // Construct the SQL query to delete the record with the specified ID from the 'transactions_records' table
    const query = 'DELETE FROM transactions_records WHERE id = ?';

    // Execute the query with the transaction ID as a parameter
    connection.query(query, [transactionId], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Log the results to the console
        console.log('Delete Query Results:', results);

        // Check if any rows were affected (indicating a successful deletion)
        if (results.affectedRows > 0) {
            res.json({ success: true, message: 'Transaction deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Transaction not found' });
        }
    });
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
