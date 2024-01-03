//

import axios from 'axios';

const BASE_URL = 'http://localhost:5050/api/customers';

// Get all customers
const getAllCustomers = () => {
  return axios.get(BASE_URL);
};

// // Get a single customer by ID
// const getCustomerById = (id) => {
//   return axios.get(`${BASE_URL}/${id}`);
// };

// // Create a new customer
// const createCustomer = (customerData) => {
//   return axios.post(BASE_URL, customerData);
// };

// // Update an existing customer by ID
// const updateCustomer = (id, customerData) => {
//   return axios.put(`${BASE_URL}/${id}`, customerData);
// };

// // Delete a customer by ID
// const deleteCustomer = (id) => {
//   return axios.delete(`${BASE_URL}/${id}`);
// };

// Get shipments by Customer ID
const getShipmentsByCustomerId = (cust_id) => {
  return axios.get(`http://localhost:5050/api/shipments/customer/${cust_id}`);
};

export default {
  getAllCustomers,
  // getCustomerById,
  // createCustomer,
  // updateCustomer,
  // deleteCustomer,
  getShipmentsByCustomerId
};
