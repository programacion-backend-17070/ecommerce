
const { Schema, model, Types } = require("mongoose")

class Product {
  constructor() {
    const schema = new Schema({
      name: String,
      platform: String,
      price: Number,
      description: String,
      image: String
    })

    this.model = model("product", schema)
  }

  async getAll() {
    const data = await this.model.find({})
      .lean()
    
    return data.map((product) => ({
      id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      platform: product.platform
    }))
  }

  async save(obj) {
    const product = await this.model.create(obj)
    return {
      id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      platform: product.platform
    }
  }


  async delete(id) {
    return await this.model.deleteOne({ _id: Types.ObjectId(id) })
  }

  async getById(id) {
    const product =  await this.model.findById(Types.ObjectId(id)).lean()
    return {
      id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      platform: product.platform
    }
  }

  async count() {
    return await this.model.countDocuments({})
  }
}

module.exports = new Product()