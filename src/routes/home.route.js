const Router = require("express").Router
const auth = require("../middlewares/auth.middleware")
const productModel = require('../models/product.model')
const cartModel = require('../models/cart.model')


const router = Router()

router.get("/", auth, async (req, res) => {

  const { id } = req.user

  const products = await productModel.getAll();
  const cart = await cartModel.getByUser(id);

  res.render("index", { products, cartId: cart.id })
})

router.get("/carrito", auth, async (req, res) => {

  const { id } = req.user

  const cart = await cartModel.getByUser(id)
  const products = await Promise.all(cart.products.map(pId => productModel.getById(pId)))
  const total = products.reduce((tot, p) => tot + p.price, 0)

  res.render("carrito", { cartId: cart.id, products, total })
})

router.get("/pedido", auth, (req, res) => {

  const { firstname, lastname } = req.user

  res.render("pedido")
})

module.exports = router