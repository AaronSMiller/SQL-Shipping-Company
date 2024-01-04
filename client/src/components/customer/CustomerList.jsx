import React, { useEffect, useState } from 'react';
import customerHelpers from '../../helpers/customerHelpers';
import CustomerCard from './CustomerCard'
import axios from 'axios'

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get(`/api/customers/`)
    // customerHelpers.getAllCustomers()
    .then(response => {
      setCustomers(response.data);
    }).catch(error => {
      console.error('There was an error!', error);
    });
  }, []);

  return (
    <div>
      <h2>Customer List</h2>
      <div className="customer-list">
        {customers.map(customer => (
          <CustomerCard key={customer.cust_id} customer={customer} />
        ))}
      </div>
    </div>
  );
};

export default CustomersList;
