const userModel = require('./user')

class ModelFactory {
  static getModel(name) {
    switch (name) {
      case 'user':
        return userModel
      default:
        throw new Error('Unknown model')
    }
  }
}

module.exports = ModelFactory
