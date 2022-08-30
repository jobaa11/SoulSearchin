const Profile = require('../models/profile');
const User = require('../models/user')

// line 5 is what I had originally, but line 6 is what I think I need. Same with line 7 & 8 (when i have connect, log 5/7 again to see thne try the new solution)
const allUsers = new User({})
// const allUsers = User.find({})
const allProfiles = new Profile({});
// const allProfiles = Profile.find({})
// every path that is in this url will be false when added into line 14 if statement so if (false && req.user)
const nonProfileUrls = ["/logout", "/profiles/new/instructors", "/profiles/new/students", "/profiles/new/instructor", "/profiles/new/student",
`profiles/instructors/${allUsers._id}`, '/images/LOGO.png'];

module.exports = (req, res, next) => {
  if (!nonProfileUrls.includes(req.url) && req.user) {
    // query key name was "user" at first but i think this needs to be _id or something that matches the property name
    Profile.findOne({ user: req.user._id })
    .populate('instruments').exec((err, profile) => {
        if (!profile)
          return res.render('profiles/new', { profile: null });
        req.profile = profile;
        next();
      });
  } else {
    next();
  }
};  