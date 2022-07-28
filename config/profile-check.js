const Profile = require('../models/profile');

const nonProfileUrls = ["/logout", "/profiles/new/instructor", "/profiles/new/student" ];

module.exports = function (req, res, next) {
  if (!nonProfileUrls.includes(req.url) && req.user) {
    Profile.findOne({ user: req.user._id }, function (err, profile) {
      if (!profile) return res.render('profiles/new', { profile: null });
      req.profile = profile;
      next();
    })
  } else {
    next();
  }
};