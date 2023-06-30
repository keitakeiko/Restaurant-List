const mongoose = require('mongoose')
const Restaurant = require('../restaurant') // 載入 model
const restaurantList = require('../../restaurant.json')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')

  // Restaurant.create(restaurantList.results)

  for ( let i = 0; i < restaurantList.length; i++) {
    Restaurant.create({
      image: `${Restaurant.image}`,
      name:`${Restaurant.name}`,
      category: `${Restaurant.category}`,
      rating: `${Restaurant.rating}`
    })
  }
  console.log('done')
})