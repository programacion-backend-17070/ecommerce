const { Router } = require('express');
const cartModel = require('../models/cart.model')

const router = new Router();

router.get('/', async (req, res) => res.send(await cartModel.getAll()))

router.get('/:id', async (req, res) => {
  if (!req.params.id) {
    return res.sendStatus(404)
  }

  const cart = await cartModel.getById(req.params.id)
   
  res.send(cart)
})

router.post('/:id/:productId', async (req, res) => {
  const id = req.params.id
  const productId = req.params.productId

  if (!id) {
    return res.sendStatus(404)
  }

  if (!productId) {
    return res.sendStatus(404)
  }

  await cartModel.addProduct(id, productId)
   
  res.sendStatus(200)
})

router.delete('/:id/:productId', async (req, res) => {
  const id = req.params.id
  const productId = req.params.productId

  if (!id) {
    return res.sendStatus(404)
  }

  if (!productId) {
    return res.sendStatus(404)
  }

  await cartModel.removeProduct(id, productId)
   
  res.sendStatus(200)
})

module.exports = router