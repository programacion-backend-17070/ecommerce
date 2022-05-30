const userModel = require('./user.model')
const pedidoModel = require('./pedido.model')

class ModelFactory {
  static getModel(modelName) {
    switch (modelName) {
      case 'user':
        return userModel
      case 'pedido':
        return pedidoModel
      default:
        throw new Error('modelo no existe')
    }
  }
}

module.exports = ModelFactory

// ModelFactory.getModel('user')
