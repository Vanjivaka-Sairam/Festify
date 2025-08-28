
const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Event details
  eventDetails: {
    date: {
      type: Date,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    venue: {
      type: String,
      required: true,
      maxlength: 200
    },
    capacity: {
      type: Number,
      min: 1
    }
  },
  // Registration settings
  registration: {
    isOpen: {
      type: Boolean,
      default: true
    },
    deadline: Date,
    requiresApproval: {
      type: Boolean,
      default: false
    },
    allowCrossCollege: {
      type: Boolean,
      default: true
    },
    fee: {
      amount: {
        type: Number,
        default: 0,
        min: 0
      },
      required: {
        type: Boolean,
        default: false
      }
    }
  },
  // Event status and approval
  status: {
    type: String,
    enum: ['draft', 'pending', 'approved', 'completed', 'cancelled'],
    default: 'draft'
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: Date,
  banner : String,
  
  // Attendance markers assigned to this event
  attendanceMarkers: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  // Event statistics
  stats: {
    registrations: {
      type: Number,
      default: 0
    },
    attended: {
      type: Number,
      default: 0
    },
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
      },
      count: {
        type: Number,
        default: 0
      }
    }
  }
}, {
  timestamps: true,

});

const Event = mongoose.model("Event", eventSchema);
module.exports = { Event };
