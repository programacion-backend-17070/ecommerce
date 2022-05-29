class UserDTO {
  constructor(id, fname, lname, email, phone, pedidos) {
    this.id = id
    this.email = email
    this.pedidos = pedidos || []
    this.fullName = `${fname} ${lname}`
    this.phone = phone
  }
}

module.exports = UserDTO
