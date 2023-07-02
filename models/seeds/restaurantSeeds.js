const mongoose = require('mongoose')
const Restaurant = require('../restaurant') // 載入 model
const restaurantList = require('../../restaurant.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  

  Restaurant.create(restaurantList.results)

  // console.log(restaurantList.results)
  // DB 需建齊全，不然會找不到資料
  // for ( let i = 0; i < restaurantList.length; i++) {
  //   Restaurant.create({
  //     image: `${Restaurant.image}`,
  //     name:`${Restaurant.name}`,
  //     category: `${Restaurant.category}`,
  //     rating: `${Restaurant.rating}`
  //   })
  // }
  console.log('done')
})