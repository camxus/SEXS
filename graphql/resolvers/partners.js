const Event = require('../../models/event')
const User = require('../../models/user')

// const { transformPartners } = require('./merge')

const transformPartners = (user) => {
}
module.exports = {
  partners: async (req) => {
    try {
      const user = await User.findById(req.userId)
      return user.partners
    } catch (err) {
      throw err
    }
  },
  addPartner: async (args, req) => {
    // console.log(req.isAuth, req.decodedToken)
    if (!req.isAuth) {
      throw new Error('NOT_AUTHENTICATED')
    }

    try {
      const user = await User.findById(req.userId)
      if (!user) {
        throw new Error('USER_NOT_FOUND')
      }
      
      const partner = user.partners?.find(partner => partner.userId.toString() === args.partnerId)
      // if (partner) { throw new Error('PARTNER_ALREADY_ADDED') }

      const currentDate = new Date()

      user["partners"] = [
        ...user.partners,
        {
          userId: args.partnerId,
          request: {
            date_requested: currentDate
          }
        }
      ]
      
      await user.save()
      

      return {
        ...user._doc,
        _id: user.id.toString(),
        partners: Array.from(user.partners).map(partner => ({...partner, request: partner.request, userId: partner.userId.toString(), _id: partner._id.toString()}))
      }  //needs to match Scheme type
    } catch (err) {
      console.log(err)
      throw err
    }
  },
  removePartner: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('NOT_AUTHENTICATED')
    }

    try {
      const user = await User.findById(req.userId)

      if (!user) {
        throw new Error('USER_NOT_FOUND')
      }
      const partner = user.partners.find(partner => partner.userId.toString() === args.partnerId)
      if (!partner) { throw new Error('PARTNER_NOT_IN_LIST') }

      user["partners"] = user.partners.filter(partner => partner.userId.toString() !== args.partnerId)
      await user.save()

      return {
        ...user._doc,
        _id: user.id.toString(),
        partners: Array.from(user.partners)
      }  //needs to match Scheme type
    } catch (err) {
      console.log(err)
      throw err
    }
  },
  hidePartner: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('NOT_AUTHENTICATED')
    }

    try {
      const hidden = {
        value: true,
        date: +new Date
      }

      const user = await User.findById(req.userId)

      if (!user) {
        throw new Error('USER_NOT_FOUND')
      }
      const partner = user.partners.find(partner => partner.userId.toString() === args.partnerId)
      if (!partner) { throw new Error('PARTNER_NOT_IN_LIST') }

      const index = user.partners.indexOf(partner => partner.userId.toString() === args.partnerId)

      user.partners[index].hidden = hidden

      await user.save()

      return {
        ...user._doc,
        _id: user.id.toString(),
        partners: Array.from(user.partners)
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  },
  unhidePartner: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('NOT_AUTHENTICATED')
    }

    try {
      const hiddenStruct = {
        value: false,
        date: +new Date
      }

      const user = await User.findById(req.userId)

      if (!user) {
        throw new Error('USER_NOT_FOUND')
      }
      const partner = user.partners.find(partner => partner.userId.toString() === args.partnerId)
      if (!partner) { throw new Error('PARTNER_NOT_IN_LIST') }

      const index = user.partners.indexOf(partner => partner.userId.toString() === args.partnerId)

      user.partners[index].hidden = hiddenStruct

      await user.save()

      return {
        ...user._doc,
        _id: user.id.toString(),
        partners: Array.from(user.partners)
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  },
  setCanSee: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('NOT_AUTHENTICATED')
    }

    try {
      const canSeeStruct = {
        cycle: args.can_see.cycle,
        health_status: args.can_see.health_status
      }

      const user = await User.findById(req.userId)

      if (!user) {
        throw new Error('USER_NOT_FOUND')
      }
      const partner = user.partners.find(partner => partner.userId.toString() === args.partnerId)
      if (!partner) { throw new Error('PARTNER_NOT_IN_LIST') }

      const index = user.partners.indexOf(partner => partner.userId.toString() === args.partnerId)

      user.partners[index].can_see = canSeeStruct

      await user.save()

      return user.partners[index]
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}
