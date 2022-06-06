const faker = require('faker')

module.exports = {
  name: faker.commerce.productName(),
  platform: faker.random.arrayElement(['PS4', 'Xbox', 'Nintendo']),
  price: faker.commerce.price(),
  description: faker.commerce.productDescription(),
}
