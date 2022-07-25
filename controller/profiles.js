const Profile = require('../models/profile');

module.exports = {
    new: newProfile
}

function newProfile(req, res) {
    res.render('profiles/new');
}