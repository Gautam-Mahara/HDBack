const mongoose = require('mongoose');

const bookedSlotSchema = new mongoose.Schema({
  adventureId: String,
  date: String,
  time: String,
  email: String,
  name: String,
  seatsBooked: Number,
  bookingNumber: {
    type: String,
    default: function() {
      // Generate a unique booking number
      return 'BK' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('BookedSlot', bookedSlotSchema);