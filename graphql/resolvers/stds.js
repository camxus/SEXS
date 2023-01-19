const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const STD = require('../../models/std')

module.exports = {
  stds: async args => {
    try {
      const stds = await STD.find()
      return stds.map(std => ({...std._doc, _id: std._id.toString()}))
    } catch (err) {
      throw err
    }
  }
}
