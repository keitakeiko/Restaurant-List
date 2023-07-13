module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {  // isAuthenticated() 是函式，回傳 true / false
      return next()
    }
    // if ( !email || !password) {
    //   req.flash('warning_msg', '所有欄位都是必填唷!')
    // }
    req.flash('warning_msg', '先登入才能使用唷！')
    res.redirect('/users/login')
  }
}