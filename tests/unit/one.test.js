const assert = require('assert').strict
const adminService = require('../../src/services/admin.service')

describe('Test', () => {

  before(() => {
    console.log('antes de todas')
  })

  beforeEach(() => {
    console.log('antes de cada una')
  })

  after(() => {
    console.log('despues de todas')
  })

  afterEach(() => {
    console.log('despues de cada una')
  })

  it('should assert true', () => {
    assert.strictEqual(true, true)
  })

  it('should assert false', () => {
    assert.strictEqual(false, false)
  })
})
