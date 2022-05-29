const { Schema, model, Types } = require('mongoose')
const bcrypt = require('bcrypt')
const UserDTO = require('./dtos/UserDTO')

class UserDao {
  constructor() {
    const schema = new Schema({
      email: String,
      firstname: String,
      lastname: String,
      phone: String,
      password: String,
    })

    this.model = model('user', schema)
  }

  async getAll() {
    const data = await this.model.find({}).lean()
    return data.map(
      (user) =>
        new UserDTO(
          user._id,
          user.firstname,
          user.lastname,
          user.email,
          user.phone
        )
    )
  }

  async save(newUser) {
    const obj = {
      ...newUser,
      password: await bcrypt.hash(newUser.password, 10),
    }
    const user = await this.model.create(obj)

    return new UserDTO(
      user._id,
      user.firstname,
      user.lastname,
      user.email,
      user.phone
    )
  }

  async delete(id) {
    return this.model.deleteOne({ _id: Types.ObjectId(id) })
  }

  async getById(id) {
    const user = await this.model.findById(Types.ObjectId(id))
    return new UserDTO(
      user._id,
      user.firstname,
      user.lastname,
      user.email,
      user.phone
    )
  }
}

module.exports = UserDao
