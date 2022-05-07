const Router = require("express").Router
const auth = require("../middlewares/auth.middleware")
const passport = require('passport')

const router = Router()

router.get("/login", (req, res) => res.render("login"))
router.get("/register", (req, res) => res.render("register"))

router.post('/register', passport.authenticate('register', {
  successRedirect: '/',
  failureRedirect: '/register',
  failureFlash: true
}))

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

router.get("/logout", auth, (req, res) => {
  const { firstname, lastname } = req.user

  req.logOut()
  res.render("logout", { name: `${firstname} ${lastname}` }) // despues de aqui el backend no puede hacer mas nada
})

module.exports = router