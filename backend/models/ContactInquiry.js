const mongoose = require('mongoose');

const contactInquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  query: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('ContactInquiry', contactInquirySchema);
