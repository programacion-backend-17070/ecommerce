const { Router } = require('express')
const productModel = require('../models/product.model')

const authJwt = require('../middlewares/jwt.middleware')

const router = new Router()

router.get('/', authJwt, async (req, res) =>
  res.send(await productModel.getAll())
)
router.get('/:id', async (req, res) => {
  if (!req.params.id) {
    return res.sendStatus(404)
  }
  const product = await productModel.getById(req.params.id)

  if (!product) {
    return res.sendStatus(404)
  }

  return res.send(product)
})
router.post('/', async (req, res) => {
  const { body } = req

  const newProductId = await productModel.save(body)

  return res.status(201).send(newProductId)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.sendStatus(404)
  }

  await productModel.delete(id)

  return res.sendStatus(200)
})

module.exports = router
