import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContractorDashboard from './components/ContractorDashboard';
import Home from './components/Home';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import Account from './components/Account';
import EditAccount from './components/EditAccount';
import ContractorProfile from './components/ContractorProfile';
import Banner from './components/Banner';
import WriteReview from './components/WriteReview';
import RequestPage from './components/RequestPage';
import EditContractorAccount from './components/EditContractorAccount';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
    return (
        <Router>
            <Banner />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/dashboard" element={<ContractorDashboard contractorId={1} />} />
                <Route path="/account" element={<Account />} />
                <Route path="/edit-account" element={<EditAccount />} />
                <Route path="/contractor/:contractorId" element={<ContractorProfile />} />
                <Route path="/contractor/:contractorId/write-review" element={<WriteReview />} />
                <Route path="/request/:contractorId" element={<RequestPage />} />
                <Route path="/contractor/:contractorId/edit" element={<EditContractorAccount />} />
                <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;