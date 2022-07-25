const Profile = require('../models/profile');

module.exports = {
    new: newProfile,
    create
}

function newProfile(req, res) {
    res.render('profiles/new');
}

function create(req, res) {
    console.log('hellow world')
    // const profile = new Profile(req.body);
    // profile.save(function (err) {
    //     if (err) return res.redirect('/profiles/new');
        res.render('profiles/instructors');
    // })
}