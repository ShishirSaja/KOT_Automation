import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SupervisorDashboard = () => {
    const [tables, setTables] = useState([1, 2, 3, 4]);
    const [orders, setOrders] = useState({});

    useEffect(() => {
        const fetchOrders = async () => {
            const results = await Promise.all(
                tables.map(table => axios.get(`http://localhost:5000/api/orders/table/${table}`))
            );
            const ordersData = results.reduce((acc, res, idx) => {
                acc[`table${tables[idx]}`] = res.data;
                return acc;
            }, {});
            setOrders(ordersData);
        };

        fetchOrders();
    }, [tables]);

    return (
        <div>
            <h1>Supervisor Dashboard</h1>
            {tables.map(table => (
                <div key={table}>
                    <h2>Table {table}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Quantity</th>
                                <th>Items</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders[`table${table}`] && orders[`table${table}`].map(order => (
                                <tr key={order.id}>
                                    <td>{order.quantity}</td>
                                    <td>{order.item}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default SupervisorDashboard;