const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// List All Customers
router.get('/', async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

// Add
router.post('/', async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Edit
router.put('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;

