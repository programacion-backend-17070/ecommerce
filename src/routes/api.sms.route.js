const { Router } = require('express');
const pedidoModel = require('../models/pedido.model')
const twilioSender = require('../notifications/twilio')

const router = new Router();

// /api/sms/218358230593
router.post('/:pedidoId', async (req, res) => {
  const pedidoId = req.params.pedidoId
  if (!pedidoId) {
    return res.sendStatus(404)
  }

  try {
    await pedidoModel.updateEnviarPedido(pedidoId, true)

    twilioSender.sendWhatsapp()
    res.sendStatus(202)
  } catch (e) {
    res.status(500).send(e)
  }
})


module.exports = router