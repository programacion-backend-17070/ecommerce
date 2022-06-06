const { response } = require('express')
const supertest = require('supertest')
const expect = require('chai').expect
const newProduct = require('../util')

const URL = 'http://videogameecommerce.herokuapp.com'
describe.only('API Products', () => {
  const agent = supertest(URL)


  it('should return all products', async () => {
    const response = await agent.get('/api/products')

    expect(response.status).to.equal(200)
  })

  it('should create product', async () => {
    const response = await agent
      .post('/api/products')
      .send(newProduct)

    const body = response.body

    expect(response.status).to.equal(201)
    expect(newProduct.description).to.equal(body.description)
    expect(newProduct.platform).to.equal(body.platform)
    expect(newProduct.name).to.equal(body.name)
    expect(response.body.id).to.not.be.undefined
  })
})