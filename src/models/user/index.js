const bcrypt = require('bcrypt')

const UserDao = require('./dao')

class UserModel extends UserDao {
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

  async isPasswordValid(email, pwd) {
    const user = await this.model.findOne({ email })

    return bcrypt.compare(pwd, user.password)
  }

  async count() {
    return this.model.countDocuments({})
  }
}

module.exports = new UserModel()
