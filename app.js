// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override') // 載入 method-override

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
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method')) // 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(routes) // 將 request 導入路由器


// start and listen on the express server
app.listen(port, () => {
  console.log(`express is listening on localhost: ${port}`)
})