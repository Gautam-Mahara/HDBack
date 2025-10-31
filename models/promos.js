const mongoose = require('mongoose');

const promoSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  // Either percentage OR fixed amount
  discountPercentage: {
    type: Number,
    min: 0,
    max: 100
  },
  discountAmount: {
    type: Number,
    min: 0
  },

  validTill: {
    type: Date,
    required: true
  },

  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Custom validation: ensure only one of the two is set
promoSchema.pre('validate', function (next) {
  if (!this.discountPercentage && !this.discountAmount) {
    return next(new Error('Either discountPercentage or discountAmount must be provided'));
  }
  if (this.discountPercentage && this.discountAmount) {
    return next(new Error('Only one of discountPercentage or discountAmount can be set'));
  }
  next();
});

module.exports = mongoose.model('Promo', promoSchema);
