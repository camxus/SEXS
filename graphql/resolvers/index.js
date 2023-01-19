const authResolver = require('./auth');
const eventsResolver = require('./events');
const bookingResolver = require('./booking');
const usersResolver = require('./users');
const partnersResolver = require('./partners');
const reportsResolver = require('./reports.ts');
const stdsResolver = require('./stds');

const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver,
  ...usersResolver,
  ...partnersResolver,
  ...reportsResolver,
  ...stdsResolver
};

module.exports = rootResolver;
