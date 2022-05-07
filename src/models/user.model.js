const { Schema, model } = require("mongoose")
const bcrypt = require("bcrypt")

class User {
  constructor() {
    const schema = new Schema({
      email: String,
      firstname: String,
      lastname: String,
      password: String,
    })

    this.model = model("user", schema)
  }

  async getAll() {
    const data = await this.model.find({}).lean()
    return data
  }

  async save(obj) {
    obj.password = await bcrypt.hash(obj.password, 10)
    const user = await this.model.create(obj)
    return {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email
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
      email: user.email
    }
  }

  async delete(id) {
    return await this.model.deleteOne({ _id: id })
  }

  async getById(id) {
    console.log("get by id")
    return await this.model.findById(id)
  }

  async isPasswordValid(email, pwd) {
    const user = await this.model.findOne({ email })

    return await bcrypt.compare(pwd, user.password)
  }
}

module.exports = new User()