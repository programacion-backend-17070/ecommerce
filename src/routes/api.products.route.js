const { Router } = require('express');
const productModel = require('../models/product.model')

const router = new Router();

router.get('/', async (req, res) => res.send(await productModel.getAll()))
router.get('/:id', async (req, res) => {
  if (!req.params.id) {
    return res.sendStatus(404)
  }
   
  res.send(await productModel.getById(req.params.id))
})

module.exports = router