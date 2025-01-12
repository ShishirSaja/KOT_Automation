const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Add order
router.post('/add', (req, res) => {
    const { table, item, price, quantity } = req.body;
    const query = `INSERT INTO table${table} (item, price, quantity) VALUES (?, ?, ?)`;
    db.query(query, [item, price, quantity], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ msg: 'Order added successfully' });
    });
});

// Get all orders for a table
router.get('/table/:table', (req, res) => {
    const query = `SELECT * FROM table${req.params.table}`;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(results);
    });
});

// Generate bill
router.post('/generate-bill', (req, res) => {
    const { table } = req.body;
    const query = `SELECT item, price, quantity, (price * quantity) AS total FROM table${table}`;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json(err);
        const totalAmount = results.reduce((sum, item) => sum + item.total, 0);
        res.status(200).json({ items: results, totalAmount });
    });
});

// Clear table after bill generation
router.post('/clear-table', (req, res) => {
    const { table } = req.body;
    const query = `DELETE FROM table${table}`;
    db.query(query, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ msg: 'Table cleared successfully' });
    });
});

module.exports = router;