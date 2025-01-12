import React, { useState } from 'react';
import axios from 'axios';

const Bill = () => {
    const [table, setTable] = useState('');
    const [billDetails, setBillDetails] = useState(null);

    const handleGenerateBill = async () => {
        const response = await axios.post('http://localhost:5000/api/orders/generate-bill', { table });
        setBillDetails(response.data);
        // Clear the table after generating bill
        await axios.post('http://localhost:5000/api/orders/clear-table', { table });
    };

    return (
        <div>
            <h1>Generate Bill</h1>
            <select onChange={e => setTable(e.target.value)}>
                <option value="">Select Table</option>
                <option value="1">Table 1</option>
                <option value="2">Table 2</option>
                <option value="3">Table 3</option>
                <option value="4">Table 4</option>
            </select>
            <button onClick={handleGenerateBill}>Generate Bill</button>

            {billDetails && (
                <div>
                    <h2>Bill for Table {table}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Items</th>
                                <th>Price of One</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {billDetails.items.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.item}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.total}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="3">Total</td>
                                <td>{billDetails.totalAmount}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Bill;