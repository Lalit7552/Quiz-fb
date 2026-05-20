const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// GET /api/contacts/active - Get all active contacts
router.get('/active', async (req, res) => {
  try {
    const contacts = await Contact.find({ active: true });
    res.json({ contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/contacts - Get all contacts (admin only, but for now public)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/contacts - Add a new contact
router.post('/', async (req, res) => {
  try {
    const { type, value, active } = req.body;
    const contact = new Contact({ type, value, active });
    await contact.save();
    res.status(201).json({ message: 'Contact added successfully', contact });
  } catch (error) {
    console.error('Error adding contact:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/contacts/:id - Update a contact
router.put('/:id', async (req, res) => {
  try {
    const { type, value, active } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { type, value, active },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact updated', contact });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/contacts/:id - Delete a contact
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
