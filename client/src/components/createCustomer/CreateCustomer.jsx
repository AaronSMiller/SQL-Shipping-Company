import React, { useState } from 'react';
import axios from 'axios';

export default function CreateCustomer( {fetchCustomers} ) {
  const [formData, setFormData] = useState({
    cust_name: '',
    cust_type: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    annual_revenue: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const [key, value] of Object.entries(formData)) {
      if (!value && key !== 'annual_revenue') {
        alert(`Please fill in the ${key} field.`);
        return;
      }
    }

    try {
      const response = await axios.post('/api/customers', formData);
      if (response.status === 201) {
        alert('Customer created successfully!');
        fetchCustomers(); // Refresh the customer list
        setFormData({ // Reset form data
          cust_name: '',
          cust_type: '',
          address: '',
          city: '',
          state: '',
          zip: '',
          phone: '',
          annual_revenue: '',
        });
      } else {
        console.log('Response received:', response);
        alert('Customer creation was not successful. Please check the console for more information.');
      }
    } catch (error) {
      console.error('Failed to create customer:', error);
      alert('Failed to create customer. Please try again.');
    }
  };


  return (
    <div className="container create-customer-container">
      <h2>Create Customer</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Customer Name:
          <input type="text" name="cust_name" value={formData.cust_name} onChange={handleChange} required />
        </label>
        <label>
          Customer Type:
          <input type="text" name="cust_type" value={formData.cust_type} onChange={handleChange} required />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </label>
        <label>
          City:
          <input type="text" name="city" value={formData.city} onChange={handleChange} required />
        </label>
        <label>
          State:
          <input type="text" name="state" value={formData.state} onChange={handleChange} required />
        </label>
        <label>
          ZIP:
          <input type="text" name="zip" value={formData.zip} onChange={handleChange} required />
        </label>
        <label>
          Phone:
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>
        <label>
          Annual Revenue (Optional):
          <input type="number" name="annual_revenue" value={formData.annual_revenue} onChange={handleChange} />
        </label>
        <button type="submit">Create Customer</button>
      </form>
    </div>
  );
}
