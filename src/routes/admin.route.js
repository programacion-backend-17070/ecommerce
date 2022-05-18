const Router = require("express").Router
const auth = require("../middlewares/auth.middleware")
const controller = require('../controllers/admin.controller')

const router = Router()

router.use(auth)
router.get("/", controller.main)
router.get("/users", controller.getUsers)
router.get("/products", controller.getProducts)
router.get("/pedidos", controller.getPedidos)
router.get("/add/product", controller.addProduct)
router.post("/add/product", controller.createProduct)
router.get("/add/user", controller.addUser)

module.exports = router