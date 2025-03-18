// app/models/Log.js
import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: String,
    required: false
  },
  userName: {
    type: String,
    required: false
  },
  userEmail: {
    type: String,
    required: false
  },
  userRole: {
    type: String,
    required: false
  },
  action: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  requestData: {
    type: Object,
    required: false
  },
  responseData: {
    type: Object,
    required: false
  },
  error: {
    type: String,
    required: false
  },
  details: {
    type: Object,
    required: false
  }
}, { timestamps: true });

// Create indexes for faster queries
LogSchema.index({ timestamp: -1 });
LogSchema.index({ userId: 1 });

const Log = mongoose.models.Log || mongoose.model('Log', LogSchema);

export default Log;