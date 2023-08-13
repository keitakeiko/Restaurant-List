const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')



// 新增餐廳頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const restaurantCreate = req.body
  
  Restaurant.create({ ...restaurantCreate, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(err))
})

// 看特定餐廳
router.get('/:id', (req, res) => {
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