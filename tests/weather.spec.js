const { getLocationId, getWeatherByWoeid, handler } = require('../src/functions/weather')
const moxios = require('moxios')
const miamiWeather = require('../data/weather.miami.json')
const locationString = require('../data/location.json')

describe('src/function/weather.js', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  describe('getLocationId', () => {
    it('should get the Where On Earth ID (woeid) when passed a location', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: [
            {
              'title': 'Miami',
              'location_type': 'City',
              'woeid': 2450022,
              'latt_long': '25.728979,-80.237419'
            }
          ]
        })
      })
      const locationId = await getLocationId('miami')
      expect(locationId).toEqual(2450022)
    })
  })

  describe('getWeatherByWoeid', () => {
    it('should get the weather for the WOEID', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: miamiWeather
        })
      })
      const weather = await getWeatherByWoeid(2450022)
      expect(weather.consolidated_weather[0].weather_state_name).toEqual('Heavy Cloud')
    })
  })

  describe('weather handler', () => {
    it('should get the weather for a location string', async () => {
      moxios.stubRequest('https://www.metaweather.com/api/location/search/?query=miami', {
        status: 200,
        response: [
          {
            'title': 'Miami',
            'location_type': 'City',
            'woeid': 2450022,
            'latt_long': '25.728979,-80.237419'
          }
        ]
      })
      moxios.stubRequest('https://www.metaweather.com/api/location/2450022', {
        status: 200,
        response: miamiWeather
      })

      let weather = await handler(locationString)
      expect(weather.body).toEqual(JSON.stringify({ message: miamiWeather }))
    })
  })
})
