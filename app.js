// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const mongoose = require('mongoose')
const methodOverride = require('method-override') // 載入 method-override

const Restaurant = require('./models/restaurant')

const app = express()
const port = 3000

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// connect to mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) 
const db = mongoose.connection // 取得資料庫連線狀態

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected')
})

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


// setting static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method')) // 設定每一筆請求都會透過 methodOverride 進行前置處理

// 瀏覽全部餐廳
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then( restaurants => res.render('index', { restaurants: restaurants }))
    .catch(error => console.log(error)) //錯誤處理
})

// 搜尋餐廳
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLocaleLowerCase()) || restaurant.name_en.toLowerCase().includes(keyword.toLocaleLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

// 新增餐廳頁面
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})
app.post('/restaurants', (req, res) => {
  const name = req.body.name
  return Restaurant.create({ name })
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})

// 看特定餐廳
app.get('/restaurants/:id', (req, res) => {
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
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id) 
    .lean()
    .then( restaurant => res.render('edit' , { restaurant: restaurant }))
})
app.put('/restaurants/:id', (req, res) => {
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
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
  .then( restaurant => restaurant.remove())
  .then(() => res.redirect('/'))
  .catch( error => console.log(error))
})

// start and listen on the express server
app.listen(port, () => {
  console.log(`express is listening on localhost: ${port}`)
})