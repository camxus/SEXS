const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization')
  if (!authHeader) {
    console.log("no auth header")
    req.isAuth = false
    return next()
  }
  const token = authHeader.split(' ')[1]
  if (!token || token === '') {
    console.log("no auth token")
    req.isAuth = false
    return next()
  }
  let decodedToken
  try {
    decodedToken = jwt.verify(token, 'somesupersecretkey')
  } catch (err) {
    console.log("no auth token res")
    req.isAuth = false
    return next()
  }
  if (!decodedToken) {
    console.log("no auth token res")
    req.isAuth = false
    return next()
  }
  console.log("auth", decodedToken)
  req.isAuth = true
  req.userId = decodedToken.userId
  next()
}
