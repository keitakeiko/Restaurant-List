// 專門管理首頁
// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 Restaurant model
const Restaurant = require('../../models/restaurant')

// 瀏覽全部餐廳
router.get('/', (req, res) => {
  const userId = req.user._id // 變數設定
  Restaurant.find({ userId }) // 加入查詢條件
    .lean()
    .sort({ _id: 'asc' })
    .then( restaurants => res.render('index', { restaurants: restaurants }))
    .catch(error => console.log(error)) //錯誤處理
})

module.exports = router