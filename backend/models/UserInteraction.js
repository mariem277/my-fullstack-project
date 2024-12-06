const mongoose = require('mongoose');

const UserInteractionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  featureUsed: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
  metadata: {
    device: {
      type: String,
      required: true,
    },
    browser: {
      type: String,
      required: true,
    },
  },
});

// Create a Mongoose model
const UserInteraction = mongoose.model('UserInteraction', UserInteractionSchema);

module.exports = UserInteraction;
