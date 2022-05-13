const LocalStrategy = require("passport-local").Strategy
const userModel = require("../models/user.model")
const cartModel = require("../models/cart.model")

const mailSender = require('../notifications/mail')



module.exports = (passport) => {
  const authenticateUser = async (email, password, done) => {
    try {
      if (!await userModel.existsByEmail(email)) {
        return done(null, false , { message: 'user does not exist!' })
      }

      if (!await userModel.isPasswordValid(email, password)) {
        return done(null, false , { message: 'incorrect password!' })
      }

      const user = await userModel.getByEmail(email)

      done(null, user)
    } catch (err) {
      done(err)
    }
  }

  const registerUser = async (req, email, password, done) => {
    const { fname, lname } = req.body
    try {
      if (await userModel.existsByEmail(email)) {
        return done(null, false, { message: 'user already exists!' })
      }
  
      const user = await userModel.save({
        email,
        firstname: fname,
        lastname: lname,
        password: password
      })

      await cartModel.save({ userId: user._id })
  
      console.log(user)

      // enviar email de nuevo registro
      // mailSender.newUserMail(user)
  
      done(null, user)
    } catch (err) {
      done(err)
    }
  }

  // passport.use(new LocalStrategy(options, verifyFunction)
  // registrar estrategias
  passport.use('local', new LocalStrategy({ usernameField: 'email', passwordField: 'pwd'}, authenticateUser))
  passport.use('register', new LocalStrategy({ usernameField: 'email', passwordField: 'pwd', passReqToCallback: true }, registerUser))

  // serializar usuario
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser(async (id, done) => done(null, await userModel.getById(id)))
}