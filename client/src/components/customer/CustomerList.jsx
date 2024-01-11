import React, { useEffect, useState } from 'react';
import CustomerCard from './CustomerCard'
import axios from 'axios'

const CustomersList = ({ customers, fetchCustomers }) => {

  return (
    <div>
      <h2>Customer List</h2>
      <div className="customer-list">
        {customers.map(customer => (
          <CustomerCard key={customer.cust_id} customer={customer} fetchCustomers={fetchCustomers} />
        ))}
      </div>
    </div>
  );
};

export default CustomersList;
