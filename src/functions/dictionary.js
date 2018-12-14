require('dotenv').config()
const axios = require('axios')
const { createResponse } = require('../utils')

module.exports.handler = async (event, context) => {
  let definition
  let word
  let APIUrl

  if (!event.queryStringParameters) {
    return createResponse({
      statusCode: 400,
      message: 'You must supply a word'
    })
  }

  word = event.queryStringParameters.word
  APIUrl = `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.MW_DICTIONARY_API_KEY}`
  let { data } = await axios.get(APIUrl)

  if (!data.length || !data[0].shortdef) {
    return createResponse({
      statusCode: 400,
      message: 'This is not a real word in english'
    })
  }

  definition = data[0].shortdef

  return createResponse({
    statusCode: 200,
    message: definition
  })
}
