const http = require('http')
const fakeProduct = require('./util')

const product = JSON.stringify(fakeProduct)

const options = {
  hostname: 'videogameecommerce.herokuapp.com',
  port: 80,
  path: '/api/products',
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'content-length': product.length,
  },
}

const req = http.request(options, (res) => {
  console.log(`Status ${res.statusCode}`)

  res.on('data', (d) => process.stdout.write(d))
})

req.on('error', (e) => console.log(e))
req.write(product)
req.end()
