const Router = require("express").Router
const auth = require("../middlewares/auth.middleware")

const router = Router()

router.get("/", auth, (req, res) => {

  const { firstname, lastname } = req.user

  res.render("admin/index", { name: `${firstname} ${lastname}` })
})

router.get("/users", auth, (req, res) => res.render("admin/table", { title: "Usuarios", add: "/admin/add/user"} ))
router.get("/products", auth, (req, res) => res.render("admin/table", { title: "Productos", add: "/admin/add/product"} ))
router.get("/pedidos", auth, (req, res) => res.render("admin/table", { title: "Pedidos"} ))
router.get("/add/product", auth, (req, res) => res.render("admin/productAdd"))
router.post("/add/product", auth, (req, res) => res.render("admin/success"))
router.get("/add/user", auth, (req, res) => res.render("admin/userAdd"))


module.exports = router