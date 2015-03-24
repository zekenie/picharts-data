var assert = function(message, statement) {
  if(!statement) {
    console.log(statement)
    throw new Error(message)
  }
}

var m = require('../models')

m.sequelize.drop()
  .then(function() {
    return m.sequelize.sync({force: true})
  })
  .then(require('./patient')(m))
  .then(function() {
    return m
      .Patient
      .findAll({ include: m.Visit })
  })
  .then(function(z) {
    assert('there is one zeke', z.length === 1)
    z = z[0]
    assert('zeke has a name', z.firstName === 'zeke')
    assert('zeke has one visit', z.Visits.length === 1)
  }, console.warn)
  .then(require('./role')(m))
  .then(function() {
    return m.Role
      .findAll({
        include: m.Permission
      })
  })
  .then(function(roles) {
    console.log(roles)
    assert('there is one role', roles.length === 1)
    var role = roles[0]
    assert('the role has two permissions', role.Permissions.length === 2)
    console.log(role.toJSON())
  })

