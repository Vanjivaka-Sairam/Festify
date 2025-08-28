
const mongoose = require('mongoose');


const feedbackSchema = new mongoose.Schema({
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
  registrationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Registration',
    required: true
  },

  // Text feedback
  feedback: {
    rating: Number,
    comments: String
  },
}, {
  timestamps: true,

});

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = { Feedback };
