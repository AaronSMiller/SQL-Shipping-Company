import React from 'react';
import CustomersList from './customer/CustomerList';
import Dashboard from './dashboard/Dashboard'
import ShowSchema from './showSchema/ShowSchema'

const App = () => {
  return (
    <div>
      <h1>SQL Shipping Company</h1>
      <ShowSchema />
      <h2>KPIs</h2>
      <Dashboard />
      <h2>Customers</h2>
      <CustomersList />
    </div>
  );
};

export default App;
