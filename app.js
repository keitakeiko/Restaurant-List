// require packages used in the project
const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport') // 載入設定檔，要寫在 express-session 以後
const exphbs = require('express-handlebars')
const methodOverride = require('method-override') // 載入 method-override
const flash = require('connect-flash') 

const restaurantList = require('./restaurant.json')
const Restaurant = require('./models/restaurant')
const routes = require('./routes') // 路徑設定為 /routes 會自動去尋找目錄下叫 index 的檔案
require('./config/mongoose')

const app = express()
const port = 3000


// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


// setting static files
app.use(session({
  secret: 'Oh!Yeah~',
  resave: false,
  saveUninitialized: true
}))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method')) // 設定每一筆請求都會透過 methodOverride 進行前置處理

// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)
app.use(flash()) 

// middleware
app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg') // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg') // 設定 warning_msg 訊息
  next()
})

app.use(routes) // 將 request 導入路由器


// start and listen on the express server
app.listen(port, () => {
  console.log(`express is listening on localhost: ${port}`)
})