const moxios = require('moxios')
const { handler } = require('../src/functions/dictionary')
const dictionaryResponse = require('../data/dictionary.res.json')

describe('src/function/dictionary.js', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  describe('handler', () => {
    it('should give the weather of a location', async () => {
      let event = {
        queryStringParameters: {
          word: 'miami'
        }
      }

      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: dictionaryResponse
        })
      })

      let response = await handler(event)
      expect(response.body).toBe(JSON.stringify({ message: ['homeboy'] }))
    })
  })
})
