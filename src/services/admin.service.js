const userModel = require('../models/user.model')
const pedidoModel = require('../models/pedido.model')
const productModel = require('../models/product.model')

module.exports = {
  getUsers: async () => {
    // regresar el array de usuarios
    const users = await userModel.getAll()

    // transformacion de datos
    return users.map((u) => ({
      id: u._id.toString(),
      name: `${u.firstname} ${u.lastname}`,
      email: u.email,
      phone: u.phone
    }))
  },
  getStats: async () => {
    // integracion con la capa de persistencia
    return {
      numPedidos: await pedidoModel.count(),
      numUsers: await userModel.count(),
      numProducts: await productModel.count(),
    }
  }
}
