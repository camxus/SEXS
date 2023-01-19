const { v4: uuidv4 } = require('uuid')
const User = require('../../models/user')
const STD = require('../../models/std')
const { partners } = require('./partners')

// const { transformPartners } = require('./merge')

const transformUser = (user) => {
    return {
        ...user._doc,
        _id: user.id.toString()
    }
}

module.exports = {
  submitSTDReport: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('NOT_AUTHENTICATED')
    }

    const today = +new Date()
    const addRemoveDays = (input, amount, operator) => {
        let date = new Date(input)
        // input
        // "2022-24-09"
        // output
        // ISO STRING
        switch (operator) {
          case '+':
            date.setDate(date.getDate() + amount)
            break
          case '-':
            date.setDate(date.getDate() - amount)
            break
          default:
            throw new Error('INVALID_OPERATOR')
        }
        return date
    }

    try {
      const user = await User.findById(req.userId)
      const std = await STD.findOne({ label: args.diagnosis })
      if (!std) { throw new Error("STD_NOT_FOUND") }
      user["health"]["history"] = [...user["health"]["history"],
        {
          uuid: uuidv4(),
          std_id: std._doc._id,
          log_date: today,
          release_date: +addRemoveDays(new Date(), std.duration, "+")
        }
      ]
      await user.save()

      const _user = await User.findById(args.userId)

      user["reported"] = [
        ...user.reported,
        {
          report: _user.health.history.find(std => std.log_date === today).uuid.toString(),
          type: "health",
          date: today,
          userId: args.userId
        }
      ]

      user.save()

      await Promise.all(user.partners.forEach(async partner => {
        try {
          const _partner = await User.findById(partner.userId.toString())
          _partner.health.tested = false

          _partner.save()
        } catch (e) {
          console.log(e)
        }
      }))

      return "submitted"
    } catch (err) {
      throw err
    }
  },
  submitIncidentReport: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('NOT_AUTHENTICATED')
    }

    const today = +new Date()

    try {
      const partner = await User.findById(args.userId)
      const user = await User.findById(req.userId)
      partner["violations"] = [
        ...partner.violations,
        {
          uuid: uuidv4(),
          date: today,
          userId: req.userId,
        }
      ]

      await partner.save()

      const _partner = await User.findById(args.userId)

      user["reported"] = [
        ...user.reported,
        {
          report: _partner.violations.find(violation => violation.date === today).uuid.toString(),
          type: "violation",
          date: today,
          userId: args.userId
        }
      ]

      user.save()

      return "submitted"
    } catch (err) {
      throw err
    }
  },
  submitTest: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('NOT_AUTHENTICATED')
    }

    try {
      const user = await User.findById(req.userId)

      user.health.tested = true
      
      user.save()

      return "submitted"
    } catch (err) {
      throw err
    }
  }
}
