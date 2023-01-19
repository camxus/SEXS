
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  label: {
    type: String,
    required: false
  },
  duration: {
    type: Number,
    required: false
  },
  contagiousness: {
    type: Number,
    required: false
  },
  type: {
    type: String,
    enum: ["std", "sti"],
    required: false
  }
});

module.exports = mongoose.model('Std', userSchema);