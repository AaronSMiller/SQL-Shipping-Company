import React, { useState } from 'react';
import axios from 'axios';

export default function CreateCustomer() {
  const [formData, setFormData] = useState({
    cust_name: '',
    cust_type: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    annual_revenue: '', // Optional field
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
    // Check for mandatory fields, except annual_revenue
    for (const [key, value] of Object.entries(formData)) {
      if (!value && key !== 'annual_revenue') {
        alert(`Please fill in the ${key} field.`);
        return;
      }
    }

    try {
      // Assuming the API endpoint to create a customer is '/api/customers'
      const response = await axios.post('/api/customers', formData);
      console.log(response.data);
      alert('Customer created successfully!');
      // Reset form or handle success (e.g., redirect to customers list)
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
