const User = require('../models/user.js');

exports.findAll = function() {
  return User.find({})
}

exports.create = function(username) {
  return User.create({ name: username })
}
exports.exists = function(username) {
  return User.findOne({name: username})
    .then(user => {
      console.log('our user ', user)
    })
}