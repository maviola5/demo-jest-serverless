const { createResponse } = require('../src/utils')

describe('function createResponse', () => {
  it('should create a response', () => {
    let response = createResponse({ statusCode: 200, message: 'hello' })
    expect(response.statusCode).toBe(200)
  })
})
