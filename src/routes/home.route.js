const Router = require("express").Router
const auth = require("../middlewares/auth.middleware")
const productModel = require('../models/product.model')
const cartModel = require('../models/cart.model')
const pedidoModel = require('../models/pedido.model')


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

router.get("/pedido", auth, async (req, res) => {

  const { id, email } = req.user
  const context = { sent: false }

  const cart = await cartModel.getByUser(id)
  const products = await Promise.all(cart.products.map(pId => productModel.getById(pId)))
  const total = products.reduce((tot, p) => tot + p.price, 0)

  try {
    await pedidoModel.save({
      userId: id,
      total
    })
    await cartModel.emptyCartByUser(id)
    context.sent = true
  } catch (e) {
    console.log(e)
  }

  res.render("pedido", context)
})

module.exports = router