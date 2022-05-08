

const { Schema, model, Types } = require("mongoose")
const moment = require('moment')

class Pedido {
  constructor() {
    const schema = new Schema({
      userId: String,
      total: { type: Number, default: 0 },
      created: { type: Date, default: Date.now },
      enviado: Boolean
    })

    this.model = model("pedido", schema)
  }

  async getAll() {
    const data = await this.model.find({})
      .lean()
    
    return data.map((pedido) => ({
      id: pedido._id.toString(),
      userId: pedido.userId,
      total: pedido.total,
      created: moment(pedido.created).format('DD-MM-YYYY HH:mm'),
      enviado: pedido.enviado
    }))
  }

  async save(obj) {
    const pedido = await this.model.create(obj)
    return {
      id: pedido._id.toString(),
      userId: pedido.userId,
      total: pedido.total,
      created: moment(pedido.created).format('DD-MM-YYYY HH:mm'),
      enviado: pedido.enviado
    }
  }

  async delete(id) {
    return await this.model.deleteOne({ _id: Types.ObjectId(id) })
  }

  async getById(id) {
    const pedido =  await this.model.findById(Types.ObjectId(id)).lean()
    return {
      id: pedido._id.toString(),
      userId: pedido.userId,
      total: pedido.total,
      created: moment(pedido.created).format('DD-MM-YYYY HH:mm'),
      enviado: pedido.enviado
    }
  }

  async getByUser(id) {
    const pedido =  await this.model.findOne({ userId: id }).lean()
    
    if (!pedido) {
      return {}
    }

    return {
      id: pedido._id.toString(),
      userId: pedido.userId,
      total: pedido.total,
      created: moment(pedido.created).format('DD-MM-YYYY HH:mm'),
      enviado: pedido.enviado
    }
  }
}

module.exports = new Pedido()