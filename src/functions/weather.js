require('dotenv').config()
const axios = require('axios')
const { createResponse } = require('../utils')

const getLocationId = async (location) => {
  let locationAPIUrl = 'https://www.metaweather.com/api/location/search/?query='
  let { data } = await axios.get(locationAPIUrl + location)
  if (!data.length) {
    return false
  }
  return data[0].woeid
}

const getWeatherByWoeid = async (woeid) => {
  let weatherAPIUrl = 'https://www.metaweather.com/api/location/'
  let { data } = await axios.get(weatherAPIUrl + woeid)
  return data
}

const handler = async (event, context) => {
  let locationId, weather

  if (!event.queryStringParameters) {
    return createResponse({
      statusCode: 400,
      message: 'You must supply a location'
    })
  }

  locationId = await getLocationId(event.queryStringParameters.location)

  if (!locationId) {
    return createResponse({
      statusCode: 400,
      message: 'this is not a place!'
    })
  }

  weather = await getWeatherByWoeid(locationId)

  return createResponse({
    statusCode: 200,
    message: weather
  })
}

module.exports = {
  handler,
  getLocationId,
  getWeatherByWoeid
}
