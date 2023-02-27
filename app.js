// require packages used in the project
const express = require('express')
const app = express()
const port = 3000


// require express-handlebars here
const exphbs = require('express-handlebars')


// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


// setting static files
app.use(express.static('public'))


// routes setting
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/restaurants/8', (req, res) => {
  res.render('show')
})

// start and listen on the express server
app.listen(port, () => {
  console.log(`express is listening on localhost: ${port}`)
})