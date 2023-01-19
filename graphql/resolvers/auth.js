const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../../models/user')

module.exports = {
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email })
      if (existingUser) {
        throw new Error('USER_ALREADY_EXISTS')
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12)

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
        attributes: args.userInput.attributes
      })

      const result = await user.save()

      return { ...result._doc, password: null, _id: result.id }
    } catch (err) {
      throw err
    }
  },
  checkUsernames: async ({username}) => {
    try {
      const existingUser = await User.findOne({"attributes.username": username})
      if (existingUser) {
        throw new Error('USERNAME_TAKEN')
      }
      return "passed"
    } catch (err) {
      throw err
    }
  },
  checkEmails: async ({email}) => {
    try {
      const existingUser = await User.findOne({ email: email })
      if (existingUser) {
        throw new Error('EMAIL_IN_USE')
      }
      return "passed"
    } catch (err) {
      throw err
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email })
    if (!user) {
      throw new Error('USER_NOT_FOUND')
    }
    const isEqual = await bcrypt.compare(password, user.password)
    if (!isEqual) {
      throw new Error('PASSWORD_INVALID')
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      'somesupersecretkey',
      {
        expiresIn: '1h'
      }
    )
    const refreshToken = jwt.sign(
      { userId: user.id, email: user.email },
      'somesupersecretkeysecret',
      {
        expiresIn: '48h'
      }
    )
    return { userId: user.id, token: token, refreshToken, tokenExpiration: 1 }
  },
  refreshToken: async ({refreshToken}) => {
    try {
      jwt.verify(refreshToken, "somesupersecretkeysecret", (err, decode) => {
        if (err) {
          throw new Error("TOKEN_EXPIRED")
        } else {
          let token = jwt.sign(...decode, "somesupersecretkey", {expiresIn: "1h"})
          return token
        }
      } )
    } catch (e) {
      throw err
    }
  }
}
