import React, { useEffect, useState } from 'react';
import customerHelpers from '../../helpers/customerHelpers';
import CustomerCard from './CustomerCard'

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    customerHelpers.getAllCustomers().then(response => {
      setCustomers(response.data);
    }).catch(error => {
      console.error('There was an error!', error);
    });
  }, []);

  return (
    <div>
    <div className="customer-list">
      {customers.map(customer => (
        <CustomerCard key={customer.cust_id} customer={customer} />
      ))}
    </div>
    </div>
  );
};

export default CustomersList;
