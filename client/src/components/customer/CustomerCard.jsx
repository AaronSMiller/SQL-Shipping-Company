import React, { useState } from 'react';
import DynamicTable from '../Table/DynamicTable'
import Modal from '../modal/Modal';
import CustomerDetails from './CustomerDetails';
import axios from 'axios'

const CustomerCard = ({ customer }) => {

  const [shipments, setShipments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleOpenDetails = () => {
    setIsDetailsModalOpen(true);
  };

  const formatRevenue = (revenue) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2
    }).format(revenue);
  };

  const handleDeleteCustomer = () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${customer.cust_name}?`);
    if (confirmDelete) {
      axios.delete(`/api/customers/${customer.cust_id}`)
        .then(response => {
          // Check for a successful response
          if (response.status === 200) {
            alert(response.data.message); // Show the success message from the server
          } else {
            // If the status code is not successful, log the response for debugging
            console.error('Unexpected response status:', response);
            alert('Customer deletion was not successful. Please check the console for more information.');
          }
        })
        .catch(error => {
          console.error('There was an error deleting the customer!', error);
          // Check if a response was received and show the message
          alert(error.response?.data?.message || 'Failed to delete customer. Please try again.');
        });
    }
  };


  return (
    <div className="customer-card">
      <h3>{customer.cust_name}</h3>
      <p>Type: {customer.cust_type}</p>
      <p>Annual Revenue: {formatRevenue(customer.annual_revenue)}</p>
      <p>Address: {customer.address}</p>
      <p>City: {customer.city}</p>
      <p>State: {customer.state}</p>
      <p>ZIP: {customer.zip}</p>
      <p>Phone: {customer.phone}</p>
      <button onClick={handleOpenDetails} className="details-button">View Details</button>
      <button onClick={handleDeleteCustomer} className="delete-button">Delete Customer</button>
      <Modal show={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)}>
        <CustomerDetails customerId={customer.cust_id} customerName={customer.cust_name} />
      </Modal>
    </div>
  );
};

export default CustomerCard;
