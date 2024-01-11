import React, { useState, useEffect } from 'react';
import CustomersList from './customer/CustomerList';
import Dashboard from './dashboard/Dashboard'
import ShowSchema from './showSchema/ShowSchema'
import CreateCustomer from './createCustomer/CreateCustomer'
import axios from 'axios';

const App = () => {

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('/api/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  return (
    <div>
      <h1>SQL Shipping Company</h1>
      <ShowSchema />
      <Dashboard />
      <CreateCustomer fetchCustomers={fetchCustomers}/>
      <CustomersList customers={customers} fetchCustomers={fetchCustomers}/>
    </div>
  );
};

export default App;
