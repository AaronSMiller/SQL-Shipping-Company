import React, { useState } from 'react';
import customerHelpers from '../../helpers/customerHelpers'
import DynamicTable from '../Table/DynamicTable'
import Modal from '../modal/Modal';

const CustomerCard = ({ customer }) => {

  const [shipments, setShipments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGetShipments = () => {
    customerHelpers.getShipmentsByCustomerId(customer.cust_id)
      .then(response => {
        setShipments(response.data)
        setIsModalOpen(true)
      })
      .catch(error => {
        console.error('There was an error fetching the shipments!', error);
      });
  };


  return (
    <div className="customer-card">
      <h3>{customer.cust_name}</h3>
      <p>Type: {customer.cust_type}</p>
      <p>Annual Revenue: ${customer.annual_revenue}</p>
      <p>Address: {customer.address}</p>
      <p>City: {customer.city}</p>
      <p>State: {customer.state}</p>
      <p>ZIP: {customer.zip}</p>
      <p>Phone: {customer.phone}</p>
      <button onClick={handleGetShipments}>Get Shipments</button>
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {shipments.length > 0 ? (
          <>
            <h3>{customer.cust_name} Shipments</h3>
            <DynamicTable data={shipments} />
          </>
        ) : (
          <p>No shipments data available.</p>
        )}
      </Modal>
    </div>
  );
};

export default CustomerCard;
