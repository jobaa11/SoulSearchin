const Profile = require('../models/profile');

const allProfiles = new Profile({});
const nonProfileUrls = ["/logout", "/profiles/new/instructors", "/profiles/new/students", "/profiles/new/instructor", "/profiles/new/student", "profiles/instructor/home", "profiles/instructors/home", "profiles/student/home", "profiles/students/home", `profiles/instructors/${allProfiles._id}`,`profiles/students/${allProfiles._id}`,`profiles/instructor/${allProfiles._id}`,`profiles/student/${allProfiles._id}` ];

module.exports = (req, res, next) => {
  if (!nonProfileUrls.includes(req.url) && req.user) {
    Profile.findOne({ user: req.user._id }, (err, profile) => {
        if (!profile)
          return res.render('profiles/new', { profile: null });
        req.profile = profile;
        next();
      });
  } else {
    next();
  }
};