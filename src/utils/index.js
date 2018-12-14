module.exports.createResponse = ({ statusCode = 200, message = '' }) => {
  return {
    statusCode,
    body: JSON.stringify({
      message
    })
  }
}
