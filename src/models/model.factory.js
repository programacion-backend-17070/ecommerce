const userModel = require('./user.model')
const pedidoModel = require('./pedido.model')

// abstract factory
class ModelFactory {
  static getModel(modelName) {
    switch (modelName) {
      case 'user':
        return userModel
      case 'pedido':
        return pedidoModel
      case 'cart':
        return pedidoModel
      // un case por cada modelo
      default:
        throw new Error('modelo no existe')
    }
  }
}

module.exports = ModelFactory
