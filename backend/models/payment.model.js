
const mongoose = require('mongoose');


const paymentSchema = new mongoose.Schema({
  registrationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Registration',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  // Payment details
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'INR'
  },
  // Gateway information
  gateway: {
    provider: {
      type: String,
      enum: ['razorpay', 'stripe', 'paypal', 'paytm'],
      required: true
    },
    transactionId: {
      type: String,
      required: true,
      unique: true
    },
    gatewayPaymentId: String, // Payment ID from gateway
    gatewayOrderId: String // Order ID from gateway
  },
  // Payment method
  method: {
    type: String,
    enum: ['upi', 'credit_card', 'debit_card', 'net_banking', 'wallet', 'cash'],
    required: true
  },
  // Payment status
  status: {
    type: String,
    enum: ['pending', 'processing', 'success', 'failed', 'cancelled', 'refunded'],
    default: 'pending'
  },
  // Timestamps
  paymentDate: Date,
  refundDate: Date,
  refundAmount: Number,
  refundReason: String,
  // Webhook data
  webhookData: mongoose.Schema.Types.Mixed,
  notes: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }

});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = { Payment };
