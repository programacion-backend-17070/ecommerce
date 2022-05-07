const Router = require("express").Router
const auth = require("../middlewares/auth.middleware")

const router = Router()

router.get("/", auth, (req, res) => {

  const { firstname, lastname } = req.user

  res.render("index", { name: `${firstname} ${lastname}` })
})

router.get("/carrito", auth, (req, res) => {

  const { firstname, lastname } = req.user

  res.render("carrito")
})

router.get("/pedido", auth, (req, res) => {

  const { firstname, lastname } = req.user

  res.render("pedido")
})

module.exports = router