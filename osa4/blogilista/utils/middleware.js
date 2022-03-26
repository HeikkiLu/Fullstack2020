const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'Invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'Token expired' })
  }

  logger.error(error.message)

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const token = request.headers.authorization
  if (token && token.toLowerCase().startsWith('bearer ')) {
    request.token = token.substring(7)
  }
  next()
}

const userExtractor = (request, response, next) => {
  const token = request.headers.authorization

  if (token && token.toLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.decode(token.substring(7))
    request.user = decodedToken.username
  }

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
