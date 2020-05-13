const jwt = require('koa-jwt')
const { SECRET } = require('../config/constant')

const auth = jwt({ secret: SECRET })

module.exports = auth