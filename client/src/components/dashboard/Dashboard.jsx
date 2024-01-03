import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [totalShipments, setTotalShipments] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState('');
  const [highestRevenueCustomer, setHighestRevenueCustomer] = useState('');
  const [mostShipmentsCustomer, setMostShipmentsCustomer] = useState({});

  useEffect(() => {
    // Fetch total number of shipments
    axios.get('/api/shipments/total')
      .then(response => setTotalShipments(Number(response.data)))
      .catch(error => console.error('Failed to fetch total shipments', error));

    // Fetch total revenue
    axios.get('/api/revenue/total')
      .then(response => {
        if (response.data && response.data.totalRevenue) {
          const formattedRevenue = new Intl.NumberFormat('en-US', {
            style: 'decimal',
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
          }).format(response.data.totalRevenue);
          setTotalRevenue(formattedRevenue);
        }
      })
      .catch(error => console.error('Failed to fetch total revenue', error));

    // Fetch customer with highest revenue
    axios.get('/api/customers/getHighestRevenue')
      .then(response => setHighestRevenueCustomer(response.data.cust_name))
      .catch(error => console.error('Failed to fetch customer with highest revenue', error));

    // // Fetch customer with most shipments
    axios.get('/api/customers/most-shipments')
      .then(response => setMostShipmentsCustomer(response.data))
      .catch(error => console.error('Failed to fetch customer with most shipments', error));

  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total Number of Shipments: {totalShipments}</p>
      <p>Total Revenue: ${totalRevenue}</p>
      <p>Customer with Highest Revenue: {highestRevenueCustomer}</p>
      <p>Customer with Most Shipments: {mostShipmentsCustomer.cust_name || 'Loading...'}</p>
    </div>
  );
}
