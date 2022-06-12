const ModelFactory = require('../../models/model.factory')
const productModel = ModelFactory.getModel('product')

module.exports = {
  createProduct: async ({ data }) => {
    return await productModel.save(data)
  },
  getAllProducts: ({ price }) => productModel.getAll(),
}