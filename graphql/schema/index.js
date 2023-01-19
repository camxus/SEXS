const { buildSchema } = require('graphql');
const users = require('./user.gql')
const std = require('./std.gql')
const schema = require('./index.gql')

module.exports = buildSchema(users + std + schema);
