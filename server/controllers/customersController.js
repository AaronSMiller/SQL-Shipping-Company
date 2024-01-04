const customerModel = require('../models/customerModels')
const db = require('../../db/database');

//good
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await customerModel.getAllCustomers();
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).send('Server error');
  }
};

//good
exports.getCustomerById = async (req, res) => {
  try {
    const { cust_id } = req.params;
    const customer = await customerModel.getCustomerById(cust_id);

    if (customer) {
      res.json(customer);
    } else {
      res.status(404).send('Customer not found');
    }
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).send('Server error');
  }
};

//good
exports.getCustomerWithHighestRevenue = async (req, res) => {
  try {
    const customer = await customerModel.getCustomerWithHighestRevenue();

    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ message: 'No customers found' });
    }
  } catch (error) {
    console.error('Error fetching the customer with the highest revenue:', error);
    res.status(500).send('Server error');
  }
};

//good
exports.getCustomerWithMostShipments = async (req, res) => {
  try {
    const customer = await customerModel.getCustomerWithMostShipments();

    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ message: 'No customers found' });
    }
  } catch (error) {
    console.error('Error fetching the customer with the most shipments:', error);
    res.status(500).send('Server error');
  }
};

//good
exports.getCustomerShipmentDetails = async (req, res) => {
  const { customerId } = req.params;

  try {
    const shipmentStats = await customerModel.getCustomerShipmentStats(customerId);
    const deliveryLocations = await customerModel.getCustomerDeliveryLocations(customerId);

    if (!shipmentStats) {
      return res.status(404).json({ message: 'No shipment data found for this customer.' });
    }

    const responseData = {
      totalShipments: shipmentStats.totalShipments,
      averageWeight: shipmentStats.averageWeight,
      deliveryLocations: deliveryLocations.map(loc => `${loc.city_name}, ${loc.state}`),
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error fetching customer shipment details:', error);
    res.status(500).send('Server error');
  }
};

//good
exports.getTrucksForCustomer = async (req, res) => {
  const { customerId } = req.params;

  try {
    const trucks = await customerModel.getTrucksForCustomer(customerId);

    if (trucks.length > 0) {
      res.json(trucks);
    } else {
      res.status(404).json({ message: 'No trucks found for this customer' });
    }
  } catch (error) {
    console.error('Error fetching trucks for customer:', error);
    res.status(500).send('Server error');
  }
};

//good
exports.getDriversForCustomer = async (req, res) => {
  const { customerId } = req.params;

  try {
    const mostUsedDriver = await customerModel.getMostUsedDriverForCustomer(customerId);

    if (mostUsedDriver) {
      res.json(mostUsedDriver);
    } else {
      res.status(404).json({ message: 'No drivers found for this customer' });
    }
  } catch (error) {
    console.error('Error fetching the most used driver for customer:', error);
    res.status(500).send('Server error');
  }
};

//good
exports.createCustomer = async (req, res) => {
  try {
    const { cust_name, cust_type, address, city, state, zip, phone, annual_revenue } = req.body;

    // Check for an existing customer with the same name to prevent duplicates
    const isDuplicateName = await customerModel.checkDuplicateCustomerName(cust_name);

    if (isDuplicateName) {
      return res.status(409).json({ message: 'A customer with this name already exists.' });
    }

    // If no duplicate name, proceed to insert the new customer
    const cust_id = await customerModel.createCustomer(req.body);

    // Send back the ID of the newly created customer
    res.status(201).json({ cust_id });
  } catch (error) {
    console.error('Error creating new customer:', error);
    res.status(500).json({ message: 'Error creating new customer' });
  }
};

exports.deleteCustomer = async (req, res) => {
  const { cust_id } = req.params;

  try {
    const affectedRows = await customerModel.deleteCustomer(cust_id);

    if (affectedRows === 0) {
      console.log('No customer found with cust_id:', cust_id);
      return res.status(404).json({ message: 'Customer not found.' });
    }

    res.status(200).json({ message: 'Customer deleted successfully.' });
  } catch (error) {
    console.error('Error in delete operation:', error);
    res.status(500).json({ message: 'Failed to delete customer.', error: error.message });
  }
};





