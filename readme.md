# Serverless Demo with Jest Test Suite

## Public endpoints
### Function: Dictionary
GET - https://xx935xk8f5.execute-api.us-east-1.amazonaws.com/dev/dictionary

Params: word`<string>`

Example: https://xx935xk8f5.execute-api.us-east-1.amazonaws.com/dev/dictionary?word=hopscotch

### Function: Weather
GET - https://xx935xk8f5.execute-api.us-east-1.amazonaws.com/dev/weather

Params: location`<string>`

Example: https://xx935xk8f5.execute-api.us-east-1.amazonaws.com/dev/weather?location=los%20angeles

## NPM Scripts
`npm run lint` to lint and fix
`npm run test:unit` to run unit tests
`npm run local` to run serverless locally
`npm run deploy` to run lint, unit tests and deploy

## ENV

to run locally, setup a .env file with the following variable (see sample.env)

MW_DICTIONARY_API_KEY=xxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx
