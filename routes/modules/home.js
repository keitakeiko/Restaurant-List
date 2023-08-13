// 專門管理首頁
// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 Restaurant model
const Restaurant = require('../../models/restaurant')


// 瀏覽全部餐廳
router.get('/', (req, res) => {
  // const sort = req.query.sort
  const userId = req.user._id // 變數設定
  Restaurant.find({ userId }) // 加入查詢條件
    .lean()
    // .sort(`${sort}`)
    .sort({ _id: 'asc' })
    // .then( restaurants => res.render('index', { restaurants: restaurants, sort: sort }))
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error)) //錯誤處理
})

// 搜尋餐廳
router.get('/search', (req, res) => {
  const {keywords, sort} = req.query
  const userId = req.user._id
  function generateSort(sortWay) {
    switch (sort) {
    case "1":
      return { name: 'asc' }
    case "2":
      return { name: 'desc' }
    default:
      return { _id: 'asc' }
    }
  }
  
  Restaurant.find({ userId })
    .lean()
    .sort(generateSort(sort))
    .then(restaurants => 
      restaurants.filter(item => item.name.toLowerCase().includes(keywords.trim().toLowerCase()))
    )
    .then(restaurants => res.render('index', { 
        restaurants, 
        keywords
      }))

    .catch(error => console.log(error))
})

module.exports = router