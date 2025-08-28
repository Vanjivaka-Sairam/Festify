const mongoose = require('mongoose');


const attendanceLogSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
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
  markerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Scan details
  scanData: {
    token: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    location: {
      latitude: Number,
      longitude: Number
    },
    device: String,
    ipAddress: String
  },
  // Verification result
  isValid: {
      type: Boolean,
      required: true
    },
}, {
  timestamps: true
});

 const attendanceLog = mongoose.model("attendanceLog", attendanceLogSchema);
 module.exports = {attendanceLog};