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
router.get('/restaurants/new', (req, res) => {
  return res.render('new')
})
router.post('/restaurants', (req, res) => {
  const name = req.body.name
  return Restaurant.create({ name })
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})

// 看特定餐廳
router.get('/restaurants/:id', (req, res) => {
  // console.log(typeof req.params.restaurant_id)
  // console.log(typeof restaurantList.results[0].id)
  // const restaurant = restaurantList.results.find( restaurant => {
  //   return restaurant.id.toString() === req.params.restaurant_id
  // })
  // res.render('show', {restaurant: restaurant})
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then( restaurant => res.render('show', { restaurant: restaurant }))
    .catch(error => console.log(error))
  
})

// 編輯餐廳
router.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id) 
    .lean()
    .then( restaurant => res.render('edit' , { restaurant: restaurant }))
})
router.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  // console.log(req.body)
  const {name, name_en, category, image, location, phone, google_map, rating, description} = req.body

  return Restaurant.findById(id)
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
   .then(() => res.redirect(`/restaurants/${id}`))
   .catch(error => console.log(error))
})

// 刪除餐廳資料
router.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
  .then( restaurant => restaurant.remove())
  .then(() => res.redirect('/'))
  .catch( error => console.log(error))
})

module.exports = router