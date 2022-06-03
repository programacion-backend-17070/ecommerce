const { Schema, Types } = require('mongoose')
const bcrypt = require('bcrypt')
const BaseModel = require('./base.model')

class User extends BaseModel {
  constructor() {
    const schema = new Schema({
      email: String,
      firstname: String,
      lastname: String,
      phone: String,
      password: String,
      // age
    })
    super(schema, 'user')

    this.id = 1
  }

  getAll() {
    return []
  }

  // CREATE
  async save(newUser) {
    const obj = newUser
    obj.password = await bcrypt.hash(newUser.password, 10)
    const user = await this.model.create(obj)

    return {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
    }
  }

  existsByEmail(email) {
    return this.model.exists({ email })
  }

  async getByEmail(email) {
    const user = await this.model.findOne({ email })

    return {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
    }
  }

  // DELETE
  async delete(id) {
    return this.model.deleteOne({ _id: Types.ObjectId(id) })
  }

  // READ BY ID
  async getById(id) {
    const user = await this.model.findById(Types.ObjectId(id))
    return {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
    }
  }

  async isPasswordValid(email, pwd) {
    const user = await this.model.findOne({ email })

    return bcrypt.compare(pwd, user.password)
  }
}

module.exports = new User()
