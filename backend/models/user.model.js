
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['attendee', 'organizer', 'marker', 'admin'],
    default: 'attendee'
  },
  // Verification related fields
  verification: {
    status: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending'
    },
    method: {
      type: String,
      enum: ['email', 'id_card_ocr', 'manual'],
      default: 'email'
    },
    proofUrl: String, // URL to uploaded ID card/proof document
    verifiedAt: Date,
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  // Profile information
  profile: {
    phone: String,
    college: String,
    department: String,
    studentId: String, // For students
    employeeId: String, // For staff/professors
    year: Number, // For students
    profilePicture: String
  },
  // Preferences
  preferences: {
    emailNotifications: {
      type: Boolean,
      default: true
    }
  },
  // Security
  refreshToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailVerificationToken: String,
  emailVerified: {
    type: Boolean,
    default: false
  }

},{timestamps: true});

const User = mongoose.model("User", userSchema);
module.exports = { User };
