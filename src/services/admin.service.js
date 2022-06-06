// const userModel = require('../models/user.model')
// const pedidoModel = require('../models/pedido.model')
const productModel = require('../models/product.model')

module.exports = {
  // getUsers: async () => {
  //   // regresar el array de usuarios
  //   // const users = await userModel.getAll()

  //   // transformacion de datos
  //   return users.map((u) => ({
  //     // eslint-disable-next-line no-underscore-dangle
  //     id: u._id.toString(),
  //     name: `${u.firstname} ${u.lastname}`,
  //     email: u.email,
  //     phone: u.phone,
  //   }))
  // },
  getStats: async () => ({
    // numPedidos: await pedidoModel.count(),
    // numUsers: await userModel.count(),
    numProducts: await productModel.count(),
  }),
  getLastProduct: async () => {
    const products = await productModel.getAll()
    return products[products.length - 1]
  },
}
