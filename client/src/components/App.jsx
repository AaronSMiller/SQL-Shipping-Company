import React from 'react';
import CustomersList from './customer/CustomerList';
import Dashboard from './dashboard/Dashboard'
import ShowSchema from './showSchema/ShowSchema'
import CreateCustomer from './createCustomer/CreateCustomer'

const App = () => {
  return (
    <div>
      <h1>SQL Shipping Company</h1>
      <ShowSchema />
      <Dashboard />
      <CreateCustomer />
      <CustomersList />
    </div>
  );
};

export default App;
