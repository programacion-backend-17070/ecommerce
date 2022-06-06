const got = require('got')
const fakeProduct = require('../util')

const URL = 'http://videogameecommerce.herokuapp.com/api/products'
async function main() {
  try {
    const responsePost = await got.post(URL, {
      json: fakeProduct,
      responseType: 'json',
    })

    console.log(responsePost.body)
    const response = await got(URL)

    console.log(response.body)
  } catch (e) {
    console.log(e)
  }
}

main()
