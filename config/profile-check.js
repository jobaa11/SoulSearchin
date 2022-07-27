const Profile = require('../models/profile');

module.exports = function (req, res, next) {
  if (!req.url.startsWith('/logout') && req.user && !req.url.startsWith('/profiles')) {
    Profile.findOne({ user: req.user._id }, function (err, profile) {
      if (!profile) return res.render('profiles/new', { profile: null });
      req.profile = profile;
      next();
    })
  } else {
    next();
  }
};