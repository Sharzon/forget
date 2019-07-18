const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('../models/user')

const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

const verifyToken = token => {
  return jwt.verify(token, config.secrets.jwt)
}

const signup = async (req, res) => {
  const { email, name, password } = req.body
  if (!email || !name || !password) {
    return res.status(400).send({ message: 'Email, name and password are required' })
  }

  try {
    const user = await User.create(req.body)
    return res.status(201).send({ token: newToken(user) })
  } catch (e) {
    return res.status(500).send({ message: 'User already exists' })
  }
}

const signin = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(401).send({ message: 'Email and password are required' })
  }

  try {
    const user = await User.findOne({ email }).exec()
    
    if (!user) {
      return res.status(400).send({ message: "Wrong email or password" })
    }
    
    const match = await user.checkPassword(password)
    if (!match) {
      return res.status(400).send({ message: "Wrong email or password" })
    }

    return res.status(200).send({ token: newToken(user) })
  } catch (e) {
    return res.status(500).end()
  }
}

const protect = async (req, res, next) => {
  
  let token = req.headers.authorization
  
  if (!token) {
    return res.status(401).end()
  }
  
  const prefix = "Bearer "
  if (token.slice(0, prefix.length) !== prefix) {
    return res.status(401).end()
  }
  
  token = token.slice(prefix.length)  
  let payload
  try {
    payload = verifyToken(token)
  } catch (e) {
    return res.status(401).end()
  }

  const user = await User.findById(payload.id)
    .select('-password')
    .lean()
    .exec()
  
  if (!user) {
    res.status(401).end()
  }
  
  req.user = user
  next()
}

module.exports = {
  newToken,
  verifyToken,
  signin,
  signup,
  protect
}