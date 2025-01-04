const { Blog, User } = require("../models")
const jwt = require("jsonwebtoken")
const { SECRET } = require("./config")

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

const userFinder = async (req, res, next) => {
  req.user = await User.findOne({
    where: {
      username: req.params.username
    }
  })
  next()
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization")

  if(authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      console.log("token", authorization.substring(7))
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch(error) {
      return res.status(401).json({ error: "token invalid" })
    }
  } else {
    return res.status(401).json({ error: "token missing" })
  }
  next()
}

const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  console.log("ERROR NAME:", error.name)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'SequelizeValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  blogFinder,
  userFinder,
  tokenExtractor,
  errorHandler
}