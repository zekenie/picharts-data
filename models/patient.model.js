module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Patient', {
    firstName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dob: DataTypes.DATEONLY
  }, {
    classMethods: {
      associate: function(m) {
        m.Patient.hasMany(m.Visit)
        m.Patient.hasMany(m.Reading, { through: m.Visit})
      }
    }
  })
}