const Router = require("express").Router
const auth = require("../middlewares/auth.middleware")
const productModel = require('../models/product.model')

const router = Router()

router.get("/", auth, (req, res) => {

  const { firstname, lastname } = req.user

  res.render("admin/index", { name: `${firstname} ${lastname}` })
})

router.get("/users", auth, (req, res) => res.render("admin/table", { title: "Usuarios", add: "/admin/add/user"} ))

router.get("/products", auth, async (req, res) => {
  const products = await productModel.getAll()
  console.log(products)
  res.render("admin/table", { title: "Productos", add: "/admin/add/product", products } )
})

router.get("/pedidos", auth, (req, res) => res.render("admin/table", { title: "Pedidos"} ))
router.get("/add/product", auth, (req, res) => res.render("admin/productAdd"))
router.post("/add/product", auth, async (req, res) => {
  const { body } = req
  try {
    await productModel.save(body)
    res.render("admin/success")
  } catch(error) {
    res.render("admin/error", { error })
  }
})
router.get("/add/user", auth, (req, res) => res.render("admin/userAdd"))


module.exports = router