// 專門管理首頁
// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 Restaurant model
const Restaurant = require('../../models/restaurant')

// 瀏覽全部餐廳
router.get('/', (req, res) => {
  const sort = req.query.sort
  const userId = req.user._id // 變數設定
  Restaurant.find({ userId }) // 加入查詢條件
    .lean()
    .sort(`${sort}`)
    .then( restaurants => res.render('index', { restaurants: restaurants, sort: sort }))
    .catch(error => console.log(error)) //錯誤處理
})

// 搜尋餐廳
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .then(restaurants => {

    })
  const filteredRestaurants = restaurants.results.filter(item => {
    item.name.toLowerCase().includes(keyword) || 
    item.name_en.toLowerCase().includes(keyword) || 
    item.category.toLowerCase().includes(keyword)
        
  })
  res.render('index', { 
    restaurants: filteredRestaurants, 
    keyword: req.query.keyword 
  })
})

module.exports = router