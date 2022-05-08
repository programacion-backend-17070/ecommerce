
const { Schema, model, Types } = require("mongoose")

class Product {
  constructor() {
    const schema = new Schema({
      userId: String,
      products: { type: [String], default: [] }
    })

    this.model = model("cart", schema)
  }

  async getAll() {
    const data = await this.model.find({})
      .lean()
    
    return data.map((cart) => ({
      id: cart._id.toString(),
      userId: cart.userId,
      products: cart.products
    }))
  }

  async save(obj) {
    const cart = await this.model.create(obj)
    return {
      id: cart._id.toString(),
      userId: cart.userId,
      products: cart.products
    }
  }


  async delete(id) {
    return await this.model.deleteOne({ _id: Types.ObjectId(id) })
  }

  async getById(id) {
    const cart =  await this.model.findById(Types.ObjectId(id)).lean()
    return {
      id: cart._id.toString(),
      userId: cart.userId,
      products: cart.products
    }
  }

  async getByUser(id) {
    const cart =  await this.model.findOne({ userId: id }).lean()
    
    if (!cart) {
      return {}
    }

    return {
      id: cart._id.toString(),
      userId: cart.userId,
      products: cart.products
    }
  }

  async addProduct(id, productId) {
    const cart =  await this.model.findById(Types.ObjectId(id))
    if (cart.products.includes(productId)) {
      return
    }

    cart.products.push(productId)

    await cart.save()
  }

  async removeProduct(id, productId) {
    const cart =  await this.model.findById(Types.ObjectId(id))
    if (!cart.products.includes(productId)) {
      return
    }

    cart.products = cart.products.filter(pId => pId != productId)

    await cart.save()
  }

  async emptyCartByUser(userId) {
    const cart =  await this.model.findOne({ userId })

    cart.products = []

    await cart.save()
  }
}

module.exports = new Product()