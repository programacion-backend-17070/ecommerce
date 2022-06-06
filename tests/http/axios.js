const axios = require('axios')
const fakeProduct = require('../util')

const URL = 'http://videogameecommerce.herokuapp.com/api/products'
async function main() {
  try {
    await axios.post(URL, fakeProduct)
    const { data } = await axios.get(URL)

    console.log(data)
  } catch (e) {
    console.log(e)
  }
}

main()
