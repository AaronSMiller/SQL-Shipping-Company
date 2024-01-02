import React from 'react';
import CustomersList from './customer/CustomerList';

const App = () => {
  return (
    <div>
      <h1>SQL Shipping Company</h1>
      <h2>KPIs</h2>
      <h2>Customers</h2>
      <CustomersList />
    </div>
  );
};

export default App;
