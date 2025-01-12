import React, { useState } from 'react';
import axios from 'axios';

const CaptainDashboard = () => {
    const [table, setTable] = useState('');
    const [item, setItem] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleOrder = async () => {
        await axios.post('http://localhost:5000/api/orders/add', { table, item, price, quantity });
        alert('Order added!');
    };

    return (
        <div>
            <h1>Captain Dashboard</h1>
            <h2>Order Food</h2>
            <select onChange={e => setTable(e.target.value)}>
                <option value="">Select Table</option>
                <option value="1">Table 1</option>
                <option value="2">Table 2</option>
                <option value="3">Table 3</option>
                <option value="4">Table 4</option>
            </select>
            <input type="text" placeholder="Enter Item" onChange={e => setItem(e.target.value)} />
            <input type="number" placeholder="Enter Price" onChange={e => setPrice(e.target.value)} />
            <input type="number" placeholder="Enter Quantity" onChange={e => setQuantity(e.target.value)} />
            <button onClick={handleOrder}>Done</button>
        </div>
    );
};

export default CaptainDashboard;