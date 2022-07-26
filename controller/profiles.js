const Profile = require('../models/profile');

module.exports = {
    new: newProfile,
    create
}

function newProfile(req, res) {
    res.render('profiles/new');
}

function create(req, res) {
    req.
    res.render('profiles/instructors');
    // })
}
// const profile = new Profile(req.body);
// profile.save(function (err) {
//     if (req.body.) return res.redirect('/profiles/new');