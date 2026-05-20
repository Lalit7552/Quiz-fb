const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['whatsapp', 'telegram', 'instagram', 'facebook', 'email', 'phone']
  },
  value: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
