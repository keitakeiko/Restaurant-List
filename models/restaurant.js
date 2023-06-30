const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
  },
  location: {
    type: String,
  },
  phone: {
    type: String,
  },
  description: {
    type: String,
  }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)