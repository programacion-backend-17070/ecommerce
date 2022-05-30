const { Schema, model, Types } = require("mongoose")
const bcrypt = require("bcrypt")
const UserDTO = require("./user/UserDTO")

class User {
  constructor() {
    const schema = new Schema({
      email: String,
      firstname: String,
      lastname: String,
      phone: String,
      password: String
    })

    this.model = model("user", schema)
  }

  // READ
  async getAll() {
    const data = await this.model.find({}).lean()
    return data.map((user) => new UserDTO(user._id, user.firstname, user.lastname, user.email, user.phone))
  }

  // CREATE
  async save(obj) {
    obj.password = await bcrypt.hash(obj.password, 10)
    const user = await this.model.create(obj)
    
    return {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone
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
      phone: user.phone
    }
  }

  // DELETE
  async delete(id) {
    return await this.model.deleteOne({ _id: Types.ObjectId(id) })
  }

  // READ BY ID
  async getById(id) {
    const user =  await this.model.findById(Types.ObjectId(id))
    return {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone
    }
  }

  async isPasswordValid(email, pwd) {
    const user = await this.model.findOne({ email })

    return await bcrypt.compare(pwd, user.password)
  }

  async count() {
    return await this.model.countDocuments({})
  }
}

module.exports = new User()