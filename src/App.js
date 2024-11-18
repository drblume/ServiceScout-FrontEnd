import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContractorDashboard from './components/ContractorDashboard';
import Home from './components/Home';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/dashboard" element={<ContractorDashboard contractorId={1} />} />
            </Routes>
        </Router>
    );
};

export default App;

