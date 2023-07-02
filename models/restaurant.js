const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  image: {
    type: String,
  },
  name: {
    type: String,   
  },
  name_en: {
    type: String,    
  },
  category: {
    type: String,
    
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
  google_map: {
    type: String,    
  },
  description: {
    type: String,
  }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)