import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DynamicTable from '../Table/DynamicTable'

const CustomerDetails = ({ customerId, customerName }) => {
  const [customerDetails, setCustomerDetails] = useState({
    totalShipments: 0,
    averageShipmentWeight: 0,
    deliveryLocations: [],
    mostUsedTruckType: [],
    mainDriver: {},
    shipments: []
  });



  useEffect(() => {
    if (customerId) {
      const fetchCustomerDetails = async () => {
        try {
          const shipmentResponse = await axios.get(`/api/customers/${customerId}/shipments`);
          const truckResponse = await axios.get(`/api/customers/${customerId}/trucks`);
          const driverResponse = await axios.get(`/api/customers/${customerId}/drivers`);
          const shipmentListResponse = await axios.get(`/api/shipments/customer/${customerId}`)


          setCustomerDetails(prevDetails => ({
            ...prevDetails,
            totalShipments: shipmentResponse.data.totalShipments,
            averageShipmentWeight: shipmentResponse.data.averageWeight,
            deliveryLocations: shipmentResponse.data.deliveryLocations,
            mostUsedTruckType: truckResponse.data,
            mainDriver: driverResponse.data,
            shipments: shipmentListResponse.data
          }));
        } catch (error) {
          console.error('Error fetching customer details:', error);
        }
      };

      fetchCustomerDetails();
    }
  }, [customerId]);

  const mostUsedTruck = customerDetails.mostUsedTruckType.length > 0
    ? customerDetails.mostUsedTruckType[0]
    : null;

  // Format the main driver's full name
  const mainDriverFullName = customerDetails.mainDriver
    ? `${customerDetails.mainDriver.first_name} ${customerDetails.mainDriver.last_name}`
    : 'N/A';

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
      <p>Main Driver: {mainDriverFullName} (Total Shipments: {customerDetails.mainDriver.shipment_count})</p>
      <DynamicTable data={customerDetails.shipments}/>
    </div>
  );
}

export default CustomerDetails;
