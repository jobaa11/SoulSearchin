const Profile = require('../models/profile');

const nonProfileUrls = ["/logout", "/profiles/new/instructor", "/profiles/new/student","/profiles/new", '/images/LOGO.png' ];

module.exports = (req, res, next) => {
  if (!nonProfileUrls.includes(req.url) && req.user) {
    Profile.findOne({ user: req.user._id })
    .populate('instruments').populate('chosenInstructors').exec((err, profile) => {
        if (!profile)
          return res.render('profiles/new/new', { profile: null });
        req.profile = profile;
        next();
      });
  } else {
    next();
  }
};  