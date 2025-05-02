const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: Number,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['single', 'double', 'deluxe'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  checkAvailability: {
    type: String,
    enum:['Available','Unavailable'],
    default:'Available',
  },
  features: {
    type: [String],
    enum: ['AC', 'WiFi', 'TV'],
    default: ['AC', 'WiFi']
  },
  user:{
     type: mongoose.Schema.Types.ObjectId,
     ref: "user",
     required: true,
   },
});

module.exports = mongoose.model('Room', roomSchema);
