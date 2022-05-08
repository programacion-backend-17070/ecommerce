const { Router } = require('express');
const pedidoModel = require('../models/pedido.model')
const userModel = require('../models/user.model')

const twilioSender = require('../notifications/twilio')

const router = new Router();

router.post('/:pedidoId', async (req, res) => {
  const pedidoId = req.params.pedidoId
  if (!pedidoId) {
    return res.sendStatus(404)
  }

  const pedido = await pedidoModel.getById(pedidoId)
  const user = await userModel.getById(pedido.userId)

  try {
    await pedidoModel.updateEnviarPedido(pedidoId, false)
    await twilioSender.sendSms(user.phone)
    res.sendStatus(202)
  } catch (e) {
    res.status(500).send(e)
  }
})


module.exports = router