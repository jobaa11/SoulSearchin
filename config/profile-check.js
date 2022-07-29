const Profile = require('../models/profile');
const User = require('../models/user')

const allUsers = new User({})
const allProfiles = new Profile({});
const nonProfileUrls = ["/logout", "/profiles/new/instructors", "/profiles/new/students", "/profiles/new/instructor", "/profiles/new/student", "profiles/instructor/home", "profiles/instructors/home", "profiles/student/home", "profiles/students/home", `profiles/instructors/${allProfiles._id}`,`profiles/students/${allProfiles._id}`,`profiles/instructor/${allProfiles._id}`,`profiles/student/${allProfiles._id}`, `profiles/${allProfiles._id}`, `profiles/${allProfiles._id}/edit`, 'profiles/instructor', 
`profiles/instructors/${allUsers._id}`,`profiles/students/${allUsers._id}`,`profiles/instructor/${allUsers._id}`,`profiles/student/${allUsers._id}`, `profiles/${allUsers._id}`, `profiles/${allUsers._id}/edit`, 'profiles/instructor', '/images/LOGO.png'];

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