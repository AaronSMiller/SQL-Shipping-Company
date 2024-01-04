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
    .then(response => {
      console.log("Frontend Response Data:", response.data);
      setTotalShipments(response.data.totalShipments);
    })

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
    <div className="dashboard-container">
      <h1 className="dashboard-header">Dashboard</h1>
      <div className="dashboard-stat">
        <h3>Total Number of Shipments</h3>
        <p>{totalShipments}</p>
      </div>
      <div className="dashboard-stat">
        <h3>Total Revenue</h3>
        <p>${totalRevenue}</p>
      </div>
      <div className="dashboard-stat">
        <h3>Customer with Highest Revenue</h3>
        <p>{highestRevenueCustomer}</p>
      </div>
      <div className="dashboard-stat">
        <h3>Customer with Most Shipments</h3>
        <p>{mostShipmentsCustomer.cust_name || 'Loading...'}</p>
      </div>
    </div>
  );
}
