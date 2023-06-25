// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


// setting static files
app.use(express.static('public'))


// routes setting
app.get('/', (req, res) => {
  // create a variable to store restaurantList

  // past the restaurant data into 'index' partial template
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLocaleLowerCase()) || restaurant.name_en.toLowerCase().includes(keyword.toLocaleLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  // console.log(typeof req.params.restaurant_id)
  // console.log(typeof restaurantList.results[0].id)
  const restaurant = restaurantList.results.find( restaurant => {
    return restaurant.id.toString() === req.params.restaurant_id
  })
  res.render('show', {restaurant: restaurant})
})

// start and listen on the express server
app.listen(port, () => {
  console.log(`express is listening on localhost: ${port}`)
})