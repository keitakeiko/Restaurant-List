const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/users')

module.exports = app => {
  // 初始化 passport 模組程式碼
  app.use(passport.initialize())
  app.use(passport.session())

  // 設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email'}, (email, password , done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null. false, { message: 'This email is not registered before.' })
        }
        if (user.password !== password) {
          return done(null, false, { message: 'Email or password incorrect.' })
        }
        return done(null, user)
      })
      .catch(err => console.log(err))
  }))

  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(_id)
      .lean()
      .then(user => done(null, user))
      .catch(err => console.log(err, null))
  })
}