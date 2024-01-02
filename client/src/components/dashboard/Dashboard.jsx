import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [totalShipments, setTotalShipments] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [bestCustomer, setBestCustomer] = useState('');

  useEffect(() => {
    // Fetch total number of shipments
    axios.get('/api/shipments/total')
      .then(response => setTotalShipments(Number(response.data)))
      .catch(error => console.error('Failed to fetch total shipments', error));

    // Fetch total revenue
    axios.get('/api/revenue/total')
      .then(response => setTotalRevenue(Number(response.data.totalRevenue)))
      .catch(error => console.error('Failed to fetch total revenue', error));

    // // Fetch best customer
    // axios.get('/api/customers/best')
    //   .then(response => setBestCustomer(response.data))
    //   .catch(error => console.error('Failed to fetch best customer', error));


  }, []);

  return (
    <div>
      <p>Total Number of Shipments: {totalShipments}</p>
      <p>Total Revenue: {totalRevenue}</p>
      <p>Best Customer: {bestCustomer}</p>
    </div>
  );
}
