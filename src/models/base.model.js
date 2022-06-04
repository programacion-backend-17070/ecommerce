const { model, Types } = require('mongoose')
const _ = require('lodash')

class BaseModel {
  constructor(schema, modelName, skipFields) {
    this.model = model(modelName, schema)
    this.skipFields = skipFields || []
  }

  // READ
  async getAll() {
    const projection = this.skipFields.reduce(
      (proj, field) => ({
        ...proj,
        [field]: 0,
      }),
      {}
    )
    const data = await this.model.find({}, projection).lean()
    return data.map(this.toObj.bind(this))
  }

  async getById(id) {
    const item = await this.model.findById(Types.ObjectId(id))
    if (!item) {
      return null
    }
    return this.toObj(item)
  }

  async count() {
    return this.model.countDocuments({})
  }

  // DELETE
  delete(id) {
    return this.model.deleteOne({ _id: Types.ObjectId(id) })
  }

  async save(item) {
    // TODO: return only properties in schema, do not return create command response
    return this.toObj(await this.model.create(item))
  }

  toObj(item) {
    const omit = this.skipFields.concat(['_id', '__v'])
    return _.omit({ ...item, id: item._id }, omit)
  }
}

module.exports = BaseModel
