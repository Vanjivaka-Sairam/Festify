
const mongoose = require('mongoose');


const registrationSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // QR Code details
  qrCode: {
    token: {
      type: String,
      required: true,
      unique: true
    },
    qrImageUrl: String, // Generated QR code image URL
  },
  // Registration status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },

  attendance: {
    attended: {
      type: Boolean,
      default: false
    },
    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    markedAt: Date,
    location: String, // GPS coordinates or venue confirmation
    method: {
      type: String,
      enum: ['qr_scan', 'manual'],
      default: 'qr_scan'
    }
  },


}, {
  timestamps: true,

});

const Registration = mongoose.model("Registration", registrationSchema);
module.exports = { Registration };
