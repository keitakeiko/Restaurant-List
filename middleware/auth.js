module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {  // isAuthenticated() 是函式
      return next()
    }
    res.redirect('/users/login')
  }
}