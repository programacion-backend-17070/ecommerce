const { model } = require('mongoose')

class BaseModel {
  constructor(schema, modelName) {
    this.model = model(modelName, schema)
  }

  // READ
  async getAll() {
    const data = await this.model.find({}).lean()
    return data
  }

  async count() {
    return this.model.countDocuments({})
  }
}

module.exports = BaseModel
