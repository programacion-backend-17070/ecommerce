const assert = require('assert').strict
const mongoose = require('mongoose')
const adminService = require('../../src/services/admin.service')
const MONGO_URI = 'mongodb://localhost/ecommerce'

describe('Admin Service', () => {
  before(async () => {
    await mongoose.connect(MONGO_URI)
  })

  it('should assert true', () => {
    assert.strictEqual(true, true)
  })

  it('should connect to database', () => {
    assert.strictEqual(mongoose.connection.readyState, 1)
  })

  it('should return stats', async () => {
    const stats = await adminService.getStats()
    assert.strictEqual(stats.numProducts > 0, true)
  })

  it('should return last product', (done) => {
    adminService
      .getLastProduct()
      .then((product) => {
        assert.strictEqual(product.name !== undefined, true)
        done()
      })
  })
})
