import React from 'react';
import CustomersList from './customer/CustomerList';
import Dashboard from './dashboard/Dashboard'

const App = () => {
  return (
    <div>
      <h1>SQL Shipping Company</h1>
      <h2>KPIs</h2>
      <Dashboard />
      <h2>Customers</h2>
      <CustomersList />
    </div>
  );
};

export default App;
