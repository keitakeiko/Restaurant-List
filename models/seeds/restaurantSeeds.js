const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const User = require('../users')
const Restaurant = require('../restaurant') // 載入 model
const restaurantList = require('../../restaurant.json').results // 一堆陣列
const seedUser = require('../../user.json')
const db = require('../../config/mongoose')


db.once('open', ()=>{
  Promise.all(
    seedUser.map(seedUser =>{
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(seedUser.password, salt))
        .then(hash => {
          return User.create({
            name: seedUser.name,
            email: seedUser.email,
            password: hash
          })
          .catch(err => console.log(err))
        })
        .then(user =>{
          const userId = user._id
          const userRestaurants = seedUser.userRestaurants.map(item =>{
            return Object.assign(restaurantList[item-1],{ userId })
          })
          return userRestaurants
        })
        .then(userRestaurants => {
          return Restaurant.create(userRestaurants)
          .catch(err => console.log(err))
        })
    })
  )
    .then(() => {
      console.log('done.')
      process.exit()
    })
})
    

  

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
 