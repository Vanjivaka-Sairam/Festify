
const mongoose = require('mongoose');



const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  },
  // Notification content
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  message: {
    type: String,
    required: true,
    maxlength: 500
  },
  type: {
    type: String,
    enum: ['event_reminder', 'registration_confirmation', 'payment_success', 'event_update', 'attendance_marked', 'general'],
    required: true
  },
  // Delivery status
  channels: {
    app: {
      sent: {
        type: Boolean,
        default: false
      },
      read: {
        type: Boolean,
        default: false
      },
      readAt: Date
    },
    email: {
      sent: {
        type: Boolean,
        default: false
      },
      sentAt: Date,
      opened: {
        type: Boolean,
        default: false
      }
    },
    sms: {
      sent: {
        type: Boolean,
        default: false
      },
      sentAt: Date
    }
  },
  // Scheduling
  scheduledFor: Date,
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }

});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = { Notification };
