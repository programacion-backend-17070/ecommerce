const { Router } = require('express')
const ModelFactory = require('../models/model.factory')
// const userModel = require('../models/user')

const userModel = ModelFactory.getModel('user')
const cartModel = require('../models/cart.model')

const router = new Router()

router.get('/', async (req, res) => res.send(await userModel.getAll()))

router.get('/current', async (req, res) => {
  if (!req.session) {
    return res.sendStatus(404)
  }

  const userId = req.session.passport.user
  const user = await userModel.getById(userId)
  const cart = await cartModel.getByUser(userId)

  return res.send({
    ...user,
    cartId: cart.id,
  })
})

router.get('/:id', async (req, res) => {
  const userId = req.params.id
  if (!userId) {
    return res.sendStatus(404)
  }

  const user = await userModel.getById(userId)
  const cart = await cartModel.getByUser(userId)

  return res.send({
    ...user,
    cartId: cart.id,
  })
})

module.exports = router
