module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {

  }, {
    instanceMethods: {
      authorize: function(role) {
        var self = this
        return sequelize.models.Role.find({
          where: {
            name: role
          }
        })
        .then(function(role) {
          if(!role) return
          return self.addRole(role)
        })
      },
      can: function(verb, subject) {
        return this
          .getRoles({
            include: [sequelize.models.Permission]
          })
          .then(function(roles) {
            for(var i = 0; i < roles.length; i++) {
              for(var j = 0; j < roles[i].Permissions.length; j++) {
                var permission = roles[i].Permissions[j]
                if(permission.subject === subject && permission.verb === verb) return true
              }
            }
            return false
          })
      }
    },
    classMethods: {
      associate: function(m) {
        m.User.hasMany(m.Role)
      }
    }
  })
}