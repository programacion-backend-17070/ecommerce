class UserDTO {
  constructor(id, fname, lname, email, phone, pedidos) {
    this.id = id
    this.email = email
    this.name = `${fname} ${lname}`
    this.phone = phone
    this.pedidos = pedidos || []
  }
}

module.exports = UserDTO
