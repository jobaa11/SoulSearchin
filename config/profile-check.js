const Profile = require('../models/profile');

module.exports = function (req, res, next) {
  if (req.user) {
    Profile.findOne({ user: req.user._id }, function (err, profile) {
      console.log('profile', profile);
      if (!profile) return res.render('profiles/new')
    })
  } else {
    next()
  }
};