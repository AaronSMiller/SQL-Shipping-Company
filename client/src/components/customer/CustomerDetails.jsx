import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerDetails = ({ customerId, customerName}) => {
  const [customerDetails, setCustomerDetails] = useState({
    totalShipments: 0,
    averageShipmentWeight: 0,
    deliveryLocations: [],
    mostUsedTruckType: [],
    mainDriver: ''
  });

  useEffect(() => {
    if (customerId) {
      const fetchCustomerDetails = async () => {
        try {
          const shipmentResponse = await axios.get(`/api/customers/${customerId}/shipments`);
          const truckResponse = await axios.get(`/api/customers/${customerId}/trucks`);
          // const driverResponse = await axios.get(`/api/customers/${customerId}/drivers`);

          setCustomerDetails(prevDetails => ({
            ...prevDetails,
            totalShipments: shipmentResponse.data.totalShipments,
            averageShipmentWeight: shipmentResponse.data.averageWeight,
            deliveryLocations: shipmentResponse.data.deliveryLocations,
            mostUsedTruckType: truckResponse.data,
            // mainDriver: driverResponse.data.mainDriver
          }));
        } catch (error) {
          console.error('Error fetching customer details:', error);
        }
      };

      fetchCustomerDetails();
    }
  }, [customerId]);

  // Destructure the most used truck type from state
  const mostUsedTruck = customerDetails.mostUsedTruckType.length > 0
    ? customerDetails.mostUsedTruckType[0]
    : null;

  return (
    <div>
      <h2>Customer Details - {customerName}</h2>
      <p>Total Shipments: {customerDetails.totalShipments}</p>
      <p>Average Shipment Weight: {customerDetails.averageShipmentWeight} lbs</p>
      <h3>Delivery Locations:</h3>
      <ul>
        {customerDetails.deliveryLocations
          .sort()
          .map((location, index) => (
            <li key={index}>{location}</li>
          ))}
      </ul>
      {mostUsedTruck && (
        <p>Most Used Truck Type: {mostUsedTruck.make} {mostUsedTruck.model_year} (Used {mostUsedTruck.shipment_count} times)</p>
      )}
      {/* <p>Main Driver: {customerDetails.mainDriver}</p> */}
    </div>
  );
}

export default CustomerDetails;
