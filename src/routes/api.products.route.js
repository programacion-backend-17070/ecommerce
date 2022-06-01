const { Router } = require('express')
const productModel = require('../models/product.model')

const router = new Router()

router.get('/', async (req, res) => res.send(await productModel.getAll()))
router.get('/:id', async (req, res) => {
  if (!req.params.id) {
    return res.sendStatus(404)
  }

  return res.send(await productModel.getById(req.params.id))
})
router.post('/', async (req, res) => {
  const { body } = req.body

  const newProduct = await productModel.save(body)

  return res.status(201).send(newProduct)
})
router.delete('/:id', async (req, res) => {
  if (!req.params.id) {
    return res.sendStatus(404)
  }

  await productModel.delete(req.params.id)

  return res.sendStatus(200)
})

module.exports = router
