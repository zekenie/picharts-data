var m = require('./models')

m.sequelize.drop()
  .then(function() {
    return m.sequelize.sync({force: true})
  })
  .then(function() {
    return m.Patient.create({
      firstName: 'zeke',
      middleName: 'alexander',
      lastName: 'nierenberg',
      dob: new Date()
    })
  })
  .then(function(z) {
    return z.createVisit()
  })
  .then(function() {
    return m
      .Patient
      .findAll({ include: m.Visit })
  })
  .then(function(z) {
    console.log(JSON.stringify(z, null, 4))
  }, console.warn)

