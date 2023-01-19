const User = require('../../models/user')
const { partners } = require('./partners')

// const { transformPartners } = require('./merge')

const transformUser = (user) => {
    return {
        ...user._doc,
        _id: user.id.toString()
    }
}

module.exports = {
  me: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('NOT_AUTHENTICATED')
    }

    try {
      const user = await User.findById(req.userId)
      return {
        ...transformUser(user),
        partners: Array.from(user.partners).map(partner => {
          // if (partner.userId.toString() === req.userId) {
            return {
              ...partner,
              userId: partner.userId.toString()
            }
          // }
        }),
        health: {
          ...user.health,
          history: Array.from(user.health.history).map(std => ({
            ...std,
            std_id: std.std_id.toString(),
          }))
        }
      }
    } catch (err) {
      throw err
    }
  },

  user: async (args, req) => {
    try {
      const user = await User.findOne({"attributes.username": args.username}) ?? await User.findOne({email: args.username})

      if (!user) { throw new Error("USER_NOT_FOUND") }

      return {
        ...transformUser(user),
        partners: req?.userId && Array.from(user.partners).map(partner => {
          if (partner._doc.userId.toString() === req.userId) {
            return {
              ...partner._doc,
              userId: partner._doc.userId.toString()
            }
          }
        })
      }
    } catch (err) {
      throw err
    }
  },

  userById: async (args, req) => {
    try {
      const user = await User.findById(args.ID)
      
      if (!user) { throw new Error("USER_NOT_FOUND") }
      const reqUserAdded = user.partners?.find(partner => partner.userId === req.userId)
      
      const cycle = user.cycle 
      const history = Array.from(user.health.history).map(std => ({
                        ...std,
                        std_id: std.std_id.toString(),
                      }))

      return {
        ...transformUser(user),
        cycle: reqUserAdded?.can_see?.cycle ? cycle : null,
        health: {
          ...user.health,
          history: reqUserAdded?.can_see?.health_status ? history : null
        }
      }
    } catch (err) {
      throw err
    }
  },

  deactivateUser: async (args, req) => {
    try {
      const user = await User.findById(req.userId)

      if (!user) { throw new Error("USER_NOT_FOUND") }

      user["deactivated"] = true

      user.save()

      return "deativated"
    } catch (err) {
      throw err
    }
  },

  deleteUser: async (args, req) => {
    try {
      const user = await User.findById(req.userId)

      if (!user) { throw new Error("USER_NOT_FOUND") }

      User.deleteById(user._doc._id)

      user.save()

      return "deleted"
    } catch (err) {
      throw err
    }
  }
}
