import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CaptainDashboard from './components/CaptainDashboard';
import SupervisorDashboard from './components/SupervisorDashboard';
import Bill from './components/Bill';
import './App.css';
import image from './rest4.jpg';

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/captain" element={<CaptainDashboard />} />
                    <Route path="/supervisor" element={<SupervisorDashboard />} />
                    <Route path="/bill" element={<Bill />} />
                    <Route path="/" element={
                        <div className="home-container">
                            <h1 className="title">              THE ROYAL RESTAURANT</h1>
                            <img src={image} alt="Description" className="restaurant-image" />
                            <div className="button-container">
                                <a href="/captain" className="button-style">Captain Login</a>
                                <a href="/supervisor" className="button-style">Supervisor Login</a>
                                <a href="/bill" className="button-style">Generate bill</a>
                            </div>
                            
                        </div>
                    } />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
