const Profile = require('../models/profile');

module.exports = {
    new: newProfile,
    create
}

function newProfile(req, res) {
    res.render('profiles/new');
}

function create(req, res) {
    var profile = new Profile
    profile.save(function (err) {
        if (err) return res.redirect('/profiles/new');
        // res.redirect('/profiles');
    })
}