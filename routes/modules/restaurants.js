const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 搜尋餐廳
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLocaleLowerCase()) || restaurant.name_en.toLowerCase().includes(keyword.toLocaleLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

// 新增餐廳頁面
router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('/', (req, res) => {
  const userId = req.user._id
  const {name, name_en, category, image, location, phone, google_map, rating, description} = req.body
  const errors = []

  if ( !name || !name_en || !category || !image || !location || !phone || !google_map || !rating || !description ) {
    errors.push({ message: '所有欄位都需要填唷!'})
  }
  if ( password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！'})
  }
  if ( errors.length ) {
    return res.render('register', {
      name,
      name_en,
      category,
      image,
      location,
      phone,
      google_map,
      rating,
      description
    })
  }
  User.findOne({ email: email }).then(user => {
    if ( user ) {
      errors.push({ message: '這個 Email 已經註冊過了!'})
      return res.render('register', {
        name,
      name_en,
      category,
      image,
      location,
      phone,
      google_map,
      rating,
      description
      })
    }
    return Restaurant.create({ userId, name, name_en, category, image, location, phone, google_map, rating, description })
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
  })
})

// 看特定餐廳
router.get('/:id', (req, res) => {
  // console.log(typeof req.params.restaurant_id)
  // console.log(typeof restaurantList.results[0].id)
  // const restaurant = restaurantList.results.find( restaurant => {
  //   return restaurant.id.toString() === req.params.restaurant_id
  // })
  // res.render('show', {restaurant: restaurant})
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id: _id, userId})
    .lean()
    .then( restaurant => res.render('show', { restaurant: restaurant }))
    .catch(error => console.log(error))
  
})

// 編輯餐廳
router.get('/:id/edit', (req, res) => {
  const userId =req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id: _id, userId}) 
    .lean()
    .then( restaurant => res.render('edit' , { restaurant: restaurant }))
})
router.put('/:id', (req, res) => {
  const userId =req.user._id
  const _id = req.params.id
  // console.log(req.body)
  const {name, name_en, category, image, location, phone, google_map, rating, description} = req.body

  return Restaurant.findOne({ _id: _id, userId })
   .then(restaurant => {
    restaurant.name = name
    restaurant.name_en = name_en 
    restaurant.category = category
    restaurant.image = image
    restaurant.location = location
    restaurant.phone = phone
    restaurant.google_map = google_map
    restaurant.rating = rating
    restaurant.description = description
    return restaurant.save()
   })
   .then(() => res.redirect(`/restaurants/${_id}`))
   .catch(error => console.log(error))
})

// 刪除餐廳資料
router.delete('/:id', (req, res) => {
  const userId =req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id: _id, userId })
  .then( restaurant => restaurant.remove())
  .then(() => res.redirect('/'))
  .catch( error => console.log(error))
})

module.exports = router