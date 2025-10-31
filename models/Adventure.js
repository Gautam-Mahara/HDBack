const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  totalSeats: { type: Number, required: true, default: 10 }, // total seats per slot
  availableSeats: { type: Number, required: true, default: 10 }, // dynamic availability
});

const adventureSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true, trim: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String },
  slots: [slotSchema],
}, { timestamps: true });

const Adventure = mongoose.model('Adventure', adventureSchema);
module.exports = Adventure;
