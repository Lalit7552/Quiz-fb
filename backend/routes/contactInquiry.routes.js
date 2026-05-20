const express = require('express');
const router = express.Router();
const ContactInquiry = require('../models/ContactInquiry');

// POST /api/contact-inquiries - Submit a contact inquiry
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, city, query } = req.body;
    const inquiry = new ContactInquiry({ name, phone, email, city, query });
    await inquiry.save();
    res.status(201).json({ message: 'Inquiry submitted successfully' });
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/contact-inquiries - Get all inquiries (admin only, but for now public)
router.get('/', async (req, res) => {
  try {
    const inquiries = await ContactInquiry.find().sort({ createdAt: -1 });
    res.json({ inquiries });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/contact-inquiries/:id - Delete an inquiry
router.delete('/:id', async (req, res) => {
  try {
    const inquiry = await ContactInquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    res.json({ message: 'Inquiry deleted' });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
